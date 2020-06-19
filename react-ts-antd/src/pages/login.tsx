import React from 'react';
// import { useHistory} from 'react-router-dom';
// import { authSuccess ,isAuth} from '../utils/Session'
// import axios from 'axios'
import { Tabs } from 'antd';
import NormalLogin from '../components/Login/normal_login'
import '../assets/style/login.css'
const { TabPane } = Tabs;




function Login() {
  // const history = useHistory()
  // const auth = !!isAuth()
  // const login = ()=> {
  //   history.push('/')
  // }


  function callback(key:string) {
    console.log(key);
  }

  

  return (
    // <div className="login">
    //   <h1>这是登录页</h1>
    //   {auth ? history.push('/') : ''}
    //   <button onClick={login}> 点这里登陆 </button>
    // </div>
    <div className="login_wrap">
      <div className="login">
        <div className="logo">
          <h1>登录页面</h1>
        </div>
        <div>
        <Tabs defaultActiveKey="1" animated={true} onChange={callback}>
          <TabPane tab="账户密码登录" key="1">
            <NormalLogin ></NormalLogin>

          </TabPane>
          <TabPane tab="手机号登录" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
        </div>
      </div>

    </div>
  );
}



export default Login;