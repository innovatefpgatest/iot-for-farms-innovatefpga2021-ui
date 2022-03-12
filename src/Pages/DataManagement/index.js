import React, {useEffect} from 'react';
import './index.less';
import {Typography, Tabs} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/authentication";
import LightData from './LightData';
import SoilMoistureData from './SoilMoistureData';
import TemperatureData from "./TemperatureData";
import VocData from "./VocData";

const {Title} = Typography
const {TabPane} = Tabs

const DataManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authentication = useSelector(state => state.authentication)
  const {token} = authentication

  useEffect(() => {
    if (!token) {
      const username = localStorage.getItem("iotForFarmsUsername")
      const token = localStorage.getItem("iotForFarmsToken")
      if (!token) {
        navigate('/login')
      } else {
        dispatch(login({username, token}))
      }
    }
  }, [token])

  return (<>
    <Title>Data Management</Title>
    <Tabs defaultActiveKey="light">
      <TabPane tab="Light data" key="light">
        <LightData/>
      </TabPane>
      <TabPane tab="Soil moisture data" key="soil">
        <SoilMoistureData/>
      </TabPane>
      <TabPane tab="Temperature data" key="temperature">
        <TemperatureData/>
      </TabPane>
      <TabPane tab="VOC data" key="voc">
        <VocData/>
      </TabPane>
    </Tabs>
  </>)
}

export default DataManagement