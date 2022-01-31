import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks'
import { updateActionBtnType } from './actions'

export function useActionBtn() {
  return useAppSelector((state) => state.application.actionBtnType)
}

export function useChangeActionBtn(btnType) {
  const dispatch = useAppDispatch()
  return useCallback(() => {
    dispatch(updateActionBtnType(btnType))
  }, [dispatch])
}
