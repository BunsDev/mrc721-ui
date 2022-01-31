import { createReducer } from '@reduxjs/toolkit'
import { ActionBtnType } from '../../constants/constants'
import { updateActionBtnType } from './actions'

const initialState = {
  chainId: null,
  actionBtnType: ActionBtnType.SELECT,
}

export default createReducer(initialState, (builder) => {
  // Update Action button
  builder.addCase(updateActionBtnType, (state, action) => {
    return { ...state, actionBtnType: action.payload }
  })
})
