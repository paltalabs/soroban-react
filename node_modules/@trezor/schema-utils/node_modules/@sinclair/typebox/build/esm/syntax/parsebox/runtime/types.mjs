/** Maps input to output. This is the default Mapping */
export const Identity = (value) => value;
/** Maps the output as the given parameter T */
export const As = (mapping) => (_) => mapping;
export function Tuple(...args) {
    const [parsers, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity];
    return { type: 'Tuple', parsers, mapping };
}
export function Union(...args) {
    const [parsers, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity];
    return { type: 'Union', parsers, mapping };
}
export function Const(...args) {
    const [value, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity];
    return { type: 'Const', value, mapping };
}
export function Ref(...args) {
    const [ref, mapping] = args.length === 2 ? [args[0], args[1]] : [args[0], Identity];
    return { type: 'Ref', ref, mapping };
}
export function String(...params) {
    const [options, mapping] = params.length === 2 ? [params[0], params[1]] : [params[0], Identity];
    return { type: 'String', options, mapping };
}
export function Ident(...params) {
    const mapping = params.length === 1 ? params[0] : Identity;
    return { type: 'Ident', mapping };
}
export function Number(...params) {
    const mapping = params.length === 1 ? params[0] : Identity;
    return { type: 'Number', mapping };
}
