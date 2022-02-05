import React from 'react'
import { Flex } from 'rebass'
import ActionButton from '../actionButton/ActionButton'
import Claim from '../claim/Claim'
import { Container, Wrapper } from '../container/Container'
import Deposit from '../deposit'
import { Type } from '../text/Text'
import Transaction from '../transaction/Transaction'
import MuonNetwork from '../common/MuonNetwork'
import useNFTIsApprove from '../../hooks/useNFTIsApprove'
import { useBridge } from '../../state/bridge/hooks'
import { useWeb3React } from '@web3-react/core'
import { useTx } from '../../state/transactions/hooks'
import { TransactionStatus, TransactionType } from '../../constants/transactionStatus'
import useNFTApproval from '../../hooks/useNFTApproval'
import useNFTDeposit from '../../hooks/useNFTDeposit'

const MRC721 = () => {
  const { account, chainId } = useWeb3React()
  const bridge = useBridge()
  const approve = useNFTIsApprove(bridge.collection, bridge.fromChain?.id)
  const tx = useTx()
  const setApproval = useNFTApproval(bridge.collection?.address[bridge.fromChain?.id], bridge.fromChain?.id)

  const deposit = useNFTDeposit(bridge.fromChain?.id)

  const handleApprove = async () => {
    if (!account || approve) return
    if (!chainId) return
    if (bridge.fromChain.id !== chainId) return
    if (tx.type === TransactionType.APPROVE && tx.status === TransactionStatus.PENDING) return
    await setApproval()
  }

  const handleDeposit = async () => {
    if (!account) return
    if (!chainId) return
    if (tx.type === TransactionType.DEPOSIT && tx.status === TransactionStatus.PENDING) return
    if (bridge.fromChain.id !== chainId) return
    await deposit()
  }

  return (
    <Container>
      <Wrapper maxWidth="300px" width="100%"></Wrapper>
      <Wrapper maxWidth="470px" width="100%">
        <Deposit />
        <ActionButton handleApprove={handleApprove} handleDeposit={handleDeposit} />

        <Flex justifyContent="center" margin="50px 0 20px">
          <Type.SM color="#313144" fontSize="10px" padding="10px">
            Powered by
          </Type.SM>
          <MuonNetwork logo="muonNetworkBlack" />
        </Flex>
      </Wrapper>
      <Wrapper maxWidth="300px" width="100%">
        {tx.status && <Transaction />}
        <Claim />
      </Wrapper>
    </Container>
  )
}

export default MRC721
