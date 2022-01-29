import React, { useEffect, useState } from 'react'
import SelectBox from './SelectBox'
import { NameChainMap, rpcConfig } from '../../constants/chainsMap'
import { validChains } from '../../constants/settings'
import { ChainStatus } from '../../constants/constants'

const Chain = (props) => {
  const { type, fromChain, value } = props
  const [chains, setChains] = useState('')
  useEffect(() => {
    fetchChain()
  }, [type, fromChain])

  const fetchChain = () => {
    console.log('call function')
    const chains = validChains.map((item) => ({
      id: item,
      name: NameChainMap[item],
      symbol: rpcConfig[item].nativeCurrency.symbol,
    }))

    if (type === ChainStatus.ORIGIN_CHAIN) {
      setChains(chains)
    } else {
      const filter = chains.filter((item) => item.id !== fromChain)
      setChains(filter)
    }
  }

  return (
    <SelectBox
      label="Select Origin Chain"
      placeholder={`${NameChainMap[validChains[0]]}, ${NameChainMap[validChains[1]]}, ...`}
      data={chains}
      type="chain"
      value={value}
      // onChange={(data) => updateBridge('fromChain', data)}
      marginBottom={value ? '5px' : '35px'}
    />
  )
}

export default Chain
