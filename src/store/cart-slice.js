import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { items: [], totalAmount: 0 };

const defaultCartState = {
  items: [],
  totalAmount: 0
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const updatedTotalAmount = state.totalAmount + newItem.price * newItem.amount;

      const existingCartItemIndex = state.items.findIndex(item => item.id === newItem.id);
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + newItem.amount
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(newItem);
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    },
    removeItemFromCart(state, action) {
      const currentItemId = action.payload;

      const existingCartItemIndex = state.items.findIndex((item) => item.id === currentItemId);
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = Math.abs(state.totalAmount - existingCartItem.price);
      let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter(item => item.id !== currentItemId);
      } else {
        const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };
    },
    clearCart() {
      return defaultCartState;
    }
  },
});

export const cartActions = cartSlice.actions;
export default cartSlice;