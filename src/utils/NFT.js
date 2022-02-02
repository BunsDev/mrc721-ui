import { AddressZero } from '@ethersproject/constants'
import multicall from './multicall'
import { isAddress } from './isAddress'
import { toCheckSumAddress } from './toCheckSumAddress'
import { escapeRegExp } from './utils'
import { ERC721_ABI } from '../constants/ABI'
import { getWeb3NoAccount } from './web3'

export const getNFT = async (address, chainId) => {
  try {
    const web3 = getWeb3NoAccount(chainId)

    let NFT = ''
    if (!isAddress(address) || address === AddressZero) {
      throw Error(`Invalid 'address' parameter '${address}'.`)
    }
    const calls = [
      {
        address: address,
        name: 'symbol',
      },
      {
        address: address,
        name: 'name',
      },
      // {
      //   address: address,
      //   name: 'tokenURI',
      //   params: [Number(nftId)]
      // }
    ]

    const result = await multicall(web3, ERC721_ABI, calls, chainId)

    if (result && result.length > 0) {
      NFT = {
        symbol: result[0][0],
        name: result[1][0],
        address: {
          [chainId]: address,
        },
      }
    }
    return NFT
  } catch (error) {
    console.log(error)
  }
}

// TODO complete this function and catch error localstorage safari
export const findAndAddNFT = async (searchQuery, fromChain) => {
  // Step 1: search in NFT list
  let finalNFTs = []
  let NFT = ''
  const search = new RegExp([escapeRegExp(searchQuery)].join(''), 'i')
  try {
    let customNFTs = JSON.parse(localStorage.getItem('NFTs'))

    let resultFilter = finalNFTs.filter((item) => {
      return (
        search.test(item.name) ||
        search.test(item.symbol) ||
        toCheckSumAddress(item.address[fromChain.id]) === toCheckSumAddress(searchQuery)
      )
    })
    if (resultFilter.length === 0 && isAddress(searchQuery)) {
      // step 2: check ERC721 and Add to  localStorage
      NFT = await getNFT(searchQuery, fromChain)

      if (NFT) {
        NFT = { id: searchQuery, ...NFT }
        if (!customNFTs) {
          localStorage.setItem('NFTs', JSON.stringify([NFT]))
        } else {
          const index = customNFTs.findIndex((item) => item.name === NFT.name && item.symbol === NFT.symbol)
          if (index !== -1) {
            customNFTs.splice(index, 1, {
              ...customNFTs[index],
              address: {
                ...customNFTs[index].address,
                [fromChain]: searchQuery,
              },
            })
          } else {
            customNFTs = [...customNFTs, NFT]
          }

          localStorage.setItem('NFTs', JSON.stringify(customNFTs))
        }
        resultFilter.push(NFT)
      }
    }
    return resultFilter
  } catch (error) {
    console.log('Error happend in Find and Add NFT')
  }
}
