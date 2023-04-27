import { useContext, Context } from 'react';
import { SorobanEventsContext, SorobanEventsContextType } from "./SorobanEventsContext";

export function useSorobanEvents() {
    const context = useContext(SorobanEventsContext as Context<SorobanEventsContextType | undefined>)
    if (!context) throw Error('useWeb3React can only be used within the Web3ReactProvider component')
    return context
  }