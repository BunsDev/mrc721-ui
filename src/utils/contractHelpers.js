import { MultiCall_ABI } from '../constants/ABI'
import { MULTICALL_NETWORKS } from '../constants/multicallContracts'
import { ChainMap } from '../constants/chainsMap'

const getContract = (abi, address, web3) => {
  return new web3.eth.Contract(abi, address)
}

export const getMultiCallContract = (web3, chainId = ChainMap.ETH) => {
  return getContract(MultiCall_ABI, MULTICALL_NETWORKS[chainId], web3)
}
