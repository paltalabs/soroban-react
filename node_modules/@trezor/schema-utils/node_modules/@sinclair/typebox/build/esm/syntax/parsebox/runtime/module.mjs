import { Parse } from './parse.mjs';
// ------------------------------------------------------------------
// Module
// ------------------------------------------------------------------
// prettier-ignore
export class Module {
    constructor(properties) {
        this.properties = properties;
    }
    /** Parses using one of the parsers defined on this instance */
    Parse(...args) {
        const [key, code, context] = args.length === 3 ? [args[0], args[1], args[2]] :
            args.length === 2 ? [args[0], args[1], undefined] :
                (() => { throw Error('Invalid parse arguments'); })();
        return Parse(this.properties[key], this.properties, code, context);
    }
}
