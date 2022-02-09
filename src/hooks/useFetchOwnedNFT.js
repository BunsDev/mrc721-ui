import { isObject } from 'lodash'
import { useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { getOwnedNFTs } from '../utils/NFT'
import { useBridge } from '../state/bridge/hooks'

const useFetchOwnedNFT = (collection, chainId) => {
  const { account } = useWeb3React()
  const bridge = useBridge()
  const [tokenUris, setTokenUris] = useState({})
  const [fetch, setFetch] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetch(true)
        let nfts = await getOwnedNFTs(account, chainId, collection)
        if (isObject(nfts)) {
          setTokenUris(nfts)
        }
        setFetch(false)
      } catch (error) {
        console.log('Error happend in fetchOwnedNFT', error)
      }
    }

    if (account && collection && chainId) fetchData()
  }, [collection, chainId, account, bridge.fetch])
  return { tokenUris, fetch }
}

export default useFetchOwnedNFT
