import React from 'react'
import { Flex } from 'rebass'
import Select from 'react-select'
import { Image } from '../common/FormControlls'
import { Type } from '../text/Text'
import { Wrapper } from '../container/Container'

const colourStyles = {
  container: (styles) => ({ ...styles, width: '100%' }),
  control: (styles) => ({
    ...styles,
    backgroundColor: '#E6ECF2',
    border: '1px solid #FFFFFF',
    minHeight: '45px',
    ':hover': {
      filter: 'brightness(0.9)',
      border: 'none',
    },
    ':focus': {
      border: 'none',
    },
  }),
  // dropdownIndicator: (styles) => ({ ...styles, color: 'black' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = 'green'
    return {
      ...styles,
      backgroundColor: isDisabled ? undefined : isSelected ? color : isFocused ? '#ffffff' : undefined,
      color: isDisabled ? '#ccc' : isSelected ? 'balck' : '#666666',
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? 'green' : '#E6ECF2') : undefined,
      },
    }
  },
  menu: (styles) => ({ ...styles, backgroundColor: '#E6ECF2' }),
}

export const MenuItem = ({ logo, name }) => {
  return (
    <Flex alignItems="center">
      <Image src={logo} onError={(e) => (e.target.src = '/media/tokens/default.svg')} boxSizing="unset" />
      <Type.MD color="#313144" cursor="pointer">
        {name}
      </Type.MD>
    </Flex>
  )
}

const NFT = () => {
  const options = [
    {
      value: 'chocolate',
      label: <MenuItem logo="/media/nft/ronaldo26.svg" name="NFT48" />,
    },
    { value: 'strawberry', label: <MenuItem logo="/media/nft/ronaldo26.svg" name="NFT49" /> },
    { value: 'vanilla', label: <MenuItem logo="/media/nft/ronaldo26.svg" name="NFT45" /> },
    {
      value: 'chocolate1',
      label: <MenuItem logo="/media/nft/ronaldo26.svg" name="NFT44" />,
    },
    { value: 'strawberry1', label: <MenuItem logo="/media/nft/ronaldo26.svg" name="NFT47" /> },
    { value: 'vanilla1', label: <MenuItem logo="/media/nft/ronaldo26.svg" name="NFT46" /> },
  ]
  return (
    <Wrapper marginBottom="35px">
      <Flex width="100%">
        <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
          Select NFT
        </Type.SM>
      </Flex>
      {/* <Flex width="100%" maxWidth="470px"> */}
      <Select options={options} isMulti styles={colourStyles} />
      {/* </Flex> */}
    </Wrapper>
  )
}

export default NFT
