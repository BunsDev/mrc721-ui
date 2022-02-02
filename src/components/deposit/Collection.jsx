import React from 'react'
import { SEARCHABLE } from '../../constants/constants'
import useSearchNFT from '../../hooks/useSearchNFT'
import { useAddCollection } from '../../state/bridge/hooks'
import SelectBox from './SelectBox'

const Collection = (props) => {
  const { value } = props
  const addCollection = useAddCollection()
  const NFTs = useSearchNFT()

  const updateBridge = (data) => {
    addCollection(data)
  }
  return (
    <SelectBox
      label="Select an asset"
      data={NFTs}
      type={SEARCHABLE}
      value={value}
      marginBottom={value ? '5px' : '35px'}
      onChange={(data) => updateBridge(data)}
    />
  )
}

export default Collection
