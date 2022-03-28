import React, {useEffect, useState} from 'react';
import './index.less';
import {Divider, message, Table} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {API_CODE_FAILURE, API_CODE_SUCCESS, INVALID_TOKEN} from "../../redux/errorCode";
import {
  getListSoilMoistureDataError,
  getListSoilMoistureDataFinish,
  getListSoilMoistureDataReset,
  getListSoilMoistureDataStart
} from "../../redux/dataManagement/listSoilMoistureData";
import {logout} from "../../redux/authentication";
import axios from "axios";
import moment from 'moment';
import {Line} from "@ant-design/plots";

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

const SoilMoistureData = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {listSoilMoistureData} = useSelector(state => state.dataManagement)
  const {data, loading, error, code} = listSoilMoistureData ?? {}
  const {data: listData} = data ?? {}

  const [page, setPage] = useState(1)

  useEffect(() => {
    getListSoilMoistureData(1)
  }, [])

  useEffect(() => {
    if (!!code && code != API_CODE_SUCCESS) {
      message.error(error)
      dispatch(getListSoilMoistureDataReset())

      if (code == INVALID_TOKEN) {
        localStorage.removeItem("iotForFarmsUsername")
        localStorage.removeItem("iotForFarmsToken")
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [code])

  const getListSoilMoistureData = (currentPage) => {
    setPage(currentPage)
    dispatch(getListSoilMoistureDataStart())
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("iotForFarmsToken")}`}
    }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/soil-moisture/?page=${currentPage}`, config)
      .then(res => {
        dispatch(getListSoilMoistureDataFinish({
          data: res.data,
          code: API_CODE_SUCCESS
        }))
      })
      .catch(err => {
        if (!!err?.response) {
          const errorDetails = err.response.data
          if (!!errorDetails?.detail) {
            dispatch(getListSoilMoistureDataError({
              code: errorDetails.code,
              error: errorDetails.detail
            }))
          } else {
            dispatch(getListSoilMoistureDataError({
              code: err.response.status,
              error: err.response.statusText
            }))
          }
        } else {
          dispatch(getListSoilMoistureDataError({
            code: API_CODE_FAILURE,
            error: err.toString()
          }))
        }
      })
  }

  const plotConfig = {
    data: listData?.length > 0 ? listData : [],
    xField: 'created_at',
    yField: 'value',
    seriesField: 'node_id',
    xAxis: {
      label: {
        formatter: (v) => moment(v).format("DD/MM/YYYY HH:mm:ss"),
      },
    },
    point: {
      size: 5,
    },
  };

  return (<>
    <Line {...plotConfig} />
    <Divider/>
    <Table
      columns={columns}
      dataSource={listData}
      loading={loading}
      rowKey="id"
      pagination={{
        total: data?.total || 0,
        pageSize: data?.page_size || 10,
        current: page,
        size: "small",
        onChange: (currentPage) => getListSoilMoistureData(currentPage),
      }}
    />
  </>)
}

export default SoilMoistureData