"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const background_1 = require("./background");
const background = new background_1.SessionsBackground();
const ports = [];
const handleMessage = (message, port) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const res = yield background.handleMessage(message);
    port.postMessage(res);
});
background.on('descriptors', descriptors => {
    ports.forEach(p => {
        p.postMessage({ type: 'descriptors', payload: descriptors });
    });
});
background.on('releaseRequest', descriptor => {
    ports.forEach(p => {
        p.postMessage({ type: 'releaseRequest', payload: descriptor });
    });
});
self.onconnect = function (e) {
    const port = e.ports[0];
    ports.push(port);
    port.addEventListener('message', e => {
        handleMessage(e.data, port);
    });
    port.start();
};
//# sourceMappingURL=background-sharedworker.js.map