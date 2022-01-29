import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { Box } from '../container/Container'
import { Type } from '../text/Text'

const Close = styled.span`
  fontsize: 12.5px;
  color: #000000;
  cursor: pointer;
`

const Transaction = () => {
  const handleClose = () => {}
  return (
    <Box
      padding="14px 20px"
      borderRadius="10px"
      background=" linear-gradient(0deg, #E7EBF3 0%, rgba(231, 235, 243, 0.25) 105.18%)"
      border="1px solid #ffffff"
    >
      <Flex justifyContent="space-between" width="100%">
        <Type.SM color="#313144" textTransform="capitalize">
          transactions
        </Type.SM>
        <Close onClick={handleClose}>&times;</Close>
      </Flex>
    </Box>
  )
}

export default Transaction
