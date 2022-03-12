import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: null,
  code: null,
  error: null
}

export const listCommands = createSlice({
  name: 'listCommands',
  initialState,
  reducers: {
    getListCommandsStart: (state) => {
      state.loading = true
      state.data = null
      state.code = null
      state.error = null
    },
    getListCommandsFinish: (state, action) => {
      const {data, code} = action.payload
      state.loading = false
      state.data = data
      state.code = code
      state.error = null
    },
    getListCommandsError: (state, action) => {
      const {code, error} = action.payload
      state.loading = false
      state.data = null
      state.code = code
      state.error = error
    },
    getListCommandsReset: (state) => {
      state.loading = false
      state.data = null
      state.code = null
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const {getListCommandsStart, getListCommandsFinish, getListCommandsError, getListCommandsReset} = listCommands.actions

export default listCommands.reducer