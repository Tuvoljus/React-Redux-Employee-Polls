import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import VoteQuestion from '../VoteQuestion';

const mockStore = configureStore([]);
const initialState = {
  authedUser: {
    id: 'user1',
    answers: {},
  },
  questions: {
    question1: {
      id: 'question1',
      author: 'user2',
      optionOne: {
        text: 'Option 1',
        votes: ['user1'],
      },
      optionTwo: {
        text: 'Option 2',
        votes: [],
      },
    },
  },
  users: {
    user1: {
      id: 'user1',
      name: 'User 1',
      avatarURL: 'user1.jpg',
    },
    user2: {
      id: 'user2',
      name: 'User 2',
      avatarURL: 'user2.jpg',
    },
  },
};
const store = mockStore(initialState);

describe('VoteQuestion', () => {
  test('renders question and options', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/question1/vote']}>
          <Route path="/questions/:id/vote">
            <VoteQuestion />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    // Check if question and options are rendered
    expect(screen.getByText('Would You Rather')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  test('handles vote submission', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/question1/vote']}>
          <Route path="/questions/:id/vote">
            <VoteQuestion />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Option 2'));

    const actions = store.getActions();
    expect(actions).toHaveLength(2);
    expect(actions[0].type).toBe('authedUser/updateSelectedAnswer');
    expect(actions[0].payload).toEqual({
      questionId: 'question1',
      selectedOption: 'optionTwo',
    });
    expect(actions[1].type).toBe('questions/updateQuestion');
    expect(actions[1].payload).toEqual({
      questionId: 'question1',
      option: 'optionTwo',
      userId: 'user1',
    });
  });

  test('disables buttons when user has already voted', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/question1/vote']}>
          <Route path="/questions/:id/vote">
            <VoteQuestion />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    // Check if buttons are disabled
    expect(screen.getByText('Option 1')).toBeDisabled();
    expect(screen.getByText('Option 2')).toBeDisabled();
  });

  test('displays vote counts and percentages', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/questions/question1/vote']}>
          <Route path="/questions/:id/vote">
            <VoteQuestion />
          </Route>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Votes: 1 (100.00%)')).toBeInTheDocument();
    expect(screen.getByText('Votes: 0 (0.00%)')).toBeInTheDocument();
  });
});
