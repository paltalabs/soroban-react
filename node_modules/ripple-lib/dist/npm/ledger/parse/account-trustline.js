"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const common_1 = require("../../common");
function parseAccountTrustline(trustline) {
    const specification = common_1.removeUndefined({
        limit: trustline.limit,
        currency: trustline.currency,
        counterparty: trustline.account,
        qualityIn: utils_1.parseQuality(trustline.quality_in) || undefined,
        qualityOut: utils_1.parseQuality(trustline.quality_out) || undefined,
        ripplingDisabled: trustline.no_ripple,
        frozen: trustline.freeze,
        authorized: trustline.authorized
    });
    const counterparty = common_1.removeUndefined({
        limit: trustline.limit_peer,
        ripplingDisabled: trustline.no_ripple_peer,
        frozen: trustline.freeze_peer,
        authorized: trustline.peer_authorized
    });
    const state = {
        balance: trustline.balance
    };
    return { specification, counterparty, state };
}
exports.default = parseAccountTrustline;
//# sourceMappingURL=account-trustline.js.map