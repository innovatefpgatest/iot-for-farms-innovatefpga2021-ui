import {configureStore, combineReducers} from '@reduxjs/toolkit'
import authentication from './authentication'
import listMasterNodes from './nodesManagement/listMasterNodes'

const store = configureStore({
  reducer: {
    authentication: authentication,
    nodesManagement: combineReducers({
      listMasterNodes,
    }),
  },
})

export default store
