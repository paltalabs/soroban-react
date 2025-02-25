"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UdpTransport = void 0;
const tslib_1 = require("tslib");
const udp_1 = require("../api/udp");
const abstractApi_1 = require("./abstractApi");
class UdpTransport extends abstractApi_1.AbstractApiTransport {
    constructor(params) {
        const { logger, debugLink } = params, rest = tslib_1.__rest(params, ["logger", "debugLink"]);
        super(Object.assign({ api: new udp_1.UdpApi({ logger, debugLink }), logger }, rest));
        this.name = 'UdpTransport';
        this.apiType = 'udp';
    }
    stop() {
        if (this.enumerateTimeout) {
            clearTimeout(this.enumerateTimeout);
            this.enumerateTimeout = undefined;
        }
        return super.stop();
    }
}
exports.UdpTransport = UdpTransport;
//# sourceMappingURL=udp.js.map