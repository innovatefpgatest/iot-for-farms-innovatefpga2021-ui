import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
  reducer: {},
  devTools: process.env.REACT_APP_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
  },
})

export default store
