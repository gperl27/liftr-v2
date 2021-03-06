import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR,
         FETCH_WORKOUT, FETCH_WORKOUTS, WORKOUT_ERROR,
         UNIQUE_EXERCISES, EXERCISE_STATS, EXERCISE_ERROR
       } from './types';

const ROOT_URL = 'http://localhost:8000/api/v1';

//add to date prototype to play nice with api
//source: http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
        ].join('-');
};


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

// deprecated
// export function currentDate(data){
//   // console.log({date});
//   const day = new Date(data.date).yyyymmdd();
//   console.log(day);
//   // console.log(data.date.yyyymmdd());
//   return {
//     type: CURRENT_DATE,
//     payload: day
//   }
// }

export function signoutUser(){
  localStorage.removeItem('token');
  localStorage.removeItem('nav');
  return { type: UNAUTH_USER }
}

export function addExercise({date, name, sets, reps, weight}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/exercise/create?token=${localStorage.getItem('token')}`, { date, name, sets, reps, weight})
    .then(response => {
      dispatch({ type: FETCH_WORKOUT, payload: response.data });
    })
    .catch(() => {
      dispatch(exerciseError('Could not add exercise'));
    });
  }
}

export function addWorkout({day, name}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/workout/create?token=${localStorage.getItem('token')}`, { day, name})
    .then(response => {
      dispatch({
        type: FETCH_WORKOUT,
        payload: response.data.workout
      });
      dispatch({
        type: FETCH_WORKOUTS,
        payload: response.data.workouts
      });
    })
    .catch(() => {
      dispatch(workoutError('Could not add workout'));
    });
  }
}

export function deleteWorkout({workoutId}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/workout/destroy?token=${localStorage.getItem('token')}`, {workoutId})
    .then(response => {
      dispatch({
        type: FETCH_WORKOUT,
        payload: response.data.workout
      });
      dispatch({
        type: FETCH_WORKOUTS,
        payload: response.data.workouts
      });
    })
    .catch(() => {
      dispatch(workoutError('Could not add workout'));
    });
  }
}

export function workoutError(error){
  return {
    type: WORKOUT_ERROR,
    payload: error
  }
}

export function exerciseError(error){
  return {
    type: EXERCISE_ERROR,
    payload: error
  }
}


export function fetchWorkout({date}){
  return function(dispatch){
    axios.get(`${ROOT_URL}/current_workout/${date}?token=${localStorage.getItem('token')}`)
      .then(response => {
        dispatch({
          type: FETCH_WORKOUT,
          payload: response.data
        });
      })
      .catch(() => {
        signoutUser();
      });
  }
}

export function updateWorkoutName({id, name}){
  return function(dispatch){
    axios.post(`${ROOT_URL}/workout/update_name?token=${localStorage.getItem('token')}`, { id, name })
      .then(response => {
        dispatch({
          type: FETCH_WORKOUT,
          payload: response.data.workout
        });
        dispatch({
          type: FETCH_WORKOUTS,
          payload: response.data.workouts
        });
      })
      .catch((error) => {
        console.log('error', error);
        signoutUser();
      });
  }
}

export function fetchWorkouts(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/workouts?token=${localStorage.getItem('token')}`)
      .then(response => {
        dispatch({
          type: FETCH_WORKOUTS,
          payload: response.data
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
          payload: response.data
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
          dispatch({
            type: FETCH_WORKOUT,
            payload: response.data
          });
        })
        .catch(() => {
          signoutUser();
        });
  }
}

export function exerciseStats({name}){
  return function(dispatch){
    axios.get(`${ROOT_URL}/exercise/${name}?token=${localStorage.getItem('token')}`)
        .then(response => {
          dispatch({
            type: EXERCISE_STATS,
            payload: response.data
          });
        })
        .catch(() => {
          signoutUser();
        });
  }
}

export function uniqueExercises(){
  return function(dispatch){
    axios.get(`${ROOT_URL}/exercises?token=${localStorage.getItem('token')}`)
        .then(response => {
          dispatch({
            type: UNIQUE_EXERCISES,
            payload: response.data
          });
        })
        .catch(() => {
          signoutUser();
        });
  }
}
