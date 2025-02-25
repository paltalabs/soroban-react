import { Static } from '@trezor/schema-utils';
export type TezosRevealOperation = Static<typeof TezosRevealOperation>;
export declare const TezosRevealOperation: import("@trezor/schema-utils").TObject<{
    source: import("@trezor/schema-utils").TString;
    fee: import("@trezor/schema-utils").TNumber;
    counter: import("@trezor/schema-utils").TNumber;
    gas_limit: import("@trezor/schema-utils").TNumber;
    storage_limit: import("@trezor/schema-utils").TNumber;
    public_key: import("@trezor/schema-utils").TString;
}>;
export type TezosManagerTransfer = Static<typeof TezosManagerTransfer>;
export declare const TezosManagerTransfer: import("@trezor/schema-utils").TObject<{
    destination: import("@trezor/schema-utils").TString;
    amount: import("@trezor/schema-utils").TNumber;
}>;
export type TezosParametersManager = Static<typeof TezosParametersManager>;
export declare const TezosParametersManager: import("@trezor/schema-utils").TObject<{
    set_delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    cancel_delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
    transfer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        destination: import("@trezor/schema-utils").TString;
        amount: import("@trezor/schema-utils").TNumber;
    }>>;
}>;
export type TezosTransactionOperation = Static<typeof TezosTransactionOperation>;
export declare const TezosTransactionOperation: import("@trezor/schema-utils").TObject<{
    source: import("@trezor/schema-utils").TString;
    destination: import("@trezor/schema-utils").TString;
    amount: import("@trezor/schema-utils").TNumber;
    counter: import("@trezor/schema-utils").TNumber;
    fee: import("@trezor/schema-utils").TNumber;
    gas_limit: import("@trezor/schema-utils").TNumber;
    storage_limit: import("@trezor/schema-utils").TNumber;
    parameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
    parameters_manager: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        set_delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        cancel_delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
        transfer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            destination: import("@trezor/schema-utils").TString;
            amount: import("@trezor/schema-utils").TNumber;
        }>>;
    }>>;
}>;
export type TezosOriginationOperation = Static<typeof TezosOriginationOperation>;
export declare const TezosOriginationOperation: import("@trezor/schema-utils").TObject<{
    source: import("@trezor/schema-utils").TString;
    balance: import("@trezor/schema-utils").TNumber;
    delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
    script: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    fee: import("@trezor/schema-utils").TNumber;
    counter: import("@trezor/schema-utils").TNumber;
    gas_limit: import("@trezor/schema-utils").TNumber;
    storage_limit: import("@trezor/schema-utils").TNumber;
}>;
export type TezosDelegationOperation = Static<typeof TezosDelegationOperation>;
export declare const TezosDelegationOperation: import("@trezor/schema-utils").TObject<{
    source: import("@trezor/schema-utils").TString;
    delegate: import("@trezor/schema-utils").TString;
    fee: import("@trezor/schema-utils").TNumber;
    counter: import("@trezor/schema-utils").TNumber;
    gas_limit: import("@trezor/schema-utils").TNumber;
    storage_limit: import("@trezor/schema-utils").TNumber;
}>;
export type TezosOperation = Static<typeof TezosOperation>;
export declare const TezosOperation: import("@trezor/schema-utils").TObject<{
    reveal: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        source: import("@trezor/schema-utils").TString;
        fee: import("@trezor/schema-utils").TNumber;
        counter: import("@trezor/schema-utils").TNumber;
        gas_limit: import("@trezor/schema-utils").TNumber;
        storage_limit: import("@trezor/schema-utils").TNumber;
        public_key: import("@trezor/schema-utils").TString;
    }>>;
    transaction: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        source: import("@trezor/schema-utils").TString;
        destination: import("@trezor/schema-utils").TString;
        amount: import("@trezor/schema-utils").TNumber;
        counter: import("@trezor/schema-utils").TNumber;
        fee: import("@trezor/schema-utils").TNumber;
        gas_limit: import("@trezor/schema-utils").TNumber;
        storage_limit: import("@trezor/schema-utils").TNumber;
        parameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
        parameters_manager: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            set_delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            cancel_delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
            transfer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                destination: import("@trezor/schema-utils").TString;
                amount: import("@trezor/schema-utils").TNumber;
            }>>;
        }>>;
    }>>;
    origination: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        source: import("@trezor/schema-utils").TString;
        balance: import("@trezor/schema-utils").TNumber;
        delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
        script: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
        fee: import("@trezor/schema-utils").TNumber;
        counter: import("@trezor/schema-utils").TNumber;
        gas_limit: import("@trezor/schema-utils").TNumber;
        storage_limit: import("@trezor/schema-utils").TNumber;
    }>>;
    delegation: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
        source: import("@trezor/schema-utils").TString;
        delegate: import("@trezor/schema-utils").TString;
        fee: import("@trezor/schema-utils").TNumber;
        counter: import("@trezor/schema-utils").TNumber;
        gas_limit: import("@trezor/schema-utils").TNumber;
        storage_limit: import("@trezor/schema-utils").TNumber;
    }>>;
}>;
export type TezosSignTransaction = Static<typeof TezosSignTransaction>;
export declare const TezosSignTransaction: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    branch: import("@trezor/schema-utils").TString;
    operation: import("@trezor/schema-utils").TObject<{
        reveal: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            source: import("@trezor/schema-utils").TString;
            fee: import("@trezor/schema-utils").TNumber;
            counter: import("@trezor/schema-utils").TNumber;
            gas_limit: import("@trezor/schema-utils").TNumber;
            storage_limit: import("@trezor/schema-utils").TNumber;
            public_key: import("@trezor/schema-utils").TString;
        }>>;
        transaction: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            source: import("@trezor/schema-utils").TString;
            destination: import("@trezor/schema-utils").TString;
            amount: import("@trezor/schema-utils").TNumber;
            counter: import("@trezor/schema-utils").TNumber;
            fee: import("@trezor/schema-utils").TNumber;
            gas_limit: import("@trezor/schema-utils").TNumber;
            storage_limit: import("@trezor/schema-utils").TNumber;
            parameters: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
            parameters_manager: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                set_delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
                cancel_delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
                transfer: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
                    destination: import("@trezor/schema-utils").TString;
                    amount: import("@trezor/schema-utils").TNumber;
                }>>;
            }>>;
        }>>;
        origination: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            source: import("@trezor/schema-utils").TString;
            balance: import("@trezor/schema-utils").TNumber;
            delegate: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TString>;
            script: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
            fee: import("@trezor/schema-utils").TNumber;
            counter: import("@trezor/schema-utils").TNumber;
            gas_limit: import("@trezor/schema-utils").TNumber;
            storage_limit: import("@trezor/schema-utils").TNumber;
        }>>;
        delegation: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TObject<{
            source: import("@trezor/schema-utils").TString;
            delegate: import("@trezor/schema-utils").TString;
            fee: import("@trezor/schema-utils").TNumber;
            counter: import("@trezor/schema-utils").TNumber;
            gas_limit: import("@trezor/schema-utils").TNumber;
            storage_limit: import("@trezor/schema-utils").TNumber;
        }>>;
    }>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>;
//# sourceMappingURL=index.d.ts.map