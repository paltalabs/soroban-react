import type { Environment } from '@trezor/env-utils';
import type { App, Event as AnalyticsEvent } from './types';
export declare const getTrackingRandomId: () => string;
export declare const getRandomId: () => string;
export declare const encodeDataToQueryString: <T extends AnalyticsEvent>(instanceId: string, sessionId: string, commitId: string, version: string, event: T) => string;
export declare const getUrl: (app: App, isDev: boolean, environment?: Environment) => string;
interface ReportEventProps {
    type: AnalyticsEvent['type'];
    url: string;
    options: RequestInit;
    retry: boolean;
}
export declare const reportEvent: ({ type, url, options, retry }: ReportEventProps) => Promise<void>;
export {};
//# sourceMappingURL=utils.d.ts.map