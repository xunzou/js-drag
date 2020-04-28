import React, { useState } from 'react';
import Sidebar from './sidebar'
import Main from './main'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
// import { Link, Switch, Route } from 'react-router-dom';

// import Home from '../../pages/home'
// import AppManager from '../../pages/app/index'
// import TagsManager from '../../pages/tags/index'

function MyLayout() {
  const [collapsed,setCollapsed] = useState(false)
  let sc = () => {
    setCollapsed(!collapsed)
  }
  return (
    <>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible  collapsed={collapsed}>
            <Sidebar />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: sc,
            })}
          </Header>
          <Content style={{ margin: '18px' }}>
            <Main/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>www.jesem.com</Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default MyLayout;
