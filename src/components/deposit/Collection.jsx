import React from 'react'
import { SEARCHABLE, SelectType } from '../../constants/constants'
import useSearchNFT from '../../hooks/useSearchNFT'
import { useChangeSearchQuery } from '../../state/application/hooks'
import { useAddCollection } from '../../state/bridge/hooks'
import SelectBox from './SelectBox'

const Collection = (props) => {
  const { value } = props
  const addCollection = useAddCollection()
  const changeSearchQuery = useChangeSearchQuery()
  const NFTs = useSearchNFT()

  const updateBridge = (data) => {
    addCollection(data)
    changeSearchQuery('')
  }

  return (
    <SelectBox
      label="Select an asset"
      data={NFTs}
      type={SEARCHABLE}
      selectType={SelectType.COLLECTION}
      value={value}
      marginBottom={value ? '5px' : '35px'}
      onChange={(data) => updateBridge(data)}
    />
  )
}

export default Collection
