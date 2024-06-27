import { createSlice } from '@reduxjs/toolkit';
import { signIn, signUp } from './authThunk';

const initialState = {
  userInfo: {
    name: '',
    number: '',
    email: '',
    password: '',
    isAuth: false,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.isAuth = true;
    });
  },
  extraReducers: (builder) => {
    builder.addCase(signIn
        .fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.isAuth = true;
    });
  },
});
