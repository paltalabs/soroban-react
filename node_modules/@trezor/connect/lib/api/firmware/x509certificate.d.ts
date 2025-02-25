interface Asn1 {
    cls: number;
    tag: number;
    structured: boolean;
    byteLength: number;
    contents: Uint8Array;
    raw: Uint8Array;
}
type Oid = `${number}.${number}.${number}.${number}`;
type Extension = {
    key: 'keyUsage';
    critical?: boolean;
    keyCertSign: '0' | '1';
} | {
    key: 'basicConstraints';
    critical?: boolean;
    cA: boolean;
    pathLenConstraint?: number;
} | (Asn1 & {
    key: Oid;
    critical?: boolean;
});
export declare const fixSignature: (byteArray: Uint8Array) => Uint8Array;
export declare const parseName: (asn1: Asn1) => {
    asn1: Asn1;
    algorithm: `${number}.${number}.${number}.${number}`;
    parameters: {
        asn1: Asn1;
    } | null;
}[];
export declare const parseCertificate: (byteArray: Uint8Array) => {
    asn1: Asn1;
    tbsCertificate: {
        asn1: Asn1;
        version: Asn1;
        serialNumber: Asn1;
        signature: {
            asn1: Asn1;
            algorithm: `${number}.${number}.${number}.${number}`;
            parameters: {
                asn1: Asn1;
            } | null;
        };
        issuer: Asn1;
        validity: {
            from: Date;
            to: Date;
        };
        subject: {
            asn1: Asn1;
            algorithm: `${number}.${number}.${number}.${number}`;
            parameters: {
                asn1: Asn1;
            } | null;
        }[];
        subjectPublicKeyInfo: {
            asn1: Asn1;
            algorithm: {
                asn1: Asn1;
                algorithm: `${number}.${number}.${number}.${number}`;
                parameters: {
                    asn1: Asn1;
                } | null;
            };
            bits: {
                unusedBits: number;
                bytes: Uint8Array;
            };
        };
        extensions: Extension[];
    };
    signatureAlgorithm: {
        asn1: Asn1;
        algorithm: `${number}.${number}.${number}.${number}`;
        parameters: {
            asn1: Asn1;
        } | null;
    };
    signatureValue: {
        asn1: Asn1;
        bits: {
            unusedBits: number;
            bytes: Uint8Array;
        };
    };
};
export {};
//# sourceMappingURL=x509certificate.d.ts.map