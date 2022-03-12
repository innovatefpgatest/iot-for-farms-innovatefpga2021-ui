import React, {useEffect} from 'react';
import './index.less';
import {Typography, Table, message, Tag} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {login, logout} from "../../redux/authentication";
import moment from "moment";
import {API_CODE_FAILURE, API_CODE_SUCCESS, INVALID_TOKEN} from "../../redux/errorCode";
import {
  getListCommandsError,
  getListCommandsFinish,
  getListCommandsReset,
  getListCommandsStart
} from "../../redux/commandsManagement/listCommands";
import axios from "axios";
import {command_statuses, command_types} from "./constants";

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
    render: (text) => <Link to={`/slave-nodes/${text}`}>{text}</Link>
  }, {
    title: 'Slave node ID',
    dataIndex: 'node_id',
    key: 'node_id',
  }, {
    title: 'Command type',
    dataIndex: 'command_type',
    key: 'command_type',
    render: (text) => command_types[text]
  }, {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (text) => <Tag color={command_statuses[text].colour}>{command_statuses[text].text}</Tag>
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

const CommandsManagement = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authentication = useSelector(state => state.authentication)
  const {token} = authentication
  const {listCommands} = useSelector(state => state.commandsManagement)
  const {data, loading, error, code} = listCommands ?? {}
  const {data: listData} = data ?? {}

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
      getListCommands()
    }
  }, [token])

  useEffect(() => {
    if (!!code && code != API_CODE_SUCCESS) {
      message.error(error)
      dispatch(getListCommandsReset())

      if (code == INVALID_TOKEN) {
        localStorage.removeItem("iotForFarmsUsername")
        localStorage.removeItem("iotForFarmsToken")
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [code])

  const getListCommands = () => {
    dispatch(getListCommandsStart())
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("iotForFarmsToken")}`}
    }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/command/`, config)
      .then(res => {
        dispatch(getListCommandsFinish({
          data: res.data,
          code: API_CODE_SUCCESS
        }))
      })
      .catch(err => {
        if (!!err?.response) {
          const errorDetails = err.response.data
          if (!!errorDetails?.detail) {
            dispatch(getListCommandsError({
              code: errorDetails.code,
              error: errorDetails.detail
            }))
          } else {
            dispatch(getListCommandsError({
              code: err.response.status,
              error: err.response.statusText
            }))
          }
        } else {
          dispatch(getListCommandsError({
            code: API_CODE_FAILURE,
            error: err.toString()
          }))
        }
      })
  }

  return (<>
    <Title>Commands Management</Title>
    <Table
      columns={columns}
      dataSource={listData}
      loading={loading}
      rowKey="id"
      pagination={{total: data?.total || 0, size: "small"}}
    />
  </>)
}

export default CommandsManagement