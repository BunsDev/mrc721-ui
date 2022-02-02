import { MRC721Bridge_ABI } from '../constants/ABI'
import { getContract } from './contractHelpers'
import { MRC721Bridge } from '../constants/contracts'
import { getWeb3NoAccount } from './web3'

export const getTokenId = async (chainId, address) => {
  const web3 = getWeb3NoAccount(chainId)
  const contractBridge = getContract(MRC721Bridge_ABI, MRC721Bridge[chainId], web3)
  const tokenId = await contractBridge.methods.getTokenId(address).call()
  return tokenId
}

export const checkNFTOnDestBridge = async (chainId, tokenId) => {
  const web3 = getWeb3NoAccount(chainId)
  const contractBridge = getContract(MRC721Bridge_ABI, MRC721Bridge[chainId], web3)
  const address = await contractBridge.methods.tokens(tokenId).call()
  return address
}
