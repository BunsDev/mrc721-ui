import React, { useState } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { SEARCHABLE } from '../../constants/constants'
import { Image, Selector } from '../common/FormControlls'
import { Wrapper } from '../container/Container'
import Modal from '../modal/Modal'
import { ContentItem, ModalItem } from '../modal/Modal.style'
import { Type } from '../text/Text'

const Arrow = styled.img`
  cursor: pointer;
`

const SelectBox = (props) => {
  const { label, placeholder, data, onChange, value, marginBottom, border, type } = props
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  React.useEffect(() => {
    if (value) {
      const selectedValue = data.find((item) => item.id === value)
      console.log({ selectedValue })
      if (selectedValue) {
        const icon = selectedValue.logo ? selectedValue.logo : `/media/chains/${selectedValue.symbol.toLowerCase()}.svg`
        setSelectedValue({ ...selectedValue, icon })
      }
    } else {
      setSelectedValue('')
    }
  }, [value])

  const handleOpenModal = () => {
    setOpen(true)
  }

  const contentModal =
    data &&
    data.map((item, index) => {
      console.log(item)
      return (
        <ModalItem
          key={index}
          onClick={() => {
            onChange(item)
            setOpen(!open)
          }}
        >
          <ContentItem alignItems="center">
            <Image
              src={item.logo ? item.logo : `/media/chains/${item.symbol.toLowerCase()}.svg`}
              boxSizing="unset"
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
            />
            <Type.MD color="#D3DBE3" fontWeight="bold">
              {item.name}
            </Type.MD>
          </ContentItem>
        </ModalItem>
      )
    })
  return (
    <Wrapper marginBottom={marginBottom}>
      <Flex width="100%">
        <Type.SM color="#313144" fontSize="12.5px" padding="5px 10px">
          {label}
        </Type.SM>
      </Flex>
      <Selector padding="0 18px 0 15px" onClick={handleOpenModal} border={border} cursor="pointer">
        {selectedValue ? (
          <Flex alignItems="center">
            <Image
              src={selectedValue.icon}
              onError={(e) => (e.target.src = '/media/tokens/default.svg')}
              boxSizing="unset"
            />
            <Type.MD color="#313144" cursor="pointer">
              {selectedValue.name}
            </Type.MD>
          </Flex>
        ) : (
          <Type.SM color="#919191" fontSizeXXS="14px">
            {placeholder ? placeholder : label}
          </Type.SM>
        )}

        <Arrow src="/media/common/arrow-down.svg" alt="arrow-down" cursor="pointer" />
      </Selector>

      <Modal
        open={open}
        hide={() => {
          setOpen(!open)
          //   dispatch({
          //     type: 'UPDATE_TOKEN_SEARCH_QUERY',
          //     payload: '',
          //   })
        }}
        title={label}
        search={type === SEARCHABLE}
        placeholderSearch="Search name or paste address"
      >
        {contentModal}
      </Modal>
    </Wrapper>
  )
}

export default SelectBox
