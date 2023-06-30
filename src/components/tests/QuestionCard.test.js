import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import QuestionCard from '../QuestionCard';

const mockStore = configureStore([]);

describe('QuestionCard', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      users: {
        sarahedo: {
          id: 'sarahedo',
          name: 'Sarah Edo',
          avatarURL: 'path/to/avatar.jpg',
        },
      },
    });
  });

  test('renders question card correctly', async () => {
    const question = {
      id: 'xj352vofupe1dqz9emx13r',
      author: 'sarahedo',
      timestamp: 1493579767190,
      optionOne: {
        votes: ['mtsamis', 'zoshikanlu'],
        text: 'deploy to production once every two weeks',
      },
      optionTwo: {
        votes: ['tylermcginnis'],
        text: 'deploy to production once every month',
      },
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <QuestionCard question={question} />
        </BrowserRouter>
      </Provider>
    );

    const authorName = screen.getByText('sarahedo');
    expect(authorName).toBeInTheDocument();

    const timestamp = screen.getByText('2 days ago');
    expect(timestamp).toBeInTheDocument();

    const goToQuestionLink = screen.getByRole('link', {
      name: 'Go To Question',
    });
    expect(goToQuestionLink).toBeInTheDocument();
    expect(goToQuestionLink).toHaveAttribute(
      'href',
      '/question/xj352vofupe1dqz9emx13r'
    );
  });
});
