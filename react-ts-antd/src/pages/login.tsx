import React from 'react';
// import { useHistory,} from 'react-router-dom';
// import { authSuccess ,isAuth} from '../utils/Session'
import { Tabs } from 'antd';

import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

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
        <Tabs defaultActiveKey="1" animated={false} onChange={callback}>
          <TabPane tab="账户密码登录" key="1">
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a className="login-form-forgot" href="">
                  忘记密码
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" block htmlType="submit" className="login-form-button">
                  登录
                </Button>
                Or <a href="">注册</a>
              </Form.Item>
            </Form>

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