import { UNIQUE_EXERCISES, EXERCISE_STATS, EXERCISE_ERROR } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case EXERCISE_STATS:
      return { ...state, exercise: action.payload };
    case UNIQUE_EXERCISES:
      return { ...state, exercises: action.payload };
  }

  return state;
}
