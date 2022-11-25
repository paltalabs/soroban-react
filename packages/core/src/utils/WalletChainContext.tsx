import React from 'react';
import { WalletChain} from '@soroban-react/types';

export const WalletChainContext = React.createContext<WalletChain[]>([]);

export const useWalletChains = () => React.useContext(WalletChainContext);

export const useWalletChainsById = () => {
  const walletChains = useWalletChains();

  return React.useMemo(() => {
    const walletChainsById: Record<string, WalletChain> = {};

    walletChains.forEach((rkChain: any)=> {
      walletChainsById[rkChain.id] = rkChain;
    });

    return walletChainsById;
  }, [walletChains]);
};
