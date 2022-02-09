import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { MRC721Bridge_ABI } from '../constants/ABI'
import { MRC721Bridge } from '../constants/contracts'
import { TransactionStatus, TransactionType } from '../constants/transactionStatus'
import { useBridge } from '../state/bridge/hooks'
import { useAddTransaction } from '../state/transactions/hooks'
import { getContract } from '../utils/contractHelpers'
import useWeb3 from './useWeb3'

const useNFTDeposit = (chainId) => {
  const bridge = useBridge()
  const web3 = useWeb3()
  const { account } = useWeb3React()
  const addTransaction = useAddTransaction()
  let hash = ''
  try {
    const contract = getContract(MRC721Bridge_ABI, MRC721Bridge[chainId], web3)
    let info = {
      type: TransactionType.DEPOSIT,
      chainId: bridge.fromChain?.id,
      fromChain: bridge.fromChain?.symbol,
      toChain: bridge.toChain?.symbol,
      tokenSymbol: bridge.collection?.name,
    }
    const deposit = useCallback(async () => {
      try {
        if (!contract) {
          console.error('contract is null')
          return
        }
        return contract.methods
          .deposit(bridge.nftId, bridge.toChain.id, bridge.NFTOnOriginBridge)
          .send({ from: account })
          .once('transactionHash', (tx) => {
            hash = tx
            addTransaction({
              ...info,
              hash,
              message: 'Depositing transaction is pending',
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
          })
          .once('error', (error) => {
            console.log('error in deposit', error)

            if (!hash) {
              addTransaction({
                ...info,
                message: 'Transaction rejected',
                status: TransactionStatus.FAILED,
              })
              return
            }
            addTransaction({
              ...info,
              hash,
              message: 'Transaction failed',
              status: TransactionStatus.FAILED,
            })
          })
      } catch (error) {
        console.log('Error happend in deposit call back', error)
      }
    }, [contract, account, addTransaction, chainId])
    return deposit
  } catch (error) {
    console.log('error happened in Deposit', error)
  }
}

export default useNFTDeposit
