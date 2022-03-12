import React, {useState, useEffect} from 'react';
import {Row, Col, Input, Button, message} from 'antd';
import './index.less';
import {
  createCommandStart,
  createCommandFinish,
  createCommandError,
  createCommandReset,
} from "../../redux/commandsManagement/createCommand";
import axios from "axios";
import {API_CODE_FAILURE, API_CODE_SUCCESS, INVALID_TOKEN, API_BAD_REQUEST} from "../../redux/errorCode";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/authentication";
import {useNavigate} from "react-router-dom";

const CreateCommand = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {createCommand} = useSelector(state => state.commandsManagement)
  const {loading, error, code} = createCommand ?? {}

  const [masterId, setMasterId] = useState('')
  const [slaveId, setSlaveId] = useState('')
  const [commandType, setCommandType] = useState(null)

  useEffect(() => {
    if (!!code && code != API_CODE_SUCCESS) {
      message.error(error)
      dispatch(createCommandReset())

      if (code == INVALID_TOKEN) {
        localStorage.removeItem("iotForFarmsUsername")
        localStorage.removeItem("iotForFarmsToken")
        dispatch(logout())
        navigate('/login')
      }
    }
  }, [code])

  const pushCommand = (type) => {
    setCommandType(type)
    dispatch(createCommandStart())
    const config = {
      headers: {Authorization: `Bearer ${localStorage.getItem("iotForFarmsToken")}`}
    }
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/command/`,
      {
        command_type: type,
        master_id: masterId,
        node_id: slaveId
      },
      config)
      .then(res => {
        setCommandType(null)
        setMasterId('')
        setSlaveId('')
        dispatch(createCommandFinish({
          data: res.data,
          code: API_CODE_SUCCESS
        }))
      })
      .catch(err => {
        setCommandType(null)
        setMasterId('')
        setSlaveId('')
        if (!!err?.response) {
          const errorDetails = err.response.data
          if (!!errorDetails?.detail) {
            dispatch(createCommandError({
              code: errorDetails.code,
              error: errorDetails.detail
            }))
          } else {
            let message = err.response.statusText
            const statusCode = err.response.status
            if (statusCode == API_BAD_REQUEST) {
              message = Object.values(err.response.data)[0][0]
            }
            dispatch(createCommandError({
              code: statusCode,
              error: message
            }))
          }
        } else {
          dispatch(createCommandError({
            code: API_CODE_FAILURE,
            error: err.toString()
          }))
        }
      })
  }

  return (<>
    <Row gutter={16} className='row-gutter'>
      <Col span={24}>
        <Input
          addonBefore='Master node ID:'
          placeholder='Input master node ID'
          allowClear={true}
          value={masterId}
          onChange={e => setMasterId(e.target.value)}
        />
      </Col>
    </Row>
    <Row gutter={16} className='row-gutter'>
      <Col span={24}>
        <Input
          addonBefore='Slave node ID:'
          placeholder='Input slave node ID'
          allowClear={true}
          value={slaveId}
          onChange={e => setSlaveId(e.target.value)}
        />
      </Col>
    </Row>
    <Row gutter={16} className='row-gutter'>
      <Col span={4} offset={12}>
        <Button
          type='primary'
          block
          disabled={!masterId || !slaveId}
          onClick={() => pushCommand('FAN')}
          loading={loading && commandType == 'FAN'}
        >
          FAN
        </Button>
      </Col>
      <Col span={4}>
        <Button
          type='primary'
          block
          disabled={!masterId || !slaveId}
          onClick={() => pushCommand('WTR')}
          loading={loading && commandType == 'WTR'}
        >
          WATERING
        </Button>
      </Col>
      <Col span={4}>
        <Button
          type='primary'
          block
          disabled={!masterId || !slaveId}
          onClick={() => pushCommand('FTL')}
          loading={loading && commandType == 'FTL'}
        >
          FERTILIZING
        </Button>
      </Col>
    </Row>
  </>)
}

export default CreateCommand