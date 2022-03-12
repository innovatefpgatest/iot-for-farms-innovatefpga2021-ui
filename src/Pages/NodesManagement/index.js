import React, {useEffect} from 'react';
import './index.less';
import {Typography, Table, message} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {login} from '../../redux/authentication'
import {
  getListMasterNodesStart,
  getListMasterNodesFinish,
  getListMasterNodesError,
  getListMasterNodesReset
} from '../../redux/nodesManagement/listMasterNodes'
import {logout} from "../../redux/authentication"
import axios from "axios";
import {API_CODE_FAILURE, API_CODE_SUCCESS, INVALID_TOKEN} from "../../redux/errorCode";
import moment from 'moment'
import {Link} from "react-router-dom"

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
    render: (text) => <Link to={`/slave-nodes/${text}`}>{text}</Link>
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
  const {data, loading, error, code} = listMasterNodes ?? {}
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

  useEffect(() => {
    if (!!code && code != API_CODE_SUCCESS) {
      message.error(error)
      dispatch(getListMasterNodesReset())

      if (code == INVALID_TOKEN) {
        localStorage.removeItem("iotForFarmsUsername")
        localStorage.removeItem("iotForFarmsToken")
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [code])

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
        if (!!err?.response) {
          const errorDetails = err.response.data
          if (!!errorDetails?.detail) {
            dispatch(getListMasterNodesError({
              code: errorDetails.code,
              error: errorDetails.detail
            }))
          } else {
            dispatch(getListMasterNodesError({
              code: err.response.status,
              error: err.response.statusText
            }))
          }
        } else {
          dispatch(getListMasterNodesError({
            code: API_CODE_FAILURE,
            error: err.toString()
          }))
        }
      })
  }

  return (<>
    <Title>Nodes Management</Title>
    <Table
      columns={columns}
      dataSource={listNodes}
      loading={loading}
      rowKey="id"
      pagination={{total: data?.total || 0, size: "small"}}
    />
  </>)
}

export default NodesManagement