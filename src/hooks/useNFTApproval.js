import { useCallback } from 'react'
import { ERC721_ABI } from '../constants/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { MRC721Bridge } from '../constants/contracts'
import { useWeb3React } from '@web3-react/core'
import { useAddTransaction } from '../state/transactions/hooks'
import { TransactionType } from '../constants/transactionStatus'
import { useBridge } from '../state/bridge/hooks'
import { sendTransaction } from '../utils/sendTx'

const useNFTApproval = (address, chainId) => {
  const addTransaction = useAddTransaction()
  const bridge = useBridge()

  try {
    const web3 = useWeb3()
    const { account } = useWeb3React()
    let info = {
      type: TransactionType.APPROVE,
      chainId: bridge.fromChain?.id,
      fromChain: bridge.fromChain?.symbol,
      toChain: bridge.toChain?.symbol,
      tokenSymbol: bridge.collection?.name,
    }
    let contract = getContract(ERC721_ABI, address, web3)

    const approve = useCallback(async () => {
      try {
        if (!address) {
          console.error('no token')
          return
        }

        if (!contract) {
          console.error('tokenContract is null')
          return
        }
        return sendTransaction(
          contract,
          'setApprovalForAll',
          [MRC721Bridge[chainId], true],
          account,
          info,
          addTransaction
        )
      } catch (error) {
        console.log('error happened in Approve callback', error)
      }
    }, [address, contract, account, addTransaction, chainId])
    return approve
  } catch (error) {
    console.log('error happened in Approve', error)
  }
}

export default useNFTApproval
