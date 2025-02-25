"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformCertificate = void 0;
const schema_utils_1 = require("@trezor/schema-utils");
const pathUtils_1 = require("../../utils/pathUtils");
const constants_1 = require("../../constants");
const cardano_1 = require("../../types/api/cardano");
const ipv4AddressToHex = (ipv4Address) => Buffer.from(ipv4Address.split('.').map(ipPart => parseInt(ipPart, 10))).toString('hex');
const ipv6AddressToHex = (ipv6Address) => ipv6Address.split(':').join('');
const validatePoolRelay = (relay) => {
    (0, schema_utils_1.Assert)(cardano_1.CardanoPoolRelay, relay);
    if (relay.type === constants_1.PROTO.CardanoPoolRelayType.SINGLE_HOST_IP) {
        if (!relay.ipv4Address && !relay.ipv6Address) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'Either ipv4Address or ipv6Address must be supplied');
        }
    }
    else if (relay.type === constants_1.PROTO.CardanoPoolRelayType.SINGLE_HOST_NAME) {
        if (!relay.hostName) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'hostName must be supplied');
        }
        if (!relay.port) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'port must be supplied');
        }
    }
    else if (relay.type === constants_1.PROTO.CardanoPoolRelayType.MULTIPLE_HOST_NAME) {
        if (!relay.hostName) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'hostName must be supplied');
        }
    }
};
const validatePoolOwners = (owners) => {
    owners.forEach(owner => {
        if (owner.stakingKeyPath) {
            (0, pathUtils_1.validatePath)(owner.stakingKeyPath, 5);
        }
        if (!owner.stakingKeyHash && !owner.stakingKeyPath) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'Either stakingKeyHash or stakingKeyPath must be supplied');
        }
    });
    const ownersAsPathCount = owners.filter(owner => !!owner.stakingKeyPath).length;
    if (ownersAsPathCount !== 1) {
        throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'Exactly one pool owner must be given as a path');
    }
};
const validatePoolParameters = (poolParameters) => {
    (0, schema_utils_1.Assert)(cardano_1.CardanoPoolParameters, poolParameters);
    validatePoolOwners(poolParameters.owners);
    poolParameters.relays.forEach(validatePoolRelay);
};
const validateDRep = (dRep) => {
    (0, schema_utils_1.Assert)(cardano_1.CardanoDRep, dRep);
    if (dRep.type === constants_1.PROTO.CardanoDRepType.KEY_HASH && !dRep.keyHash) {
        throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'keyHash must be supplied for KEY_HASH dRep type');
    }
    else if (dRep.type === constants_1.PROTO.CardanoDRepType.SCRIPT_HASH && !dRep.scriptHash) {
        throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'scriptHash must be supplied for SCRIPT_HASH dRep type');
    }
};
const transformPoolParameters = (poolParameters) => {
    if (!poolParameters) {
        return { poolParameters: undefined, poolOwners: [], poolRelays: [] };
    }
    validatePoolParameters(poolParameters);
    return {
        poolParameters: {
            pool_id: poolParameters.poolId,
            vrf_key_hash: poolParameters.vrfKeyHash,
            pledge: poolParameters.pledge,
            cost: poolParameters.cost,
            margin_numerator: poolParameters.margin.numerator,
            margin_denominator: poolParameters.margin.denominator,
            reward_account: poolParameters.rewardAccount,
            metadata: poolParameters.metadata,
            owners_count: poolParameters.owners.length,
            relays_count: poolParameters.relays.length,
        },
        poolOwners: poolParameters.owners.map(owner => ({
            staking_key_hash: owner.stakingKeyHash,
            staking_key_path: owner.stakingKeyPath
                ? (0, pathUtils_1.validatePath)(owner.stakingKeyPath, 5)
                : undefined,
        })),
        poolRelays: poolParameters.relays.map(relay => ({
            type: relay.type,
            ipv4_address: relay.ipv4Address ? ipv4AddressToHex(relay.ipv4Address) : undefined,
            ipv6_address: relay.ipv6Address ? ipv6AddressToHex(relay.ipv6Address) : undefined,
            host_name: relay.hostName,
            port: relay.port,
        })),
    };
};
const transformDRep = (dRep) => {
    if (!dRep) {
        return undefined;
    }
    validateDRep(dRep);
    return {
        type: dRep.type,
        key_hash: dRep.keyHash,
        script_hash: dRep.scriptHash,
    };
};
const transformCertificate = (certificate) => {
    (0, schema_utils_1.Assert)(cardano_1.CardanoCertificate, certificate);
    if (certificate.type === constants_1.PROTO.CardanoCertificateType.STAKE_DELEGATION) {
        if (!certificate.pool) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'pool must be supplied for STAKE_DELEGATION');
        }
    }
    if (certificate.type === constants_1.PROTO.CardanoCertificateType.STAKE_POOL_REGISTRATION) {
        if (!certificate.poolParameters) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'poolParameters must be supplied for STAKE_POOL_REGISTRATION');
        }
    }
    if (certificate.type === constants_1.PROTO.CardanoCertificateType.STAKE_REGISTRATION_CONWAY ||
        certificate.type === constants_1.PROTO.CardanoCertificateType.STAKE_DEREGISTRATION_CONWAY) {
        if (!certificate.deposit) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'deposit must be supplied for STAKE_REGISTRATION_CONWAY or STAKE_DEREGISTRATION_CONWAY');
        }
    }
    if (certificate.type === constants_1.PROTO.CardanoCertificateType.VOTE_DELEGATION) {
        if (!certificate.dRep) {
            throw constants_1.ERRORS.TypedError('Method_InvalidParameter', 'dRep must be supplied for VOTE_DELEGATION');
        }
    }
    const { poolParameters, poolOwners, poolRelays } = transformPoolParameters(certificate.poolParameters);
    const dRep = transformDRep(certificate.dRep);
    return {
        certificate: {
            type: certificate.type,
            path: certificate.path ? (0, pathUtils_1.validatePath)(certificate.path, 5) : undefined,
            script_hash: certificate.scriptHash,
            key_hash: certificate.keyHash,
            pool: certificate.pool,
            pool_parameters: poolParameters,
            deposit: certificate.deposit,
            drep: dRep,
        },
        poolOwners,
        poolRelays,
    };
};
exports.transformCertificate = transformCertificate;
//# sourceMappingURL=cardanoCertificate.js.map