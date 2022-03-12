import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  loading: false,
  data: null,
  code: null,
  error: null
}

export const listLightData = createSlice({
  name: 'listLightData',
  initialState,
  reducers: {
    getListLightDataStart: (state) => {
      state.loading = true
      state.data = null
      state.code = null
      state.error = null
    },
    getListLightDataFinish: (state, action) => {
      const {data, code} = action.payload
      state.loading = false
      state.data = data
      state.code = code
      state.error = null
    },
    getListLightDataError: (state, action) => {
      const {code, error} = action.payload
      state.loading = false
      state.data = null
      state.code = code
      state.error = error
    },
    getListLightDataReset: (state) => {
      state.loading = false
      state.data = null
      state.code = null
      state.error = null
    }
  }
})

// Action creators are generated for each case reducer function
export const {getListLightDataStart, getListLightDataFinish, getListLightDataError, getListLightDataReset} = listLightData.actions

export default listLightData.reducer