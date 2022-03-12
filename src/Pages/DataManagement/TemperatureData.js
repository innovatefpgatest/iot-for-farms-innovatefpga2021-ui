import React, {useEffect} from 'react';
import './index.less';
import {message, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {API_CODE_FAILURE, API_CODE_SUCCESS, INVALID_TOKEN} from "../../redux/errorCode";
import {
  getListTemperatureDataError,
  getListTemperatureDataFinish,
  getListTemperatureDataReset,
  getListTemperatureDataStart
} from "../../redux/dataManagement/listTemperatureData";
import {logout} from "../../redux/authentication";
import axios from "axios";
import moment from 'moment';

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
    render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
  }, {
    title: 'Updated at',
    dataIndex: 'updated_at',
    key: 'updated_at',
    render: (text) => moment(text).format("DD/MM/YYYY HH:mm:ss"),
  }
]

const TemperatureData = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {listTemperatureData} = useSelector(state => state.dataManagement)
  const {data, loading, error, code} = listTemperatureData ?? {}
  const {data: listData} = data ?? {}

  useEffect(() => {
    getListTemperatureData()
  }, [])

  useEffect(() => {
    if (!!code && code != API_CODE_SUCCESS) {
      message.error(error)
      dispatch(getListTemperatureDataReset())

      if (code == INVALID_TOKEN) {
        localStorage.removeItem("iotForFarmsUsername")
        localStorage.removeItem("iotForFarmsToken")
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [code])

  const getListTemperatureData = () => {
    dispatch(getListTemperatureDataStart())
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("iotForFarmsToken")}`}
    }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/temperature/`, config)
      .then(res => {
        dispatch(getListTemperatureDataFinish({
          data: res.data,
          code: API_CODE_SUCCESS
        }))
      })
      .catch(err => {
        if (!!err?.response) {
          const errorDetails = err.response.data
          if (!!errorDetails?.detail) {
            dispatch(getListTemperatureDataError({
              code: errorDetails.code,
              error: errorDetails.detail
            }))
          } else {
            dispatch(getListTemperatureDataError({
              code: err.response.status,
              error: err.response.statusText
            }))
          }
        } else {
          dispatch(getListTemperatureDataError({
            code: API_CODE_FAILURE,
            error: err.toString()
          }))
        }
      })
  }

  return (<Table
    columns={columns}
    dataSource={listData}
    loading={loading}
    rowKey="id"
    pagination={{total: data?.total || 0, size: "small"}}
  />)
}

export default TemperatureData