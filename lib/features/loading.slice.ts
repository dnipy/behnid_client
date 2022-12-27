import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface LoadingState {
  isLoading : boolean,
}


const initialState: LoadingState = {
  isLoading : false,
}

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading : (state) =>{
        state.isLoading = true
    },
    stopLoading : (state) =>{
        state.isLoading = false
    }
  },
})

export const { setLoading , stopLoading } = loadingSlice.actions

export default loadingSlice.reducer