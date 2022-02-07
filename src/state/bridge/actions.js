import { createAction } from '@reduxjs/toolkit'

export const addOriginChain = createAction('ADD_ORIGIN_CHAIN')

export const addDestChain = createAction('ADD_DEST_CHAIN')

export const addCollection = createAction('ADD_COLLECTION')

export const addNFTs = createAction('ADD_NFTS')

export const removeBridge = createAction('REMOVE_BRIDGE')

export const updateNFTOnOriginBridge = createAction('UPDATE_NFT_ON_ORIGIN_CHAIN')

export const updateNFTOnDestBridge = createAction('UPDATE_NFT_ON_DEST_CHAIN')

export const fetchData = createAction('FETCH_DATA')
