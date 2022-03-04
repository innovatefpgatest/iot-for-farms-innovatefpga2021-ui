import React, {useEffect} from 'react';
import './index.less';
import {Typography, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from '../../redux/authentication'
import {
  getListMasterNodesStart,
  getListMasterNodesFinish,
  getListMasterNodesError
} from '../../redux/nodesManagement/listMasterNodes'
import axios from "axios";
import {API_CODE_FAILURE, API_CODE_SUCCESS} from "../../redux/errorCode";
import moment from 'moment'

const {Title} = Typography

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'Physical ID',
    dataIndex: 'physical_id',
    key: 'physical_id',
  }, {
    title: 'Longtitude',
    dataIndex: 'longtitude',
    key: 'longtitude',
  }, {
    title: 'Latitude',
    dataIndex: 'latitude',
    key: 'latitude',
  }, {
    title: 'Created at',
    dataIndex: 'created_at',
    key: 'created_at',
    render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
  }, {
    title: 'Updated at',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
  }
]

const NodesManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authentication = useSelector(state => state.authentication)
  const {token} = authentication
  const {listMasterNodes} = useSelector(state => state.nodesManagement)
  const {data, loading, error} = listMasterNodes ?? {}
  const {data: listNodes} = data ?? {}

  useEffect(() => {
    if (!token) {
      const username = localStorage.getItem("iotForFarmsUsername")
      const token = localStorage.getItem("iotForFarmsToken")
      if (!token) {
        navigate('/login')
      } else {
        dispatch(login({username, token}))
      }
    } else {
      getListMasterNodes()
    }
  }, [token])

  const getListMasterNodes = () => {
    dispatch(getListMasterNodesStart())
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("iotForFarmsToken")}`}
    }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/master-node/`, config)
      .then(res => {
        dispatch(getListMasterNodesFinish({
          data: res.data,
          code: API_CODE_SUCCESS
        }))
      })
      .catch(err => {
        dispatch(getListMasterNodesError({
          code: API_CODE_FAILURE,
          error: err.toString()
        }))
      })
  }

  return (<>
    <Title>Nodes Management</Title>
    <Table columns={columns} dataSource={listNodes} loading={loading} rowKey="id"/>
  </>)
}

export default NodesManagement