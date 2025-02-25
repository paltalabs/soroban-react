"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUiResponse = exports.UI_RESPONSE = void 0;
const ui_request_1 = require("./ui-request");
exports.UI_RESPONSE = {
    RECEIVE_PERMISSION: 'ui-receive_permission',
    RECEIVE_CONFIRMATION: 'ui-receive_confirmation',
    RECEIVE_PIN: 'ui-receive_pin',
    RECEIVE_PASSPHRASE: 'ui-receive_passphrase',
    RECEIVE_DEVICE: 'ui-receive_device',
    RECEIVE_ACCOUNT: 'ui-receive_account',
    RECEIVE_FEE: 'ui-receive_fee',
    RECEIVE_WORD: 'ui-receive_word',
    INVALID_PASSPHRASE_ACTION: 'ui-invalid_passphrase_action',
    CHANGE_SETTINGS: 'ui-change_settings',
    LOGIN_CHALLENGE_RESPONSE: 'ui-login_challenge_response',
};
const createUiResponse = (type, payload) => ({
    event: ui_request_1.UI_EVENT,
    type,
    payload,
});
exports.createUiResponse = createUiResponse;
//# sourceMappingURL=ui-response.js.map