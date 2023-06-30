import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import usersReducer from './slices/users';
import authedUserReducer from './slices/authedUser';
import questionsReducer from './slices/questions';

const store = configureStore({
  reducer: {
    users: usersReducer,
    questions: questionsReducer,
    authedUser: authedUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

export default store;
