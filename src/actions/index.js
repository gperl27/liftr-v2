import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR,
         FETCH_WORKOUTS
       } from './types';

const ROOT_URL = 'http://localhost:8000/api/v1';


// redux thunk allows us to return a FUNCTION rather than an OBJECT

export function signinUser({email, password}){
  // submit email/password to the server
  //
  // if request is good...
  // update starte to indicate user is authenticated
  // saved JWT token
  // redirect to the route '/feature'
  //
  // if request is bad...
  // show an error to the user
  return function(dispatch){
    axios.post(`${ROOT_URL}/authenticate`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function signupUser({email, password}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/create_user`, { email, password})
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/dashboard');
      })
      .catch(() => {
        dispatch(authError('Could not create account'));
      });
  }
}

export function authError(error){
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

// export function fetchMessage(){
//   return function(dispatch){
//     console.log(localStorage.getItem('token'));
//     axios.get(`${ROOT_URL}?token=${localStorage.getItem('token')}`)
//       .then(response => {
//         dispatch({
//           type: FETCH_MESSAGE,
//           payload: response.data
//         })
//       });
//   }
// }

export function fetchWorkouts(){
  const request = axios.get(`${ROOT_URL}/current_week?token=${localStorage.getItem('token')}`);
  return {
    type: FETCH_WORKOUTS,
    payload: request
  }
}

// ^^ as redux promise
// export function fetchMessage(){
//   const request = axios.get(`${ROOT_URL}?token=${localStorage.getItem('token')}`);
//
//   return {
//     type: FETCH_MESSAGE,
//     payload: request
//   };
// }
