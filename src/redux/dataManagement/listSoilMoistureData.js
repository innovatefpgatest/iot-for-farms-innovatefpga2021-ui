import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: null,
  code: null,
  error: null
}

export const listSoilMoistureData = createSlice({
  name: 'listSoilMoistureData',
  initialState,
  reducers: {
    getListSoilMoistureDataStart: (state) => {
      state.loading = true
      state.data = null
      state.code = null
      state.error = null
    },
    getListSoilMoistureDataFinish: (state, action) => {
      const {data, code} = action.payload
      state.loading = false
      state.data = data
      state.code = code
      state.error = null
    },
    getListSoilMoistureDataError: (state, action) => {
      const {code, error} = action.payload
      state.loading = false
      state.data = null
      state.code = code
      state.error = error
    },
    getListSoilMoistureDataReset: (state) => {
      state.loading = false
      state.data = null
      state.code = null
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const {getListSoilMoistureDataStart, getListSoilMoistureDataFinish, getListSoilMoistureDataError, getListSoilMoistureDataReset} = listSoilMoistureData.actions

export default listSoilMoistureData.reducer