import React, { useState } from 'react'
import { Button } from '../button/Button'
import { Type } from '../text/Text'
import WalletModal from '../modal/WalletModal'
import { useWeb3React } from '@web3-react/core'
import { useActionBtn } from '../../state/application/hooks'
import { ActionBtnType } from '../../constants/constants'

const ActionButton = () => {
  const [open, setOpen] = useState(false)
  const { account } = useWeb3React()
  const actionBtn = useActionBtn()

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
  else {
    switch (actionBtn) {
      case ActionBtnType.SELECT:
        contentBtn = (
          <Button margin="25px 0 0" cursor="default" background="rgba(85, 81, 255, 0.15)">
            <Type.LG color="#8888db" fontSizeXS="16px" fontSizeXXS="14px">
              Select Asset and Chains
            </Type.LG>
          </Button>
        )
        break

      default:
        break
    }
  }

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
