import React, { useState } from 'react'
import { Flex } from 'rebass'
import { SEARCHABLE, SelectType } from '../../constants/constants'
import { useChangeSearchQuery } from '../../state/application/hooks'
import { Image, Selector } from '../common/FormControlls'
import { Wrapper } from '../container/Container'
import Modal from '../modal/Modal'
import { ContentItem, ModalItem } from '../modal/Modal.style'
import { Type } from '../text/Text'
import { Arrow } from './deposit.style'

const SelectBox = (props) => {
  const { label, placeholder, data, onChange, value, marginBottom, border, type, selectType } = props
  const [open, setOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState('')

  const changeSearchQuery = useChangeSearchQuery()
  React.useEffect(() => {
    if (value) {
      try {
        const selectedValue = data.find((item) => item.id === value)
        if (selectedValue) {
          const icon =
            selectType === SelectType.COLLECTION
              ? '/media/tokens/default.svg'
              : `/media/chains/${selectedValue.symbol.toLowerCase()}.svg`
          setSelectedValue({ ...selectedValue, icon })
        }
      } catch (error) {
        console.log('Error happend in selectedValue', error)
      }
    } else {
      setSelectedValue('')
    }
  }, [value])

  const handleOpenModal = () => {
    setOpen(true)
  }

  const handleSearch = (data) => {
    changeSearchQuery(data)
  }
  const contentModal =
    data &&
    data.map((item, index) => {
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
              src={
                selectType === SelectType.COLLECTION
                  ? '/media/tokens/default.svg'
                  : `/media/chains/${item.symbol.toLowerCase()}.svg`
              }
              boxSizing="unset"
              // onError={(e) => (e.target.src = '/media/tokens/default.svg')}
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
          changeSearchQuery('')
        }}
        handleSearch={(data) => handleSearch(data)}
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
