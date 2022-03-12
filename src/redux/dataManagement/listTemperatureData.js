import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: null,
  code: null,
  error: null
}

export const listTemperatureData = createSlice({
  name: 'listTemperatureData',
  initialState,
  reducers: {
    getListTemperatureDataStart: (state) => {
      state.loading = true
      state.data = null
      state.code = null
      state.error = null
    },
    getListTemperatureDataFinish: (state, action) => {
      const {data, code} = action.payload
      state.loading = false
      state.data = data
      state.code = code
      state.error = null
    },
    getListTemperatureDataError: (state, action) => {
      const {code, error} = action.payload
      state.loading = false
      state.data = null
      state.code = code
      state.error = error
    },
    getListTemperatureDataReset: (state) => {
      state.loading = false
      state.data = null
      state.code = null
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const {getListTemperatureDataStart, getListTemperatureDataFinish, getListTemperatureDataError, getListTemperatureDataReset} = listTemperatureData.actions

export default listTemperatureData.reducer