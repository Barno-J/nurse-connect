import { createSlice } from '@reduxjs/toolkit';
import { fetchJobGroups, updateJobGroups } from '../actions/jobGroupActions';

const initialState = {
  counties: ['All', 'Nairobi', 'Mombasa', 'Kisumu', 'Uasin Gishu', 'Kilifi'],
  education: ['All', 'Bachelor', 'Diploma', 'Certificate'],
  titles: ['All', 'Nurse', 'Clinical Officer', 'Admin'],
  loading: false,
  error: null,
};

const jobGroupSlice = createSlice({
  name: 'jobGroups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.counties = action.payload.counties;
        state.education = action.payload.education;
        state.titles = action.payload.titles;
      })
      .addCase(fetchJobGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateJobGroups.fulfilled, (state, action) => {
        state.counties = action.payload.counties;
        state.education = action.payload.education;
        state.titles = action.payload.titles;
      });
  },
});

export default jobGroupSlice.reducer;