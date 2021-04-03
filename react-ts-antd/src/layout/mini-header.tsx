import React from 'react';
import {  Menu, Dropdown } from 'antd';
import { DownOutlined,} from '@ant-design/icons';
import { logout} from '../utils/Session'

import {withRouter, Link } from 'react-router-dom';

function headerMenu(props:any){
  let history = props.history
  // :({ item:string; key:string; keyPath:string; domEvent:HTMLDivElement }) => void
  const onClick = (arg:any) => {
    let key = arg.key
    console.log(props)
    if(key === 'logout'){
      logout()
      history.push('/login')
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item>
        
          <Link className={"nav-link"} to={"/user"}><span>个人资料</span> </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">退出系统</Menu.Item>
    </Menu>
  );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
          个人中心 <DownOutlined />
        </a>
      </Dropdown>
    )

}

export default withRouter(headerMenu)