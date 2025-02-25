/// <reference types="node" />
export type ResponseAcc = {
    data: Buffer;
    dataLength: number;
    sequence: number;
} | null | undefined;
/**
 * Object to handle HID frames (encoding and decoding)
 *
 * @param channel
 * @param packetSize The HID protocol packet size in bytes (usually 64)
 */
declare const createHIDframing: (channel: number, packetSize: number) => {
    /**
     * Frames/encodes an APDU message into HID USB packets/frames
     *
     * @param apdu The APDU message to send, in a Buffer containing [cla, ins, p1, p2, data length, data(if not empty)]
     * @returns an array of HID USB frames ready to be sent
     */
    makeBlocks(apdu: Buffer): Buffer[];
    /**
     * Reduces HID USB packets/frames to one response.
     *
     * @param acc The value resulting from (accumulating) the previous call of reduceResponse.
     *   On first call initialized to `initialAcc`. The accumulator enables handling multi-frames messages.
     * @param chunk Current chunk to reduce into accumulator
     * @returns An accumulator value updated with the current chunk
     */
    reduceResponse(acc: ResponseAcc, chunk: Buffer): ResponseAcc;
    /**
     * Returns the response message that has been reduced from the HID USB frames
     *
     * @param acc The accumulator
     * @returns A Buffer containing the cleaned response message, or null if no response message, or undefined if the
     *   accumulator is incorrect (message length is not valid)
     */
    getReducedResult(acc: ResponseAcc): Buffer | null | undefined;
};
export default createHIDframing;
//# sourceMappingURL=hid-framing.d.ts.map