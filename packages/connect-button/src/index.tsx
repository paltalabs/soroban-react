import React from 'react'
import {SorobanContextType} from '@soroban-react/core'


export interface ConnectButtonProps {
  label: string;
  isHigher?: boolean;
  sorobanContext: SorobanContextType;
}

export function ConnectButton({ label, isHigher, sorobanContext }: ConnectButtonProps) {
  const {connect} = sorobanContext
  const openConnectModal = async () => {
    await connect()
  }

  return (
    <button
      style={{ height: isHigher ? 50 : 38 }}
      onClick={openConnectModal}
    >
      {label}
    </button>
  )
}
