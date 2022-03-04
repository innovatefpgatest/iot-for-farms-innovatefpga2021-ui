import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  username: null,
  token: null,
}

export const authentication = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    login: (state, action) => {
      const {username, token} = action.payload
      state.username = username
      state.token = token
    },
    logout: (state) => {
      state.username = null
      state.token = null
    },
  },
})

// Action creators are generated for each case reducer function
export const {login, logout} = authentication.actions

export default authentication.reducer