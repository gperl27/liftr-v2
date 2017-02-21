import { FETCH_WORKOUT, EXERCISE_ERROR } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_WORKOUT:
      return { ...state, workout: action.payload.data };
    case EXERCISE_ERROR:
      return { ...state, error: action.payload };
  }

  return state;
}
