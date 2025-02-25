"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
const PREFIX = 'blockchain_link/';
const ERROR = {
    worker_not_found: 'Worker not found',
    worker_invalid: 'Invalid worker object',
    worker_timeout: 'Worker timeout',
    worker_unknown_request: 'Unknown message type:',
    worker_runtime: undefined,
    invalid_param: 'Invalid parameter:',
    websocket_not_initialized: 'WebSocket not initialized',
    websocket_no_url: 'Cannot connect because no server was specified',
    websocket_timeout: 'Websocket timeout',
    websocket_error_message: undefined,
    websocket_runtime_error: undefined,
};
class CustomError extends Error {
    constructor(code, message = '') {
        super(message);
        this.message = '';
        this.message = message;
        if (typeof code === 'string') {
            const c = code.indexOf(PREFIX) === 0 ? code.substring(PREFIX.length, code.length) : code;
            this.code = `${PREFIX}${c}`;
            const msg = ERROR[c];
            if (typeof msg === 'string') {
                if (this.message === '') {
                    this.message = msg;
                }
                else if (message.indexOf('+') === 0) {
                    this.message = `${msg} ${message.substring(1)}`;
                }
            }
        }
        if (typeof this.message !== 'string' || this.message === '') {
            this.message = 'Message not set';
        }
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=errors.js.map