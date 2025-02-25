import { TypedEmitter } from '@trezor/utils';
import type { HandleMessageParams, HandleMessageResponse, SessionsBackgroundInterface } from './types';
import type { Descriptor } from '../types';
export declare class SessionsBackground extends TypedEmitter<{
    descriptors: Descriptor[];
    releaseRequest: Descriptor;
}> implements SessionsBackgroundInterface {
    private descriptors;
    private pathInternalPathPublicMap;
    private locksQueue;
    private locksTimeoutQueue;
    private lastSessionId;
    private lastPathId;
    handleMessage<M extends HandleMessageParams>(message: M): Promise<HandleMessageResponse<M>>;
    private handshake;
    private enumerateDone;
    private acquireIntent;
    private acquireDone;
    private releaseIntent;
    private releaseDone;
    private getSessions;
    private getPathBySession;
    private startLock;
    private clearLock;
    private waitForUnlocked;
    private waitInQueue;
    private success;
    private error;
    private getInternal;
    dispose(): void;
}
//# sourceMappingURL=background.d.ts.map