import { Context } from 'react';
import { SorobanContextType } from './types';
export declare const SorobanContext: Context<SorobanContextType>;
/**
 * Custom hook to access the Soroban context.
 * @returns {SorobanContextType} - The Soroban context.
 * @throws {Error} - If the hook is not used within a Soroban context provider.
 */
export declare function useSorobanReact(): SorobanContextType;
