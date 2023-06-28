import { createSlice } from '@reduxjs/toolkit';
import { questions as initialQuestions } from '../utils/initialData';
// import { getInitialData } from '../utils/api';

const initialState = initialQuestions;
// const initialState = getInitialData.questions;

export const questions = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      const newQuestion = action.payload;
      state[newQuestion.id] = newQuestion;
    },
    updateQuestion: (state, action) => {
      const { questionId, option, userId } = action.payload;
      const question = state[questionId];
      if (question && question[option]) {
        question[option].votes.push(userId);
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addQuestion, updateQuestion } = questions.actions;

export default questions.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { questions as initialQuestions } from '../utils/initialData';
// // import { getInitialData } from '../utils/api';

// const initialState = initialQuestions;
// // const initialState = getInitialData.questions;

// export const questions = createSlice({
//   name: 'questions',
//   initialState,
//   reducers: {
//     addQuestion: (state, action) => {
//       const newQuestion = action.payload;
//       state[newQuestion.id] = newQuestion;
//     },
//     // addQuestion: (state, action) => {
//     //   const { question } = action.payload;
//     //   state[question.id] = question;
//     // },
//     updateQuestion: (state, action) => {
//       const { questionId, option, userId } = action.payload;
//       if (!state[questionId]) {
//         // Create the question object if it doesn't exist
//         state[questionId] = {};
//       }
//       if (!state[questionId][option]) {
//         // Create the option object if it doesn't exist
//         state[questionId][option] = { votes: [] };
//       }
//       state[questionId][option].votes.push(userId);
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const { addQuestion, updateQuestion } = questions.actions;

// export default questions.reducer;
