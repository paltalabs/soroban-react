import { WalletChain, ConnectorList } from '@soroban-react/types';
import { freighter } from '@soroban-react/freighter';

export const getDefaultConnectors = (
  {appName,chains,}: {appName: string; chains: WalletChain[];})
    : {

  connectors: ConnectorList;} => {
  const connectors: ConnectorList = [
    {
      groupName: 'Popular',
      connectors: [
        freighter({ appName, chains }),
      ],
    },
  ];

  return {
    connectors,
  };
};
