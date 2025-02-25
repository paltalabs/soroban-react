var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Transport from "@ledgerhq/hw-transport";
import hidFraming from "@ledgerhq/devices/hid-framing";
import { identifyUSBProductId } from "@ledgerhq/devices";
import { log } from "@ledgerhq/logs";
import { TransportOpenUserCancelled, TransportInterfaceNotAvailable, TransportWebUSBGestureRequired, DisconnectedDeviceDuringOperation, DisconnectedDevice, } from "@ledgerhq/errors";
import { getLedgerDevices, getFirstLedgerDevice, requestLedgerDevice, isSupported } from "./webusb";
const configurationValue = 1;
const endpointNumber = 3;
/**
 * WebUSB Transport implementation
 * @example
 * import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
 * ...
 * TransportWebUSB.create().then(transport => ...)
 */
class TransportWebUSB extends Transport {
    constructor(device, interfaceNumber) {
        super();
        this.channel = Math.floor(Math.random() * 0xffff);
        this.packetSize = 64;
        this._disconnectEmitted = false;
        this._emitDisconnect = (e) => {
            if (this._disconnectEmitted)
                return;
            this._disconnectEmitted = true;
            this.emit("disconnect", e);
        };
        this.device = device;
        this.interfaceNumber = interfaceNumber;
        this.deviceModel = identifyUSBProductId(device.productId);
    }
    /**
     * Similar to create() except it will always display the device permission (even if some devices are already accepted).
     */
    static request() {
        return __awaiter(this, void 0, void 0, function* () {
            const device = yield requestLedgerDevice();
            return TransportWebUSB.open(device);
        });
    }
    /**
     * Similar to create() except it will never display the device permission (it returns a Promise<?Transport>, null if it fails to find a device).
     */
    static openConnected() {
        return __awaiter(this, void 0, void 0, function* () {
            const devices = yield getLedgerDevices();
            if (devices.length === 0)
                return null;
            return TransportWebUSB.open(devices[0]);
        });
    }
    /**
     * Create a Ledger transport with a USBDevice
     */
    static open(device) {
        return __awaiter(this, void 0, void 0, function* () {
            yield device.open();
            if (device.configuration === null) {
                yield device.selectConfiguration(configurationValue);
            }
            yield gracefullyResetDevice(device);
            const iface = device.configurations[0].interfaces.find(({ alternates }) => alternates.some(a => a.interfaceClass === 255));
            if (!iface) {
                throw new TransportInterfaceNotAvailable("No WebUSB interface found for your Ledger device. Please upgrade firmware or contact techsupport.");
            }
            const interfaceNumber = iface.interfaceNumber;
            try {
                yield device.claimInterface(interfaceNumber);
            }
            catch (e) {
                yield device.close();
                throw new TransportInterfaceNotAvailable(e.message);
            }
            const transport = new TransportWebUSB(device, interfaceNumber);
            const onDisconnect = e => {
                if (device === e.device) {
                    // $FlowFixMe
                    navigator.usb.removeEventListener("disconnect", onDisconnect);
                    transport._emitDisconnect(new DisconnectedDevice());
                }
            };
            // $FlowFixMe
            navigator.usb.addEventListener("disconnect", onDisconnect);
            return transport;
        });
    }
    /**
     * Release the transport device
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.exchangeBusyPromise;
            yield this.device.releaseInterface(this.interfaceNumber);
            yield gracefullyResetDevice(this.device);
            yield this.device.close();
        });
    }
    /**
     * Exchange with the device using APDU protocol.
     * @param apdu
     * @returns a promise of apdu response
     */
    exchange(apdu) {
        return __awaiter(this, void 0, void 0, function* () {
            const b = yield this.exchangeAtomicImpl(() => __awaiter(this, void 0, void 0, function* () {
                const { channel, packetSize } = this;
                log("apdu", "=> " + apdu.toString("hex"));
                const framing = hidFraming(channel, packetSize);
                // Write...
                const blocks = framing.makeBlocks(apdu);
                for (let i = 0; i < blocks.length; i++) {
                    yield this.device.transferOut(endpointNumber, blocks[i]);
                }
                // Read...
                let result;
                let acc;
                while (!(result = framing.getReducedResult(acc))) {
                    const r = yield this.device.transferIn(endpointNumber, packetSize);
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    const buffer = Buffer.from(r.data.buffer);
                    acc = framing.reduceResponse(acc, buffer);
                }
                log("apdu", "<= " + result.toString("hex"));
                return result;
            })).catch(e => {
                if (e && e.message && e.message.includes("disconnected")) {
                    this._emitDisconnect(e);
                    throw new DisconnectedDeviceDuringOperation(e.message);
                }
                throw e;
            });
            return b;
        });
    }
    setScrambleKey() { }
}
/**
 * Check if WebUSB transport is supported.
 */
TransportWebUSB.isSupported = isSupported;
/**
 * List the WebUSB devices that was previously authorized by the user.
 */
TransportWebUSB.list = getLedgerDevices;
/**
 * Actively listen to WebUSB devices and emit ONE device
 * that was either accepted before, if not it will trigger the native permission UI.
 *
 * Important: it must be called in the context of a UI click!
 */
TransportWebUSB.listen = (observer) => {
    let unsubscribed = false;
    getFirstLedgerDevice().then(device => {
        if (!unsubscribed) {
            const deviceModel = identifyUSBProductId(device.productId);
            observer.next({
                type: "add",
                descriptor: device,
                deviceModel,
            });
            observer.complete();
        }
    }, error => {
        if (window.DOMException && error instanceof window.DOMException && error.code === 18) {
            observer.error(new TransportWebUSBGestureRequired(error.message));
        }
        else {
            observer.error(new TransportOpenUserCancelled(error.message));
        }
    });
    function unsubscribe() {
        unsubscribed = true;
    }
    return {
        unsubscribe,
    };
};
export default TransportWebUSB;
function gracefullyResetDevice(device) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield device.reset();
        }
        catch (err) {
            console.warn(err);
        }
    });
}
//# sourceMappingURL=TransportWebUSB.js.map