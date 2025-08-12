import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const api = axios.create({
  baseURL: 'https://petstore.swagger.io/v2',
});

export const orderPlace = createAsyncThunk(
  'order/placeOrder',
  async (orderData, thunkAPI) => {
    try {
      const res = await api.post('/store/order', orderData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: err.response?.status,
        message: err.response?.data || err.message,
      });
    }
  }
);

export const fetchPets = createAsyncThunk(
  'pets/fetchPets',
  async (_, thunkAPI) => {
    try {
      if (!navigator.onLine) {
        return thunkAPI.rejectWithValue('Không có kết nối mạng');
      }
      const res = await axios.get(
        'https://petstore.swagger.io/v2/pet/findByStatus?status=available'
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message || 'Lỗi không xác định'
      );
    }
  }
);
