
import './index.css';

import { createBrowserHistory } from 'history'
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

import App from './App';
import * as reducers from './ducks'
import * as serviceWorker from './serviceWorker';
import services from './services'
import { loadUserInitialData } from './ducks/Users'


const store = createStore(combineReducers({
  ...reducers,
  form: formReducer,
}), applyMiddleware(thunk.withExtraArgument(services)))

const loadInitialData = () => store.dispatch(loadUserInitialData())
const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App loadInitialData={loadInitialData} history={history} />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
