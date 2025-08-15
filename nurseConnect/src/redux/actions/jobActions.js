import { createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/apiClient';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, thunkAPI) => {
	try {
		const res = await apiClient.get('/jobs');
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch jobs');
	}
});

export const createJob = createAsyncThunk('jobs/createJob', async (jobData, thunkAPI) => {
	try {
		const res = await apiClient.post('/jobs', jobData);
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create job');
	}
});

export const updateJob = createAsyncThunk('jobs/updateJob', async ({ id, jobData }, thunkAPI) => {
	try {
		const res = await apiClient.put(`/jobs/${id}`, jobData);
		return res.data;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update job');
	}
});

export const deleteJob = createAsyncThunk('jobs/deleteJob', async (id, thunkAPI) => {
	try {
		await apiClient.delete(`/jobs/${id}`);
		return id;
	} catch (err) {
		return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete job');
	}
});