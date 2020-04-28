import * as React from "react";
import { Route, Redirect,RouteProps} from 'react-router-dom'
import { isAuth } from '../../utils/Session'
interface PrivateRouteProps extends RouteProps  {
  component: React.ComponentType<any>
}
 
const PrivateRoute = (props:PrivateRouteProps) => {
  let {component: Component, ...rest} = props;
  
  return (<Route {...rest} render={(props) => (
    !!isAuth()
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: {from: props.location}
      }}/>
  )}/>)
}

export default PrivateRoute