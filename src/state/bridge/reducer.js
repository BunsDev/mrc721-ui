import { createReducer } from '@reduxjs/toolkit'
import {
  addCollection,
  addDestChain,
  addOriginChain,
  updateNFTOnOriginBridge,
  updateNFTOnDestBridge,
  addNFTs,
  removeBridge,
} from './actions'

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
  //   add nfts
  builder.addCase(addNFTs, (state, action) => {
    return { ...state, nftId: action.payload }
  })
  // Update NFT on bridge
  builder.addCase(updateNFTOnOriginBridge, (state, action) => {
    return { ...state, NFTOnOriginBridge: action.payload }
  })
  // Update NFT on bridge
  builder.addCase(updateNFTOnDestBridge, (state, action) => {
    return { ...state, NFTOnDestBridge: action.payload }
  })
  builder.addCase(removeBridge, () => {
    return {
      fromChain: null,
      collection: null,
      nftId: null,
      toChain: null,
      NFTOnOriginBridge: false,
      NFTOnDestBridge: false,
    }
  })
})
