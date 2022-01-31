import { configureStore } from '@reduxjs/toolkit'

import application from './application/reducer'
import bridge from './bridge/reducer'

export const store = configureStore({
  reducer: {
    application,
    bridge,
  },
})
