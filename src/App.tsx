import React from 'react';
import './App.css';
import { Route } from 'react-router'
import { History } from 'history'

import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import NewsFeed from './containers/NewsFeed/';
import Profile from './containers/Profile';
import Navbar from './components/Navbar';
import services from './services'


interface IAppProps {
  history: History,
  loadInitialData: () => void
}

class App extends React.Component<IAppProps> {
  public state = {
    loading: true,
  }

  public componentDidMount() {
    const { auth } = services

    auth.onAuthStateChanged(user => {
      if (user) {
        const { loadInitialData } = this.props
        loadInitialData()
        /* eslint no-restricted-globals:0 */
        if (['/', '/register'].indexOf(location.pathname) > -1) {
          const { history } = this.props
          history.push('/app/newsfeed')

        }
      } else {
        // eslint-disable-next-line
        if (/\app\/./.test(location.pathname)) {
          const { history } = this.props
          history.push('/')

        }
      }

      //  console.log(user);
      this.setState({
        loading: false
      })
    })
  }

  public render() {
    const { loading } = this.state
    return (
      loading ? 'Loading' :
        <div>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route path='/app' component={Navbar} />
          <Route exact path='/app/newsfeed' component={NewsFeed} />
          <Route exact path='/app/profile' component={Profile} />
        </div>
    );
  }
}

export default App;
