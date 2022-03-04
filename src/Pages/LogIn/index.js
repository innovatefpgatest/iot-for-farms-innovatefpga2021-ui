import {Form, Input, Button} from 'antd';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import {login} from '../../redux/authentication'

const LogIn = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authentication = useSelector(state => state.authentication)
  const {username, token} = authentication

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (username && token) {
      navigate('/')
    }
  }, [username, token])

  const onFinish = (values) => {
    if (!token) {
      setLoading(true)
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/authentication/login/`, values)
        .then(res => {
          dispatch(login({username: values.username, token: res.data.access}))
          localStorage.setItem("iotForFarmsUsername", values.username)
          localStorage.setItem("iotForFarmsToken", res.data.access)
          setLoading(false)
        })
    }
  }

  return (<div style={{maxWidth: 700}}>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  </div>)
}

export default LogIn