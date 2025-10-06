import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  calls: [],
  currentCall: null,
  loading: false,
  error: null
};

const callSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setCalls: (state, action) => {
      state.calls = action.payload;
      state.loading = false;
      state.error = null;
    },
    setCurrentCall: (state, action) => {
      state.currentCall = action.payload;
      state.loading = false;
      state.error = null;
    },
    addCall: (state, action) => {
      state.calls.unshift(action.payload);
      state.loading = false;
      state.error = null;
    },
    updateCall: (state, action) => {
      const index = state.calls.findIndex(call => call._id === action.payload._id);
      if (index !== -1) {
        state.calls[index] = action.payload;
      }
      state.loading = false;
      state.error = null;
    },
    removeCall: (state, action) => {
      state.calls = state.calls.filter(call => call._id !== action.payload);
      state.loading = false;
      state.error = null;
    }
  }
});

export const {
  setLoading,
  setError,
  setCalls,
  setCurrentCall,
  addCall,
  updateCall,
  removeCall
} = callSlice.actions;

export default callSlice.reducer;