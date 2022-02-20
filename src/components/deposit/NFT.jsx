import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { CheckCircle, Circle } from 'react-feather'
import Select, { components } from 'react-select'
import { Image, ImageSpin } from '../common/FormControlls'
import { Type } from '../text/Text'
import { Wrapper } from '../container/Container'
import { Arrow, CheckCircleWrapper, ReactSelectStyle } from './deposit.style'
import useFetchOwnedNFT from '../../hooks/useFetchOwnedNFT'
import { sortOptions } from '../../utils/NFT'
import { useAddNFTs, useBridge } from '../../state/bridge/hooks'
import { ActionBtnType } from '../../constants/constants'

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Arrow src="/media/common/arrow-down.svg" alt="arrow-down" cursor="pointer" />
    </components.DropdownIndicator>
  )
}
export const MenuItem = ({ logo, nftId, isSelected }) => {
  return (
    <Flex alignItems="center" justifyContent="space-between">
      <Image
        src={logo}
        onError={(e) => (e.target.src = '/media/tokens/default.svg')}
        boxSizing="unset"
        width="60px"
        height="60px"
      />
      <Type.MD color="#313144" cursor="pointer">
        #{nftId}
        <CheckCircleWrapper>{!isSelected ? <Circle size={16} /> : <CheckCircle size={16} />}</CheckCircleWrapper>
      </Type.MD>
    </Flex>
  )
}

const NFT = () => {
  const [selectedTokenIds, setSelectedTokenIds] = useState([])
  // const [fetchingData, setFetchingData] = useState(false)
  const [placeholder, setPlaceholder] = useState('1,2,3,...')
  const [options, setOptions] = useState([])
  const bridge = useBridge()
  const addNfts = useAddNFTs()

  const { tokenUris, fetch } = useFetchOwnedNFT(
    bridge.collection ? bridge.collection.address[bridge.fromChain?.id] : '',
    bridge.fromChain?.id
  )
  useEffect(() => {
    let newOptions = []
    if (tokenUris) {
      newOptions = Object.keys(tokenUris).map((tokenId) => {
        let item = {}
        item.value = tokenId
        item.label = (
          <MenuItem
            logo={tokenUris[tokenId].image}
            nftId={tokenId}
            isSelected={selectedTokenIds.find((selectedToken) => selectedToken == tokenId) !== undefined}
          />
        )
        item.isSelected = selectedTokenIds.find((selectedToken) => selectedToken == tokenId) !== undefined
        return item
      })
    }
    setOptions(sortOptions(newOptions, selectedTokenIds))
  }, [tokenUris, selectedTokenIds, fetch])

  useEffect(() => {
    if (bridge.fetch === ActionBtnType.APPROVE) return
    setSelectedTokenIds([])
    setOptions([])
  }, [bridge.collection, bridge.fetch])

  useEffect(() => {
    if (selectedTokenIds.length > 0) {
      setPlaceholder(selectedTokenIds.join(','))
    } else {
      setPlaceholder('1,2,3,...')
    }
    const ids = selectedTokenIds.join(',').split(/[ ,]/)
    const uniqueId = Array.from(new Set(ids.filter((id) => id !== '')))
    let nft = ''
    if (uniqueId.length > 0) {
      nft = uniqueId
    }
    addNfts(nft)
  }, [selectedTokenIds])

  const Menu = (props) => {
    return (
      <components.Menu {...props}>
        {fetch ? (
          <Flex justifyContent="center" padding="20px">
            <ImageSpin src="/media/common/pending.svg" />
          </Flex>
        ) : (
          props.children
        )}
      </components.Menu>
    )
  }
  const Placeholder = (props) => {
    return (
      <components.Placeholder {...props}>
        <Type.MD color="#919191">{fetch ? 'Load NFTs...' : placeholder}</Type.MD>
      </components.Placeholder>
    )
  }

  const handleSelectNFT = (selectedOptions, event) => {
    let tokenId = event.option.value
    if (!selectedTokenIds.includes(tokenId)) {
      setSelectedTokenIds((selectedTokenIds) => [...selectedTokenIds, tokenId])
    } else {
      for (var i = 0; i < selectedTokenIds.length; i++) {
        if (selectedTokenIds[i] === tokenId) {
          setSelectedTokenIds([...selectedTokenIds.slice(0, i), ...selectedTokenIds.slice(i + 1)])
        }
      }
    }
  }
  return (
    <Wrapper marginBottom="15px">
      <Flex width="100%">
        <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
          Select NFT
        </Type.SM>
      </Flex>
      <Select
        options={options}
        isMulti
        styles={ReactSelectStyle}
        components={{ Placeholder, DropdownIndicator, Menu }}
        controlShouldRenderValue={false}
        hideSelectedOptions={false}
        closeMenuOnSelect={false}
        backspaceRemovesValue={false}
        isClearable={false}
        closeMenuOnScroll={true}
        onChange={handleSelectNFT}
      />
    </Wrapper>
  )
}

export default NFT
