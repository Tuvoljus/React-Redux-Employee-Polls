import React from 'react';
import { reducer } from '../../utils/test-utils';
import { createMemoryHistory } from 'history';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider, useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  useNavigate,
  MemoryRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from '../Login';
import { setAuthedUser } from '../../slices/authedUser';
import { Router } from 'react-router';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

const storeNotString = mockStore({
  users: {
    sarahedo: {
      id: 'sarahedo',
      password: 'password123',
      name: 'Sarah Edo',
      avatarURL: 'https://tylermcginnis.com/would-you-rather/sarah.jpg',
      answers: {
        '8xf0y6ziyjabvozdd253nd': 'optionOne',
        '6ni6ok3ym7mf1p33lnez': 'optionOne',
        am8ehyc8byjqgar0jgpub9: 'optionTwo',
        loxhs1bqm25b708cmbf3g: 'optionTwo',
      },
      questions: ['8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9'],
    },
  },
});

const store = JSON.stringify(storeNotString);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

const createRouterWrapper =
  (history) =>
  ({ children }) =>
    <Router history={history}>{children}</Router>;

describe('Login', () => {
  const users = {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      password: 'password123',
    },
    johnsmith: {
      id: 'johnsmith',
      name: 'John Smith',
      password: 'password2',
    },
  };

  beforeEach(() => {
    useDispatch.mockClear();
    useSelector.mockClear();
    useNavigate.mockClear();
  });

  test('if login button is clickable', async () => {
    const mockedDispatch = jest.fn();
    const mockedNavigate = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);

    useSelector.mockReturnValue(users);

    const history = createMemoryHistory();
    render(<Login />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();
    const userNameInput = screen.getByPlaceholderText(/username/i);
    // const userNameInput = screen.getByText(/username/i);
    fireEvent.change(userNameInput, { target: { value: 'Sarah Edo' } });

    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(loginButton).not.toBeDisabled();

    fireEvent.click(loginButton);
  });

  test('if login button is disbaled', async () => {
    const mockedDispatch = jest.fn();
    const mockedNavigate = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);

    useSelector.mockReturnValue(users);

    const history = createMemoryHistory();
    render(<Login />);

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDisabled();
    const userNameInput = screen.getByPlaceholderText(/username/i);
    fireEvent.change(userNameInput, { target: { value: 'Sarah Edo' } });

    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(loginButton).not.toBeDisabled();

    fireEvent.click(loginButton);
  });

  test('on if user input has an typo => alert', () => {
    const mockedDispatch = jest.fn();
    const mockedNavigate = jest.fn();
    useDispatch.mockReturnValue(mockedDispatch);
    useNavigate.mockReturnValue(mockedNavigate);

    const users = {
      sarahedo: {
        id: 'sarahedo',
        name: 'Sarah Edo',
        password: 'password123',
      },
      johnsmith: {
        id: 'johnsmith',
        name: 'John Smith',
        password: 'password2',
      },
    };

    useSelector.mockReturnValue(users);

    let view = render(<Login />);

    const userNameInput = screen.getByPlaceholderText(/username/i);
    fireEvent.change(userNameInput, { target: { value: 'Sarah Edo' } });

    const passwordInput = screen.getByPlaceholderText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'incorrectpassword' } });

    // Spy on the window.alert function
    const alertSpy = jest.spyOn(window, 'alert');
    alertSpy.mockImplementation(() => {});

    // Submit the form
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // create a snapshot
    expect(view).toMatchSnapshot();
    // Assert that the alert function is called with the correct message
    expect(alertSpy).toHaveBeenCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith('Incorrect password or username');

    // Reset the mock functions and the alert spy
    mockedDispatch.mockClear();
    mockedNavigate.mockClear();
    alertSpy.mockRestore();
  });
});
