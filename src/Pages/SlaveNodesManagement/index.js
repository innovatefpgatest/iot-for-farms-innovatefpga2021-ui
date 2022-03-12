import React, {useEffect} from 'react';
import './index.less';
import {Typography, Table, message} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {login, logout} from "../../redux/authentication";
import moment from "moment"
import {
  getListSlaveNodesError,
  getListSlaveNodesFinish,
  getListSlaveNodesStart,
  getListSlaveNodesReset,
} from "../../redux/nodesManagement/listSlaveNodes";
import axios from "axios";
import {API_CODE_FAILURE, API_CODE_SUCCESS, INVALID_TOKEN} from "../../redux/errorCode"

const {Title, Text} = Typography

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
    title: 'Master node ID',
    dataIndex: 'master_id',
    key: 'master_id',
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

const SlaveNodesManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {master_id: masterId} = useParams()

  const authentication = useSelector(state => state.authentication)
  const {token} = authentication
  const {listSlaveNodes} = useSelector(state => state.nodesManagement)
  const {data, loading, error, code} = listSlaveNodes ?? {}
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
      getListSlaveNodes()
    }
  }, [token])

  useEffect(() => {
    if (!!code && code != API_CODE_SUCCESS) {
      message.error(error)
      dispatch(getListSlaveNodesReset())

      if (code == INVALID_TOKEN) {
        localStorage.removeItem("iotForFarmsUsername")
        localStorage.removeItem("iotForFarmsToken")
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [code])

  const getListSlaveNodes = () => {
    dispatch(getListSlaveNodesStart())
    const config = {
      headers: {Authorization: `Bearer ${token}`},
      params: {master_id: masterId}
    }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/slave-node/`, config)
      .then(res => {
        dispatch(getListSlaveNodesFinish({
          data: res.data,
          code: API_CODE_SUCCESS
        }))
      })
      .catch(err => {
        if (!!err?.response) {
          const errorDetails = err.response.data
          if (!!errorDetails?.detail) {
            dispatch(getListSlaveNodesError({
              code: errorDetails.code,
              error: errorDetails.detail
            }))
          } else {
            dispatch(getListSlaveNodesError({
              code: err.response.status,
              error: err.response.statusText
            }))
          }
        } else {
          dispatch(getListSlaveNodesError({
            code: API_CODE_FAILURE,
            error: err.toString()
          }))
        }
      })
  }

  return (<>
    <Title>Slave Nodes</Title>
    <Text>Master node ID: {masterId}</Text>
    <Table
      columns={columns}
      dataSource={listNodes}
      loading={loading}
      rowKey="id"
      pagination={{total: data?.total || 0, size: "small"}}
    />
  </>)
}

export default SlaveNodesManagement