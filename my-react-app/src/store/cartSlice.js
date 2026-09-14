import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  savedItems: [],
  coupon: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const product = action.payload;

      const quantityToAdd = Math.max(
        1,
        Number(product.quantity) || 1
      );

      const stock = Number(product.stock) || Infinity;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity = Math.min(
          existingItem.quantity + quantityToAdd,
          Number(existingItem.stock) || stock
        );
      } else {
        state.items.push({
          ...product,
          quantity: Math.min(quantityToAdd, stock),
        });
      }

      // Remove product from Save for Later when added to cart
      state.savedItems = state.savedItems.filter(
        (item) => item.id !== product.id
      );
    },

    // Increase quantity
    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) return;

      const stock = Number(item.stock);

      if (Number.isFinite(stock)) {
        if (item.quantity < stock) {
          item.quantity += 1;
        }
      } else {
        item.quantity += 1;
      }
    },

    // Decrease quantity
    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // Remove product from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    // Clear cart after successful checkout
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
    },

    // Save product for later
    saveForLater: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (!item) return;

      const alreadySaved = state.savedItems.some(
        (savedItem) => savedItem.id === item.id
      );

      if (!alreadySaved) {
        state.savedItems.push(item);
      }

      state.items = state.items.filter(
        (cartItem) => cartItem.id !== action.payload
      );
    },

    // Move saved product back to cart
    moveToCart: (state, action) => {
      const item = state.savedItems.find(
        (savedItem) => savedItem.id === action.payload
      );

      if (!item) return;

      const existingItem = state.items.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        const stock = Number(existingItem.stock);

        const newQuantity =
          existingItem.quantity + item.quantity;

        existingItem.quantity = Number.isFinite(stock)
          ? Math.min(newQuantity, stock)
          : newQuantity;
      } else {
        const stock = Number(item.stock);

        state.items.push({
          ...item,
          quantity: Number.isFinite(stock)
            ? Math.min(item.quantity, stock)
            : item.quantity,
        });
      }

      state.savedItems = state.savedItems.filter(
        (savedItem) => savedItem.id !== action.payload
      );
    },

    // Remove saved product
    removeSavedItem: (state, action) => {
      state.savedItems = state.savedItems.filter(
        (item) => item.id !== action.payload
      );
    },

    // Apply coupon
    applyCoupon: (state, action) => {
      state.coupon = action.payload;
    },

    // Remove coupon
    removeCoupon: (state) => {
      state.coupon = null;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  saveForLater,
  moveToCart,
  removeSavedItem,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export default cartSlice.reducer;