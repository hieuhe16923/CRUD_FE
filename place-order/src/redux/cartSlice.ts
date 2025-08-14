// src/redux/reducers/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadCartFromSession } from '../utils/sessionStorage';

export interface CartItem {
  id: number;
  name: string;
  status: string;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = loadCartFromSession() || {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Omit<CartItem, 'quantity'>>) {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },

    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity = Number(item.quantity) + 1;
      }
    },

    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find(i => i.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity = Number(item.quantity) - 1;
      }
    },

    setQuantity(state, action: PayloadAction<{ id: number; quantity: number | string }>) {
      const { id, quantity } = action.payload;
      const item = state.items.find(p => p.id === id);
      if (item) {
        const parsed = Number(quantity);
        item.quantity = parsed >= 1 ? parsed : 1;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
