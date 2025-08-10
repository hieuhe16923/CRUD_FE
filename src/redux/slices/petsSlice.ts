import { createSlice } from '@reduxjs/toolkit';
import { fetchPets } from '../api/api';

const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

const petSlice = createSlice({
  name: 'pets',
  initialState: {
    list: [],
    loading: false,
    error: null,
    cart: getCartFromLocalStorage(),
  },
  reducers: {
    buyPet: (state, action) => {
      const pet = action.payload;
      const existingIndex = state.cart.findIndex(item => item.id === pet.id);

      if (existingIndex !== -1) {
        // Nếu đã có, tăng số lượng
        state.cart[existingIndex].quantity += 1;
      } else {
        // Nếu chưa có, thêm mới với quantity = 1
        state.cart.push({ ...pet, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    clearCart: state => {
      state.cart = [];
      localStorage.removeItem('cart');
    },
    removeFromCart: (state, action) => {
      const petId = action.payload;
      state.cart = state.cart.filter(pet => pet.id !== petId);
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPets.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { buyPet, clearCart, removeFromCart } = petSlice.actions;
export default petSlice.reducer;
