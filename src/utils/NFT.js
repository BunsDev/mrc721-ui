import { AddressZero } from '@ethersproject/constants'
import axios from 'axios'
import { isObject } from 'lodash'
import multicall from './multicall'
import { isAddress } from './isAddress'
import { toCheckSumAddress } from './toCheckSumAddress'
import { escapeRegExp } from './utils'
import { ERC721_ABI } from '../constants/ABI'
import { getWeb3NoAccount } from './web3'
import { getContract } from './contractHelpers'
import { defaultNft } from '../constants/settings'

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
  let finalNFTs = combineDefaultAndLocalStorage()
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

export const getOwnedNFTs = async (account, chainId, contract) => {
  try {
    if (!isAddress(account) || account === AddressZero) {
      throw Error(`Invalid 'account' parameter '${account}'.`)
    }
    if (!isAddress(contract) || contract === AddressZero) {
      throw Error(`Invalid 'contract' parameter '${contract}'.`)
    }

    const tokenUris = await getTokenUris(account, chainId, contract)
    var tokenData = {}
    await Promise.all(
      Object.keys(tokenUris).map(async (tokenId) => {
        try {
          const response = await axios.post(process.env.NEXT_PUBLIC_MUON_NFT_PROXY, {
            url: tokenUris[tokenId],
          })
          tokenData[tokenId] = {
            image: response.data.image || null,
          }
        } catch (error) {
          tokenData[tokenId] = {
            image: '/media/tokens/default.svg',
          }
          console.log('error happend in fetch nft proxy')
        }
      })
    )
    return tokenData
  } catch (error) {
    console.error(error)
  }
}

const getTokenUris = async (account, chainId, contractAddress) => {
  try {
    const web3 = getWeb3NoAccount(chainId)
    const contract = getContract(ERC721_ABI, contractAddress, web3)
    const nftsId = await contract.methods.tokensOfOwner(account).call()
    let tokenUris = {}

    if (nftsId.length > 0) {
      let calls = []
      for (let index = 0; index < nftsId.length; index++) {
        const call = {
          address: contractAddress,
          name: 'tokenURI',
          params: [nftsId[index]],
        }
        calls.push(call)
      }
      const result = await multicall(web3, ERC721_ABI, calls, chainId)
      for (let index = 0; index < nftsId.length; index++) {
        tokenUris[nftsId[index]] = result[index][0]
      }
    }
    return tokenUris
  } catch (error) {
    const data = await fetchTokenUriFromApi(account, chainId, contractAddress)
    return data
  }
}

const fetchTokenUriFromApi = async (account, chainId, contractAddress) => {
  try {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_MUON_NFT_BACKEND}/api/tokens/${account}/${chainId}/${contractAddress}`
    )
    if (response.status === 200) {
      const result = response.data
      if (result.error === 0 && isObject(result.data)) {
        return result.data
      }
    }
  } catch (error) {
    console.error('An error occurred while retrieving contract tokens owned by account', error)
    return {}
  }
}

export const sortOptions = (options, selectedTokenIds) => {
  if (options.length > 0) {
    let selectedOptions = []
    let unSelectedOptions = []
    options.map((item) => {
      if (selectedTokenIds.includes(item.value)) {
        selectedOptions.push(item)
      } else {
        unSelectedOptions.push(item)
      }
    })
    let sortedSelectedOptions = selectedOptions.sort((option1, option2) => (option1.value < option2.value ? -1 : 1))
    let sortedUnselectedOptions = unSelectedOptions.sort((option1, option2) => (option1.value < option2.value ? -1 : 1))
    return [...sortedSelectedOptions, ...sortedUnselectedOptions]
  }
}

export const combineDefaultAndLocalStorage = () => {
  const localStorageNFTs = JSON.parse(localStorage.getItem('NFTs'))
  const nfts = localStorageNFTs ? [...defaultNft, ...localStorageNFTs] : defaultNft
  return nfts
}
