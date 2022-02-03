import { isObject } from 'lodash'
import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getOwnedNFTs } from '../utils/NFT'

const useFetchOwnedNFT = (collection, chainId) => {
  const { account } = useWeb3React()
  const [tokenUris, setTokenUris] = useState({})

  useEffect(() => {
    const fetch = async () => {
      let nfts = await getOwnedNFTs(account, chainId, collection)
      if (isObject(nfts)) {
        setTokenUris(nfts)
      }
    }

    if (account && collection && chainId) fetch()
  }, [collection, chainId, account])
  return tokenUris
}

export default useFetchOwnedNFT
