import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

import App from './components/app';
import Signin from './components/Auth/signin';
import Signout from './components/Auth/signout';
import Signup from './components/Auth/signup';
import Dashboard from './components/Dashboard/dashboard';
import Welcome from './components/welcome';
import Workout from './components/Dashboard/Workouts/workout';
import RequireAuth from './components/Auth/require_auth';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(promise, reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// if we have a token, consider the user to be signed in
if (token) {
  // need to update application state
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="dashboard" component={RequireAuth(Dashboard)}>
          <Route path="today" component={Workout} />
        </Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
