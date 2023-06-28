import { createSlice } from '@reduxjs/toolkit';
import { users as initialUsers } from '../utils/initialData';

const initialState = initialUsers;

const sharedInitialDataSlice = createSlice({
  name: 'shared',
  initialState: initialState,
  reducers: {
    fetchInitialData: (state, action) => {
      const usersToAdd = action.payload;
      usersToAdd.forEach((user) => {
        state[user.id] = user;
      });
    },
    // Add other user-related actions if needed
  },
});

export const { addUser, fetchInitialData } = sharedInitialDataSlice.actions;

export default sharedInitialDataSlice.reducer;
