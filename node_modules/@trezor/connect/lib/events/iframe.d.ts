import { UI_EVENT } from './ui-request';
import type { ConnectSettings, SystemInfo } from '../types';
import type { MessageFactoryFn } from '../types/utils';
import { LogMessage } from '../utils/debug';
export declare const IFRAME: {
    readonly BOOTSTRAP: "iframe-bootstrap";
    readonly LOADED: "iframe-loaded";
    readonly INIT: "iframe-init";
    readonly ERROR: "iframe-error";
    readonly CALL: "iframe-call";
    readonly LOG: "iframe-log";
};
export interface IFrameError {
    type: typeof IFRAME.ERROR;
    payload: {
        error: string;
        code?: string;
    };
}
export interface IFrameLoaded {
    type: typeof IFRAME.LOADED;
    payload: {
        useBroadcastChannel: boolean;
        systemInfo: SystemInfo;
    };
}
export interface IFrameInit {
    type: typeof IFRAME.INIT;
    payload: {
        settings: ConnectSettings;
        extension?: string;
    };
}
export interface IFrameLogRequest {
    type: typeof IFRAME.LOG;
    payload: LogMessage;
}
export type IFrameEvent = {
    type: typeof IFRAME.BOOTSTRAP;
    payload?: typeof undefined;
} | IFrameLoaded | IFrameError;
export type IFrameEventMessage = IFrameEvent & {
    event: typeof UI_EVENT;
};
export declare const createIFrameMessage: MessageFactoryFn<typeof UI_EVENT, IFrameEvent>;
//# sourceMappingURL=iframe.d.ts.map