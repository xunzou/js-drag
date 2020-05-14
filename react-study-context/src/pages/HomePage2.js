import React from 'react';
import {UseConsumer} from '../UseContext';

class HomePage2 extends React.Component {

  render(){
    return (
      <UseConsumer>
        { props => {
            return <div>{props.name}</div>
          }
        }
      </UseConsumer>
    )
  }
  
}

export default HomePage2