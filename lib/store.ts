import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter.slice'
import errorSlice from './features/error.slice'
import loadingSlice from './features/loading.slice'
import modelSlice from './features/model.slice'
import navbarSlice from './features/navbar.slice'
import profileSlice from './features/profile.slice'

export const store = configureStore({
  reducer: {
    counter : counterSlice,
    navbar : navbarSlice,
    profile : profileSlice,
    error : errorSlice,
    loading : loadingSlice,
    model : modelSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch