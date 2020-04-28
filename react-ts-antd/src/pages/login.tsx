import React from 'react';
import { useHistory,} from 'react-router-dom';
import { authSuccess ,isAuth} from '../utils/Session'
import { Form, Input, Row, Col } from 'antd'

function Login() {
  const history = useHistory()
  const auth = !!isAuth()
  const login = ()=> {
    authSuccess('12244566666')
    history.push('/')
  }
  
  return (
    <div className="login">
      <h1>这是登录页</h1>
      {auth ? history.push('/') : ''}
      <button onClick={login}> 点这里登陆 </button>
    </div>
  );
}

export default Login;