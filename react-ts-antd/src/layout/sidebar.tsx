import React, { useState, useEffect } from 'react';
import { Link,withRouter,RouteComponentProps} from 'react-router-dom';
import { Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';



const { SubMenu } = Menu;

const menus = [
  {
    title: '工作台',
    icon: () => <UserOutlined />,
    key: '/dashboard'
  },
  {
    title: '线索管理',
    icon: () => <VideoCameraOutlined />,
    key: '/clue',
    subs:[
      {key: '/clue/index', title: '我的线索', icon: '',},
      {key: '/clue/sub', title: '下属线索', icon: '',},
      {key: '/clue/all', title: '全部线索', icon: '',},
    ],
  },
  {
    title: '线索公海',
    icon: () => <UploadOutlined />,
    key: '/clue-sea'
  },

]

interface SidebarRouteProps extends RouteComponentProps  {}

function Sidebar(props:SidebarRouteProps) {
  const pathName = props.location.pathname
  console.log(pathName)
  const [defKeys,setDefKeys] = useState([pathName])
  const [openKeys,setOpenKeys] = useState<string[]>([pathName.substr(0, pathName.lastIndexOf('/'))])
  useEffect(() => {
    const rank = pathName.split('/')
    console.log(rank,pathName)
    switch (rank.length) {
      case 2 :  //一级目录
        setDefKeys([pathName])
        setOpenKeys([])
        break;
      // case 5 : //三级目录，要展开两个subMenu
      //   // this.setState({
      //   //   selectedKeys: [pathname],
      //   //   openKeys: [rank.slice(0, 3).join('/'), rank.slice(0, 4).join('/')]
      //   // })
      //   break;
      default :
        // 默认二级菜单
        console.log(pathName.substr(0, pathName.lastIndexOf('/')))
        setDefKeys([pathName])
        setOpenKeys([pathName.substr(0, pathName.lastIndexOf('/'))])
    }
  },[pathName])

  // 打开关闭二级菜单
  const onOpenChange = (openKeys: string[]) => {
    console.log(openKeys)
    setOpenKeys(openKeys)
  }
  
  return (
    <div className="sidebar">
      <div className="logo" />
      {defKeys}：
      {openKeys}
      <Menu theme="dark" mode="inline" selectedKeys={defKeys} openKeys={openKeys} onOpenChange={onOpenChange}>
        {menus.map((el) => (
          el.subs && el.subs.length ? 
            <SubMenu key={el.key} title={<span>{el.icon && el.icon()}<span>{el.title}</span></span>}>
              {el.subs.map(ele => (
                <Menu.Item key={ele.key}><Link className={"sub-nav-link"} to={ele.key}><span>{ele.title}</span></Link></Menu.Item>
              ))}
            </SubMenu>
          :<Menu.Item key={el.key}>
            <Link className={"nav-link"} to={el.key}>{el.icon && el.icon()}<span>{el.title}</span> </Link>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}


export default withRouter(Sidebar);
