import React from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { ChainStatus } from '../../constants/constants'
import { useBridge } from '../../state/bridge/hooks'
import NetworkHint from '../common/NetworkHint'
import { Box } from '../container/Container'
import { GradientTitle, Title } from '../text/Title'
import Chain from './Chain'
import Collection from './Collection'
import NFT from './NFT'

const Container = styled.div`
  max-width: '470px';
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0px 4px 4px ${({ shadowColor }) => (shadowColor ? shadowColor : 'rgba(239, 239, 239, 0.25)')};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : '500px')};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const TriangleDown = styled.div`
  width: 0;
  height: 0;
  border-left: 116px solid transparent;
  border-right: 116px solid transparent;
  border-top: 24px solid #d3dbe3;
  position: relative;
`

const Deposit = () => {
  const bridge = useBridge()
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <Title>Muon MRC721 </Title>
      <GradientTitle margin="0 0 10px">Cross-Chain Transfer</GradientTitle>
      <Container>
        <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
          <Chain type={ChainStatus.ORIGIN_CHAIN} value={bridge?.fromChain?.id} />
          {bridge.fromChain && <NetworkHint validChain={bridge.fromChain.id} />}
          <Collection value={bridge?.collection?.id} />
          <NFT />
        </Box>
        <Box background="#f2f4fb" padding="0" borderRadius="0" border="none">
          <TriangleDown />
        </Box>
        <Box background="linear-gradient(0deg, #d3dbe3 0%, rgba(231, 235, 243, 0) 105.18%)">
          <Chain type={ChainStatus.DEST_CHAIN} value={bridge?.toChain?.id} />
        </Box>
      </Container>
    </Flex>
  )
}

export default Deposit
