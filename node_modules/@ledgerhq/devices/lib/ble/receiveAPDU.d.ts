/// <reference types="node" />
import { Observable } from "rxjs";
import { TraceContext } from "@ledgerhq/logs";
/**
 * Parses a raw stream coming from a BLE communication into an APDU response
 *
 * @param rawStream An observable containing the raw stream as emitted buffers
 * @param options Optional options containing:
 *   - context An optional context object for log/tracing strategy
 * @returns An observable containing the APDU response as one emitted buffer
 */
export declare const receiveAPDU: (rawStream: Observable<Buffer | Error>, { context }?: {
    context?: TraceContext | undefined;
}) => Observable<Buffer>;
//# sourceMappingURL=receiveAPDU.d.ts.map