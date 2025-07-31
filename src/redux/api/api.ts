import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchBreeds = createAsyncThunk(
  'breeds/fetchBreeds',
  async ({ page = 1 }) => {
    const response = await axios.get(
      `https://dogapi.dog/api/v2/breeds?page[number]=${page}&page[size]=10`
    );
    return {
      breeds: response.data.data,
      meta: response.data.meta,
    };
  }
);
