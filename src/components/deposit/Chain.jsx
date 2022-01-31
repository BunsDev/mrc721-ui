import React, { useEffect, useState } from 'react'
import SelectBox from './SelectBox'
import { NameChainMap, rpcConfig } from '../../constants/chainsMap'
import { validChains } from '../../constants/settings'
import { ChainStatus } from '../../constants/constants'
import { useAddOriginChain, useAddDestChain, useBridge } from '../../state/bridge/hooks'

const Chain = (props) => {
  const { type, value } = props
  const [chains, setChains] = useState('')
  const bridge = useBridge()
  const addOriginChain = useAddOriginChain()
  const addDestChain = useAddDestChain()

  useEffect(() => {
    fetchChain()
  }, [type, bridge])

  const fetchChain = () => {
    const chains = validChains.map((item) => ({
      id: item,
      name: NameChainMap[item],
      symbol: rpcConfig[item].nativeCurrency.symbol,
    }))

    if (type === ChainStatus.DEST_CHAIN && bridge.fromChain) {
      const filter = chains.filter((item) => item.id !== bridge.fromChain.id)
      setChains(filter)
    } else {
      setChains(chains)
    }
  }
  const updateBridge = (data) => {
    if (type === ChainStatus.ORIGIN_CHAIN) {
      addOriginChain(data)
    } else {
      addDestChain(data)
    }
  }

  return (
    <SelectBox
      label="Select Origin Chain"
      placeholder={`${NameChainMap[validChains[0]]}, ${NameChainMap[validChains[1]]}, ...`}
      data={chains}
      type="chain"
      value={value}
      onChange={(data) => updateBridge(data)}
      marginBottom={value ? '5px' : '35px'}
    />
  )
}

export default Chain
