import React, { useState } from 'react'
import { Button } from '../button/Button'
import { Type } from '../text/Text'
import WalletModal from '../modal/WalletModal'
import { useWeb3React } from '@web3-react/core'

const ActionButton = () => {
  const [open, setOpen] = useState(false)
  const { account } = useWeb3React()

  const handleConnectWallet = () => {
    setOpen(true)
  }

  let contentBtn = ''
  if (!account)
    contentBtn = (
      <Button margin="50px 0 0" background="#5F5CFE" onClick={handleConnectWallet}>
        <Type.LG color="#ffffff" fontSizeXS="16px">
          Connect Wallet
        </Type.LG>
      </Button>
    )
  return (
    <>
      {contentBtn}
      <WalletModal
        open={open}
        hide={() => {
          setOpen(!open)
        }}
      />
    </>
  )
}

export default ActionButton
