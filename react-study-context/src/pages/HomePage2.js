import React from 'react';
import UserContext from '../UserContext';

class HomePage2 extends React.Component {
  static contextType = UserContext
  render(){
    const {user,setUser} = this.context
    return (
      <div>
        <button onClick={
          () => {
            const newUser = {name: '冰剑',loginedIn:true,}
            setUser(newUser)
          }
        }>更新用户</button>
        <div>当前用户：{user.name}</div>
      </div>
    )
  }
  
}

export default HomePage2