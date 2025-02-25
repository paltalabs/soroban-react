// Reference https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki
// Format: 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
// NOTE: SIGHASH byte ignored AND restricted, truncate before use
export function check(buffer) {
    var ret = internalCheck(buffer);
    if (typeof ret === 'string') {
        return false;
    }
    else {
        return true;
    }
}
function internalCheck(buffer) {
    if (buffer.length < 8)
        return 'DER sequence length is too short';
    if (buffer.length > 72)
        return 'DER sequence length is too long';
    if (buffer[0] !== 0x30)
        return 'Expected DER sequence (48)';
    if (buffer[1] !== buffer.length - 2)
        return 'DER sequence length is invalid';
    if (buffer[2] !== 0x02)
        return 'Expected DER integer (2)';
    var lenR = buffer[3];
    if (lenR === 0)
        return 'R length is zero';
    if (5 + lenR >= buffer.length)
        return 'R length is too long';
    if (buffer[4 + lenR] !== 0x02)
        return 'Expected DER integer (2)';
    var lenS = buffer[5 + lenR];
    if (lenS === 0)
        return 'S length is zero';
    if ((6 + lenR + lenS) !== buffer.length)
        return 'S length is invalid';
    if ((buffer[4] & 0x80) !== 0)
        return 'R value is negative';
    if (lenR > 1 && (buffer[4] === 0x00) && (buffer[5] & 0x80) === 0)
        return 'R value excessively padded';
    if ((buffer[lenR + 6] & 0x80) !== 0)
        return 'S value is negative';
    if (lenS > 1 && (buffer[lenR + 6] === 0x00) && (buffer[lenR + 7] & 0x80) === 0)
        return 'S value excessively padded';
    return lenR;
}
export function decode(buffer) {
    var ret = internalCheck(buffer);
    if (typeof ret === 'string') {
        throw new Error(ret);
    }
    // non-BIP66 - extract R, S values
    return {
        r: buffer.subarray(4, 4 + ret),
        s: buffer.subarray(6 + ret)
    };
}
/*
 * Expects r and s to be positive DER integers.
 *
 * The DER format uses the most significant bit as a sign bit (& 0x80).
 * If the significant bit is set AND the integer is positive, a 0x00 is prepended.
 *
 * Examples:
 *
 *      0 =>     0x00
 *      1 =>     0x01
 *     -1 =>     0xff
 *    127 =>     0x7f
 *   -127 =>     0x81
 *    128 =>   0x0080
 *   -128 =>     0x80
 *    255 =>   0x00ff
 *   -255 =>   0xff01
 *  16300 =>   0x3fac
 * -16300 =>   0xc054
 *  62300 => 0x00f35c
 * -62300 => 0xff0ca4
*/
export function encode(r, s) {
    var lenR = r.length;
    var lenS = s.length;
    if (lenR === 0)
        throw new Error('R length is zero');
    if (lenS === 0)
        throw new Error('S length is zero');
    if (lenR > 33)
        throw new Error('R length is too long');
    if (lenS > 33)
        throw new Error('S length is too long');
    if ((r[0] & 0x80) !== 0)
        throw new Error('R value is negative');
    if ((s[0] & 0x80) !== 0)
        throw new Error('S value is negative');
    if (lenR > 1 && (r[0] === 0x00) && (r[1] & 0x80) === 0)
        throw new Error('R value excessively padded');
    if (lenS > 1 && (s[0] === 0x00) && (s[1] & 0x80) === 0)
        throw new Error('S value excessively padded');
    var signature = new Uint8Array(6 + lenR + lenS);
    // 0x30 [total-length] 0x02 [R-length] [R] 0x02 [S-length] [S]
    signature[0] = 0x30;
    signature[1] = signature.length - 2;
    signature[2] = 0x02;
    signature[3] = r.length;
    signature.set(r, 4);
    signature[4 + lenR] = 0x02;
    signature[5 + lenR] = s.length;
    signature.set(s, 6 + lenR);
    return signature;
}
