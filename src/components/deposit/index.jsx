import React, { useEffect } from 'react'
import { Flex } from 'rebass'
import styled from 'styled-components'
import { AddressZero } from '@ethersproject/constants'
import { ChainStatus } from '../../constants/constants'
import { useAddCollection, useBridge } from '../../state/bridge/hooks'
import NetworkHint from '../common/NetworkHint'
import { Box } from '../container/Container'
import { GradientTitle, Title } from '../text/Title'
import Chain from './Chain'
import Collection from './Collection'
import NFT from './NFT'
import Info from './Info'
import { getTokenId, checkNFTOnDestBridge } from '../../utils/checkNFTOnBridge'
import { useChangeNFTOnOriginChain, useChangeNFTOnDestChain } from '../../state/bridge/hooks'
import CopyAddress from './CopyAddress'

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
  const changeNFTOnOriginBridge = useChangeNFTOnOriginChain()
  const changeNFTOnDestBridge = useChangeNFTOnDestChain()
  const updateCollection = useAddCollection()

  useEffect(() => {
    const checkNFTExist = async () => {
      if (bridge.fromChain && bridge.collection) {
        let tokenId = await getTokenId(bridge.fromChain.id, bridge.collection.address[bridge.fromChain.id])
        changeNFTOnOriginBridge(tokenId)
      }
    }
    checkNFTExist()
  }, [bridge.fromChain, bridge.collection])

  useEffect(() => {
    const checkNFTExist = async () => {
      if (bridge.toChain && bridge.collection) {
        let address = await checkNFTOnDestBridge(bridge.toChain.id, bridge.NFTOnOriginBridge)
        console.log(address)
        if (address !== AddressZero) {
          changeNFTOnDestBridge(address)
          let selected = {
            ...bridge.collection,
            address: {
              ...bridge.collection.address,
              [bridge.toChain.id]: address,
            },
          }
          updateCollection(selected)
        }
      }
    }
    checkNFTExist()
  }, [bridge.toChain, bridge.collection, bridge.NFTOnOriginBridge])
  console.log({ bridge })
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center" width="100%">
      <Title>Muon MRC721 </Title>
      <GradientTitle margin="0 0 10px">Cross-Chain Transfer</GradientTitle>
      <Container>
        <Box background="linear-gradient(0deg, #D3DBE3 0%, rgba(231, 235, 243, 0) 126.95%)">
          <Chain type={ChainStatus.ORIGIN_CHAIN} value={bridge?.fromChain?.id} />
          {bridge.fromChain && <NetworkHint validChain={bridge.fromChain.id} />}
          <Collection value={bridge?.collection?.id} />
          {bridge.fromChain && bridge.collection && (
            <>
              <Info
                chain={bridge.fromChain.name}
                name={bridge.collection.name}
                exist={bridge.NFTOnOriginBridge !== '0'}
              />
              <CopyAddress
                tokenSymbol={bridge.collection.symbol}
                chainSymbol={bridge.fromChain.symbol}
                address={bridge.collection.address[bridge.fromChain.id]}
              />
            </>
          )}
          <NFT />
        </Box>
        <Box background="#f2f4fb" padding="0" borderRadius="0" border="none">
          <TriangleDown />
        </Box>
        <Box background="linear-gradient(0deg, #d3dbe3 0%, rgba(231, 235, 243, 0) 105.18%)">
          <Chain type={ChainStatus.DEST_CHAIN} value={bridge?.toChain?.id} />
          {bridge.toChain && bridge.collection && (
            <>
              <Info chain={bridge.toChain.name} name={bridge.collection.name} exist={bridge.NFTOnDestBridge} />
              {bridge.NFTOnDestBridge && (
                <CopyAddress
                  tokenSymbol={bridge.collection.symbol}
                  chainSymbol={bridge.toChain.symbol}
                  address={bridge.collection.address[bridge.toChain.id]}
                />
              )}
            </>
          )}
        </Box>
      </Container>
    </Flex>
  )
}

export default Deposit
