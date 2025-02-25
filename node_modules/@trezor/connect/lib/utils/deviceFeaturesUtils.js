"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureInternalModelFeature = exports.parseRevision = exports.getUnavailableCapabilities = exports.parseCapabilities = void 0;
const utils_1 = require("@trezor/utils");
const config_1 = require("../data/config");
const types_1 = require("../types");
const DEFAULT_CAPABILITIES_T1 = [
    'Capability_Bitcoin',
    'Capability_Bitcoin_like',
    'Capability_Crypto',
    'Capability_Ethereum',
    'Capability_NEM',
    'Capability_Stellar',
    'Capability_U2F',
];
const DEFAULT_CAPABILITIES_TT = [
    'Capability_Bitcoin',
    'Capability_Bitcoin_like',
    'Capability_Binance',
    'Capability_Cardano',
    'Capability_Crypto',
    'Capability_EOS',
    'Capability_Ethereum',
    'Capability_Monero',
    'Capability_NEM',
    'Capability_Ripple',
    'Capability_Stellar',
    'Capability_Tezos',
    'Capability_U2F',
];
const parseCapabilities = (features) => {
    if (!features || features.firmware_present === false)
        return [];
    if (!features.capabilities || !features.capabilities.length) {
        return features.major_version === 1 ? DEFAULT_CAPABILITIES_T1 : DEFAULT_CAPABILITIES_TT;
    }
    return features.capabilities;
};
exports.parseCapabilities = parseCapabilities;
const getUnavailableCapabilities = (features, coins) => {
    const { capabilities } = features;
    const list = {};
    if (!capabilities)
        return list;
    const fw = [features.major_version, features.minor_version, features.patch_version].join('.');
    const key = features.internal_model;
    const duplicatedShortcuts = ['bnb'];
    const supported = coins.filter(info => {
        if (!info.support || info.support[key] === false) {
            const shortcut = info.shortcut.toLowerCase();
            if (!duplicatedShortcuts.includes(shortcut)) {
                list[shortcut] = 'no-support';
                return false;
            }
            else {
                const occurrences = coins.filter(coin => shortcut == coin.shortcut.toLowerCase());
                const allUnsupported = occurrences.every(info2 => !info2.support || info2.support[key] === false);
                if (allUnsupported) {
                    list[shortcut] = 'no-support';
                }
                return false;
            }
        }
        return true;
    });
    const unavailable = supported.filter(info => {
        if (info.type === 'bitcoin') {
            if (info.name === 'Bitcoin' || info.name === 'Testnet' || info.name === 'Regtest') {
                return !capabilities.includes('Capability_Bitcoin');
            }
            return !capabilities.includes('Capability_Bitcoin_like');
        }
        if (info.type === 'ethereum') {
            return !capabilities.includes('Capability_Ethereum');
        }
        if (info.type === 'nem') {
            return !capabilities.includes('Capability_NEM');
        }
        if (info.shortcut === 'BNB' && info.type === 'misc') {
            return !capabilities.includes('Capability_Binance');
        }
        if (info.shortcut === 'ADA' || info.shortcut === 'tADA') {
            return !capabilities.includes('Capability_Cardano');
        }
        if (info.shortcut === 'XRP' || info.shortcut === 'tXRP') {
            return !capabilities.includes('Capability_Ripple');
        }
        if (info.shortcut === 'SOL' || info.shortcut === 'DSOL') {
            return !capabilities.includes('Capability_Solana');
        }
        return !(0, utils_1.isArrayMember)(`Capability_${info.name}`, capabilities);
    });
    unavailable.forEach(info => {
        list[info.shortcut.toLowerCase()] = 'no-capability';
    });
    supported
        .filter(info => !unavailable.includes(info))
        .forEach(info => {
        const supportVersion = info.support[key];
        if (typeof supportVersion === 'string' && utils_1.versionUtils.isNewer(supportVersion, fw)) {
            list[info.shortcut.toLowerCase()] = 'update-required';
            unavailable.push(info);
        }
    });
    config_1.config.supportedFirmware.forEach(s => {
        if (!s.capabilities)
            return;
        const min = s.min ? s.min[key] : null;
        const max = s.max ? s.max[key] : null;
        if (min && (min === '0' || utils_1.versionUtils.isNewer(min, fw))) {
            const value = min === '0' ? 'no-support' : 'update-required';
            s.capabilities.forEach(m => {
                list[m] = value;
            });
        }
        if (max && !utils_1.versionUtils.isNewerOrEqual(max, fw)) {
            s.capabilities.forEach(m => {
                list[m] = 'trezor-connect-outdated';
            });
        }
    });
    return list;
};
exports.getUnavailableCapabilities = getUnavailableCapabilities;
const parseRevision = (features) => {
    const { revision } = features;
    if (!revision)
        return null;
    if (/^(?=.*[a-f])([a-f0-9]*)$/gi.test(revision))
        return revision;
    const revisionUtf8 = Buffer.from(revision, 'hex').toString('utf-8');
    return /^([a-f0-9])*$/gi.test(revisionUtf8) ? revisionUtf8 : revision;
};
exports.parseRevision = parseRevision;
const ensureInternalModelFeature = (model) => {
    switch (model.toUpperCase()) {
        case 'T':
            return types_1.DeviceModelInternal.T2T1;
        case '1':
        default:
            return types_1.DeviceModelInternal.T1B1;
    }
};
exports.ensureInternalModelFeature = ensureInternalModelFeature;
//# sourceMappingURL=deviceFeaturesUtils.js.map