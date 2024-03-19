import { freighter } from '@soroban-react/freighter'
import { Connector } from '@soroban-react/types'
import { xbull } from '@soroban-react/xbull'

/**
 * Retrieves default wallet connectors.
 * These connectors include for now 'freighter' and 'xbull'.
 * @returns An array of default connectors.
 */
export const getDefaultConnectors = (): Connector[] => {
  const list: Connector[] = [freighter(),xbull()]

  return list
}
