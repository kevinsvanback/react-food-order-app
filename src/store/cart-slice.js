import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { items: [], totalAmount: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState = initialCartState,
  reducers: {
    addItemToCart(state, action) {

    },
    removeItemFromCart(state, action) {

    },
    clearCart(state, action) {

    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;