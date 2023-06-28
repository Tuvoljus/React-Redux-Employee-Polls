import { createSlice } from '@reduxjs/toolkit';
import { users as initialUsers } from '../utils/initialData';

const initialState = initialUsers;

const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    addUser: (state, action) => {
      const user = action.payload;
      state[user.id] = user;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
