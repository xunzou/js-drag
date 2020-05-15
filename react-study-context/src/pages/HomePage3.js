import React, { useContext } from 'react';
import UserContext from '../UserContext';

const HomePage3 = function(){
  const {user} = useContext(UserContext)
  return <div>{user.name}</div>
}

export default HomePage3