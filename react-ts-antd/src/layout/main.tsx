import React from 'react';
import { Switch ,Redirect} from 'react-router-dom';
import PrivateRoute from '../components/Private'
import Home from '../pages/home'
import AppManager from '../pages/app/index'
import TagsManager from '../pages/tags/index'
import error from '../pages/404'

function main() {

  return (
    <div>
      <Switch>
        <PrivateRoute exact path={'/home'} component={Home} />
        <PrivateRoute exact path={'/app'} component={AppManager}/>
        <PrivateRoute exact path={'/tags'} component={TagsManager} />
        <Redirect exact from='/' to='/home'/>
        <PrivateRoute path={"*"} component={error} />
      </Switch>
    </div>
  );
}

export default main;