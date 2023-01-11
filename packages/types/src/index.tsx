export type InstructionStepName = 'install' | 'create' | 'scan';

export interface NetworkDetails {
  network: string;
  networkUrl: string;
  networkPassphrase: string;
}

export type Connector = {
  id: string;
  name: string;
  shortName?: string;
  iconUrl: string | (() => Promise<string>);
  iconBackground: string;
  installed?: boolean;
  downloadUrls?: {
    android?: string;
    ios?: string;
    browserExtension?: string;
    qrCode?: string;
  };
  isConnected: () => boolean;
  getNetworkDetails: () => Promise<NetworkDetails>;
  getPublicKey: () => Promise<string>;
  signTransaction: (xdr: string, opts?: { network?: string; networkPassphrase?: string; accountToSign?: string }) => Promise<string>;
};

export type ConnectorList = {
  groupName: string;
  connectors: Connector[]
}[];


export interface WalletChain {
  id: string;
  name?: string;
  networkPassphrase: string;
  iconBackground?: string;
  iconUrl?: string | null;
  // TODO: Use this to indicate which chains a dapp supports
  unsupported?: boolean;
};

export type ChainMetadata = WalletChain;