"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const render = (className = '', url) => {
    const query = className || '.trezor-webusb-button';
    const buttons = document.querySelectorAll(query);
    const src = `${url}?${Date.now()}`;
    buttons.forEach(b => {
        if (b.getElementsByTagName('iframe').length < 1) {
            const bounds = b.getBoundingClientRect();
            const btnIframe = document.createElement('iframe');
            btnIframe.frameBorder = '0';
            btnIframe.width = `${Math.round(bounds.width)}px`;
            btnIframe.height = `${Math.round(bounds.height)}px`;
            btnIframe.style.position = 'absolute';
            btnIframe.style.top = '0px';
            btnIframe.style.left = '0px';
            btnIframe.style.zIndex = '1';
            btnIframe.setAttribute('allow', 'usb');
            btnIframe.setAttribute('scrolling', 'no');
            btnIframe.src = src;
            b.append(btnIframe);
        }
    });
};
exports.default = render;
//# sourceMappingURL=button.js.map