import { PROTO } from '../../constants';
import type { EthereumSignTypedDataTypes } from '../../types/api/ethereum';
export declare function parseArrayType(arrayTypeName: string): {
    entryTypeName: string;
    arraySize: number | null;
};
export declare function encodeData(typeName: string, data: any): string;
export declare function getFieldType(typeName: string, types: EthereumSignTypedDataTypes): PROTO.EthereumFieldType;
//# sourceMappingURL=ethereumSignTypedData.d.ts.map