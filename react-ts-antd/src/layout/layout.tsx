import React, { useState } from 'react';
import Sidebar from './sidebar'
import Main from './main'
import MiniHeader from './mini-header'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import '../assets/style/layout.css'
const { Header, Content, Footer, Sider } = Layout;

function MyLayout() {
  const [collapsed,setCollapsed] = useState(false)
  let sc = () => {
    setCollapsed(!collapsed)
  }
  return (
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

            <MiniHeader />
          </Header>
          <Content style={{ margin: '18px' }}>
            <Main/>
          </Content>
          <Footer style={{ textAlign: 'center' }}>www.xunzou.com</Footer>
        </Layout>
      </Layout>
  );
}

export default MyLayout;
