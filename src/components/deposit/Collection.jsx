import React from 'react'
import { SEARCHABLE } from '../../constants/constants'
import { NFT } from '../../constants/settings'
import SelectBox from './SelectBox'

const Collection = (props) => {
  const { value } = props
  return <SelectBox label="Select an asset" data={NFT} type={SEARCHABLE} marginBottom={value ? '5px' : '35px'} />
}

export default Collection
