import { FETCH_WORKOUT, FETCH_WORKOUTS, EXERCISE_ERROR, WORKOUT_ERROR } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_WORKOUT:
      return { ...state, workout: action.payload };
    case FETCH_WORKOUTS:
      return { ...state, workouts: action.payload };
    case EXERCISE_ERROR:
      return { ...state, error: action.payload };
    case WORKOUT_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
