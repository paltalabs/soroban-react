"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutEndpoint = exports.InEndpoint = exports.Endpoint = void 0;
const events_1 = require("events");
const bindings_1 = require("./bindings");
const util_1 = require("util");
const isBuffer = (obj) => obj && obj instanceof Uint8Array;
/** Common base for InEndpoint and OutEndpoint. */
class Endpoint extends events_1.EventEmitter {
    constructor(device, descriptor) {
        super();
        this.device = device;
        /** Sets the timeout in milliseconds for transfers on this endpoint. The default, `0`, is infinite timeout. */
        this.timeout = 0;
        this.descriptor = descriptor;
        this.address = descriptor.bEndpointAddress;
        this.transferType = descriptor.bmAttributes & 0x03;
    }
    /** Clear the halt/stall condition for this endpoint. */
    clearHalt(callback) {
        return this.device.__clearHalt(this.address, callback);
    }
    /**
     * Create a new `Transfer` object for this endpoint.
     *
     * The passed callback will be called when the transfer is submitted and finishes. Its arguments are the error (if any), the submitted buffer, and the amount of data actually written (for
     * OUT transfers) or read (for IN transfers).
     *
     * @param timeout Timeout for the transfer (0 means unlimited).
     * @param callback Transfer completion callback.
     */
    makeTransfer(timeout, callback) {
        return new bindings_1.Transfer(this.device, this.address, this.transferType, timeout, callback);
    }
}
exports.Endpoint = Endpoint;
/** Endpoints in the IN direction (device->PC) have this type. */
class InEndpoint extends Endpoint {
    constructor(device, descriptor) {
        super(device, descriptor);
        /** Endpoint direction. */
        this.direction = 'in';
        this.pollTransfers = [];
        this.pollTransferSize = 0;
        this.pollPending = 0;
        this.pollActive = false;
        this.transferAsync = (0, util_1.promisify)(this.transfer).bind(this);
    }
    /**
     * Perform a transfer to read data from the endpoint.
     *
     * If length is greater than maxPacketSize, libusb will automatically split the transfer in multiple packets, and you will receive one callback with all data once all packets are complete.
     *
     * `this` in the callback is the InEndpoint object.
     *
     * The device must be open to use this method.
     * @param length
     * @param callback
     */
    transfer(length, callback) {
        const buffer = Buffer.alloc(length);
        const cb = (error, _buffer, actualLength) => {
            callback.call(this, error, buffer.slice(0, actualLength));
        };
        try {
            this.makeTransfer(this.timeout, cb).submit(buffer);
        }
        catch (e) {
            process.nextTick(() => callback.call(this, e));
        }
        return this;
    }
    /**
     * Start polling the endpoint.
     *
     * The library will keep `nTransfers` transfers of size `transferSize` pending in the kernel at all times to ensure continuous data flow.
     * This is handled by the libusb event thread, so it continues even if the Node v8 thread is busy. The `data` and `error` events are emitted as transfers complete.
     *
     * The device must be open to use this method.
     * @param nTransfers
     * @param transferSize
     * @param callback
     */
    startPoll(nTransfers, transferSize, callback) {
        const transferDone = (error, transfer, buffer, actualLength) => {
            if (!error) {
                this.emit('data', buffer.slice(0, actualLength));
            }
            else if (error.errno !== bindings_1.LIBUSB_TRANSFER_CANCELLED) {
                if (this.pollActive) {
                    this.emit('error', error);
                    this.stopPoll();
                }
            }
            if (this.pollActive) {
                startTransfer(transfer);
            }
            else {
                this.pollPending--;
                if (this.pollPending === 0) {
                    this.pollTransfers = [];
                    this.pollActive = false;
                    this.emit('end');
                    if (callback) {
                        const cancelled = (error === null || error === void 0 ? void 0 : error.errno) === bindings_1.LIBUSB_TRANSFER_CANCELLED;
                        callback(cancelled ? undefined : error, buffer, actualLength, cancelled);
                    }
                }
            }
        };
        const startTransfer = (transfer) => {
            try {
                transfer.submit(Buffer.alloc(this.pollTransferSize), (error, buffer, actualLength) => {
                    transferDone(error, transfer, buffer, actualLength);
                });
            }
            catch (e) {
                this.emit('error', e);
                this.stopPoll();
            }
        };
        this.pollTransfers = this.startPollTransfers(nTransfers, transferSize, function (error, buffer, actualLength) {
            transferDone(error, this, buffer, actualLength);
        });
        this.pollTransfers.forEach(startTransfer);
        this.pollPending = this.pollTransfers.length;
        return this.pollTransfers;
    }
    startPollTransfers(nTransfers = 3, transferSize = this.descriptor.wMaxPacketSize, callback) {
        if (this.pollActive) {
            throw new Error('Polling already active');
        }
        this.pollTransferSize = transferSize;
        this.pollActive = true;
        this.pollPending = 0;
        const transfers = [];
        for (let i = 0; i < nTransfers; i++) {
            const transfer = this.makeTransfer(0, callback);
            transfers[i] = transfer;
        }
        return transfers;
    }
    /**
     * Stop polling.
     *
     * Further data may still be received. The `end` event is emitted and the callback is called once all transfers have completed or canceled.
     *
     * The device must be open to use this method.
     * @param callback
     */
    stopPoll(callback) {
        if (!this.pollActive) {
            throw new Error('Polling is not active.');
        }
        for (let i = 0; i < this.pollTransfers.length; i++) {
            try {
                this.pollTransfers[i].cancel();
            }
            catch (error) {
                this.emit('error', error);
            }
        }
        this.pollActive = false;
        if (callback)
            this.once('end', callback);
    }
}
exports.InEndpoint = InEndpoint;
/** Endpoints in the OUT direction (PC->device) have this type. */
class OutEndpoint extends Endpoint {
    constructor(device, descriptor) {
        super(device, descriptor);
        /** Endpoint direction. */
        this.direction = 'out';
        this.transferAsync = (0, util_1.promisify)(this.transfer).bind(this);
    }
    /**
     * Perform a transfer to write `data` to the endpoint.
     *
     * If length is greater than maxPacketSize, libusb will automatically split the transfer in multiple packets, and you will receive one callback once all packets are complete.
     *
     * `this` in the callback is the OutEndpoint object.
     *
     * The device must be open to use this method.
     * @param buffer
     * @param callback
     */
    transfer(buffer, callback) {
        if (!buffer) {
            buffer = Buffer.alloc(0);
        }
        else if (!isBuffer(buffer)) {
            buffer = Buffer.from(buffer);
        }
        const cb = (error, _buffer, actual) => {
            if (callback) {
                callback.call(this, error, actual || 0);
            }
        };
        try {
            this.makeTransfer(this.timeout, cb).submit(buffer);
        }
        catch (e) {
            process.nextTick(() => cb(e));
        }
        return this;
    }
    transferWithZLP(buffer, callback) {
        if (buffer.length % this.descriptor.wMaxPacketSize === 0) {
            this.transfer(buffer);
            this.transfer(Buffer.alloc(0), callback);
        }
        else {
            this.transfer(buffer, callback);
        }
    }
}
exports.OutEndpoint = OutEndpoint;
//# sourceMappingURL=endpoint.js.map