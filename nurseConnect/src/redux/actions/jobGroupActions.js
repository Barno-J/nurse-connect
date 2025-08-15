import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

// Fetch job groups (admin feature, optional)
export const fetchJobGroups = createAsyncThunk(
  'jobGroups/fetchJobGroups',
  async (_, thunkAPI) => {
    try {
      const res = await apiClient.get('/job-groups');
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch job groups');
    }
  }
);

// Update job groups (admin feature, optional)
export const updateJobGroups = createAsyncThunk(
  'jobGroups/updateJobGroups',
  async (updatedGroups, thunkAPI) => {
    try {
      const res = await apiClient.put('/job-groups', updatedGroups);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update job groups');
    }
  }
);
