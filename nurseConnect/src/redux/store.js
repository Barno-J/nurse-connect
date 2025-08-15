
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice';
import jobReducer from './slices/jobSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    job: jobReducer,
  },
})

export default store