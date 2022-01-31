import React from 'react'
import { SEARCHABLE } from '../../constants/constants'
import { NFT } from '../../constants/settings'
import { useAddCollection } from '../../state/bridge/hooks'
import SelectBox from './SelectBox'

const Collection = (props) => {
  const { value } = props
  const addCollection = useAddCollection()

  const updateBridge = (data) => {
    addCollection(data)
  }
  return (
    <SelectBox
      label="Select an asset"
      data={NFT}
      type={SEARCHABLE}
      value={value}
      marginBottom={value ? '5px' : '35px'}
      onChange={(data) => updateBridge(data)}
    />
  )
}

export default Collection
