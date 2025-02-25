import * as borsh from "borsh";
export type SignMessageOptionsNEP0413 = {
    message: string;
    recipient: string;
    nonce: number[];
};
export type SignedMessageNEP0413 = {
    signature: string;
    publicKey: string;
    accountId: string;
};
export declare class AuthPayload implements SignMessageOptionsNEP0413 {
    readonly message: string;
    readonly recipient: string;
    readonly nonce: number[];
    readonly callbackUrl?: string | undefined;
    readonly tag: number;
    constructor({ message, nonce, recipient }: SignMessageOptionsNEP0413);
}
export declare const authPayloadSchema: borsh.Schema;
export declare function verifySignature(request: SignMessageOptionsNEP0413, result: SignedMessageNEP0413): boolean;
