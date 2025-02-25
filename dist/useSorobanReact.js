"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SorobanContext = void 0;
exports.useSorobanReact = useSorobanReact;
var react_1 = require("react");
exports.SorobanContext = (0, react_1.createContext)(undefined);
/**
 * Custom hook to access the Soroban context.
 * @returns {SorobanContextType} - The Soroban context.
 * @throws {Error} - If the hook is not used within a Soroban context provider.
 */
function useSorobanReact() {
    var context = (0, react_1.useContext)(exports.SorobanContext);
    if (!context)
        throw Error('useSorobanReact can only be used within the useSorobanReact component');
    return context;
}
