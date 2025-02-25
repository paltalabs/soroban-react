"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBinaryOptional = exports.getBinary = void 0;
const assets_1 = require("../../utils/assets");
const ALL_SLASHES_AT_THE_END_REGEX = /\/+$/;
const getBinary = ({ baseUrl, btcOnly, release }) => {
    const fwUrl = release[btcOnly ? 'url_bitcoinonly' : 'url'];
    const sanitizedBaseUrl = baseUrl.replace(ALL_SLASHES_AT_THE_END_REGEX, '');
    const url = `${sanitizedBaseUrl}/${fwUrl}`;
    return (0, assets_1.httpRequest)(url, 'binary');
};
exports.getBinary = getBinary;
const getBinaryOptional = async (props) => {
    try {
        return await (0, exports.getBinary)(props);
    }
    catch {
        return null;
    }
};
exports.getBinaryOptional = getBinaryOptional;
//# sourceMappingURL=getBinary.js.map