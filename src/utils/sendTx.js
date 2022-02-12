import { TransactionStatus } from '../constants/transactionStatus'

export const sendTransaction = (contract, methodName, params, account, info, addTransaction) => {
  return new Promise((resolve, reject) => {
    try {
      let hash = null
      contract.methods[methodName](...params)
        .send({ from: account })
        .once('transactionHash', (tx) => {
          hash = tx
          addTransaction({
            ...info,
            hash,
            message: `${info.type}ing transaction is pending.`,
            status: TransactionStatus.PENDING,
          })
        })
        .once('receipt', ({ transactionHash }) => {
          addTransaction({
            ...info,
            hash: transactionHash,
            message: 'Transaction successful.',
            status: TransactionStatus.SUCCESS,
          })
          resolve()
        })
        .once('error', (error) => {
          if (!hash) {
            addTransaction({
              ...info,
              message: 'Transaction rejected.',
              status: TransactionStatus.FAILED,
            })
            return
          }
          addTransaction({
            ...info,
            hash,
            message: 'Transaction failed.',
            status: TransactionStatus.FAILED,
          })
          console.log('error in sendTX', error)
          reject()
        })
    } catch (error) {
      console.log('error happend in send Transaction', error)
    }
  })
}
