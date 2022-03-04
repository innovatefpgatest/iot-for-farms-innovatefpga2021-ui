import React, {useEffect} from 'react';
import './index.less';
import {Typography, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from "../../redux/authentication";

const {Title} = Typography

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Master node ID',
    dataIndex: 'master_id',
    key: 'master_id',
  }, {
    title: 'Slave node ID',
    dataIndex: 'node_id',
    key: 'node_id',
  }, {
    title: 'Command type',
    dataIndex: 'command_type',
    key: 'command_type',
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
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

const CommandsManagement = () => {
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
    <Title>Commands Management</Title>
    <Table columns={columns}/>
  </>)
}

export default CommandsManagement