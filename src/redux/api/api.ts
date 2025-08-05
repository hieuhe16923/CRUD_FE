import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const api = axios.create({
  baseURL: 'https://dogapi.dog/api/v2',
});

export const fetchBreeds = createAsyncThunk(
  'breeds/fetchBreeds',
  async ({ page = 1 }: { page?: number }, { rejectWithValue }) => {
    try {
      const response = await api.get(`/breeds?page[number]=${page}`);
      return {
        breeds: response.data.data,
        meta: response.data.meta,
      };
    } catch (error: any) {
      console.log('ERROR:', error); // debug log
      if (error.code === 'ECONNABORTED') {
        return rejectWithValue('Yêu cầu quá thời gian (timeout)');
      }
      if (!error.response) {
        return rejectWithValue('Không có kết nối Internet');
      }
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Lỗi không xác định'
      );
    }
  }
);
