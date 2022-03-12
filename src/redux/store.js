import {configureStore, combineReducers} from '@reduxjs/toolkit'
import authentication from './authentication'
import listMasterNodes from './nodesManagement/listMasterNodes'
import listSlaveNodes from './nodesManagement/listSlaveNodes'
import listLightData from './dataManagement/listLightData'
import listSoilMoistureData from './dataManagement/listSoilMoistureData'
import listVocData from './dataManagement/listVocData'
import listTemperatureData from './dataManagement/listTemperatureData'

const store = configureStore({
  reducer: {
    authentication: authentication,
    nodesManagement: combineReducers({
      listMasterNodes,
      listSlaveNodes,
    }),
    dataManagement: combineReducers({
      listLightData,
      listSoilMoistureData,
      listVocData,
      listTemperatureData,
    })
  },
})

export default store
