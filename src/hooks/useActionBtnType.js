import { useState, useEffect } from 'react'
import { ActionBtnType } from '../constants/constants'
import { useBridge } from '../state/bridge/hooks'
import useNFTCheckOwner from '../hooks/useNFTCheckOwner'
import useNFTIsApprove from './useNFTIsApprove'

const useActionBtnType = () => {
  const [actionBtnType, setActionBtnType] = useState(ActionBtnType.SELECT)
  const bridge = useBridge()
  const owner = useNFTCheckOwner(bridge.collection, bridge.nftId, bridge.fromChain?.id)
  const approve = useNFTIsApprove(bridge.collection, bridge.fromChain?.id, bridge.fetch)
  useEffect(() => {
    let action = ActionBtnType.SELECT
    if (!bridge.NFTOnOriginBridge && bridge.fromChain && bridge.collection) action = ActionBtnType.ADD_MAIN_TOKEN
    if (!bridge.NFTOnDestBridge && bridge.collection) action = ActionBtnType.ADD_BRIDGE_TOKEN
    if (!owner && bridge.fromChain && bridge.collection && bridge.nftId && bridge.toChain)
      action = ActionBtnType.NOT_OWNER
    if (!approve && owner && bridge.fromChain && bridge.collection && bridge.nftId && bridge.toChain)
      action = ActionBtnType.APPROVE
    if (
      approve &&
      owner &&
      bridge.fromChain &&
      bridge.collection &&
      bridge.nftId &&
      bridge.toChain &&
      bridge.NFTOnOriginBridge &&
      bridge.NFTOnDestBridge
    )
      action = ActionBtnType.DEPOSIT
    setActionBtnType(action)
  }, [bridge, owner, approve])

  return actionBtnType
}

export default useActionBtnType
