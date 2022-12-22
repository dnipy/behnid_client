import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './features/counter.slice'
import navbarSlice from './features/navbar.slice'
import profileSlice from './features/profile.slice'

export const store = configureStore({
  reducer: {
    counter : counterSlice,
    navbar : navbarSlice,
    profile : profileSlice
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch