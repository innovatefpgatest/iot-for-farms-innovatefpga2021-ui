import React, {useEffect, useState} from 'react';
import './index.less';
import {message, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {API_CODE_FAILURE, API_CODE_SUCCESS, INVALID_TOKEN} from "../../redux/errorCode";
import {
  getListLightDataError,
  getListLightDataFinish,
  getListLightDataReset,
  getListLightDataStart
} from "../../redux/dataManagement/listLightData";
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

const LightData = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {listLightData} = useSelector(state => state.dataManagement)
  const {data, loading, error, code} = listLightData ?? {}
  const {data: listData} = data ?? {}

  const [page, setPage] = useState(1)

  useEffect(() => {
    getListLightData(1)
  }, [])

  useEffect(() => {
    if (!!code && code != API_CODE_SUCCESS) {
      message.error(error)
      dispatch(getListLightDataReset())

      if (code == INVALID_TOKEN) {
        localStorage.removeItem("iotForFarmsUsername")
        localStorage.removeItem("iotForFarmsToken")
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [code])

  const getListLightData = (currentPage) => {
    setPage(currentPage)
    dispatch(getListLightDataStart())
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("iotForFarmsToken")}`}
    }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/light/?page=${currentPage}`, config)
      .then(res => {
        dispatch(getListLightDataFinish({
          data: res.data,
          code: API_CODE_SUCCESS
        }))
      })
      .catch(err => {
        if (!!err?.response) {
          const errorDetails = err.response.data
          if (!!errorDetails?.detail) {
            dispatch(getListLightDataError({
              code: errorDetails.code,
              error: errorDetails.detail
            }))
          } else {
            dispatch(getListLightDataError({
              code: err.response.status,
              error: err.response.statusText
            }))
          }
        } else {
          dispatch(getListLightDataError({
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
    pagination={{
      total: data?.total || 0,
      pageSize: data?.page_size || 10,
      current: page,
      size: "small",
      onChange: (currentPage) => getListLightData(currentPage),
    }}
  />)
}

export default LightData