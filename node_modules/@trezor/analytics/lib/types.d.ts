import { Environment } from '@trezor/env-utils';
export type App = 'suite' | 'connect';
export type AnalyticsOptions = {
    version: string;
    app: App;
    useQueue?: boolean;
};
export type InitOptions = {
    sessionId?: string;
    instanceId?: string;
    environment?: Environment;
    isDev: boolean;
    commitId: string;
    callbacks?: {
        onEnable?: () => void;
        onDisable?: () => void;
    };
};
export type Event = {
    type: string;
    timestamp?: string;
    payload?: {
        [key: string]: string | string[] | number | number[] | boolean | null;
    };
};
export type ReportConfig = {
    anonymize?: boolean;
    force?: boolean;
};
//# sourceMappingURL=types.d.ts.map