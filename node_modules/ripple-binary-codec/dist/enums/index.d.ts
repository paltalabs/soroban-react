import { XrplDefinitionsBase, FieldInstance, Bytes } from './xrpl-definitions-base';
/**
 * By default, coreTypes from the `types` folder is where known type definitions are initialized to avoid import cycles.
 */
declare const DEFAULT_DEFINITIONS: XrplDefinitionsBase;
declare const Type: import("./bytes").BytesLookup;
declare const LedgerEntryType: import("./bytes").BytesLookup;
declare const TransactionType: import("./bytes").BytesLookup;
declare const TransactionResult: import("./bytes").BytesLookup;
declare const Field: import("./field").FieldLookup;
declare const TRANSACTION_TYPES: string[];
export { Bytes, XrplDefinitionsBase, DEFAULT_DEFINITIONS, Field, FieldInstance, Type, LedgerEntryType, TransactionResult, TransactionType, TRANSACTION_TYPES, };
