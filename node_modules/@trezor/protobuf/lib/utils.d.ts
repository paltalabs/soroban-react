import * as protobuf from 'protobufjs/light';
import type { MessageFromTrezor } from './types';
export declare const isPrimitiveField: (field: any) => boolean;
export declare function parseConfigure(data: protobuf.INamespace): protobuf.Root;
export declare const createMessageFromName: (messages: protobuf.Root, name: string) => {
    Message: protobuf.Type;
    messageType: number;
};
export declare const createMessageFromType: (messages: protobuf.Root, messageType: number | string) => {
    Message: protobuf.Type;
    messageName: MessageFromTrezor["type"];
};
//# sourceMappingURL=utils.d.ts.map