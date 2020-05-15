import React from 'react';
import UserContext from '../UserContext';

class HomePage extends React.Component {
  static contextType = UserContext;
  constructor(props){
    super(props)
    this.state = {
      user: {}
    }
  }

  componentDidMount(){
    const {user} = this.context
    console.log(15,user)
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