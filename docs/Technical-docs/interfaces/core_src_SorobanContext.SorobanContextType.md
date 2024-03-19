---
title: SorobanContextType
---
[soroban-react](../README.md) / [core/src/SorobanContext](../modules/core_src_SorobanContext.md) / SorobanContextType

# Interface: SorobanContextType

[core/src/SorobanContext](../modules/core_src_SorobanContext.md).SorobanContextType

Interface for the Soroban context.

## Table of contents

### Properties

- [activeChain](core_src_SorobanContext.SorobanContextType.md#activechain)
- [activeConnector](core_src_SorobanContext.SorobanContextType.md#activeconnector)
- [address](core_src_SorobanContext.SorobanContextType.md#address)
- [appName](core_src_SorobanContext.SorobanContextType.md#appname)
- [autoconnect](core_src_SorobanContext.SorobanContextType.md#autoconnect)
- [chains](core_src_SorobanContext.SorobanContextType.md#chains)
- [connect](core_src_SorobanContext.SorobanContextType.md#connect)
- [connectors](core_src_SorobanContext.SorobanContextType.md#connectors)
- [deployments](core_src_SorobanContext.SorobanContextType.md#deployments)
- [disconnect](core_src_SorobanContext.SorobanContextType.md#disconnect)
- [server](core_src_SorobanContext.SorobanContextType.md#server)
- [serverHorizon](core_src_SorobanContext.SorobanContextType.md#serverhorizon)
- [setActiveChain](core_src_SorobanContext.SorobanContextType.md#setactivechain)
- [setActiveConnectorAndConnect](core_src_SorobanContext.SorobanContextType.md#setactiveconnectorandconnect)

## Properties

### activeChain

• `Optional` **activeChain**: `WalletChain`

#### Defined in

[core/src/SorobanContext.tsx:33](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L33)

___

### activeConnector

• `Optional` **activeConnector**: `Connector`

#### Defined in

[core/src/SorobanContext.tsx:37](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L37)

___

### address

• `Optional` **address**: `string`

#### Defined in

[core/src/SorobanContext.tsx:35](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L35)

___

### appName

• `Optional` **appName**: `string`

#### Defined in

[core/src/SorobanContext.tsx:27](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L27)

___

### autoconnect

• `Optional` **autoconnect**: `boolean`

#### Defined in

[core/src/SorobanContext.tsx:25](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L25)

___

### chains

• **chains**: `WalletChain`[]

#### Defined in

[core/src/SorobanContext.tsx:29](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L29)

___

### connect

• **connect**: () => `Promise`\<`void`\>

#### Type declaration

▸ (): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

#### Defined in

[core/src/SorobanContext.tsx:43](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L43)

___

### connectors

• **connectors**: `Connector`[]

#### Defined in

[core/src/SorobanContext.tsx:31](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L31)

___

### deployments

• `Optional` **deployments**: `ContractDeploymentInfo`[]

#### Defined in

[core/src/SorobanContext.tsx:51](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L51)

___

### disconnect

• **disconnect**: () => `Promise`\<`void`\>

#### Type declaration

▸ (): `Promise`\<`void`\>

##### Returns

`Promise`\<`void`\>

#### Defined in

[core/src/SorobanContext.tsx:45](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L45)

___

### server

• `Optional` **server**: `Server`

#### Defined in

[core/src/SorobanContext.tsx:39](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L39)

___

### serverHorizon

• `Optional` **serverHorizon**: `Server`

#### Defined in

[core/src/SorobanContext.tsx:41](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L41)

___

### setActiveChain

• `Optional` **setActiveChain**: (`chain`: `WalletChain`) => `void`

#### Type declaration

▸ (`chain`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `chain` | `WalletChain` |

##### Returns

`void`

#### Defined in

[core/src/SorobanContext.tsx:47](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L47)

___

### setActiveConnectorAndConnect

• `Optional` **setActiveConnectorAndConnect**: (`connector`: `Connector`) => `void`

#### Type declaration

▸ (`connector`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `connector` | `Connector` |

##### Returns

`void`

#### Defined in

[core/src/SorobanContext.tsx:49](https://github.com/paltalabs/soroban-react/blob/cce29de/packages/core/src/SorobanContext.tsx#L49)
