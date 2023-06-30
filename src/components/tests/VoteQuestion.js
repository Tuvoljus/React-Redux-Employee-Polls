// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
// import configureStore from 'redux-mock-store';
// import VoteQuestion from '../VoteQuestion';

// const mockStore = configureStore([]);

// describe('VoteQuestion', () => {
//   let store;

//   beforeEach(() => {
//     // Set up a mock store with the initial data
//     store = mockStore({
//       authedUser: {
//         id: 'sarahedo',
//         answers: {
//           '8xf0y6ziyjabvozdd253nd': 'optionOne',
//         },
//       },
//       questions: {
//         '8xf0y6ziyjabvozdd253nd': {
//           id: '8xf0y6ziyjabvozdd253nd',
//           author: 'sarahedo',
//           timestamp: 1467166872634,
//           optionOne: {
//             votes: ['sarahedo'],
//             text: 'Build our new application with Javascript',
//           },
//           optionTwo: {
//             votes: [],
//             text: 'Build our new application with Typescript',
//           },
//         },
//       },
//       users: {
//         sarahedo: {
//           id: 'sarahedo',
//           name: 'Sarah Edo',
//           avatarURL: null,
//         },
//       },
//     });
//   });

//   test.skip('renders vote question correctly', async () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <VoteQuestion />
//         </BrowserRouter>
//       </Provider>
//     );

//     // Assert that the loading message is not displayed
//     await waitFor(() => {
//       const loadingMessage = screen.queryByText('Loading...');
//       expect(loadingMessage).toBeNull();
//     });

//     // Access the data from the selectors
//     // const authedUser = store.getState().authedUser;
//     // const questions = store.getState().questions;
//     // const users = store.getState().users;

//     // // Assert the question text is rendered correctly
//     // const questionText = screen.getByTestId('header-question');
//     // expect(questionText).toBeInTheDocument();
//     // expect(questionText).toHaveTextContent(
//     //   'Build our new application with Javascript'
//     // );

//     // // Assert the options are rendered correctly
//     // const option1 = screen.getByTestId('btn-option-one');
//     // const option2 = screen.getByTestId('btn-option-two');
//     // expect(option1).toBeInTheDocument();
//     // expect(option1).toHaveTextContent(
//     //   'Build our new application with Javascript'
//     // );
//     // expect(option2).toBeInTheDocument();
//     // expect(option2).toHaveTextContent(
//     //   'Build our new application with Typescript'
//     // );

//     // // Assert the votes and percentages are rendered correctly
//     // const votes1 = screen.getByText('Votes: 1');
//     // const votes2 = screen.getByText('Votes: 0');
//     // const percentage1 = screen.getByText('(100.00%)');
//     // const percentage2 = screen.getByText('(0.00%)');
//     // expect(votes1).toBeInTheDocument();
//     // expect(votes2).toBeInTheDocument();
//     // expect(percentage1).toBeInTheDocument();
//     // expect(percentage2).toBeInTheDocument();
//   });

//   test.skip('handles form submission correctly', () => {
//     render(
//       <Provider store={store}>
//         <BrowserRouter>
//           <VoteQuestion questionId="xj352vofupe1dqz9emx13r" />
//         </BrowserRouter>
//       </Provider>
//     );

//     // Simulate clicking the first option
//     fireEvent.click(
//       screen.getByText('deploy to production once every two weeks')
//     );

//     // Simulate form submission
//     fireEvent.submit(screen.getByRole('form'));

//     // Assert that the updateQuestion action was dispatched with the correct payload
//     const actions = store.getActions();
//     expect(actions).toHaveLength(2);
//     expect(actions[0].type).toBe('authedUser/updateSelectedAnswer');
//     expect(actions[0].payload).toEqual({
//       questionId: 'xj352vofupe1dqz9emx13r',
//       selectedOption: 'optionOne',
//     });
//     expect(actions[1].type).toBe('questions/updateQuestion');
//     expect(actions[1].payload).toEqual({
//       questionId: 'xj352vofupe1dqz9emx13r',
//       option: 'optionOne',
//       userId: 'mtsamis',
//     });

//     // Assert that the user is navigated to the home page
//     expect(window.location.pathname).toBe('/');
//   });
// });

// !!!!! GUTE STRUKTUR authedUser

// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import { BrowserRouter as Router, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import VoteQuestion from '../VoteQuestion';

// jest.mock('react-redux', () => ({
//   useSelector: jest.fn(),
//   useDispatch: jest.fn(),
// }));

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useParams: jest.fn(),
// }));

// test('renders the question and handles voting', () => {
//   useParams.mockReturnValue({ id: 'questionId' });
//   useSelector.mockReturnValue({
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
//       questionId: {
//         author: 'authorId',
//         optionOne: { text: 'Option One', votes: ['userId'] },
//         optionTwo: { text: 'Option Two', votes: [] },
//       },
//     },
//     users: {
//       authorId: {
//         name: 'Author Name',
//         avatarURL: 'avatar.jpg',
//       },
//     },
//   });
//   const mockDispatch = jest.fn();
//   useDispatch.mockReturnValue(mockDispatch);

//   render(
//     <Router>
//       <VoteQuestion />
//     </Router>
//   );

//   // Assert that the question is rendered
//   const questionText = screen.getByText(/would you rather/i);
//   expect(questionText).toBeInTheDocument();

//   // Assert that the voting buttons are rendered
//   const optionOneButton = screen.getByRole('button', { name: /option one/i });
//   expect(optionOneButton).toBeInTheDocument();
//   const optionTwoButton = screen.getByRole('button', { name: /option two/i });
//   expect(optionTwoButton).toBeInTheDocument();

//   // Simulate clicking on the voting buttons
//   fireEvent.click(optionOneButton);
//   fireEvent.click(optionTwoButton);
//   // Modify the following lines to assert the expected dispatch actions or behavior
//   expect(mockDispatch).toHaveBeenCalledTimes(2);
// });

// WEITER TEST VERSION

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import VoteQuestion from '../VoteQuestion';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

test.skip('renders the question and handles voting', () => {
  useParams.mockReturnValue({ id: 'vthrdm985a262al8qx3do' });
  useSelector.mockReturnValue({
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
      vthrdm985a262al8qx3do: {
        author: 'authorId',
        optionOne: { text: 'Option One', votes: ['userId'] },
        optionTwo: { text: 'Option Two', votes: [] },
      },
    },
    users: {
      authorId: {
        id: 'authorId',
        name: 'Author Name',
        avatarURL: 'avatar.jpg',
      },
    },
  });
  const mockDispatch = jest.fn();
  useDispatch.mockReturnValue(mockDispatch);

  render(
    <Router>
      <VoteQuestion />
    </Router>
  );

  // Assert that the question is rendered
  const questionText = screen.getByText(/would you rather/i);
  expect(questionText).toBeInTheDocument();

  // Assert that the voting buttons are rendered
  const optionOneButton = screen.getByRole('button', { name: /option one/i });
  expect(optionOneButton).toBeInTheDocument();
  const optionTwoButton = screen.getByRole('button', { name: /option two/i });
  expect(optionTwoButton).toBeInTheDocument();

  // Simulate clicking on the voting buttons
  fireEvent.click(optionOneButton);
  fireEvent.click(optionTwoButton);
  // Modify the following lines to assert the expected dispatch actions or behavior
  expect(mockDispatch).toHaveBeenCalledTimes(2);
});
