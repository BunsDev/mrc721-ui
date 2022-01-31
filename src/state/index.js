import { configureStore } from '@reduxjs/toolkit'

import application from './application/reducer'

export const store = configureStore({
  reducer: {
    application,
  },
})
