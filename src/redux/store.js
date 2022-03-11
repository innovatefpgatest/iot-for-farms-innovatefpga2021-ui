import {configureStore, combineReducers} from '@reduxjs/toolkit'
import authentication from './authentication'
import listMasterNodes from './nodesManagement/listMasterNodes'
import listSlaveNodes from './nodesManagement/listSlaveNodes'

const store = configureStore({
  reducer: {
    authentication: authentication,
    nodesManagement: combineReducers({
      listMasterNodes,
      listSlaveNodes,
    }),
  },
})

export default store
