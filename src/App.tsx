import React from 'react';
import './App.css';
import { Route } from 'react-router'
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';

function App() {
  return (
    <div>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
    </div>
  );
}

export default App;
