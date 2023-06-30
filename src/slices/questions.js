import { createSlice } from '@reduxjs/toolkit';
import { questions as initialQuestions } from '../utils/initialData';

const initialState = initialQuestions;

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

export const { addQuestion, updateQuestion } = questions.actions;

export default questions.reducer;
