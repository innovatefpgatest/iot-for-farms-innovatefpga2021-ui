import {configureStore, combineReducers} from '@reduxjs/toolkit'
import authentication from './authentication'
import listMasterNodes from './nodesManagement/listMasterNodes'
import listSlaveNodes from './nodesManagement/listSlaveNodes'
import listLightData from './dataManagement/listLightData'
import listSoilMoistureData from './dataManagement/listSoilMoistureData'
import listVocData from './dataManagement/listVocData'
import listTemperatureData from './dataManagement/listTemperatureData'
import listCommands from './commandsManagement/listCommands'
import createCommand from './commandsManagement/createCommand'

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
    }),
    commandsManagement: combineReducers({
      listCommands,
      createCommand,
    }),
  },
})

export default store
