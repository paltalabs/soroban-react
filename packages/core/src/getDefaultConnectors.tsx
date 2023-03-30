import { Connector } from '@soroban-react/types';
import { freighter } from '@soroban-react/freighter';

export const getDefaultConnectors = () :  Connector[] => {

  const list: Connector[] =[freighter()]

  return list
};
