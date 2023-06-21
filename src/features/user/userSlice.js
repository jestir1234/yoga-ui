/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const userLoginSlice = createSlice({
  name: 'userLogin',
  initialState: {
    isLoading: false,
    error: null,
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
      state.isLoggedIn = false;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.isLoggedIn = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userLoginSlice.actions;
export default userLoginSlice.reducer;
