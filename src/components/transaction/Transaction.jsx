import React, { useState } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import dynamic from 'next/dynamic'

const CopyToClipboard = dynamic(() => import('react-copy-to-clipboard'))

import { Button } from '../button/Button'
import { Image, ImageSpin, Link } from '../common/FormControlls'
import { Box } from '../container/Container'
import { Type } from '../text/Text'
// import { getTransactionLink } from '../../utils/explorers'
import { TransactionStatus } from '../../constants/transactionStatus'

const Close = styled.span`
  fontsize: 12.5px;
  color: #000000;
  cursor: pointer;
`
const Arrow = styled.span`
  padding: 0 3px 5px;
  color: #000000;
`
const Transaction = (props) => {
  const { transactionStatus } = props
  const [copy, setCopy] = useState(false)

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
      <Flex justifyContent="flex-start" width="100%" marginTop="15px" alignItems="center">
        <>
          <Type.SM color="#313144">ETH</Type.SM>
          <Arrow>&rarr;</Arrow>
        </>
        <Type.SM color="#313144">BSC</Type.SM>
      </Flex>
      <Flex justifyContent="space-between" width="100%" marginTop="15px">
        {/* {state.transaction.tokenSymbol && ( */}
        <Flex alignItems="center">
          <Type.MD color="#313144" fontWeight="bold">
            {/* {state.transaction.tokenSymbol} */}
            Symbol
          </Type.MD>
        </Flex>
        {/* )}
        {state.transaction.amount ? ( */}
        <Type.MD color="#313144" fontWeight="bold">
          {/* {parseFloat(state.transaction.amount)} */}
          10
        </Type.MD>
        {/* ) : (
          ''
        )} */}
      </Flex>
      <Flex justifyContent="center" flexDirection="column" width="100%" margin="30px 0 15px">
        <Button
          height="35px"
          background="rgba(255, 255, 255, 0.5)"
          border={
            transactionStatus === TransactionStatus.PENDING
              ? '1px solid #d2d2d2'
              : transactionStatus === TransactionStatus.SUCCESS
              ? '1px solid #00AA58'
              : '1px solid rgba(255, 164, 81, 1)'
          }
        >
          <Flex justifyContent="space-between" width="100%" padding="0 10px 0 0" alignItems="center">
            <Flex maxWidth="300px" width="100%" alignItems="center">
              {transactionStatus === 'pending' ? (
                <ImageSpin src={`/media/common/${transactionStatus}.svg`} />
              ) : (
                <Image src={`/media/common/${transactionStatus}.svg`} />
              )}

              <Link
                target="_blink"
                // href={getTransactionLink(state.transaction.chainId, state.transaction.hash, LinkType.Transaction)}
              >
                <Type.SM
                  // color={transactionStatus === TransactionStatus.SUCCESS ? '#00AA58' : '#313144'}
                  fontSizeXS="10px"
                >
                  message
                  {/* {state.transaction.message} */}
                </Type.SM>
              </Link>
            </Flex>
            <CopyToClipboard text="{state.transaction.hash}" onCopy={() => setCopy(true)}>
              {copy ? <Type.XS color="#5551ff">copied</Type.XS> : <img src="/media/common/copy.svg" />}
            </CopyToClipboard>
          </Flex>
        </Button>
      </Flex>
    </Box>
  )
}

export default Transaction
