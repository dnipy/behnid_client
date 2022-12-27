import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ErrorState {
  isError : boolean,
  errorMessage : string
}


const initialState: ErrorState = {
  isError : false,
  errorMessage : ""
}

export const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setErrorTrue : (state,actions)=>{
        state.isError = true,
        state.errorMessage = actions.payload as string
    },
    setErrorInit : (state)=>{
        state.isError = false,
        state.errorMessage = ""
    }
    
  },
})

export const { setErrorInit , setErrorTrue } = errorSlice.actions

export default errorSlice.reducer