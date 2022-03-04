import React, {useEffect} from 'react';
import './index.less';
import {Typography, Tabs, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/authentication";

const {Title} = Typography
const {TabPane} = Tabs

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Node ID',
    dataIndex: 'node_id',
    key: 'node_id',
  }, {
    title: 'Value',
    dataIndex: 'value',
    key: 'value',
  }, {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
  }, {
    title: 'Updated at',
    dataIndex: 'updated_at',
    key: 'updated_at',
  }
]

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
        <Table columns={columns}/>
      </TabPane>
      <TabPane tab="Soil moisture data" key="soil">
        <Table columns={columns}/>
      </TabPane>
      <TabPane tab="Temperature data" key="temperature">
        <Table columns={columns}/>
      </TabPane>
      <TabPane tab="VOC data" key="voc">
        <Table columns={columns}/>
      </TabPane>
    </Tabs>
  </>)
}

export default DataManagement