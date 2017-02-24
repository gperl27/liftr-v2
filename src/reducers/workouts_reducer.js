import { FETCH_WORKOUT, FETCH_WORKOUTS, EXERCISE_ERROR, CURRENT_DATE } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_WORKOUT:
      return { ...state, workout: action.payload };
    case FETCH_WORKOUTS:
      return { ...state, workouts: action.payload };
    case CURRENT_DATE:
      return { ...state, date: action.payload }
    case EXERCISE_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
