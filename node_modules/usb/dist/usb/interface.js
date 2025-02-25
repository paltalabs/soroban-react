"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interface = void 0;
const bindings_1 = require("./bindings");
const endpoint_1 = require("./endpoint");
const util_1 = require("util");
class Interface {
    constructor(device, id) {
        this.device = device;
        this.id = id;
        /** Integer alternate setting number. */
        this.altSetting = 0;
        this.refresh();
        this.releaseAsync = (0, util_1.promisify)(this.release).bind(this);
        this.setAltSettingAsync = (0, util_1.promisify)(this.setAltSetting).bind(this);
    }
    refresh() {
        if (!this.device.configDescriptor) {
            return;
        }
        this.descriptor = this.device.configDescriptor.interfaces[this.id][this.altSetting];
        this.interfaceNumber = this.descriptor.bInterfaceNumber;
        this.endpoints = [];
        const len = this.descriptor.endpoints.length;
        for (let i = 0; i < len; i++) {
            const desc = this.descriptor.endpoints[i];
            const c = (desc.bEndpointAddress & bindings_1.LIBUSB_ENDPOINT_IN) ? endpoint_1.InEndpoint : endpoint_1.OutEndpoint;
            this.endpoints[i] = new c(this.device, desc);
        }
    }
    /**
     * Claims the interface. This method must be called before using any endpoints of this interface.
     *
     * The device must be open to use this method.
     */
    claim() {
        this.device.__claimInterface(this.id);
    }
    release(closeEndpointsOrCallback, callback) {
        let closeEndpoints = false;
        if (typeof closeEndpointsOrCallback === 'boolean') {
            closeEndpoints = closeEndpointsOrCallback;
        }
        else {
            callback = closeEndpointsOrCallback;
        }
        const next = () => {
            this.device.__releaseInterface(this.id, error => {
                if (!error) {
                    this.altSetting = 0;
                    this.refresh();
                }
                if (callback) {
                    callback.call(this, error);
                }
            });
        };
        if (!closeEndpoints || this.endpoints.length === 0) {
            next();
        }
        else {
            let n = this.endpoints.length;
            this.endpoints.forEach(ep => {
                if (ep.direction === 'in' && ep.pollActive) {
                    ep.once('end', () => {
                        if (--n === 0) {
                            next();
                        }
                    });
                    ep.stopPoll();
                }
                else {
                    if (--n === 0) {
                        next();
                    }
                }
            });
        }
    }
    /**
     * Returns `false` if a kernel driver is not active; `true` if active.
     *
     * The device must be open to use this method.
     */
    isKernelDriverActive() {
        return this.device.__isKernelDriverActive(this.id);
    }
    /**
     * Detaches the kernel driver from the interface.
     *
     * The device must be open to use this method.
     */
    detachKernelDriver() {
        return this.device.__detachKernelDriver(this.id);
    }
    /**
     * Re-attaches the kernel driver for the interface.
     *
     * The device must be open to use this method.
     */
    attachKernelDriver() {
        return this.device.__attachKernelDriver(this.id);
    }
    /**
     * Sets the alternate setting. It updates the `interface.endpoints` array to reflect the endpoints found in the alternate setting.
     *
     * The device must be open to use this method.
     * @param altSetting
     * @param callback
     */
    setAltSetting(altSetting, callback) {
        this.device.__setInterface(this.id, altSetting, error => {
            if (!error) {
                this.altSetting = altSetting;
                this.refresh();
            }
            if (callback) {
                callback.call(this, error);
            }
        });
    }
    /**
     * Return the InEndpoint or OutEndpoint with the specified address.
     *
     * The device must be open to use this method.
     * @param addr
     */
    endpoint(addr) {
        return this.endpoints.find(item => item.address === addr);
    }
}
exports.Interface = Interface;
//# sourceMappingURL=interface.js.map