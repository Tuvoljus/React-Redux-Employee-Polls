import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const initialState = {
  authedUser: {},
};

const mockReducer = (state = initialState, action) => {
  return state;
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('App', () => {
  test.skip('renders login page when not authenticated', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Question Poll')).not.toBeInTheDocument();
    expect(screen.queryByText('Leader Board')).not.toBeInTheDocument();
    expect(screen.queryByText('New Question')).not.toBeInTheDocument();
  });

  test.skip('renders authenticated routes when authenticated', () => {
    const authenticatedState = {
      authedUser: {
        id: 'user1',
        name: 'User 1',
      },
    };
    const authenticatedStore = mockStore(authenticatedState);

    render(
      <Provider store={authenticatedStore}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Login')).not.toBeInTheDocument();
    expect(screen.getByText('Question Poll')).toBeInTheDocument();
    expect(screen.getByText('Leader Board')).toBeInTheDocument();
    expect(screen.getByText('New Question')).toBeInTheDocument();
  });
});
