import { TypedEmitter } from '@trezor/utils';
import { Descriptor } from '../types';
import { EnumerateDoneRequest, AcquireIntentRequest, ReleaseIntentRequest, ReleaseDoneRequest, GetPathBySessionRequest, AcquireDoneRequest, SessionsBackgroundInterface } from './types';
export declare class SessionsClient extends TypedEmitter<{
    descriptors: Descriptor[];
    releaseRequest: Descriptor;
}> {
    private caller;
    private id;
    private background;
    constructor(background: SessionsBackgroundInterface);
    setBackground(background: SessionsBackgroundInterface): void;
    private request;
    handshake(): Promise<import("./types").HandshakeResponse>;
    enumerateDone(payload: EnumerateDoneRequest): Promise<import("./types").EnumerateDoneResponse>;
    acquireIntent(payload: AcquireIntentRequest): Promise<import("./types").AcquireIntentResponse>;
    acquireDone(payload: AcquireDoneRequest): Promise<import("./types").AcquireDoneResponse>;
    releaseIntent(payload: ReleaseIntentRequest): Promise<import("./types").ReleaseIntentResponse>;
    releaseDone(payload: ReleaseDoneRequest): Promise<import("./types").ReleaseDoneResponse>;
    getSessions(): Promise<import("./types").GetSessionsResponse>;
    getPathBySession(payload: GetPathBySessionRequest): Promise<import("./types").GetPathBySessionResponse>;
    dispose(): Promise<import("../types").Success<void> & {
        id: number;
    }>;
}
//# sourceMappingURL=client.d.ts.map