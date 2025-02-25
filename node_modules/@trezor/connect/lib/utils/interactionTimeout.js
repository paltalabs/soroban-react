"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionTimeout = void 0;
const debug_1 = require("./debug");
const _log = (0, debug_1.initLog)('InteractionTimeout');
class InteractionTimeout {
    constructor(seconds) {
        this.timeout = null;
        this.seconds = 0;
        if (seconds) {
            this.seconds = seconds;
        }
    }
    start(cancelFn, seconds) {
        const time = seconds || this.seconds;
        if (time < 1) {
            return;
        }
        this.stop();
        _log.debug(`starting interaction timeout for ${time} seconds`);
        this.timeout = setTimeout(() => {
            _log.debug('interaction timed out');
            cancelFn();
        }, 1000 * time);
    }
    stop() {
        if (this.timeout) {
            _log.debug('clearing interaction timeout');
            clearTimeout(this.timeout);
        }
    }
}
exports.InteractionTimeout = InteractionTimeout;
//# sourceMappingURL=interactionTimeout.js.map