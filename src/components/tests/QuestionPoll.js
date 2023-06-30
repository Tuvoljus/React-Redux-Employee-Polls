import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import QuestionPoll from '../QuestionPoll';

const mockStore = configureStore([]);

test('renders the QuestionPool component', () => {
  const store = mockStore({
    // Provide the required state here
    authedUser: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
      answers: {
        vthrdm985a262al8qx3do: 'optionOne',
        xj352vofupe1dqz9emx13r: 'optionTwo',
      },
      questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
    },
    questions: {
      '8xf0y6ziyjabvozdd253nd': {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
          votes: ['sarahedo'],
          text: 'Build our new application with Javascript',
        },
        optionTwo: {
          votes: [],
          text: 'Build our new application with Typescript',
        },
      },
      '6ni6ok3ym7mf1p33lnez': {
        id: '6ni6ok3ym7mf1p33lnez',
        author: 'mtsamis',
        timestamp: 1468479767190,
        optionOne: {
          votes: [],
          text: 'hire more frontend developers',
        },
        optionTwo: {
          votes: ['mtsamis', 'sarahedo'],
          text: 'hire more backend developers',
        },
      },
      am8ehyc8byjqgar0jgpub9: {
        id: 'am8ehyc8byjqgar0jgpub9',
        author: 'sarahedo',
        timestamp: 1488579767190,
        optionOne: {
          votes: [],
          text: 'conduct a release retrospective 1 week after a release',
        },
        optionTwo: {
          votes: ['sarahedo'],
          text: 'conduct release retrospectives quarterly',
        },
      },
      loxhs1bqm25b708cmbf3g: {
        id: 'loxhs1bqm25b708cmbf3g',
        author: 'tylermcginnis',
        timestamp: 1482579767190,
        optionOne: {
          votes: [],
          text: 'have code reviews conducted by peers',
        },
        optionTwo: {
          votes: ['sarahedo'],
          text: 'have code reviews conducted by managers',
        },
      },
      vthrdm985a262al8qx3do: {
        id: 'vthrdm985a262al8qx3do',
        author: 'tylermcginnis',
        timestamp: 1489579767190,
        optionOne: {
          votes: ['tylermcginnis'],
          text: 'take a course on ReactJS',
        },
        optionTwo: {
          votes: ['mtsamis'],
          text: 'take a course on unit testing with Jest',
        },
      },
      xj352vofupe1dqz9emx13r: {
        id: 'xj352vofupe1dqz9emx13r',
        author: 'mtsamis',
        timestamp: 1493579767190,
        optionOne: {
          votes: ['mtsamis', 'zoshikanlu'],
          text: 'deploy to production once every two weeks',
        },
        optionTwo: {
          votes: ['tylermcginnis'],
          text: 'deploy to production once every month',
        },
      },
    },
    // Add other necessary state properties
  });

  render(
    <Provider store={store}>
      <QuestionPoll />
    </Provider>
  );

  // Assert that the title is rendered
  const title = screen.getByRole('heading', {
    level: 1,
    name: /question poll/i,
  });
  expect(title).toBeInTheDocument();

  // Assert that the Questions component is rendered
  const questionsComponent = screen.getByTestId('questions-component');
  expect(questionsComponent).toBeInTheDocument();
});

// const store = mockStore({
//     // Provide the required state here
//     authedUser: {
//       id: 'tylermcginnis',
//       name: 'Tyler McGinnis',
//       avatarURL: 'https://tylermcginnis.com/would-you-rather/tyler.jpg',
//       answers: {
//         vthrdm985a262al8qx3do: 'optionOne',
//         xj352vofupe1dqz9emx13r: 'optionTwo',
//       },
//       questions: ['loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do'],
//     },
//     questions: {
//       '8xf0y6ziyjabvozdd253nd': {
//         id: '8xf0y6ziyjabvozdd253nd',
//         author: 'sarahedo',
//         timestamp: 1467166872634,
//         optionOne: {
//           votes: ['sarahedo'],
//           text: 'Build our new application with Javascript',
//         },
//         optionTwo: {
//           votes: [],
//           text: 'Build our new application with Typescript',
//         },
//       },
//       '6ni6ok3ym7mf1p33lnez': {
//         id: '6ni6ok3ym7mf1p33lnez',
//         author: 'mtsamis',
//         timestamp: 1468479767190,
//         optionOne: {
//           votes: [],
//           text: 'hire more frontend developers',
//         },
//         optionTwo: {
//           votes: ['mtsamis', 'sarahedo'],
//           text: 'hire more backend developers',
//         },
//       },
//       am8ehyc8byjqgar0jgpub9: {
//         id: 'am8ehyc8byjqgar0jgpub9',
//         author: 'sarahedo',
//         timestamp: 1488579767190,
//         optionOne: {
//           votes: [],
//           text: 'conduct a release retrospective 1 week after a release',
//         },
//         optionTwo: {
//           votes: ['sarahedo'],
//           text: 'conduct release retrospectives quarterly',
//         },
//       },
//       loxhs1bqm25b708cmbf3g: {
//         id: 'loxhs1bqm25b708cmbf3g',
//         author: 'tylermcginnis',
//         timestamp: 1482579767190,
//         optionOne: {
//           votes: [],
//           text: 'have code reviews conducted by peers',
//         },
//         optionTwo: {
//           votes: ['sarahedo'],
//           text: 'have code reviews conducted by managers',
//         },
//       },
//       vthrdm985a262al8qx3do: {
//         id: 'vthrdm985a262al8qx3do',
//         author: 'tylermcginnis',
//         timestamp: 1489579767190,
//         optionOne: {
//           votes: ['tylermcginnis'],
//           text: 'take a course on ReactJS',
//         },
//         optionTwo: {
//           votes: ['mtsamis'],
//           text: 'take a course on unit testing with Jest',
//         },
//       },
//       xj352vofupe1dqz9emx13r: {
//         id: 'xj352vofupe1dqz9emx13r',
//         author: 'mtsamis',
//         timestamp: 1493579767190,
//         optionOne: {
//           votes: ['mtsamis', 'zoshikanlu'],
//           text: 'deploy to production once every two weeks',
//         },
//         optionTwo: {
//           votes: ['tylermcginnis'],
//           text: 'deploy to production once every month',
//         },
//       },
//     },
//     // Add other necessary state properties
//   });
