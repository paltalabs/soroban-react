"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCertificate = exports.parseName = exports.fixSignature = void 0;
const derToAsn1 = (byteArray) => {
    let position = 0;
    function getTag() {
        let tag = byteArray[0] & 0x1f;
        position += 1;
        if (tag === 0x1f) {
            tag = 0;
            while (byteArray[position] >= 0x80) {
                tag = tag * 128 + byteArray[position] - 0x80;
                position += 1;
            }
            tag = tag * 128 + byteArray[position] - 0x80;
            position += 1;
        }
        return tag;
    }
    function getLength() {
        let length = 0;
        if (byteArray[position] < 0x80) {
            length = byteArray[position];
            position += 1;
        }
        else {
            const numberOfDigits = byteArray[position] & 0x7f;
            position += 1;
            length = 0;
            for (let i = 0; i < numberOfDigits; i++) {
                length = length * 256 + byteArray[position];
                position += 1;
            }
        }
        return length;
    }
    const cls = (byteArray[0] & 0xc0) / 64;
    const structured = (byteArray[0] & 0x20) === 0x20;
    const tag = getTag();
    if (byteArray[position] === 0x80) {
        throw new Error('Unsupported length encoding');
    }
    const length = getLength();
    const byteLength = position + length;
    const contents = byteArray.subarray(position, byteLength);
    const raw = byteArray.subarray(0, byteLength);
    return {
        cls,
        tag,
        structured,
        byteLength,
        contents,
        raw,
    };
};
const derToAsn1List = (byteArray) => {
    const result = [];
    let nextPosition = 0;
    while (nextPosition < byteArray.length) {
        const nextPiece = derToAsn1(byteArray.subarray(nextPosition));
        result.push(nextPiece);
        nextPosition += nextPiece.byteLength;
    }
    return result;
};
const derBitStringValue = (byteArray) => ({
    unusedBits: byteArray[0],
    bytes: byteArray.subarray(1),
});
const fixSignature = (byteArray) => {
    const asn1 = derToAsn1(byteArray);
    if (asn1.cls !== 0 || asn1.tag !== 16 || !asn1.structured) {
        throw new Error('Bad signature. Not a SEQUENCE.');
    }
    const items = derToAsn1List(asn1.contents);
    let newLength = 0;
    const fixedItems = items.map(chunk => {
        const index = chunk.contents.findIndex(value => value > 0x00);
        const data = chunk.contents.subarray(index);
        const offset = data[0] >= 0x80 ? 1 : 0;
        const chunkLength = data.length + offset;
        const newChunk = new Uint8Array(chunkLength + 2);
        newChunk.set([chunk.raw[0], chunkLength]);
        if (offset > 0) {
            newChunk.set([0], 2);
        }
        newChunk.set(data, 2 + offset);
        newLength += newChunk.length;
        return newChunk;
    });
    const signature = new Uint8Array(newLength + 2);
    signature.set([byteArray[0], newLength]);
    let signatureOffset = 2;
    fixedItems.forEach(item => {
        signature.set(item, signatureOffset);
        signatureOffset += item.length;
    });
    return signature;
};
exports.fixSignature = fixSignature;
const parseSignatureValue = (asn1) => {
    if (asn1.cls !== 0 || asn1.tag !== 3 || asn1.structured) {
        throw new Error('Bad signature value. Not a BIT STRING.');
    }
    const { unusedBits, bytes } = derBitStringValue(asn1.contents);
    return {
        asn1,
        bits: { unusedBits, bytes: (0, exports.fixSignature)(bytes) },
    };
};
const derObjectIdentifierValue = (byteArray) => {
    let oid = `${Math.floor(byteArray[0] / 40)}.${byteArray[0] % 40}`;
    let position = 1;
    while (position < byteArray.length) {
        let nextInteger = 0;
        while (byteArray[position] >= 0x80) {
            nextInteger = nextInteger * 0x80 + (byteArray[position] & 0x7f);
            position += 1;
        }
        nextInteger = nextInteger * 0x80 + byteArray[position];
        position += 1;
        oid += `.${nextInteger}`;
    }
    return oid;
};
const parseAlgorithmIdentifier = (asn1) => {
    if (asn1.cls !== 0 || asn1.tag !== 16 || !asn1.structured) {
        throw new Error('Bad algorithm identifier. Not a SEQUENCE.');
    }
    const pieces = derToAsn1List(asn1.contents);
    if (pieces.length > 2) {
        throw new Error('Bad algorithm identifier. Contains too many child objects.');
    }
    const encodedAlgorithm = pieces[0];
    if (encodedAlgorithm.cls !== 0 || encodedAlgorithm.tag !== 6 || encodedAlgorithm.structured) {
        throw new Error('Bad algorithm identifier. Does not begin with an OBJECT IDENTIFIER.');
    }
    const algorithm = derObjectIdentifierValue(encodedAlgorithm.contents);
    return {
        asn1,
        algorithm,
        parameters: pieces.length === 2 ? { asn1: pieces[1] } : null,
    };
};
const parseName = (asn1) => derToAsn1List(asn1.contents).map(item => {
    const attrSet = derToAsn1(item.contents);
    return parseAlgorithmIdentifier(attrSet);
});
exports.parseName = parseName;
const parseSubjectPublicKeyInfo = (asn1) => {
    if (asn1.cls !== 0 || asn1.tag !== 16 || !asn1.structured) {
        throw new Error('Bad SPKI. Not a SEQUENCE.');
    }
    const pieces = derToAsn1List(asn1.contents);
    if (pieces.length !== 2) {
        throw new Error('Bad SubjectPublicKeyInfo. Wrong number of child objects.');
    }
    return {
        asn1,
        algorithm: parseAlgorithmIdentifier(pieces[0]),
        bits: derBitStringValue(pieces[1].contents),
    };
};
const parseUtcTime = (time) => {
    let offset = 4;
    let yearOffset = 0;
    if (time.tag === 23) {
        offset = 2;
        yearOffset = 2000;
    }
    const utc = Buffer.from(time.contents).toString();
    const year = yearOffset + Number(utc.substring(0, offset));
    const month = Number(utc.substring(offset, offset + 2)) - 1;
    const day = Number(utc.substring(offset + 2, offset + 4));
    const hour = Number(utc.substring(offset + 4, offset + 6));
    const minute = Number(utc.substring(offset + 6, offset + 8));
    const date = new Date();
    date.setUTCFullYear(year, month, day);
    date.setUTCHours(hour, minute, 0);
    return date;
};
const parseValidity = (asn1) => {
    const [from, to] = derToAsn1List(asn1.contents);
    return {
        from: parseUtcTime(from),
        to: parseUtcTime(to),
    };
};
const parseExtensions = (data) => {
    const asn1 = derToAsn1(data.contents);
    if (asn1.cls !== 0 || asn1.tag !== 16 || !asn1.structured) {
        throw new Error("This can't be a Extension. Wrong data type.");
    }
    const readBoolean = (value) => {
        if (!value)
            return false;
        if (value.cls !== 0 || value.tag !== 1 || value.contents.length !== 1 || value.structured) {
            throw new Error("This can't be a boolean. Wrong data type.");
        }
        if (![0x00, 0xff].includes(value.contents[0])) {
            throw new Error('Invalid boolean value.');
        }
        return value.contents[0] === 0xff;
    };
    const readBitString = (uint8Array) => {
        const buffer = Buffer.from(uint8Array);
        const tag = buffer.readUInt8(0);
        if (tag !== 3) {
            throw new Error("This can't be a bit string. Wrong data type.");
        }
        const length = buffer.readUInt8(1);
        const unusedBits = buffer.readUInt8(2);
        const bitStringBytes = buffer.subarray(3, 3 + length - 1);
        const bitString = bitStringBytes.reduce((str, byte) => str + byte.toString(2).padStart(8, '0'), '');
        return bitString.slice(0, bitString.length - unusedBits);
    };
    const readInteger = (value) => {
        if (!value)
            return undefined;
        if (value.cls !== 0 || value.tag !== 2 || value.contents.length !== 1 || value.structured) {
            throw new Error("This can't be a integer. Wrong data type.");
        }
        return Buffer.from(value.contents).readInt8();
    };
    const extensions = [];
    derToAsn1List(asn1.contents).forEach(item => {
        const [id, ...pieces] = derToAsn1List(item.contents);
        if (id.cls !== 0 || id.tag !== 6 || id.structured) {
            throw new Error('Bad extension. Does not begin with an OBJECT IDENTIFIER.');
        }
        const algorithm = derObjectIdentifierValue(id.contents);
        const critical = pieces.length > 1 ? readBoolean(pieces[0]) : false;
        const extnValue = pieces.length > 1 ? pieces[1] : pieces[0];
        if (extnValue.cls !== 0 || extnValue.tag !== 4 || extnValue.structured) {
            throw new Error("This can't be a octet string. Wrong data type.");
        }
        if (algorithm === '2.5.29.15') {
            extensions.push({
                key: 'keyUsage',
                critical,
                keyCertSign: readBitString(extnValue.contents)[5],
            });
        }
        else if (algorithm === '2.5.29.19') {
            const fields = derToAsn1List(derToAsn1(extnValue.contents).contents);
            const ca = fields.length > 0 && fields[0].tag === 1 ? fields[0] : undefined;
            const len = fields.length > 0 && fields[0].tag === 2 ? fields[0] : fields[1];
            extensions.push({
                key: 'basicConstraints',
                critical,
                cA: readBoolean(ca),
                pathLenConstraint: readInteger(len),
            });
        }
        else {
            extensions.push({
                key: algorithm,
                critical,
                ...item,
            });
        }
    });
    return extensions;
};
const parseTBSCertificate = (asn1) => {
    if (asn1.cls !== 0 || asn1.tag !== 16 || !asn1.structured) {
        throw new Error("This can't be a TBSCertificate. Wrong data type.");
    }
    const pieces = derToAsn1List(asn1.contents);
    if (pieces.length < 7) {
        throw new Error('Bad TBS Certificate. There are fewer than the seven required children.');
    }
    return {
        asn1,
        version: pieces[0],
        serialNumber: pieces[1],
        signature: parseAlgorithmIdentifier(pieces[2]),
        issuer: pieces[3],
        validity: parseValidity(pieces[4]),
        subject: (0, exports.parseName)(pieces[5]),
        subjectPublicKeyInfo: parseSubjectPublicKeyInfo(pieces[6]),
        extensions: parseExtensions(pieces[7]),
    };
};
const parseCertificate = (byteArray) => {
    const asn1 = derToAsn1(byteArray);
    if (asn1.cls !== 0 || asn1.tag !== 16 || !asn1.structured) {
        throw new Error("This can't be an X.509 certificate. Wrong data type.");
    }
    const pieces = derToAsn1List(asn1.contents);
    if (pieces.length !== 3) {
        throw new Error('Certificate contains more than the three specified children.');
    }
    return {
        asn1,
        tbsCertificate: parseTBSCertificate(pieces[0]),
        signatureAlgorithm: parseAlgorithmIdentifier(pieces[1]),
        signatureValue: parseSignatureValue(pieces[2]),
    };
};
exports.parseCertificate = parseCertificate;
//# sourceMappingURL=x509certificate.js.map