import React from 'react';
import { Switch ,Redirect} from 'react-router-dom';
import PrivateRoute from '../components/Private'
import loadCom from '../utils/LoadableCom'


const Home = loadCom(()=>import('../pages/home'))
const AppManager = loadCom(()=>import('../pages/app/index'))
const TagsManager = loadCom(()=>import('../pages/tags/index'))
const error = loadCom(()=>import('../pages/404'))


function main() {

  return (
    <>
      <Switch>
        <PrivateRoute exact path={'/home'} component={Home} />
        <PrivateRoute exact path={'/app'} component={AppManager}/>
        <PrivateRoute exact path={'/tags'} component={TagsManager} />
        <Redirect exact from='/' to='/home'/>
        <PrivateRoute path={"*"} component={error} />
      </Switch>
    </>
  );
}

export default main;