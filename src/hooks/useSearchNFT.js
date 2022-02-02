import { useEffect, useState } from 'react'
import { useSearchQuery } from '../state/application/hooks'
import { useBridge } from '../state/bridge/hooks'
import { findAndAddNFT } from '../utils/NFT'

const useSearchNFT = () => {
  const searchQuery = useSearchQuery()
  const bridge = useBridge()
  const localStorageNFTs = JSON.parse(localStorage.getItem('NFTs'))
  const [NFTs, setNFTs] = useState(localStorageNFTs)

  useEffect(() => {
    const searchNFT = async () => {
      try {
        // search address
        if (searchQuery && bridge.fromChain) {
          console.log('step 1')
          let result = await findAndAddNFT(searchQuery, bridge.fromChain.id)
          setNFTs(result)
        }
        //  filter based on chain
        else if (bridge.fromChain && localStorageNFTs) {
          console.log('step 2')
          const filter = localStorageNFTs.filter((item) => bridge.fromChain.id in item.address)
          setNFTs(filter)
        }
        // show all
        else {
          console.log('step 3')
          setNFTs(localStorageNFTs)
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
