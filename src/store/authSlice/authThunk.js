import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstanse } from '../../config/axiosInstance';

export const signUp = createAsyncThunk(
  'sign/signup',
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstanse.post('/auth/sign-up', data);
      navigate("/");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const signIn = createAsyncThunk(
  'sign/signin',
  async ({ data, navigate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstanse.post('/auth/sign-in', data);
      navigate("/");
      return response.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
