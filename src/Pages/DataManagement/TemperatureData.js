import React, {useEffect, useState} from 'react';
import './index.less';
import {Divider, message, Table} from 'antd';
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

const TemperatureData = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {listTemperatureData} = useSelector(state => state.dataManagement)
  const {data, loading, error, code} = listTemperatureData ?? {}
  const {data: listData} = data ?? {}

  const [dataSource, setDataSource] = useState(listData)
  const [page, setPage] = useState(1)

  useEffect(() => {
    getListTemperatureData(1)
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
    } else if (code == API_CODE_SUCCESS){
      if (listData?.length > 0) {
        let list = JSON.parse(JSON.stringify(listData))
        for (const i in list) {
          list[i]['node_id'] = list[i]['node_id'].toString()
        }
        setDataSource(list)
      }
    }
  }, [code])

  const getListTemperatureData = (currentPage) => {
    setPage(currentPage)
    dispatch(getListTemperatureDataStart())
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("iotForFarmsToken")}`}
    }
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/temperature/?page=${currentPage}`, config)
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

  const plotConfig = {
    data: dataSource?.length > 0 ? dataSource : [],
    xField: 'created_at',
    yField: 'value',
    seriesField: 'node_id',
    xAxis: {
      type: 'time',
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
      dataSource={dataSource}
      loading={loading}
      rowKey="id"
      pagination={{
        total: data?.total || 0,
        pageSize: data?.page_size || 10,
        current: page,
        size: "small",
        onChange: (currentPage) => getListTemperatureData(currentPage),
      }}
    />
  </>)
}

export default TemperatureData