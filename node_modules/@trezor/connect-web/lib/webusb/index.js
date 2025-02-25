"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@trezor/connect/lib/data/config");
const onload = () => {
    const exists = document.getElementsByTagName('button');
    if (exists && exists.length > 0) {
        return;
    }
    const button = document.createElement('button');
    button.className = 'default';
    button.onclick = async () => {
        const { usb } = navigator;
        if (usb) {
            try {
                await usb.requestDevice({ filters: config_1.config.webusb });
            }
            catch (_a) {
            }
        }
    };
    if (document.body) {
        document.body.append(button);
    }
};
window.addEventListener('load', onload);
//# sourceMappingURL=index.js.map