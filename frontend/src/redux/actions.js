import axios from 'axios';
import {
  setLoading,
  setError,
  setCalls,
  setCurrentCall,
  addCall,
  updateCall,
  removeCall
} from './callSlice';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchCalls = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${API_URL}/calls`);
    dispatch(setCalls(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const fetchCallById = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get(`${API_URL}/calls/${id}`);
    dispatch(setCurrentCall(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const createCall = (callData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.post(`${API_URL}/calls`, callData);
    dispatch(addCall(response.data));
    return response.data;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const updateCallById = (id, callData) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.put(`${API_URL}/calls/${id}`, callData);
    dispatch(updateCall(response.data));
    return response.data;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  }
};

export const deleteCall = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await axios.delete(`${API_URL}/calls/${id}`);
    dispatch(removeCall(id));
  } catch (error) {
    dispatch(setError(error.message));
  }
};
