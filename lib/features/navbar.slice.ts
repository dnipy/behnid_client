import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'




export interface NavbarState {
  value: boolean
  categories : boolean
  catNum : number
  notif : boolean
  mobileExp : boolean
}




const initialState: NavbarState = {
  value: false,
  categories : false,
  catNum : 0,
  notif : false,
  mobileExp : false
}

export const navbarSlice = createSlice({
  name: 'navbar',
  initialState,
  reducers: {
    OpenAndClose: (state) => {
      state.value = !state.value
    },
    OpenAndCloseNotif: (state) => {
      state.notif = !state.notif
    },
    OpenAndCloseMob: (state) => {
      state.mobileExp = !state.mobileExp
    },
    OpenAndCloseCat : (state) => {
      state.categories = !state.categories
      state.catNum = 0
    },
    setCatNum : (state,action) =>{
      state.catNum = action.payload as number
    }
  },
})

export const { OpenAndClose , OpenAndCloseCat , OpenAndCloseMob, setCatNum  , OpenAndCloseNotif} = navbarSlice.actions

export default navbarSlice.reducer