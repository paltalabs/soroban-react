import { freighter } from '@soroban-react/freighter'
import { Connector } from '@soroban-react/types'

export const getDefaultConnectors = (): Connector[] => {
  const list: Connector[] = [freighter()]

  return list
}
