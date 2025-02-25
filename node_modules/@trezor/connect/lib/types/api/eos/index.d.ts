import { Static } from '@trezor/schema-utils';
export type EosPublicKey = Static<typeof EosPublicKey>;
export declare const EosPublicKey: import("@trezor/schema-utils").TObject<{
    wifPublicKey: import("@trezor/schema-utils").TString;
    rawPublicKey: import("@trezor/schema-utils").TString;
    path: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>;
    serializedPath: import("@trezor/schema-utils").TString;
}>;
export type EosTxHeader = Static<typeof EosTxHeader>;
export declare const EosTxHeader: import("@trezor/schema-utils").TObject<{
    expiration: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils/lib/custom-types/uint").TUint, import("@trezor/schema-utils").TString]>;
    refBlockNum: import("@trezor/schema-utils").TNumber;
    refBlockPrefix: import("@trezor/schema-utils").TNumber;
    maxNetUsageWords: import("@trezor/schema-utils").TNumber;
    maxCpuUsageMs: import("@trezor/schema-utils").TNumber;
    delaySec: import("@trezor/schema-utils").TNumber;
}>;
export type EosAuthorization = Static<typeof EosAuthorization>;
export declare const EosAuthorization: import("@trezor/schema-utils").TObject<{
    threshold: import("@trezor/schema-utils").TNumber;
    keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
        key: import("@trezor/schema-utils").TString;
        address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
        weight: import("@trezor/schema-utils").TNumber;
    }>>;
    accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        permission: import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>;
        weight: import("@trezor/schema-utils").TNumber;
    }>>;
    waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        wait_sec: import("@trezor/schema-utils").TNumber;
        weight: import("@trezor/schema-utils").TNumber;
    }>>;
}>;
export type EosTxActionCommon = Static<typeof EosTxActionCommon>;
export declare const EosTxActionCommon: import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>;
export type EosTxAction = Static<typeof EosTxAction>;
export declare const EosTxAction: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"transfer">;
    data: import("@trezor/schema-utils").TObject<{
        from: import("@trezor/schema-utils").TString;
        to: import("@trezor/schema-utils").TString;
        quantity: import("@trezor/schema-utils").TString;
        memo: import("@trezor/schema-utils").TString;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"delegatebw">;
    data: import("@trezor/schema-utils").TObject<{
        from: import("@trezor/schema-utils").TString;
        receiver: import("@trezor/schema-utils").TString;
        stake_net_quantity: import("@trezor/schema-utils").TString;
        stake_cpu_quantity: import("@trezor/schema-utils").TString;
        transfer: import("@trezor/schema-utils").TBoolean;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"undelegatebw">;
    data: import("@trezor/schema-utils").TObject<{
        from: import("@trezor/schema-utils").TString;
        receiver: import("@trezor/schema-utils").TString;
        unstake_net_quantity: import("@trezor/schema-utils").TString;
        unstake_cpu_quantity: import("@trezor/schema-utils").TString;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"buyram">;
    data: import("@trezor/schema-utils").TObject<{
        payer: import("@trezor/schema-utils").TString;
        receiver: import("@trezor/schema-utils").TString;
        quant: import("@trezor/schema-utils").TString;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"buyrambytes">;
    data: import("@trezor/schema-utils").TObject<{
        payer: import("@trezor/schema-utils").TString;
        receiver: import("@trezor/schema-utils").TString;
        bytes: import("@trezor/schema-utils").TNumber;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"sellram">;
    data: import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        bytes: import("@trezor/schema-utils").TNumber;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"voteproducer">;
    data: import("@trezor/schema-utils").TObject<{
        voter: import("@trezor/schema-utils").TString;
        proxy: import("@trezor/schema-utils").TString;
        producers: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TString>;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"refund">;
    data: import("@trezor/schema-utils").TObject<{
        owner: import("@trezor/schema-utils").TString;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"updateauth">;
    data: import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
        parent: import("@trezor/schema-utils").TString;
        auth: import("@trezor/schema-utils").TObject<{
            threshold: import("@trezor/schema-utils").TNumber;
            keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                key: import("@trezor/schema-utils").TString;
                address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
            accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                permission: import("@trezor/schema-utils").TObject<{
                    actor: import("@trezor/schema-utils").TString;
                    permission: import("@trezor/schema-utils").TString;
                }>;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
            waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                wait_sec: import("@trezor/schema-utils").TNumber;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
        }>;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"deleteauth">;
    data: import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"linkauth">;
    data: import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        code: import("@trezor/schema-utils").TString;
        type: import("@trezor/schema-utils").TString;
        requirement: import("@trezor/schema-utils").TString;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"unlinkauth">;
    data: import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        code: import("@trezor/schema-utils").TString;
        type: import("@trezor/schema-utils").TString;
    }>;
}>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
    account: import("@trezor/schema-utils").TString;
    authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
        actor: import("@trezor/schema-utils").TString;
        permission: import("@trezor/schema-utils").TString;
    }>>;
}>, import("@trezor/schema-utils").TObject<{
    name: import("@trezor/schema-utils").TLiteral<"newaccount">;
    data: import("@trezor/schema-utils").TObject<{
        creator: import("@trezor/schema-utils").TString;
        name: import("@trezor/schema-utils").TString;
        owner: import("@trezor/schema-utils").TObject<{
            threshold: import("@trezor/schema-utils").TNumber;
            keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                key: import("@trezor/schema-utils").TString;
                address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
            accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                permission: import("@trezor/schema-utils").TObject<{
                    actor: import("@trezor/schema-utils").TString;
                    permission: import("@trezor/schema-utils").TString;
                }>;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
            waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                wait_sec: import("@trezor/schema-utils").TNumber;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
        }>;
        active: import("@trezor/schema-utils").TObject<{
            threshold: import("@trezor/schema-utils").TNumber;
            keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                key: import("@trezor/schema-utils").TString;
                address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
            accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                permission: import("@trezor/schema-utils").TObject<{
                    actor: import("@trezor/schema-utils").TString;
                    permission: import("@trezor/schema-utils").TString;
                }>;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
            waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                wait_sec: import("@trezor/schema-utils").TNumber;
                weight: import("@trezor/schema-utils").TNumber;
            }>>;
        }>;
    }>;
}>]>]>;
export type EosSDKTransaction = Static<typeof EosSDKTransaction>;
export declare const EosSDKTransaction: import("@trezor/schema-utils").TObject<{
    chainId: import("@trezor/schema-utils").TString;
    header: import("@trezor/schema-utils").TObject<{
        expiration: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils/lib/custom-types/uint").TUint, import("@trezor/schema-utils").TString]>;
        refBlockNum: import("@trezor/schema-utils").TNumber;
        refBlockPrefix: import("@trezor/schema-utils").TNumber;
        maxNetUsageWords: import("@trezor/schema-utils").TNumber;
        maxCpuUsageMs: import("@trezor/schema-utils").TNumber;
        delaySec: import("@trezor/schema-utils").TNumber;
    }>;
    actions: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"transfer">;
        data: import("@trezor/schema-utils").TObject<{
            from: import("@trezor/schema-utils").TString;
            to: import("@trezor/schema-utils").TString;
            quantity: import("@trezor/schema-utils").TString;
            memo: import("@trezor/schema-utils").TString;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"delegatebw">;
        data: import("@trezor/schema-utils").TObject<{
            from: import("@trezor/schema-utils").TString;
            receiver: import("@trezor/schema-utils").TString;
            stake_net_quantity: import("@trezor/schema-utils").TString;
            stake_cpu_quantity: import("@trezor/schema-utils").TString;
            transfer: import("@trezor/schema-utils").TBoolean;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"undelegatebw">;
        data: import("@trezor/schema-utils").TObject<{
            from: import("@trezor/schema-utils").TString;
            receiver: import("@trezor/schema-utils").TString;
            unstake_net_quantity: import("@trezor/schema-utils").TString;
            unstake_cpu_quantity: import("@trezor/schema-utils").TString;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"buyram">;
        data: import("@trezor/schema-utils").TObject<{
            payer: import("@trezor/schema-utils").TString;
            receiver: import("@trezor/schema-utils").TString;
            quant: import("@trezor/schema-utils").TString;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"buyrambytes">;
        data: import("@trezor/schema-utils").TObject<{
            payer: import("@trezor/schema-utils").TString;
            receiver: import("@trezor/schema-utils").TString;
            bytes: import("@trezor/schema-utils").TNumber;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"sellram">;
        data: import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            bytes: import("@trezor/schema-utils").TNumber;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"voteproducer">;
        data: import("@trezor/schema-utils").TObject<{
            voter: import("@trezor/schema-utils").TString;
            proxy: import("@trezor/schema-utils").TString;
            producers: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TString>;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"refund">;
        data: import("@trezor/schema-utils").TObject<{
            owner: import("@trezor/schema-utils").TString;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"updateauth">;
        data: import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
            parent: import("@trezor/schema-utils").TString;
            auth: import("@trezor/schema-utils").TObject<{
                threshold: import("@trezor/schema-utils").TNumber;
                keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                    key: import("@trezor/schema-utils").TString;
                    address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
                accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    permission: import("@trezor/schema-utils").TObject<{
                        actor: import("@trezor/schema-utils").TString;
                        permission: import("@trezor/schema-utils").TString;
                    }>;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
                waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    wait_sec: import("@trezor/schema-utils").TNumber;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
            }>;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"deleteauth">;
        data: import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"linkauth">;
        data: import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            code: import("@trezor/schema-utils").TString;
            type: import("@trezor/schema-utils").TString;
            requirement: import("@trezor/schema-utils").TString;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"unlinkauth">;
        data: import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            code: import("@trezor/schema-utils").TString;
            type: import("@trezor/schema-utils").TString;
        }>;
    }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TLiteral<"newaccount">;
        data: import("@trezor/schema-utils").TObject<{
            creator: import("@trezor/schema-utils").TString;
            name: import("@trezor/schema-utils").TString;
            owner: import("@trezor/schema-utils").TObject<{
                threshold: import("@trezor/schema-utils").TNumber;
                keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                    key: import("@trezor/schema-utils").TString;
                    address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
                accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    permission: import("@trezor/schema-utils").TObject<{
                        actor: import("@trezor/schema-utils").TString;
                        permission: import("@trezor/schema-utils").TString;
                    }>;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
                waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    wait_sec: import("@trezor/schema-utils").TNumber;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
            }>;
            active: import("@trezor/schema-utils").TObject<{
                threshold: import("@trezor/schema-utils").TNumber;
                keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                    key: import("@trezor/schema-utils").TString;
                    address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
                accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    permission: import("@trezor/schema-utils").TObject<{
                        actor: import("@trezor/schema-utils").TString;
                        permission: import("@trezor/schema-utils").TString;
                    }>;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
                waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                    wait_sec: import("@trezor/schema-utils").TNumber;
                    weight: import("@trezor/schema-utils").TNumber;
                }>>;
            }>;
        }>;
    }>]>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
        account: import("@trezor/schema-utils").TString;
        authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
            actor: import("@trezor/schema-utils").TString;
            permission: import("@trezor/schema-utils").TString;
        }>>;
    }>, import("@trezor/schema-utils").TObject<{
        name: import("@trezor/schema-utils").TString;
        data: import("@trezor/schema-utils").TString;
    }>]>]>>;
}>;
export type EosSignTransaction = Static<typeof EosSignTransaction>;
export declare const EosSignTransaction: import("@trezor/schema-utils").TObject<{
    path: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TString, import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>]>;
    transaction: import("@trezor/schema-utils").TObject<{
        chainId: import("@trezor/schema-utils").TString;
        header: import("@trezor/schema-utils").TObject<{
            expiration: import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils/lib/custom-types/uint").TUint, import("@trezor/schema-utils").TString]>;
            refBlockNum: import("@trezor/schema-utils").TNumber;
            refBlockPrefix: import("@trezor/schema-utils").TNumber;
            maxNetUsageWords: import("@trezor/schema-utils").TNumber;
            maxCpuUsageMs: import("@trezor/schema-utils").TNumber;
            delaySec: import("@trezor/schema-utils").TNumber;
        }>;
        actions: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TUnion<[import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"transfer">;
            data: import("@trezor/schema-utils").TObject<{
                from: import("@trezor/schema-utils").TString;
                to: import("@trezor/schema-utils").TString;
                quantity: import("@trezor/schema-utils").TString;
                memo: import("@trezor/schema-utils").TString;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"delegatebw">;
            data: import("@trezor/schema-utils").TObject<{
                from: import("@trezor/schema-utils").TString;
                receiver: import("@trezor/schema-utils").TString;
                stake_net_quantity: import("@trezor/schema-utils").TString;
                stake_cpu_quantity: import("@trezor/schema-utils").TString;
                transfer: import("@trezor/schema-utils").TBoolean;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"undelegatebw">;
            data: import("@trezor/schema-utils").TObject<{
                from: import("@trezor/schema-utils").TString;
                receiver: import("@trezor/schema-utils").TString;
                unstake_net_quantity: import("@trezor/schema-utils").TString;
                unstake_cpu_quantity: import("@trezor/schema-utils").TString;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"buyram">;
            data: import("@trezor/schema-utils").TObject<{
                payer: import("@trezor/schema-utils").TString;
                receiver: import("@trezor/schema-utils").TString;
                quant: import("@trezor/schema-utils").TString;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"buyrambytes">;
            data: import("@trezor/schema-utils").TObject<{
                payer: import("@trezor/schema-utils").TString;
                receiver: import("@trezor/schema-utils").TString;
                bytes: import("@trezor/schema-utils").TNumber;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"sellram">;
            data: import("@trezor/schema-utils").TObject<{
                account: import("@trezor/schema-utils").TString;
                bytes: import("@trezor/schema-utils").TNumber;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"voteproducer">;
            data: import("@trezor/schema-utils").TObject<{
                voter: import("@trezor/schema-utils").TString;
                proxy: import("@trezor/schema-utils").TString;
                producers: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TString>;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"refund">;
            data: import("@trezor/schema-utils").TObject<{
                owner: import("@trezor/schema-utils").TString;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"updateauth">;
            data: import("@trezor/schema-utils").TObject<{
                account: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
                parent: import("@trezor/schema-utils").TString;
                auth: import("@trezor/schema-utils").TObject<{
                    threshold: import("@trezor/schema-utils").TNumber;
                    keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                        key: import("@trezor/schema-utils").TString;
                        address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                    accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        permission: import("@trezor/schema-utils").TObject<{
                            actor: import("@trezor/schema-utils").TString;
                            permission: import("@trezor/schema-utils").TString;
                        }>;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                    waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        wait_sec: import("@trezor/schema-utils").TNumber;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                }>;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"deleteauth">;
            data: import("@trezor/schema-utils").TObject<{
                account: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"linkauth">;
            data: import("@trezor/schema-utils").TObject<{
                account: import("@trezor/schema-utils").TString;
                code: import("@trezor/schema-utils").TString;
                type: import("@trezor/schema-utils").TString;
                requirement: import("@trezor/schema-utils").TString;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"unlinkauth">;
            data: import("@trezor/schema-utils").TObject<{
                account: import("@trezor/schema-utils").TString;
                code: import("@trezor/schema-utils").TString;
                type: import("@trezor/schema-utils").TString;
            }>;
        }>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TLiteral<"newaccount">;
            data: import("@trezor/schema-utils").TObject<{
                creator: import("@trezor/schema-utils").TString;
                name: import("@trezor/schema-utils").TString;
                owner: import("@trezor/schema-utils").TObject<{
                    threshold: import("@trezor/schema-utils").TNumber;
                    keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                        key: import("@trezor/schema-utils").TString;
                        address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                    accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        permission: import("@trezor/schema-utils").TObject<{
                            actor: import("@trezor/schema-utils").TString;
                            permission: import("@trezor/schema-utils").TString;
                        }>;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                    waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        wait_sec: import("@trezor/schema-utils").TNumber;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                }>;
                active: import("@trezor/schema-utils").TObject<{
                    threshold: import("@trezor/schema-utils").TNumber;
                    keys: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        type: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TNumber>;
                        key: import("@trezor/schema-utils").TString;
                        address_n: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TNumber>>;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                    accounts: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        permission: import("@trezor/schema-utils").TObject<{
                            actor: import("@trezor/schema-utils").TString;
                            permission: import("@trezor/schema-utils").TString;
                        }>;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                    waits: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                        wait_sec: import("@trezor/schema-utils").TNumber;
                        weight: import("@trezor/schema-utils").TNumber;
                    }>>;
                }>;
            }>;
        }>]>]>, import("@trezor/schema-utils").TIntersect<[import("@trezor/schema-utils").TObject<{
            account: import("@trezor/schema-utils").TString;
            authorization: import("@trezor/schema-utils").TArray<import("@trezor/schema-utils").TObject<{
                actor: import("@trezor/schema-utils").TString;
                permission: import("@trezor/schema-utils").TString;
            }>>;
        }>, import("@trezor/schema-utils").TObject<{
            name: import("@trezor/schema-utils").TString;
            data: import("@trezor/schema-utils").TString;
        }>]>]>>;
    }>;
    chunkify: import("@trezor/schema-utils").TOptional<import("@trezor/schema-utils").TBoolean>;
}>;
//# sourceMappingURL=index.d.ts.map