export type InstallerPackage = 'rpm32' | 'rpm64' | 'deb32' | 'deb64' | 'mac' | 'win32' | 'win64';
export interface SystemInfo {
    os: {
        family?: 'Linux' | 'MacOS' | 'Windows';
        mobile: boolean;
    };
    browser: {
        supported: boolean;
        outdated: boolean;
    };
}
export declare const getInstallerPackage: () => InstallerPackage | undefined;
export declare const getSystemInfo: (supportedBrowsers: {
    [key: string]: {
        version: number;
    };
}) => SystemInfo;
//# sourceMappingURL=systemInfo.d.ts.map