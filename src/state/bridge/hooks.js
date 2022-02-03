import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import {
  addCollection,
  addDestChain,
  addNFTs,
  addOriginChain,
  removeBridge,
  updateNFTOnDestBridge,
  updateNFTOnOriginBridge,
} from './actions'

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

export function useAddNFTs() {
  const dispatch = useAppDispatch()
  return useCallback(
    (nfts) => {
      dispatch(addNFTs(nfts))
    },
    [dispatch]
  )
}

export function useRemoveBridge() {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(removeBridge())
  }, [dispatch])
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
