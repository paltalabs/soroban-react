"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPopupMessage = exports.POPUP = void 0;
const ui_request_1 = require("./ui-request");
exports.POPUP = {
    BOOTSTRAP: 'popup-bootstrap',
    LOADED: 'popup-loaded',
    CORE_LOADED: 'popup-core-loaded',
    INIT: 'popup-init',
    ERROR: 'popup-error',
    EXTENSION_USB_PERMISSIONS: 'open-usb-permissions',
    HANDSHAKE: 'popup-handshake',
    CLOSED: 'popup-closed',
    CANCEL_POPUP_REQUEST: 'ui-cancel-popup-request',
    CLOSE_WINDOW: 'window.close',
    ANALYTICS_RESPONSE: 'popup-analytics-response',
    CONTENT_SCRIPT_LOADED: 'popup-content-script-loaded',
    METHOD_INFO: 'popup-method-info',
};
const createPopupMessage = (type, payload) => ({
    event: ui_request_1.UI_EVENT,
    type,
    payload,
});
exports.createPopupMessage = createPopupMessage;
//# sourceMappingURL=popup.js.map