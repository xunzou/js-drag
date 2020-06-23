import React, { useState,useEffect,FC } from 'react';
import { connect } from 'react-redux';
import { fetchUser, fetchPers } from '../store/actions/userActions';
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

interface ml  {
  dispatch: (a:()=> void) => any;
  userInfo:any;
  pers:any;
}

const MyLayout:FC<ml> = ({dispatch , userInfo,pers}) => {
  console.log(userInfo,pers)
  // 关闭和打开菜单
  const [collapsed,setCollapsed] = useState(false)
  let sc = () => {
    setCollapsed(!collapsed)
  }

  useEffect( () => {
    dispatch(fetchUser())
    dispatch(fetchPers())
  },[dispatch])


  return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider trigger={null} collapsible  collapsed={collapsed}>
            <Sidebar />
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div className="">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: sc,
            })}
            <span className="welcome">欢迎你 {userInfo ? userInfo.UName : ''}</span>
            </div>

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

const mapStateToProps:(state:any) => any = state => {
  console.log(state)
  return ({
    userInfo: state.users.userInfo,
    pers: state.users.pers,
  })
}

export default connect(mapStateToProps)(MyLayout);
