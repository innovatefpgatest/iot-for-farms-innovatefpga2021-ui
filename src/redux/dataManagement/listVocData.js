import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: null,
  code: null,
  error: null
}

export const listVocData = createSlice({
  name: 'listVocData',
  initialState,
  reducers: {
    getListVocDataStart: (state) => {
      state.loading = true
      state.data = null
      state.code = null
      state.error = null
    },
    getListVocDataFinish: (state, action) => {
      const {data, code} = action.payload
      state.loading = false
      state.data = data
      state.code = code
      state.error = null
    },
    getListVocDataError: (state, action) => {
      const {code, error} = action.payload
      state.loading = false
      state.data = null
      state.code = code
      state.error = error
    },
    getListVocDataReset: (state) => {
      state.loading = false
      state.data = null
      state.code = null
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const {getListVocDataStart, getListVocDataFinish, getListVocDataError, getListVocDataReset} = listVocData.actions

export default listVocData.reducer