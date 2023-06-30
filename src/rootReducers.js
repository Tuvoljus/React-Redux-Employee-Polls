import { combineReducers } from '@reduxjs/toolkit';
import { authedUser } from './slices/authedUser';
import { questions } from './slices/questions';
import { addUser } from './slices/users';

const appReducer = combineReducers({
  authedUser: authedUser,
  questions: questions,
  users: addUser,
});

const rootReducer = (state, action) => {
  if (action.type === 'authedUser/logoutUser') {
    state = undefined;
    localStorage.removeItem('authedUser');
  }
  return appReducer(state, action);
};

export default rootReducer;
