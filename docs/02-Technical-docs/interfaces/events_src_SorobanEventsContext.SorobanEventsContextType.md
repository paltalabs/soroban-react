[soroban-react](../README.md) / [events/src/SorobanEventsContext](../modules/events_src_SorobanEventsContext.md) / SorobanEventsContextType

# Interface: SorobanEventsContextType

[events/src/SorobanEventsContext](../modules/events_src_SorobanEventsContext.md).SorobanEventsContextType

## Table of contents

### Properties

- [subscribe](events_src_SorobanEventsContext.SorobanEventsContextType.md#subscribe)
- [subscriptions](events_src_SorobanEventsContext.SorobanEventsContextType.md#subscriptions)
- [unsubscribe](events_src_SorobanEventsContext.SorobanEventsContextType.md#unsubscribe)

## Properties

### subscribe

• **subscribe**: (`subscription`: [`EventSubscription`](events_src_SorobanEventsContext.EventSubscription.md)) => `number`

#### Type declaration

▸ (`subscription`): `number`

##### Parameters

| Name | Type |
| :------ | :------ |
| `subscription` | [`EventSubscription`](events_src_SorobanEventsContext.EventSubscription.md) |

##### Returns

`number`

#### Defined in

[events/src/SorobanEventsContext.tsx:20](https://github.com/mauroepce/soroban-react/blob/486e5d4/packages/events/src/SorobanEventsContext.tsx#L20)

___

### subscriptions

• **subscriptions**: [`EventSubscription`](events_src_SorobanEventsContext.EventSubscription.md)[]

#### Defined in

[events/src/SorobanEventsContext.tsx:22](https://github.com/mauroepce/soroban-react/blob/486e5d4/packages/events/src/SorobanEventsContext.tsx#L22)

___

### unsubscribe

• **unsubscribe**: (`subscriptionId`: `number`) => `void`

#### Type declaration

▸ (`subscriptionId`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptionId` | `number` |

##### Returns

`void`

#### Defined in

[events/src/SorobanEventsContext.tsx:21](https://github.com/mauroepce/soroban-react/blob/486e5d4/packages/events/src/SorobanEventsContext.tsx#L21)
