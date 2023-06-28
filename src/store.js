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
  //   middleware: [thunk, ...getDefaultMiddleware()],
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// // import rootReducer from './rootReducers';

// // const store = configureStore({
// //   reducer: rootReducer,
// // });

// // export default store;
