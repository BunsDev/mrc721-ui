import React from 'react'
import SelectBox from './SelectBox'

const NFT = (props) => {
  const { value } = props
  return <SelectBox label="Select NFT" marginBottom={value ? '5px' : '35px'} />
}

export default NFT
