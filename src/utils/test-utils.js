import { BrowserRouter as Router } from 'react-router-dom';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import userSlice from '../slices/users.js';
import authedUser from '../slices/authedUser.js';
import questions from '../slices/questions.js';

function reducer(
  ui,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        users: userSlice,
        authedUser: authedUser,
        questions: questions,
      },
      preloadedState,
    }),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <Router>{children}</Router>
      </Provider>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { reducer };
