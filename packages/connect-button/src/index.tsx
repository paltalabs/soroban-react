import React from 'react'
import {SorobanContextType} from '@soroban-react/core'

export interface ConnectButtonProps {
  label: string;
  isHigher?: boolean;
  sorobanContext: SorobanContextType;
}

const buttonStyle: any = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "16px 12px",
  gap: "8px",
  background: "#1a1523",
  borderRadius: "8px",
  border: "0",
  height: "38px",
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "22px",
  color: "#ffffff",
  cursor: "pointer",
}


export function ConnectButton({ label, isHigher, sorobanContext }: ConnectButtonProps) {
  const {connect} = sorobanContext
  const openConnectModal = async () => {
    await connect()
  }

  return (
    <button
      className={buttonStyle}
      style={{ height: isHigher ? 50 : 38 }}
      onClick={openConnectModal}
    >
      {label}
    </button>
  )
}
