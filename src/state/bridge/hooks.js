import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { addCollection, addDestChain, addOriginChain, updateNFTOnDestBridge, updateNFTOnOriginBridge } from './actions'

export function useBridge() {
  return useAppSelector((state) => state.bridge)
}

export function useAddOriginChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (fromChain) => {
      dispatch(addOriginChain(fromChain))
    },
    [dispatch]
  )
}

export function useAddDestChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (toChain) => {
      dispatch(addDestChain(toChain))
    },
    [dispatch]
  )
}

export function useAddCollection() {
  const dispatch = useAppDispatch()
  return useCallback(
    (collection) => {
      dispatch(addCollection(collection))
    },
    [dispatch]
  )
}

export function useChangeNFTOnOriginChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (nftExist) => {
      dispatch(updateNFTOnOriginBridge(nftExist))
    },
    [dispatch]
  )
}

export function useChangeNFTOnDestChain() {
  const dispatch = useAppDispatch()
  return useCallback(
    (nftExist) => {
      dispatch(updateNFTOnDestBridge(nftExist))
    },
    [dispatch]
  )
}