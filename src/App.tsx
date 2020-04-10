import React from 'react';
import './App.css';
import { Route } from 'react-router'
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import NewsFeed from './containers/NewsFeed/';

function App() {
  return (
    <div>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/app/newsfeed' component={NewsFeed} />
    </div>
  );
}

export default App;
