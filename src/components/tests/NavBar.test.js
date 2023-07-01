import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import NavBar from '../NavBar';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

test('renders the navigation links and user information correctly', () => {
  useSelector.mockReturnValue({
    name: 'John Doe',
  });
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  render(
    <Router>
      <NavBar />
    </Router>
  );

  const logoLink = screen.getByText(/question poll/i);
  expect(logoLink).toBeInTheDocument();
  expect(logoLink).toHaveAttribute('href', '/');

  const leaderboardLink = screen.getByRole('link', { name: /leaderboard/i });
  expect(leaderboardLink).toBeInTheDocument();
  expect(leaderboardLink).toHaveAttribute('href', '/leaderboard');

  const newQuestionLink = screen.getByRole('link', { name: /new question/i });
  expect(newQuestionLink).toBeInTheDocument();
  expect(newQuestionLink).toHaveAttribute('href', '/add');

  const userInfoText = screen.getByText(/signed in as: John Doe/i);
  expect(userInfoText).toBeInTheDocument();

  const logoutLink = screen.getByText('Logout');
  expect(logoutLink).toBeInTheDocument();
  fireEvent.click(logoutLink);
  expect(mockDispatch).toHaveBeenCalledTimes(1);
});
