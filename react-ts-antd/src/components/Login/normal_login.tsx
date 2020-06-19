import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import api from '../../api/index'
import config from '../../utils/Config'
import { authSuccess ,_setCookie } from '../../utils/Session'


interface ofv {
  username?: string; 
  password?: string; 
  remember?: boolean;
}


export default function(){
  
  const history = useHistory()

  const onFinish:(values: ofv) => void = async values => {
    console.log('Received values of form: ', values);
    let par = {
      UN: values.username,
      Pwd: values.password,
      Role: 1,
      Proid: 401,
    }
    let json:any = await api.login.signIn(par)
    console.log(json)
    let err = json && json.error 
    console.log(err)
    if(!err){
      console.log(json.result)
      let res = json.result;
      //保存用户信息
      authSuccess(res.AToken);
      //存储时间
      //console.log(oldTime)
      _setCookie(config.LAST_LOGIN_TIME, Date.now() + 1000 * 60 *60);

      history.push('/')
    } else {
      message.error((err && err.msg)  || '出错了');
    }
    
  };
  const onFinishFailed:(errorInfo: any) => void = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form name="normal_login" className="login-form" initialValues={{username:'', password:'', remember: true }} 
      onFinishFailed={onFinishFailed} onFinish={onFinish}>
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]} >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]} >
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">忘记密码</a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit" className="login-form-button">登录</Button>
          Or <a href="">注册</a>
        </Form.Item>
      </Form>
  )
}