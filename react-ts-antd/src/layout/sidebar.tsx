import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1">
          <Link className={"nav-link"} to={"/"}>
            <UserOutlined /><span>Home</span> 
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link className={"nav-link"} to={"/app"}> <VideoCameraOutlined /><span>应用管理</span> </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link className={"nav-link"} to={"/tags"}> <UploadOutlined /><span>标签管理</span> </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Sidebar;
