import * as ERRORS from '@trezor/connect/lib/constants/errors';
import { CoreRequestMessage } from '@trezor/connect/lib/events';
import type { ConnectSettings } from '@trezor/connect/lib/types';
export declare let instance: HTMLIFrameElement | null;
export declare let origin: string;
export declare let initPromise: import("@trezor/utils").Deferred<void, undefined>;
export declare let timeout: number;
export declare let error: ERRORS.TrezorError;
export declare const dispose: () => void;
export declare const init: (settings: ConnectSettings) => Promise<void>;
export declare const postMessage: (message: CoreRequestMessage) => void;
export declare const clearTimeout: () => void;
export declare const initIframeLogger: () => void;
//# sourceMappingURL=index.d.ts.map