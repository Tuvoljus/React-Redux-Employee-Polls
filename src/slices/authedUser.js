import { createSlice } from '@reduxjs/toolkit';
import { users } from '../utils/initialData';

const initialState = {};

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
