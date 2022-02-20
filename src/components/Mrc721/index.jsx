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
import { useBridge, useSetFetch } from '../../state/bridge/hooks'
import { useWeb3React } from '@web3-react/core'
import { useTx } from '../../state/transactions/hooks'
import { TransactionStatus, TransactionType } from '../../constants/transactionStatus'
import useNFTApproval from '../../hooks/useNFTApproval'
import useNFTDeposit from '../../hooks/useNFTDeposit'
import useFetchClaim from '../../hooks/useFetchClaim'
import { ActionBtnType } from '../../constants/constants'

const MRC721 = () => {
  const { account, chainId } = useWeb3React()
  const bridge = useBridge()
  const claims = useFetchClaim()
  const setFetch = useSetFetch()

  const approve = useNFTIsApprove(bridge.collection, bridge.fromChain?.id, bridge.fetch)
  const tx = useTx()
  const setApproval = useNFTApproval(bridge.collection?.address[bridge.fromChain?.id], bridge.fromChain?.id)

  const deposit = useNFTDeposit(bridge.fromChain?.id)

  const handleApprove = async () => {
    if (!account || approve) return
    if (!chainId) return
    if (bridge.fromChain.id !== chainId) return
    if (tx.type === TransactionType.APPROVE && tx.status === TransactionStatus.PENDING) return
    setApproval().then(() => setFetch(ActionBtnType.APPROVE))
  }

  const handleDeposit = async () => {
    if (!account) return
    if (!chainId) return
    if (tx.type === TransactionType.DEPOSIT && tx.status === TransactionStatus.PENDING) return
    if (bridge.fromChain.id !== chainId) return
    deposit()
      .then(() => setFetch(Date.now()))
      .catch(() => setFetch(Date.now()))
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
        {claims.length > 0 && <Claim claims={claims} />}
      </Wrapper>
    </Container>
  )
}

export default MRC721
