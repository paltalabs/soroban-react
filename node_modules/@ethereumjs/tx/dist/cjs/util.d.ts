import type { AccessList, AccessListBytes, AuthorizationList, AuthorizationListBytes, TransactionType } from './types.js';
import type { Common } from '@ethereumjs/common';
export declare function checkMaxInitCodeSize(common: Common, length: number): void;
export declare class AccessLists {
    static getAccessListData(accessList: AccessListBytes | AccessList): {
        AccessListJSON: AccessList;
        accessList: AccessListBytes;
    };
    static verifyAccessList(accessList: AccessListBytes): void;
    static getAccessListJSON(accessList: AccessListBytes): any[];
    static getDataFeeEIP2930(accessList: AccessListBytes, common: Common): number;
}
export declare class AuthorizationLists {
    static getAuthorizationListData(authorizationList: AuthorizationListBytes | AuthorizationList): {
        AuthorizationListJSON: AuthorizationList;
        authorizationList: AuthorizationListBytes;
    };
    static verifyAuthorizationList(authorizationList: AuthorizationListBytes): void;
    static getDataFeeEIP7702(authorityList: AuthorizationListBytes, common: Common): number;
}
export declare function txTypeBytes(txType: TransactionType): Uint8Array;
//# sourceMappingURL=util.d.ts.map