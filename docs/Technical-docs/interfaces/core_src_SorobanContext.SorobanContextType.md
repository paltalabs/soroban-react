---
title: SorobanContextType
---
[soroban-react](../README.md) / [core/src/SorobanContext](../modules/core_src_SorobanContext.md) / SorobanContextType

# Interface: SorobanContextType

[core/src/SorobanContext](../modules/core_src_SorobanContext.md).SorobanContextType

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
- [disconnect](core_src_SorobanContext.SorobanContextType.md#disconnect)
- [server](core_src_SorobanContext.SorobanContextType.md#server)

## Properties

### activeChain

• `Optional` **activeChain**: [`WalletChain`](types_src.WalletChain.md)

#### Defined in

[core/src/SorobanContext.tsx:20](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L20)

___

### activeConnector

• `Optional` **activeConnector**: [`Connector`](../modules/types_src.md#connector)

#### Defined in

[core/src/SorobanContext.tsx:22](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L22)

___

### address

• `Optional` **address**: `string`

#### Defined in

[core/src/SorobanContext.tsx:21](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L21)

___

### appName

• `Optional` **appName**: `string`

#### Defined in

[core/src/SorobanContext.tsx:17](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L17)

___

### autoconnect

• `Optional` **autoconnect**: `boolean`

#### Defined in

[core/src/SorobanContext.tsx:16](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L16)

___

### chains

• **chains**: [`WalletChain`](types_src.WalletChain.md)[]

#### Defined in

[core/src/SorobanContext.tsx:18](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L18)

___

### connect

• **connect**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[core/src/SorobanContext.tsx:24](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L24)

___

### connectors

• **connectors**: [`Connector`](../modules/types_src.md#connector)[]

#### Defined in

[core/src/SorobanContext.tsx:19](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L19)

___

### disconnect

• **disconnect**: () => `Promise`<`void`\>

#### Type declaration

▸ (): `Promise`<`void`\>

##### Returns

`Promise`<`void`\>

#### Defined in

[core/src/SorobanContext.tsx:25](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L25)

___

### server

• `Optional` **server**: `Server`

#### Defined in

[core/src/SorobanContext.tsx:23](https://github.com/mauroepce/soroban-react/blob/546de55/packages/core/src/SorobanContext.tsx#L23)
