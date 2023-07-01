import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import store from './store';

test('renders the app without errors', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );

  const headingElement = screen.getByRole('heading', { level: 2 });
  expect(headingElement).toHaveTextContent('Login');

  const userSelectElement = screen.getByRole('combobox');

  expect(userSelectElement).toBeInTheDocument();
  expect(userSelectElement).toHaveValue('');
  expect(userSelectElement).toContainHTML(
    '<option value="sarahedo">Sarah Edo</option>'
  );
  expect(userSelectElement).toContainHTML(
    '<option value="tylermcginnis">Tyler McGinnis</option>'
  );
  expect(userSelectElement).toContainHTML(
    '<option value="mtsamis">Mike Tsamis</option>'
  );
  expect(userSelectElement).toContainHTML(
    '<option value="zoshikanlu">Zenobia Oshikanlu</option>'
  );

  const passwordInput = screen.getByPlaceholderText(/password/i);
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(passwordInput).toHaveAttribute('placeholder', 'password');
  expect(passwordInput).toHaveValue('');

  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeDisabled();
});
