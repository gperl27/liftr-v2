import { FETCH_WORKOUTS } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_WORKOUTS:
      console.log(action.payload.data);
      return { ...state, workouts: action.payload.data };
  }

  return state;
}
