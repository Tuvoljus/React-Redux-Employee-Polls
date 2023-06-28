import { createSlice } from '@reduxjs/toolkit';
import { users } from '../utils/initialData';

const initialState = {};

// const initialState = {
//   id: null,
//   name: null,
//   avatarURL: null,
//   answers: {},
//   questions: [],
// };

export const authedUser = createSlice({
  name: 'authedUser',
  initialState: initialState,
  reducers: {
    setAuthedUser: (state, action) => {
      const { userId } = action.payload;
      const user = users[userId];

      state.id = user.id;
      state.name = user.name;
      state.avatarURL = user.avatarURL;
      state.answers = user.answers;
      state.questions = user.questions;

      localStorage.setItem('authedUser', JSON.stringify(user));
    },
    updateSelectedAnswer: (state, action) => {
      const { questionId, selectedOption } = action.payload;
      state.answers = {
        ...state.answers,
        [questionId]: selectedOption,
      };
      localStorage.setItem('authedUser', JSON.stringify(state));
    },
    addQuestionToUser: (state, action) => {
      const { questionId } = action.payload;
      state.questions.push(questionId);
      localStorage.setItem('authedUser', JSON.stringify(state));
    },
    logoutUser: () => ({}),
  },
  extraReducers: (builder) => {
    builder.addCase(logoutUser, (state, action) => {
      // Reset the authedUser state to an empty object
      return {};
    });
  },
});

export const {
  setAuthedUser,
  updateSelectedAnswer,
  addQuestionToUser,
  logoutUser,
} = authedUser.actions;

export default authedUser.reducer;

// !!!!! COPY SYNC

// import { createSlice } from '@reduxjs/toolkit';
// import { users } from '../utils/initialData';

// const initialState = {};

// // const initialState = {
// //   id: null,
// //   name: null,
// //   avatarURL: null,
// //   answers: {},
// //   questions: [],
// // };

// export const authedUser = createSlice({
//   name: 'authedUser',
//   initialState: initialState,
//   reducers: {
//     setAuthedUser: (state, action) => {
//       // ...
//     },
//     updateSelectedAnswer: (state, action) => {
//       const { questionId, selectedOption } = action.payload;

//       // Update the authedUser's answers
//       state.answers = {
//         ...state.answers,
//         [questionId]: selectedOption,
//       };

//       // Update the corresponding user's answers in the users slice
//       users[state.id].answers = {
//         ...users[state.id].answers,
//         [questionId]: selectedOption,
//       };

//       localStorage.setItem('authedUser', JSON.stringify(state));
//     },
//     addQuestionToUser: (state, action) => {
//       const { questionId } = action.payload;

//       // Update the authedUser's questions
//       state.questions.push(questionId);

//       // Update the corresponding user's questions in the users slice
//       users[state.id].questions.push(questionId);

//       localStorage.setItem('authedUser', JSON.stringify(state));
//     },
//     logoutUser: () => ({}),
//   },
// });

// export const {
//   setAuthedUser,
//   updateSelectedAnswer,
//   addQuestionToUser,
//   logoutUser,
// } = authedUser.actions;

// export default authedUser.reducer;
