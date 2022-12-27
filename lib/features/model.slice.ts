import { createSlice } from '@reduxjs/toolkit'

export interface modelState {
  isShown : boolean,
}


const initialState: modelState = {
  isShown : false,
}

export const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    changeModelShown : (state) =>{
        state.isShown = !state.isShown
    }
  },
})

export const { changeModelShown } = modelSlice.actions

export default modelSlice.reducer