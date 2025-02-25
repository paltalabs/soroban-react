export type Base64 = string;
export interface CreateAccountAction {
    type: "CreateAccount";
}
export interface DeployContractAction {
    type: "DeployContract";
    params: {
        code: Uint8Array;
    };
}
export interface FunctionCallAction {
    type: "FunctionCall";
    params: {
        methodName: string;
        args: object | Base64;
        gas: string | number;
        deposit: string;
    };
}
export interface TransferAction {
    type: "Transfer";
    params: {
        deposit: string;
    };
}
export interface StakeAction {
    type: "Stake";
    params: {
        stake: string;
        publicKey: string;
    };
}
export declare type AddKeyPermission = "FullAccess" | {
    receiverId: string;
    allowance?: string;
    methodNames?: Array<string>;
};
export interface AddKeyAction {
    type: "AddKey";
    params: {
        publicKey: string;
        accessKey: {
            nonce?: number;
            permission: AddKeyPermission;
        };
    };
}
export interface DeleteKeyAction {
    type: "DeleteKey";
    params: {
        publicKey: string;
    };
}
export interface DeleteAccountAction {
    type: "DeleteAccount";
    params: {
        beneficiaryId: string;
    };
}
export declare type Action = CreateAccountAction | DeployContractAction | FunctionCallAction | TransferAction | StakeAction | AddKeyAction | DeleteKeyAction | DeleteAccountAction;
export declare type ActionType = Action["type"];
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export interface Transaction {
    signerId?: string;
    receiverId?: string;
    actions: Array<Action>;
}
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
