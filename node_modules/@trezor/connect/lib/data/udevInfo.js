"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestUdevInstaller = exports.getUdevInfo = void 0;
const info = {
    directory: '',
    packages: [
        {
            name: 'RPM package',
            platform: ['rpm32', 'rpm64'],
            url: '/udev/trezor-udev-2-1.noarch.rpm',
        },
        {
            name: 'DEB package',
            platform: ['deb32', 'deb64'],
            url: '/udev/trezor-udev_2_all.deb',
        },
    ],
};
const getUdevInfo = () => info;
exports.getUdevInfo = getUdevInfo;
const suggestUdevInstaller = (platform) => {
    const info2 = (0, exports.getUdevInfo)();
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
exports.suggestUdevInstaller = suggestUdevInstaller;
//# sourceMappingURL=udevInfo.js.map