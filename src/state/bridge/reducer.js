import { createReducer } from '@reduxjs/toolkit'
import { addCollection, addDestChain, addOriginChain, updateNFTOnOriginBridge, updateNFTOnDestBridge } from './actions'

const initialState = {
  fromChain: null,
  collection: null,
  nftId: null,
  toChain: null,
  NFTOnOriginBridge: false,
  NFTOnDestBridge: false,
}

export default createReducer(initialState, (builder) => {
  // add origin chain
  builder.addCase(addOriginChain, (state, action) => {
    return { ...state, fromChain: action.payload }
  })
  //   add dest chain
  builder.addCase(addDestChain, (state, action) => {
    return { ...state, toChain: action.payload }
  })
  //   add collection
  builder.addCase(addCollection, (state, action) => {
    return { ...state, collection: action.payload }
  })
  // Update NFT on bridge
  builder.addCase(updateNFTOnOriginBridge, (state, action) => {
    return { ...state, NFTOnOriginBridge: action.payload }
  })
  // Update NFT on bridge
  builder.addCase(updateNFTOnDestBridge, (state, action) => {
    return { ...state, NFTOnDestBridge: action.payload }
  })
})
