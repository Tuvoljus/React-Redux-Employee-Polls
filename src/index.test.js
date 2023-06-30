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

  // Assert that the user select is rendered with the correct options
  const userSelectElement = screen.getByLabelText('Select User:');
  expect(userSelectElement).toBeInTheDocument();
  expect(userSelectElement).toHaveValue(''); // Ensure the initial value is empty
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

  // Assert that the password input is rendered with the correct attributes
  const passwordInput = screen.getByLabelText('Password:');
  expect(passwordInput).toBeInTheDocument();
  expect(passwordInput).toHaveAttribute('type', 'password');
  expect(passwordInput).toHaveAttribute('placeholder', 'Password');
  expect(passwordInput).toHaveValue('');

  // Assert that the login button is rendered and disabled initially
  const loginButton = screen.getByRole('button', { name: 'Login' });
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeDisabled();
});
