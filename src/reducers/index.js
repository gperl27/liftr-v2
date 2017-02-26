import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import workoutsReducer from './workouts_reducer';
import exercisesReducer from './exercises_reducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  workout: workoutsReducer,
  workouts: workoutsReducer,
  exercise: exercisesReducer,
  exercises: exercisesReducer
});

export default rootReducer;
