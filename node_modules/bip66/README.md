# bip66

[![NPM Package](https://img.shields.io/npm/v/bip66.svg?style=flat-square)](https://www.npmjs.org/package/bip66)
[![Build Status](https://img.shields.io/travis/bitcoinjs/bip66.svg?branch=master&style=flat-square)](https://travis-ci.org/bitcoinjs/bip66)

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

Strict DER signature encoding/decoding.

See [bip66](https://github.com/bitcoin/bips/blob/master/bip-0066.mediawiki).

- This module **works only with [two's complement](https://en.wikipedia.org/wiki/Two's_complement) numbers**.
- BIP66 doesn't check that `r` or `s` are fully valid.
  - `check`/`decode` doesn't check that `r` or `s` great than 33 bytes or that this number represent valid point on elliptic curve.
  - `encode` doesn't check that `r`/`s` represent valid point on elliptic curve.

## Example

``` javascript
import * as bip66 from"bip66"
const r = Buffer.from('1ea1fdff81b3a271659df4aad19bc4ef83def389131a36358fe64b245632e777', 'hex')
const s = Buffer.from('29e164658be9ce810921bf81d6b86694785a79ea1e52dbfa5105148d1f0bc1', 'hex')

// Buffer or UInt8Array can be passed in to the encode/decode functions
const signature = bip66.encode(r, s)
// Uint8Array(69) [
//    48,  67,   2,  32,  30, 161, 253, 255, 129, 179, 162,
//   113, 101, 157, 244, 170, 209, 155, 196, 239, 131, 222,
//   243, 137,  19,  26,  54,  53, 143, 230,  75,  36,  86,
//    50, 231, 119,   2,  31,  41, 225, 100, 101, 139, 233,
//   206, 129,   9,  33, 191, 129, 214, 184, 102, 148, 120,
//    90, 121, 234,  30,  82, 219, 250,  81,   5,  20, 141,
//    31,  11, 193
// ]

bip66.decode(signature)
// => {
//   r: Uint8Array(32) [
//      30, 161, 253, 255, 129, 179, 162,
//     113, 101, 157, 244, 170, 209, 155,
//     196, 239, 131, 222, 243, 137,  19,
//      26,  54,  53, 143, 230,  75,  36,
//      86,  50, 231, 119
//   ],
//   s: Uint8Array(31) [
//      41, 225, 100, 101, 139, 233, 206, 129,
//       9,  33, 191, 129, 214, 184, 102, 148,
//     120,  90, 121, 234,  30,  82, 219, 250,
//      81,   5,  20, 141,  31,  11, 193
//   ]
// }
```

A catch-all exception regex:
``` javascript
/Expected DER (integer|sequence)|(R|S) value (excessively padded|is negative)|(R|S|DER sequence) length is (zero|too short|too long|invalid)/
```

## LICENSE [MIT](LICENSE)
