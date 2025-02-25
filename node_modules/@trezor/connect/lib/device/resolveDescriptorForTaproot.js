"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDescriptorForTaproot = void 0;
const resolveDescriptorForTaproot = ({ response, publicKey }) => {
    if (publicKey.descriptor !== null && publicKey.descriptor !== undefined) {
        const [xpub, checksum] = publicKey.descriptor.split('#');
        const openingSquareBracketSplit = xpub.split('[');
        if (openingSquareBracketSplit.length === 2) {
            const [beforeOpeningBracket, afterOpeningBracket] = openingSquareBracketSplit;
            const closingSquareBracketSplit = afterOpeningBracket.split(']');
            if (closingSquareBracketSplit.length === 2) {
                const [path, afterClosingBracket] = closingSquareBracketSplit;
                const correctedPath = path.replace(/h/g, "'");
                return {
                    xpub: `${beforeOpeningBracket}[${correctedPath}]${afterClosingBracket}`,
                    checksum,
                };
            }
        }
    }
    const fingerprint = Number(publicKey.root_fingerprint || 0)
        .toString(16)
        .padStart(8, '0');
    const descriptorPath = `${fingerprint}${response.serializedPath.substring(1)}`;
    return {
        xpub: `tr([${descriptorPath}]${response.xpub}/<0;1>/*)`,
        checksum: undefined,
    };
};
exports.resolveDescriptorForTaproot = resolveDescriptorForTaproot;
//# sourceMappingURL=resolveDescriptorForTaproot.js.map