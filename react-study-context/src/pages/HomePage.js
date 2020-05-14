import React from 'react';
import UseContext from '../UseContext';

class HomePage extends React.Component {
  static contextType = UseContext;
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    const user = this.context
    console.log(user)
    console.table(user)
    this.setState({
      user,
    })
  }

  render(){
    return <div>{this.state.user.name}</div>
  }
  
}

export default HomePage