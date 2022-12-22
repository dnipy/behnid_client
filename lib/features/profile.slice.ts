import { createSlice } from '@reduxjs/toolkit'

export interface profileState {
  dropdown: boolean
}

const initialState: profileState = {
  dropdown: false,
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    OpenAndCloseProfile: (state) => {
      state.dropdown = !state.dropdown
      console.log(state.dropdown)
    },

  },
})

export const { OpenAndCloseProfile } = profileSlice.actions

export default profileSlice.reducer