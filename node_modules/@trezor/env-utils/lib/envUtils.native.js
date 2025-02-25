"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envUtils = exports.getJWSPublicKey = void 0;
const tslib_1 = require("tslib");
const react_native_1 = require("react-native");
const expo_localization_1 = require("expo-localization");
const expo_constants_1 = tslib_1.__importDefault(require("expo-constants"));
const jws_1 = require("./jws");
const isWeb = () => false;
const isDesktop = () => false;
const isNative = () => true;
const getEnvironment = () => 'mobile';
const getUserAgent = () => '';
const isChromeOs = () => false;
const getBrowserName = () => '';
const getBrowserVersion = () => '';
const getDeviceType = () => '';
const getOsVersion = () => `${react_native_1.Platform.Version}`;
const getSuiteVersion = () => { var _a; return ((_a = expo_constants_1.default.expoConfig) === null || _a === void 0 ? void 0 : _a.version) || ''; };
const getCommitHash = () => { var _a, _b; return (_b = (_a = expo_constants_1.default.expoConfig) === null || _a === void 0 ? void 0 : _a.extra) === null || _b === void 0 ? void 0 : _b.commitHash; };
const isFirefox = () => false;
const getPlatform = () => react_native_1.Platform.OS;
const getWindowWidth = () => react_native_1.Dimensions.get('window').width;
const getWindowHeight = () => react_native_1.Dimensions.get('window').height;
const getScreenWidth = () => react_native_1.Dimensions.get('screen').width;
const getScreenHeight = () => react_native_1.Dimensions.get('screen').height;
const getLocationOrigin = () => '';
const getLocationHostname = () => 'trezorsuiteapp';
const getProcessPlatform = () => '';
const isMacOs = () => false;
const isWindows = () => false;
const isIOs = () => getPlatform() === 'ios';
const isAndroid = () => getPlatform() === 'android';
const isLinux = () => false;
const isCodesignBuild = () => process.env.EXPO_PUBLIC_CODESIGN_BUILD === 'true';
const getPlatformLanguages = () => (0, expo_localization_1.getLocales)().map(language => language.languageTag);
const getOsName = () => {
    if (isAndroid())
        return 'android';
    if (isIOs())
        return 'ios';
    return '';
};
const getOsNameWeb = () => '';
const getOsFamily = () => 'Linux';
const getJWSPublicKey = () => (isCodesignBuild() ? jws_1.publicKey.codesign : jws_1.publicKey.dev);
exports.getJWSPublicKey = getJWSPublicKey;
exports.envUtils = {
    isWeb,
    isDesktop,
    isNative,
    getEnvironment,
    getUserAgent,
    isAndroid,
    isChromeOs,
    getBrowserName,
    getBrowserVersion,
    getCommitHash,
    getDeviceType,
    getOsVersion,
    getSuiteVersion,
    isFirefox,
    getPlatform,
    getPlatformLanguages,
    getScreenWidth,
    getScreenHeight,
    getWindowWidth,
    getWindowHeight,
    getLocationOrigin,
    getLocationHostname,
    getProcessPlatform,
    isMacOs,
    isWindows,
    isIOs,
    isLinux,
    isCodesignBuild,
    getOsName,
    getOsNameWeb,
    getOsFamily,
    getJWSPublicKey: exports.getJWSPublicKey,
};
//# sourceMappingURL=envUtils.native.js.map