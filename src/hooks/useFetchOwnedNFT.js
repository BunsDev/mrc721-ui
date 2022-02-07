import { isObject } from 'lodash'
import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getOwnedNFTs } from '../utils/NFT'
import { useBridge } from '../state/bridge/hooks'

const useFetchOwnedNFT = (collection, chainId) => {
  const { account } = useWeb3React()
  const bridge = useBridge()
  const [tokenUris, setTokenUris] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let nfts = await getOwnedNFTs(account, chainId, collection)
      if (isObject(nfts)) {
        setTokenUris(nfts)
      }
    }

    if (account && collection && chainId) fetchData()
  }, [collection, chainId, account, bridge.fetch])
  return tokenUris
}

export default useFetchOwnedNFT
