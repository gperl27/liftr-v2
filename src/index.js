import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';

// Components
import { App, Welcome, Signin, Signout, Signup,  Dashboard, TodayContainer,
  Workout, Calendar, RequireAuth } from './files_module';
// Reducers/Store/Auth
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
          <Route path="today" component={TodayContainer} />
          <Route path="calendar" component={Calendar} />
        </Route>
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
