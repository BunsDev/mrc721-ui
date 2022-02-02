import { useWeb3React } from '@web3-react/core'
import { NetworkContextName } from '../constants/constants'

const useActiveWeb3React = () => {
  const context = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)
  return context.active ? context : contextNetwork
}

export default useActiveWeb3React
