"use strict";
// Definitions from DefinitelyTyped, thanks to:
//  Eric Brody <https://github.com/underscorebrody>
//  Rob Moran <https://github.com/thegecko>
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
/* eslint-disable @typescript-eslint/no-var-requires */
const usb = require('node-gyp-build')(process.env.NODE_USB_PATH || (0, path_1.join)(__dirname, '..', '..'));
module.exports = usb;
//# sourceMappingURL=bindings.js.map