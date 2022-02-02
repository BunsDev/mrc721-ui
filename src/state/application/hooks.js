import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { updateActionBtnType, updateSearchQuery } from './actions'

export function useActionBtn() {
  return useAppSelector((state) => state.application.actionBtnType)
}

export function useChangeActionBtn() {
  const dispatch = useAppDispatch()
  return useCallback(
    (btnType) => {
      dispatch(updateActionBtnType(btnType))
    },
    [dispatch]
  )
}

export function useSearchQuery() {
  return useAppSelector((state) => state.application.searchQuery)
}
export function useChangeSearchQuery() {
  const dispatch = useAppDispatch()
  return useCallback(
    (query) => {
      dispatch(updateSearchQuery(query))
    },
    [dispatch]
  )
}
