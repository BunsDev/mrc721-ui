import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { ERC721_ABI } from '../constants/ABI'
import { MRC721Bridge } from '../constants/contracts'
import { getContract } from '../utils/contractHelpers'
import { getWeb3NoAccount } from '../utils/web3'

const useNFTIsApprove = (collection, chainId, fetch) => {
  const [isApproveAll, setIsApproveAll] = useState(false)
  const { account } = useWeb3React()

  useEffect(() => {
    const checkApprove = async () => {
      const web3 = getWeb3NoAccount(chainId)

      const contract = getContract(ERC721_ABI, collection.address[chainId], web3)
      let approve = await contract.methods.isApprovedForAll(account, MRC721Bridge[chainId]).call()
      setIsApproveAll(approve)
    }
    if (collection && chainId && account) checkApprove()
  }, [collection, chainId, account, fetch])

  return isApproveAll
}

export default useNFTIsApprove
