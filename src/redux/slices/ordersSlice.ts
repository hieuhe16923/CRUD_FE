import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { OrderService } from '../../services/order.service';
import { toast } from 'react-toastify';

const getCartFromLocalStorage = () => {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
};

// 🔹 Thunk to call API
export const orderPlace = createAsyncThunk(
  'order/placeOrder',
  async (orderData: any, { rejectWithValue }) => {
    try {
      const response = await OrderService.placeOrder(orderData);
      return response; // ✅ already the order object
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'order',
  initialState: {
    order: null as any,
    loading: false,
    error: null as string | null,
    cart: getCartFromLocalStorage(),
  },
  reducers: {
    resetOrder: state => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
    addToCart: (state, action) => {
      const pet = action.payload;
      const existingIndex = state.cart.findIndex(item => item.id === pet.id);

      if (existingIndex !== -1) {
        state.cart[existingIndex].quantity += 1;
      } else {
        state.cart.push({ ...pet, quantity: 1 });
      }

      localStorage.setItem('cart', JSON.stringify(state.cart));
      toast.success(`${pet.name} đã được thêm vào giỏ hàng!`);
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity <= 0) {
        state.cart = state.cart.filter(item => item.id !== id);
      } else {
        const existingIndex = state.cart.findIndex(item => item.id === id);
        if (existingIndex !== -1) {
          state.cart[existingIndex].quantity = quantity;
        }
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
      toast.info('Đã xóa khỏi giỏ hàng');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(orderPlace.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(orderPlace.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(orderPlace.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  resetOrder,
  addToCart,
  updateCartQuantity,
  clearCart,
  removeFromCart,
} = ordersSlice.actions;
export default ordersSlice.reducer;
