import React from 'react';
import { Route, Switch } from 'react-router-dom'
// We will create these two pages in a moment
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/:id" component={UserPage} />
      </Switch>
    </div>
  );
}

export default App;
