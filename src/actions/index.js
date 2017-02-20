import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR,
         FETCH_WORKOUT
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
  console.log(error);
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser(){
  localStorage.removeItem('token');
  return { type: UNAUTH_USER }
}

export function fetchWorkout(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/current_workout/2017-02-19?token=${localStorage.getItem('token')}`)
      .then(response => {
        dispatch({
          type: FETCH_WORKOUT,
          payload: response
        });
      })
      .catch(() => {
        signoutUser();
      });
  }
}

export function deleteExercise(id){
  return function(dispatch){
    axios.post(`${ROOT_URL}/exercise/destroy?token=${localStorage.getItem('token')}`, {id})
      .then(response => {
        dispatch({
          type: FETCH_WORKOUT,
          payload: response
        });
      })
      .catch(() => {
        signoutUser();
      });
  }
}

export function updateExercise({id, name, sets, reps, weight}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/exercise/${id}/update?token=${localStorage.getItem('token')}`, {name, sets, reps, weight})
        .then(response => {
          console.log('success');
          dispatch({
            type: FETCH_WORKOUT,
            payload: response
          });
        })
        .catch(() => {
          console.log('failing');
          signoutUser();
        });
  }
}

// export function deleteExercise(id){
//   const request = axios.post(`${ROOT_URL}/destroy_exercise?token=${localStorage.getItem('token')}`, {id});
//   return {
//     type: AUTH_ERROR
//   }
// }

// ^^ as redux promise
// export function fetchMessage(){
//   const request = axios.get(`${ROOT_URL}?token=${localStorage.getItem('token')}`);
//
//   return {
//     type: FETCH_MESSAGE,
//     payload: request
//   };
// }
