import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: null,
  code: null,
  error: null
}

export const listMasterNodes = createSlice({
  name: 'listMasterNodes',
  initialState,
  reducers: {
    getListMasterNodesStart: (state) => {
      state.loading = true
      state.data = null
      state.code = null
      state.error = null
    },
    getListMasterNodesFinish: (state, action) => {
      const {data, code} = action.payload
      state.loading = false
      state.data = data
      state.code = code
      state.error = null
    },
    getListMasterNodesError: (state, action) => {
      const {code, error} = action.payload
      state.loading = false
      state.data = null
      state.code = code
      state.error = error
    }
  }
})

// Action creators are generated for each case reducer function
export const {getListMasterNodesStart, getListMasterNodesFinish, getListMasterNodesError} = listMasterNodes.actions

export default listMasterNodes.reducer