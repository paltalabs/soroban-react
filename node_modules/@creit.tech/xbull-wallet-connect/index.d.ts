import { IConnectParams, IConnectResponseData, IConnectResult, InitialResponseListenerData, IRejectResponse, IRejectResult, ISDKConstructor, ISignParams, ISignResponseData, ISignResult } from './interfaces';
import { Subject, Subscription } from 'rxjs';
export declare class xBullWalletConnect {
    closeCurrentPromises$: Subject<void>;
    closeObservables$: Subject<void>;
    preferredTarget: Required<ISDKConstructor['preferredTarget']>;
    target?: Window | null;
    targetPublicKey?: string;
    readonly walletUrl: string;
    encryptForReceiver: (params: {
        data: string;
        receiverPublicKey: Uint8Array;
    }) => {
        message: string;
        oneTimeCode: string;
    };
    decryptFromReceiver: (params: {
        payload: string;
        oneTimeCode: string;
        senderPublicKey: string;
    }) => string;
    publicKey: () => Uint8Array;
    session: () => string;
    initialResponse$: Subject<MessageEvent<InitialResponseListenerData>>;
    initialResponseCompleted$: Subject<void>;
    connectResponse$: Subject<MessageEvent<IConnectResponseData | IRejectResponse>>;
    connectResult$: Subject<IConnectResult | IRejectResult>;
    signResponse$: Subject<MessageEvent<ISignResponseData | IRejectResponse>>;
    signResult$: Subject<ISignResult | IRejectResult>;
    constructor(params?: ISDKConstructor);
    closeCurrentPromisesSubscription: Subscription;
    onInititalResponseSubscription: Subscription;
    onConnectResponseSubscription: Subscription;
    onSignResponseSubscription: Subscription;
    openWallet(): Promise<void>;
    closeWallet(): void;
    connect(params?: IConnectParams): Promise<string>;
    sign(params: ISignParams): Promise<string>;
    closeConnections(): void;
}
