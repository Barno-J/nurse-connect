import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await apiClient.post('/user/login', credentials);
      const { user, token } = res.data;

      // Persist
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return { user, token };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const res = await apiClient.post('/user/register', userData);
      const { user, token } = res.data;

      // Persist
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      return { user, token };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);