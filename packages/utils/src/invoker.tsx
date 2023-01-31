import * as SorobanClient from 'soroban-client'
let xdr = SorobanClient.xdr

export const invoker = xdr.ScVal.scvObject(
    xdr.ScObject.scoVec([xdr.ScVal.scvSymbol('Invoker')])
)