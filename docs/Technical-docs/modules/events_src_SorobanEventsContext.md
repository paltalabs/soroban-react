[soroban-react](../README.md) / events/src/SorobanEventsContext

# Module: events/src/SorobanEventsContext

## Table of contents

### Interfaces

- [EventSubscription](../interfaces/events_src_SorobanEventsContext.EventSubscription.md)
- [SorobanEventsContextType](../interfaces/events_src_SorobanEventsContext.SorobanEventsContextType.md)

### Type Aliases

- [EventCallback](events_src_SorobanEventsContext.md#eventcallback)

### Variables

- [DefaultSorobanEventsContext](events_src_SorobanEventsContext.md#defaultsorobaneventscontext)
- [SorobanEventsContext](events_src_SorobanEventsContext.md#sorobaneventscontext)

## Type Aliases

### EventCallback

Ƭ **EventCallback**: (`event`: `SorobanClient.SorobanRpc.EventResponse`) => `void`

#### Type declaration

▸ (`event`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `SorobanClient.SorobanRpc.EventResponse` |

##### Returns

`void`

#### Defined in

[events/src/SorobanEventsContext.tsx:6](https://github.com/esteblock/soroban-react/blob/041a6c6/packages/events/src/SorobanEventsContext.tsx#L6)

## Variables

### DefaultSorobanEventsContext

• `Const` **DefaultSorobanEventsContext**: [`SorobanEventsContextType`](../interfaces/events_src_SorobanEventsContext.SorobanEventsContextType.md)

#### Defined in

[events/src/SorobanEventsContext.tsx:29](https://github.com/esteblock/soroban-react/blob/041a6c6/packages/events/src/SorobanEventsContext.tsx#L29)

___

### SorobanEventsContext

• `Const` **SorobanEventsContext**: `Context`<`undefined` \| [`SorobanEventsContextType`](../interfaces/events_src_SorobanEventsContext.SorobanEventsContextType.md)\>

#### Defined in

[events/src/SorobanEventsContext.tsx:25](https://github.com/esteblock/soroban-react/blob/041a6c6/packages/events/src/SorobanEventsContext.tsx#L25)
