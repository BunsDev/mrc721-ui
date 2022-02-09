import { useWeb3React } from '@web3-react/core'
import { useState, useEffect } from 'react'
import { ERC721_ABI } from '../constants/ABI'
import multicall from '../utils/multicall'
import { getWeb3NoAccount } from '../utils/web3'

const useNFTCheckOwner = (collection, nftId, chainId) => {
  const { account } = useWeb3React()
  const [owner, setOwner] = useState(false)

  useEffect(() => {
    //
    const checkOwner = async () => {
      try {
        let calls = []
        let notOwnerIds = []
        if (nftId.length > 0) {
          for (let i = 0; i < nftId.length; i++) {
            calls.push({
              address: collection.address[chainId],
              name: 'ownerOf',
              params: [nftId[i]],
            })
          }
          const web3 = getWeb3NoAccount(chainId)
          try {
            const owners = await multicall(web3, ERC721_ABI, calls, chainId)
            for (let i = 0; i < owners.length; i++) {
              if (owners[i][0] !== account) {
                notOwnerIds.push(nftId[i])
              }
            }
            setOwner(!notOwnerIds.length)
          } catch (error) {
            console.log('multicall error happened  in approve', error)
            return
          }
        }
      } catch (error) {
        console.log('error happend in check owner', error)
      }
    }
    //
    if (collection && nftId && chainId && account) checkOwner()
  }, [collection, nftId, chainId, account])

  return owner
}

export default useNFTCheckOwner
