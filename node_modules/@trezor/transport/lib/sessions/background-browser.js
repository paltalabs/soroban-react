"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrowserSessionsBackground = void 0;
class BrowserSessionsBackground {
    constructor(sessionsBackgroundUrl) {
        this.background = new SharedWorker(sessionsBackgroundUrl, {
            name: '@trezor/connect-web transport sessions worker',
        });
    }
    handleMessage(params) {
        const { background } = this;
        return new Promise(resolve => {
            const onmessage = (message) => {
                if (params.id === message.data.id) {
                    resolve(message.data);
                    background.port.removeEventListener('message', onmessage);
                }
            };
            background.port.addEventListener('message', onmessage);
            background.port.onmessageerror = message => {
                console.error('background-browser onmessageerror,', message);
                background.port.removeEventListener('message', onmessage);
            };
            background.port.postMessage(params);
        });
    }
    on(event, listener) {
        this.background.port.addEventListener('message', (e) => {
            if (e && 'type' in e.data) {
                if (e.data.type === event) {
                    listener(e.data.payload);
                }
            }
        });
    }
    dispose() {
    }
}
exports.BrowserSessionsBackground = BrowserSessionsBackground;
//# sourceMappingURL=background-browser.js.map