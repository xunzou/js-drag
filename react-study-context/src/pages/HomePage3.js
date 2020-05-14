import React, { useContext } from 'react';
import UseContext from '../UseContext';

const HomePage3 = function(){
  const user = useContext(UseContext)
  return <div>{user.name}</div>
}

export default HomePage3