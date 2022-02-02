// import { useWeb3React } from '@web3-react/core'
import { useMemo } from 'react'
import { MRC721Bridge_ABI } from '../constants/ABI'
import { getContract2 } from '../utils/contractHelpers'
import useActiveWeb3React from './useActiveWeb3React'

// returns null on errors
export function useContract(addressOrAddressMap, ABI, withSignerIfPossible) {
  const { library, account, chainId } = useActiveWeb3React()

  console.log({ library, account, chainId })

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null
    let address
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract2(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account])
}

export function useMRC721Bridge(address, withSignerIfPossible) {
  return useContract(address, MRC721Bridge_ABI, withSignerIfPossible)
}