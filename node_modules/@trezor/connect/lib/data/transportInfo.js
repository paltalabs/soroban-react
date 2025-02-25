"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestBridgeInstaller = exports.getBridgeInfo = exports.parseBridgeJSON = void 0;
const info = {
    version: [],
    directory: '',
    packages: [],
    changelog: '',
};
const parseBridgeJSON = (json) => {
    const latest = json[0];
    const version = latest.version.join('.');
    const data = JSON.parse(JSON.stringify(latest).replace(/{version}/g, version));
    const { directory } = data;
    const packages = data.packages.map(p => ({
        name: p.name,
        platform: p.platform,
        url: `${directory}${p.url}`,
        signature: p.signature ? `${directory}${p.signature}` : undefined,
    }));
    info.version = data.version;
    info.directory = directory;
    info.packages = packages;
    return info;
};
exports.parseBridgeJSON = parseBridgeJSON;
const getBridgeInfo = () => info;
exports.getBridgeInfo = getBridgeInfo;
const suggestBridgeInstaller = (platform) => {
    const info2 = (0, exports.getBridgeInfo)();
    if (!info2.packages.find(p => p.preferred)) {
        if (platform) {
            info2.packages = info2.packages.map(p => ({
                ...p,
                preferred: p.platform.indexOf(platform) >= 0,
            }));
        }
    }
    return info2;
};
exports.suggestBridgeInstaller = suggestBridgeInstaller;
//# sourceMappingURL=transportInfo.js.map