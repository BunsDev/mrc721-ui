import React, { useState } from 'react'
import { Flex } from 'rebass'
import { Button } from '../button/Button'
import { Box } from '../container/Container'
import { Type } from '../text/Text'
import { NetWork, ChangeNetwork, Span } from './Claim.style'
import { addRPC } from '../../utils/addRPC'
import { NameChainMap, rpcConfig } from '../../constants/chainsMap'
import { useWeb3React } from '@web3-react/core'
import { BorderBottom, ImageSpin } from '../common/FormControlls'
import useCalim from '../../hooks/useCalim'
import { useSetFetch } from '../../state/bridge/hooks'

const Claim = (props) => {
  const { claims } = props
  const { chainId } = useWeb3React()
  const [lock, setLock] = useState(false)
  const doClaim = useCalim()
  const setFetch = useSetFetch()

  const handleClaim = (claim) => {
    setLock(claim)
    doClaim(claim)
      .then(() => {
        setLock(false)
        setFetch(Date.now())
      })
      .catch(() => {
        setFetch(Date.now())
        setLock(false)
      })
  }
  return (
    <Box
      borderRadius="10px"
      padding="14px 20px 19px"
      background="linear-gradient(0deg, #E7EBF3 0%, rgba(231, 235, 243, 0.25) 105.18%)"
      border="1px solid #ffffff"
    >
      <Flex width="100%">
        <Type.SM color="#313144">Claim Token</Type.SM>
      </Flex>
      {claims.map((claim, index) => {
        return (
          <Flex width="100%" padding="0 3px" key={index} flexDirection="column">
            <Flex justifyContent="space-between" width="100%" alignItems="center" padding="30px 0 0">
              <Flex alignItems="center">
                <Type.MD color="#313144" fontWeight="bold">
                  {`${claim.name} #${claim.nftId}`}
                </Type.MD>
                <NetWork>
                  <Type.XS color="#313144" fontSize="9px">
                    {rpcConfig[claim.toChain].symbol}
                  </Type.XS>
                </NetWork>
              </Flex>
            </Flex>
            {claim.toChain === chainId ? (
              <Button
                margin="15px 0 30px"
                background="rgba(95, 92, 254, 1)"
                border="0.5px solid #D2D2D2"
                height="35px"
                onClick={() => handleClaim({ ...claim })}
              >
                <Type.SM fontSize="12.5px" color="#ffffff" cursor="pointer">
                  Claim NFT
                </Type.SM>
                {lock &&
                  lock.fromChain === claim.fromChain &&
                  lock.toChain === claim.toChain &&
                  lock.txId === claim.txId && <ImageSpin src={`/media/common/loading.svg`} />}
              </Button>
            ) : (
              <Button
                margin="15px 0 30px"
                background={'rgba(255, 164, 81, 0.2)'}
                border="1px solid rgba(255, 164, 81, 1)"
                height="35px"
                cursor="pointer"
                onClick={() => addRPC(claim.toChain)}
              >
                <Type.SM fontSize="12.5px" color="#313144">
                  Switch to {NameChainMap[claim.toChain]}
                </Type.SM>
              </Button>
            )}

            {claims.length - 1 !== index && <BorderBottom />}
          </Flex>
        )
      })}

      <ChangeNetwork padding="0 10px">
        <Span> Switch to the destination Network </Span>
        to claim your token on respective networks.
      </ChangeNetwork>
    </Box>
  )
}

export default Claim
