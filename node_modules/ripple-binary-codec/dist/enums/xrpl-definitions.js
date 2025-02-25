"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XrplDefinitions = void 0;
const xrpl_definitions_base_1 = require("./xrpl-definitions-base");
const types_1 = require("../types");
/**
 * Stores the various types and fields for rippled to be used to encode/decode information later on.
 * Should be used instead of XrplDefinitionsBase since this defines default `types` for serializing/deserializing
 * ledger data.
 */
class XrplDefinitions extends xrpl_definitions_base_1.XrplDefinitionsBase {
    /**
     * Present rippled types in a typed and updatable format.
     * For an example of the input format see `definitions.json`
     * To generate a new definitions file from rippled source code, use this tool: https://github.com/RichardAH/xrpl-codec-gen
     *
     * See the definitions.test.js file for examples of how to create your own updated definitions.json.
     *
     * @param enums - A json encoding of the core types, transaction types, transaction results, transaction names, and fields.
     * @param additionalTypes - A list of SerializedType objects with the same name as the fields defined.
     *              These types will be included in addition to the coreTypes used on mainnet.
     */
    constructor(enums, additionalTypes) {
        const types = Object.assign({}, types_1.coreTypes, additionalTypes);
        super(enums, types);
    }
}
exports.XrplDefinitions = XrplDefinitions;
//# sourceMappingURL=xrpl-definitions.js.map