import { FETCH_WORKOUT } from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case FETCH_WORKOUT:
      return { ...state, workout: action.payload.data };
  }

  return state;
}
