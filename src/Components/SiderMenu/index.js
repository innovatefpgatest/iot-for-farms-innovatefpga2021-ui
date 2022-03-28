import React, {useState, useEffect} from 'react'
import {Layout, Menu} from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  ApartmentOutlined,
  DatabaseOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import {Link, useLocation} from 'react-router-dom'
import './index.less'
import {useSelector} from "react-redux"

const {Header, Sider, Content} = Layout;

const SiderMenu = ({children}) => {
  const location = useLocation()

  const [collapsed, setCollapsed] = useState(false)
  const [key, setKey] = useState(
    location.pathname.split('/')[1] == 'slave-nodes'
    || location.pathname == '/login'
      ? '/'
      : location.pathname
  )

  const authentication = useSelector(state => state.authentication)
  const {username} = authentication

  useEffect(() => {
    setKey(location.pathname.split('/')[1] == 'slave-nodes'
    || location.pathname == '/login'
      ? '/'
      : location.pathname)
  }, [location])

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout>
      <Sider width={250} trigger={null} collapsible collapsed={collapsed}>
        <div className={`username ${collapsed ? 'small' : ''}`}>
          {username}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[key]}
        >
          <Menu.Item key="/" icon={<ApartmentOutlined/>}>
            <Link to="/">Nodes Management</Link>
          </Menu.Item>
          <Menu.Item key="/data" icon={<DatabaseOutlined/>}>
            <Link to="/data">Data Management</Link>
          </Menu.Item>
          <Menu.Item key="/commands" icon={<UnorderedListOutlined/>}>
            <Link to="/commands">Commands Management</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{padding: 0}}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 'calc(100vh - 112px)',
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default SiderMenu