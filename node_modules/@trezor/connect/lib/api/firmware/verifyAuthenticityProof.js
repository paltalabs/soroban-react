"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthenticityProof = exports.getRandomChallenge = void 0;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("crypto"));
const utils_1 = require("@trezor/utils");
const x509certificate_1 = require("./x509certificate");
const verifySignature = async (rawKey, data, signature) => {
    const signer = crypto.createVerify('sha256');
    signer.update(Buffer.from(data));
    const SubtleCrypto = typeof window !== 'undefined' ? window.crypto.subtle : crypto.subtle;
    if (!SubtleCrypto) {
        throw new Error('SubtleCrypto not supported');
    }
    const ecPubKey = await SubtleCrypto.importKey('raw', rawKey, { name: 'ECDSA', namedCurve: 'P-256' }, true, ['verify']);
    const spkiPubKey = await SubtleCrypto.exportKey('spki', ecPubKey);
    const key = `-----BEGIN PUBLIC KEY-----\n${Buffer.from(spkiPubKey).toString('base64')}\n-----END PUBLIC KEY-----`;
    return signer.verify({ key }, Buffer.from(signature));
};
const getRandomChallenge = () => crypto.randomBytes(32);
exports.getRandomChallenge = getRandomChallenge;
const validateCaCertExtensions = (cert, pathLen) => {
    let hasKeyUsage, hasBasicConstraints = false;
    cert.tbsCertificate.extensions.forEach(ext => {
        if (ext.key === 'keyUsage') {
            if (ext.keyCertSign !== '1') {
                throw new Error(`CA keyCertSign not set`);
            }
            hasKeyUsage = true;
        }
        else if (ext.key === 'basicConstraints') {
            if (!ext.cA) {
                throw new Error(`CA basicConstraints.cA not set`);
            }
            if (typeof ext.pathLenConstraint != 'number') {
                throw new Error('CA basicConstraints.pathLenConstraint not set');
            }
            if (ext.pathLenConstraint < pathLen) {
                throw new Error('Issuer was not permitted to issue certificate');
            }
            hasBasicConstraints = true;
        }
        else if (ext.critical) {
            throw new Error(`Unknown critical extension ${ext.key} in CA certificate`);
        }
    });
    if (!hasKeyUsage || !hasBasicConstraints) {
        throw new Error(`CA missing extensions keyUsage: ${hasKeyUsage}, basicConstraints: ${hasBasicConstraints}`);
    }
};
const verifyAuthenticityProof = async ({ certificates, signature, challenge, config, allowDebugKeys, deviceModel, }) => {
    const modelConfig = config[deviceModel];
    if (!modelConfig) {
        throw new Error(`Pubkeys for ${deviceModel} not found in config`);
    }
    const { caPubKeys, debug } = modelConfig;
    const [deviceCert, caCert] = certificates.map((c, i) => {
        const cert = (0, x509certificate_1.parseCertificate)(new Uint8Array(Buffer.from(c, 'hex')));
        if (i === 0) {
            return cert;
        }
        validateCaCertExtensions(cert, i - 1);
        return cert;
    });
    const caPubKey = Buffer.from(caCert.tbsCertificate.subjectPublicKeyInfo.bits.bytes).toString('hex');
    const rootPubKeys = allowDebugKeys
        ? modelConfig.rootPubKeys.concat((debug === null || debug === void 0 ? void 0 : debug.rootPubKeys) || [])
        : modelConfig.rootPubKeys;
    const isCertSignedByRootPubkey = await Promise.all(rootPubKeys.map(rootPubKey => verifySignature(Buffer.from(rootPubKey, 'hex'), caCert.tbsCertificate.asn1.raw, caCert.signatureValue.bits.bytes)));
    const rootPubKeyIndex = isCertSignedByRootPubkey.findIndex(valid => !!valid);
    const rootPubKey = rootPubKeys[rootPubKeyIndex];
    const isDebugRootPubKey = debug === null || debug === void 0 ? void 0 : debug.rootPubKeys.includes(rootPubKey);
    const caCertValidityFrom = caCert.tbsCertificate.validity.from.getTime();
    if (caCertValidityFrom > new Date().getTime()) {
        throw new Error(`CA validity from ${caCertValidityFrom} cant't be in the future!`);
    }
    if (!rootPubKey) {
        const configExpired = new Date(config.timestamp).getTime() < caCertValidityFrom;
        return {
            valid: false,
            configExpired,
            caPubKey,
            error: 'ROOT_PUBKEY_NOT_FOUND',
        };
    }
    const [subject] = deviceCert.tbsCertificate.subject;
    if (!subject.parameters || subject.algorithm !== '2.5.4.3') {
        throw new Error('Missing certificate subject');
    }
    const subjectValue = Buffer.from(subject.parameters.asn1.contents.subarray(0, 4)).toString();
    if (subjectValue !== deviceModel) {
        return {
            valid: false,
            caPubKey,
            error: 'INVALID_DEVICE_MODEL',
        };
    }
    const isDeviceCertValid = await verifySignature(Buffer.from(caCert.tbsCertificate.subjectPublicKeyInfo.bits.bytes), deviceCert.tbsCertificate.asn1.raw, deviceCert.signatureValue.bits.bytes);
    const challengePrefix = Buffer.from('AuthenticateDevice:');
    const prefixedChallenge = Buffer.concat([
        utils_1.bufferUtils.getChunkSize(challengePrefix.length),
        challengePrefix,
        utils_1.bufferUtils.getChunkSize(challenge.length),
        challenge,
    ]);
    const isSignatureValid = await verifySignature(Buffer.from(deviceCert.tbsCertificate.subjectPublicKeyInfo.bits.bytes), prefixedChallenge, (0, x509certificate_1.fixSignature)(Buffer.from(signature, 'hex')));
    if (rootPubKey && isDeviceCertValid && isSignatureValid) {
        if ((!isDebugRootPubKey && !caPubKeys.includes(caPubKey)) ||
            (isDebugRootPubKey && !(debug === null || debug === void 0 ? void 0 : debug.caPubKeys.includes(caPubKey)))) {
            const configExpired = new Date(config.timestamp).getTime() < caCertValidityFrom;
            return {
                valid: false,
                configExpired,
                caPubKey,
                error: 'CA_PUBKEY_NOT_FOUND',
            };
        }
        return {
            valid: true,
            caPubKey,
            debugKey: isDebugRootPubKey,
        };
    }
    if (!isDeviceCertValid) {
        return {
            valid: false,
            caPubKey,
            error: 'INVALID_DEVICE_CERTIFICATE',
        };
    }
    return {
        valid: false,
        caPubKey,
        error: 'INVALID_DEVICE_SIGNATURE',
    };
};
exports.verifyAuthenticityProof = verifyAuthenticityProof;
//# sourceMappingURL=verifyAuthenticityProof.js.map