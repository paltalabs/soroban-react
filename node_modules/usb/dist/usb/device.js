"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedDevice = void 0;
const usb = require("./bindings");
const interface_1 = require("./interface");
const capability_1 = require("./capability");
const isBuffer = (obj) => !!obj && obj instanceof Uint8Array;
const DEFAULT_TIMEOUT = 1000;
class ExtendedDevice {
    constructor() {
        this._timeout = DEFAULT_TIMEOUT;
    }
    /**
     * Timeout in milliseconds to use for control transfers.
     */
    get timeout() {
        return this._timeout || DEFAULT_TIMEOUT;
    }
    set timeout(value) {
        this._timeout = value;
    }
    /**
     * Object with properties for the fields of the active configuration descriptor.
     */
    get configDescriptor() {
        try {
            return this.__getConfigDescriptor();
        }
        catch (e) {
            // Check descriptor exists
            const errno = e.errno;
            if (errno === usb.LIBUSB_ERROR_NOT_FOUND ||
                errno === usb.LIBUSB_ERROR_NO_DEVICE) {
                return undefined;
            }
            throw e;
        }
    }
    /**
     * Contains all config descriptors of the device (same structure as .configDescriptor above)
     */
    get allConfigDescriptors() {
        try {
            return this.__getAllConfigDescriptors();
        }
        catch (e) {
            // Check descriptors exist
            const errno = e.errno;
            if (errno === usb.LIBUSB_ERROR_NOT_FOUND ||
                errno === usb.LIBUSB_ERROR_NO_DEVICE) {
                return [];
            }
            throw e;
        }
    }
    /**
     * Contains the parent of the device, such as a hub. If there is no parent this property is set to `null`.
     */
    get parent() {
        return this.__getParent();
    }
    /**
     * Open the device.
     * @param defaultConfig
     */
    open(defaultConfig = true) {
        this.__open();
        // The presence of interfaces is used to determine if the device is open
        this.interfaces = [];
        if (defaultConfig === false) {
            return;
        }
        const len = this.configDescriptor ? this.configDescriptor.interfaces.length : 0;
        for (let i = 0; i < len; i++) {
            this.interfaces[i] = new interface_1.Interface(this, i);
        }
    }
    /**
     * Close the device.
     *
     * The device must be open to use this method.
     */
    close() {
        this.__close();
        this.interfaces = undefined;
    }
    /**
     * Set the device configuration to something other than the default (0). To use this, first call `.open(false)` (which tells it not to auto configure),
     * then before claiming an interface, call this method.
     *
     * The device must be open to use this method.
     * @param desired
     * @param callback
     */
    setConfiguration(desired, callback) {
        this.__setConfiguration(desired, error => {
            if (!error) {
                this.interfaces = [];
                const len = this.configDescriptor ? this.configDescriptor.interfaces.length : 0;
                for (let i = 0; i < len; i++) {
                    this.interfaces[i] = new interface_1.Interface(this, i);
                }
            }
            if (callback) {
                callback.call(this, error);
            }
        });
    }
    /**
     * Enable/disable libusb's automatic kernel driver detachment
     * When this is enabled libusb will automatically detach the kernel driver on an interface when claiming the interface, and attach it when releasing the interface
     *
     * The device must be open to use this method.
     */
    setAutoDetachKernelDriver(enable) {
        return this.__setAutoDetachKernelDriver(enable ? 1 : 0);
    }
    /**
     * Perform a control transfer with `libusb_control_transfer`.
     *
     * Parameter `data_or_length` can be an integer length for an IN transfer, or a `Buffer` for an OUT transfer. The type must match the direction specified in the MSB of bmRequestType.
     *
     * The `data` parameter of the callback is actual transferred for OUT transfers, or will be passed a Buffer for IN transfers.
     *
     * The device must be open to use this method.
     * @param bmRequestType
     * @param bRequest
     * @param wValue
     * @param wIndex
     * @param data_or_length
     * @param callback
     */
    controlTransfer(bmRequestType, bRequest, wValue, wIndex, data_or_length, callback) {
        const isIn = !!(bmRequestType & usb.LIBUSB_ENDPOINT_IN);
        const wLength = isIn ? data_or_length : data_or_length.length;
        if (isIn) {
            if (wLength < 0) {
                throw new TypeError('Expected size number for IN transfer (based on bmRequestType)');
            }
        }
        else {
            if (!isBuffer(data_or_length)) {
                throw new TypeError('Expected buffer for OUT transfer (based on bmRequestType)');
            }
        }
        // Buffer for the setup packet
        // http://libusbx.sourceforge.net/api-1.0/structlibusb__control__setup.html
        const buf = Buffer.alloc(wLength + usb.LIBUSB_CONTROL_SETUP_SIZE);
        buf.writeUInt8(bmRequestType, 0);
        buf.writeUInt8(bRequest, 1);
        buf.writeUInt16LE(wValue, 2);
        buf.writeUInt16LE(wIndex, 4);
        buf.writeUInt16LE(wLength, 6);
        if (!isIn) {
            buf.set(data_or_length, usb.LIBUSB_CONTROL_SETUP_SIZE);
        }
        const transfer = new usb.Transfer(this, 0, usb.LIBUSB_TRANSFER_TYPE_CONTROL, this.timeout, (error, buf, actual) => {
            if (callback) {
                if (isIn) {
                    callback.call(this, error, buf.slice(usb.LIBUSB_CONTROL_SETUP_SIZE, usb.LIBUSB_CONTROL_SETUP_SIZE + actual));
                }
                else {
                    callback.call(this, error, actual);
                }
            }
        });
        try {
            transfer.submit(buf);
        }
        catch (e) {
            if (callback) {
                process.nextTick(() => callback.call(this, e, undefined));
            }
        }
        return this;
    }
    /**
     * Return the interface with the specified interface number.
     *
     * The device must be open to use this method.
     * @param addr
     */
    interface(addr) {
        if (!this.interfaces) {
            throw new Error('Device must be open before searching for interfaces');
        }
        addr = addr || 0;
        for (let i = 0; i < this.interfaces.length; i++) {
            if (this.interfaces[i].interfaceNumber === addr) {
                return this.interfaces[i];
            }
        }
        throw new Error(`Interface not found for address: ${addr}`);
    }
    /**
     * Perform a control transfer to retrieve a string descriptor
     *
     * The device must be open to use this method.
     * @param desc_index
     * @param callback
     */
    getStringDescriptor(desc_index, callback) {
        // Index 0 indicates null
        if (desc_index === 0) {
            callback();
            return;
        }
        const langid = 0x0409;
        const length = 255;
        this.controlTransfer(usb.LIBUSB_ENDPOINT_IN, usb.LIBUSB_REQUEST_GET_DESCRIPTOR, ((usb.LIBUSB_DT_STRING << 8) | desc_index), langid, length, (error, buffer) => {
            if (error) {
                return callback(error);
            }
            callback(undefined, isBuffer(buffer) ? buffer.toString('utf16le', 2) : undefined);
        });
    }
    /**
     * Perform a control transfer to retrieve an object with properties for the fields of the Binary Object Store descriptor.
     *
     * The device must be open to use this method.
     * @param callback
     */
    getBosDescriptor(callback) {
        if (this._bosDescriptor) {
            // Cached descriptor
            return callback(undefined, this._bosDescriptor);
        }
        if (this.deviceDescriptor.bcdUSB < 0x201) {
            // BOS is only supported from USB 2.0.1
            return callback(undefined, undefined);
        }
        this.controlTransfer(usb.LIBUSB_ENDPOINT_IN, usb.LIBUSB_REQUEST_GET_DESCRIPTOR, (usb.LIBUSB_DT_BOS << 8), 0, usb.LIBUSB_DT_BOS_SIZE, (error, buffer) => {
            if (error) {
                // Check BOS descriptor exists
                if (error.errno === usb.LIBUSB_TRANSFER_STALL)
                    return callback(undefined, undefined);
                return callback(error, undefined);
            }
            if (!isBuffer(buffer)) {
                return callback(undefined, undefined);
            }
            const totalLength = buffer.readUInt16LE(2);
            this.controlTransfer(usb.LIBUSB_ENDPOINT_IN, usb.LIBUSB_REQUEST_GET_DESCRIPTOR, (usb.LIBUSB_DT_BOS << 8), 0, totalLength, (error, buffer) => {
                if (error) {
                    // Check BOS descriptor exists
                    if (error.errno === usb.LIBUSB_TRANSFER_STALL)
                        return callback(undefined, undefined);
                    return callback(error, undefined);
                }
                if (!isBuffer(buffer)) {
                    return callback(undefined, undefined);
                }
                const descriptor = {
                    bLength: buffer.readUInt8(0),
                    bDescriptorType: buffer.readUInt8(1),
                    wTotalLength: buffer.readUInt16LE(2),
                    bNumDeviceCaps: buffer.readUInt8(4),
                    capabilities: []
                };
                let i = usb.LIBUSB_DT_BOS_SIZE;
                while (i < descriptor.wTotalLength) {
                    const capability = {
                        bLength: buffer.readUInt8(i + 0),
                        bDescriptorType: buffer.readUInt8(i + 1),
                        bDevCapabilityType: buffer.readUInt8(i + 2),
                        dev_capability_data: buffer.slice(i + 3, i + buffer.readUInt8(i + 0))
                    };
                    descriptor.capabilities.push(capability);
                    i += capability.bLength;
                }
                // Cache descriptor
                this._bosDescriptor = descriptor;
                callback(undefined, this._bosDescriptor);
            });
        });
    }
    /**
     * Retrieve a list of Capability objects for the Binary Object Store capabilities of the device.
     *
     * The device must be open to use this method.
     * @param callback
     */
    getCapabilities(callback) {
        const capabilities = [];
        this.getBosDescriptor((error, descriptor) => {
            if (error)
                return callback(error, undefined);
            const len = descriptor ? descriptor.capabilities.length : 0;
            for (let i = 0; i < len; i++) {
                capabilities.push(new capability_1.Capability(this, i));
            }
            callback(undefined, capabilities);
        });
    }
}
exports.ExtendedDevice = ExtendedDevice;
//# sourceMappingURL=device.js.map