"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeUsbTransport = void 0;
const abstract_1 = require("./abstract");
const errors_1 = require("../errors");
const resultEmpty_1 = require("../utils/resultEmpty");
class NodeUsbTransport extends abstract_1.AbstractTransport {
    constructor(params) {
        super(params);
        this.name = 'NodeUsbTransport';
        this.apiType = 'usb';
        this.init = resultEmpty_1.empty;
        this.acquire = resultEmpty_1.empty;
        this.enumerate = resultEmpty_1.empty;
        this.call = resultEmpty_1.empty;
        this.receive = resultEmpty_1.empty;
        this.send = resultEmpty_1.empty;
        this.release = resultEmpty_1.empty;
        this.stop = resultEmpty_1.empty;
        this.releaseDevice = resultEmpty_1.empty;
        this.listen = resultEmpty_1.emptySync;
        console.error(errors_1.WRONG_ENVIRONMENT);
    }
}
exports.NodeUsbTransport = NodeUsbTransport;
//# sourceMappingURL=nodeusb.browser.js.map