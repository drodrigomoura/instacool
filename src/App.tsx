import React from 'react';
import './App.css';
import { Route } from 'react-router'
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import NewsFeed from './containers/NewsFeed/';
import Profile from './containers/Profile';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Route exact path='/' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route path='/app' component={Navbar} />
      <Route exact path='/app/newsfeed' component={NewsFeed} />
      <Route exact path='/app/profile' component={Profile} />
    </div>
  );
}

export default App;
