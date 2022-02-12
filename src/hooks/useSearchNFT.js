import { useEffect, useState } from 'react'
import { useSearchQuery } from '../state/application/hooks'
import { useBridge } from '../state/bridge/hooks'
import { combineDefaultAndLocalStorage, findAndAddNFT } from '../utils/NFT'

const useSearchNFT = () => {
  const searchQuery = useSearchQuery()
  const bridge = useBridge()
  const nfts = combineDefaultAndLocalStorage()
  const [NFTs, setNFTs] = useState(nfts)

  useEffect(() => {
    const searchNFT = async () => {
      try {
        // search address
        if (searchQuery && bridge.fromChain) {
          let result = await findAndAddNFT(searchQuery, bridge.fromChain.id)
          setNFTs(result)
        }
        //  filter based on chain
        else if (bridge.fromChain && nfts) {
          const filter = nfts.filter((item) => bridge.fromChain.id in item.address)
          setNFTs(filter)
        }
        // show all
        else {
          setNFTs(nfts)
        }
      } catch (error) {
        console.log('Error happend in searchNFT', error)
      }
    }
    searchNFT()
  }, [searchQuery, bridge.fromChain])
  return NFTs
}

export default useSearchNFT
