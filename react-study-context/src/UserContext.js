import React from 'react';

const UserContext = React.createContext()

// export const UseProvider = UseContext.Provider;
// export const UseConsumer = UseContext.Consumer;

class UserProvider extends React.Component {
    constructor(props){
        super(props)
        console.log(111,props.value)
        this.state = {
            user: props.value
        }
    }

    setUser =  user => {
        this.setState( prevState => ({user}))
    }


    render (){
        const {children} = this.props
        const {user} = this.state
        const {setUser} = this
        return (
            <UserContext.Provider value={
                {user,setUser,}
            }>

                {children}
            </UserContext.Provider>
        )

    }
    
}







export default UserContext

export {UserProvider}