import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  form,
  auth: authReducer
});

export default rootReducer;
