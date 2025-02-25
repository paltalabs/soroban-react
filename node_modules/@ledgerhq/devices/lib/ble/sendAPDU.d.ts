/// <reference types="node" />
import { Observable } from "rxjs";
import { TraceContext } from "@ledgerhq/logs";
/**
 * Sends an APDU by encoding it into chunks and sending the chunks using the given `write` function
 *
 * @param write The function to send each chunk to the device
 * @param apdu
 * @param mtuSize The negotiated maximum size of the data to be sent in one chunk
 * @param options Optional options containing:
 *   - context An optional context object for log/tracing strategy
 * @returns An observable that will only emit if an error occurred, otherwise it will complete
 */
export declare const sendAPDU: (write: (arg0: Buffer) => Promise<void>, apdu: Buffer, mtuSize: number, { context }?: {
    context?: TraceContext | undefined;
}) => Observable<Buffer>;
//# sourceMappingURL=sendAPDU.d.ts.map