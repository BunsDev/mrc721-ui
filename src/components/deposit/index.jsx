import React, { useEffect, useState } from 'react'
import { Flex } from 'rebass'
import { AddressZero } from '@ethersproject/constants'
import { ChainStatus } from '../../constants/constants'
import { useBridge } from '../../state/bridge/hooks'
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
import { Container, TriangleDown } from './deposit.style'

const Deposit = () => {
  const bridge = useBridge()
  const changeNFTOnOriginBridge = useChangeNFTOnOriginChain()
  const changeNFTOnDestBridge = useChangeNFTOnDestChain()
  const [fetchExist, setFetchExist] = useState(false)

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
      setFetchExist(true)
      if (bridge.toChain) {
        let address = await checkNFTOnDestBridge(bridge.toChain.id, bridge.NFTOnOriginBridge)
        if (address !== AddressZero) {
          changeNFTOnDestBridge(address)
        } else {
          changeNFTOnDestBridge(false)
        }
      }
      setFetchExist(false)
    }
    checkNFTExist()
  }, [bridge.toChain, bridge.NFTOnOriginBridge])

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
          <Chain type={ChainStatus.DEST_CHAIN} value={bridge?.toChain?.id} marginBottom={fetchExist} />
          {bridge.toChain && bridge.collection && !fetchExist && (
            <>
              <Info chain={bridge.toChain.name} name={bridge.collection.name} exist={bridge.NFTOnDestBridge} />
              {bridge.NFTOnDestBridge && (
                <CopyAddress
                  tokenSymbol={bridge.collection.symbol}
                  chainSymbol={bridge.toChain.symbol}
                  address={bridge.NFTOnDestBridge}
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
