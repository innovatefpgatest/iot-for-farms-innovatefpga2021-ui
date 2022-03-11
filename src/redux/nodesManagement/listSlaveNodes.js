import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: null,
  code: null,
  error: null
}

export const listSlaveNodes = createSlice({
  name: 'listSlaveNodes',
  initialState,
  reducers: {
    getListSlaveNodesStart: (state) => {
      state.loading = true
      state.data = null
      state.code = null
      state.error = null
    },
    getListSlaveNodesFinish: (state, action) => {
      const {data, code} = action.payload
      state.loading = false
      state.data = data
      state.code = code
      state.error = null
    },
    getListSlaveNodesError: (state, action) => {
      const {code, error} = action.payload
      state.loading = false
      state.data = null
      state.code = code
      state.error = error
    },
    getListSlaveNodesReset: (state) => {
      state.loading = false
      state.data = null
      state.code = null
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const {getListSlaveNodesStart, getListSlaveNodesFinish, getListSlaveNodesError, getListSlaveNodesReset} = listSlaveNodes.actions

export default listSlaveNodes.reducer