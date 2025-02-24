import { useContext, Context, createContext} from 'react'
import { SorobanContextType } from './types'

export const SorobanContext = createContext<SorobanContextType | undefined>(
  undefined
)

/**
 * Custom hook to access the Soroban context.
 * @returns {SorobanContextType} - The Soroban context.
 * @throws {Error} - If the hook is not used within a Soroban context provider.
 */
export function useSorobanReact() {
  const context = useContext(
    SorobanContext as Context<SorobanContextType>
  )
  if (!context)
    throw Error(
      'useSorobanReact can only be used within the useSorobanReact component'
    )
  return context
}
