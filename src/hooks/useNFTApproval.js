import { useCallback } from 'react'
import { ERC721_ABI } from '../constants/ABI'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'
import { MRC721Bridge } from '../constants/contracts'
import { useWeb3React } from '@web3-react/core'
import { useAddTransaction } from '../state/transactions/hooks'
import { TransactionStatus, TransactionType } from '../constants/transactionStatus'
import { useBridge } from '../state/bridge/hooks'

const useNFTApproval = (address, chainId) => {
  const addTransaction = useAddTransaction()
  const bridge = useBridge()

  try {
    const web3 = useWeb3()
    const { account } = useWeb3React()
    let hash = ''
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
        return new Promise((resolve, reject) => {
          contract.methods
            .setApprovalForAll(MRC721Bridge[chainId], true)
            .send({ from: account })
            .once('transactionHash', (tx) => {
              hash = tx
              addTransaction({
                ...info,
                hash: tx,
                message: 'Approving transaction is pending',
                status: TransactionStatus.PENDING,
              })
            })
            .once('receipt', ({ transactionHash }) => {
              addTransaction({
                ...info,
                hash: transactionHash,
                message: 'Transaction successful',
                status: TransactionStatus.SUCCESS,
              })
              resolve()
            })
            .once('error', (error) => {
              if (!hash) {
                addTransaction({ ...info, message: 'Transaction rejected', status: TransactionStatus.FAILED })
                console.log('error happend in useNFTAPPROVAL', error)
                return
              }
              addTransaction({ ...info, hash, message: 'Transaction rejected', status: TransactionStatus.FAILED })
              reject()
            })
        })
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
