import { createSlice } from '@reduxjs/toolkit';
import { users } from '../utils/initialData';
import { setSessionStorageItem, getSessionStorageItem } from '../utils/storage';

const initialState = getSessionStorageItem('authedUser') || {};

export const authedUser = createSlice({
  name: 'authedUser',
  initialState: initialState,
  reducers: {
    setAuthedUser: (state, action) => {
      const { userId } = action.payload;
      const user = users[userId];

      if (user) {
        state.id = user.id;
        state.name = user.name;
        state.avatarURL = user.avatarURL;
        state.answers = user.answers;
        state.questions = user.questions;

        setSessionStorageItem('authedUser', JSON.stringify(state));
      }
    },
    updateSelectedAnswer: (state, action) => {
      const { questionId, selectedOption } = action.payload;
      state.answers = {
        ...state.answers,
        [questionId]: selectedOption,
      };
      setSessionStorageItem('authedUser', JSON.stringify(state));
    },
    addQuestionToUser: (state, action) => {
      const { questionId } = action.payload;
      state.questions.push(questionId);
      setSessionStorageItem('authedUser', JSON.stringify(state));
    },
    logoutUser: () => ({}),
  },
  // extraReducers: (builder) => {
  //   builder.addCase(logoutUser, (state, action) => {
  //     return {};
  //   });
  // },
});

export const {
  setAuthedUser,
  updateSelectedAnswer,
  addQuestionToUser,
  logoutUser,
} = authedUser.actions;

export default authedUser.reducer;
