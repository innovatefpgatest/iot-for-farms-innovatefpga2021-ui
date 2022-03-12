import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: null,
  code: null,
  error: null
}

export const createCommand = createSlice({
  name: 'createCommand',
  initialState,
  reducers: {
    createCommandStart: (state) => {
      state.loading = true
      state.data = null
      state.code = null
      state.error = null
    },
    createCommandFinish: (state, action) => {
      const {data, code} = action.payload
      state.loading = false
      state.data = data
      state.code = code
      state.error = null
    },
    createCommandError: (state, action) => {
      const {code, error} = action.payload
      state.loading = false
      state.data = null
      state.code = code
      state.error = error
    },
    createCommandReset: (state) => {
      state.loading = false
      state.data = null
      state.code = null
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const {createCommandStart, createCommandFinish, createCommandError, createCommandReset} = createCommand.actions

export default createCommand.reducer