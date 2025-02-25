"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils = __importStar(require("./utils"));
const common_1 = require("../common");
function isImmediateRejection(engineResult) {
    return engineResult.startsWith('tem');
}
function formatSubmitResponse(response) {
    const data = {
        resultCode: response.engine_result,
        resultMessage: response.engine_result_message,
        engine_result: response.engine_result,
        engine_result_code: response.engine_result_code,
        engine_result_message: response.engine_result_message,
        tx_blob: response.tx_blob,
        tx_json: response.tx_json
    };
    if (isImmediateRejection(response.engine_result)) {
        throw new utils.common.errors.RippledError('Submit failed', data);
    }
    return data;
}
function submit(signedTransaction, failHard) {
    return __awaiter(this, void 0, void 0, function* () {
        common_1.validate.submit({ signedTransaction });
        const response = yield this.request('submit', Object.assign({ tx_blob: signedTransaction }, (failHard ? { fail_hard: failHard } : {})));
        return formatSubmitResponse(response);
    });
}
exports.default = submit;
//# sourceMappingURL=submit.js.map