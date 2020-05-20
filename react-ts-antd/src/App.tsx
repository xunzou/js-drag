import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/login'
import Layout from './layout/layout'
import error from './pages/404'

function App() {
  return (
    <>
      <Switch>
        <Route exact={true} path={"/login"} component={Login} />
        <Route path={"/"} component={Layout} />
        <Route path={"*"} component={error} />
      </Switch>
    </>
  );
}

export default App;
