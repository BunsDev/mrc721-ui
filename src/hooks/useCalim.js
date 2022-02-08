import { useCallback } from 'react'
import useWeb3 from './useWeb3'
import { getContract } from '../utils/contractHelpers'
import { MRC721Bridge_ABI } from '../constants/ABI'
import { MRC721Bridge } from '../constants/contracts'
import MuonResponse from '../utils/MuonResponse'
import { useAddTransaction } from '../state/transactions/hooks'
import { rpcConfig } from '../constants/chainsMap'
import { useWeb3React } from '@web3-react/core'
import { TransactionStatus, TransactionType } from '../constants/transactionStatus'

const useCalim = () => {
  const web3 = useWeb3()
  const { account, chainId } = useWeb3React()
  const addTransaction = useAddTransaction()

  let hash = ''
  const doClaim = useCallback(
    async (claim) => {
      try {
        let info = {
          type: TransactionType.CLAIM,
          chainId: claim.toChain,
          fromChain: rpcConfig[claim.toChain].symbol,
          toChain: '',
          tokenSymbol: claim.name,
        }
        const muonResponse = await MuonResponse('mrc721_bridge', 'claim', {
          depositAddress: MRC721Bridge[claim.fromChain],
          depositTxId: claim.txId,
          depositNetwork: claim.fromChain,
        })

        if (!muonResponse.confirmed) {
          addTransaction({
            ...info,
            message: muonResponse.errorMessage,
            status: TransactionStatus.FAILED,
          })
          return
        }
        console.log({ muonResponse })
        let { sigs, reqId } = muonResponse
        const contract = getContract(MRC721Bridge_ABI, MRC721Bridge[chainId], web3)
        return new Promise((resolve, reject) => {
          contract.methods
            .claim(account, claim.nftId, [claim.fromChain, claim.toChain, claim.tokenId, claim.txId], reqId, sigs)
            .send({ from: account })
            .once('transactionHash', (tx) => {
              hash = tx
              addTransaction({
                ...info,
                hash,
                message: 'Claiming transaction is pending',
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
                console.log('error in calim', error)
                reject()

                return
              }
              addTransaction({ ...info, hash, message: 'Transaction failed', status: TransactionStatus.FAILED })
              reject()
            })
        })
      } catch (error) {
        console.log('error happened in useClaim', error)
      }
    },
    [account, addTransaction]
  )
  return doClaim
}

export default useCalim
