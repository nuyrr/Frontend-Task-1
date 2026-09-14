import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

let savedCartState = null;

// Safely restore cart from localStorage
try {
  const storedCart = localStorage.getItem("cartState");

  if (storedCart) {
    const parsedCart = JSON.parse(storedCart);

    if (
      parsedCart &&
      typeof parsedCart === "object" &&
      Array.isArray(parsedCart.items) &&
      Array.isArray(parsedCart.savedItems)
    ) {
      savedCartState = {
        items: parsedCart.items,
        savedItems: parsedCart.savedItems,
        coupon: parsedCart.coupon || null,
      };
    }
  }
} catch {
  localStorage.removeItem("cartState");
  savedCartState = null;
}

const preloadedState = savedCartState
  ? {
      cart: savedCartState,
    }
  : undefined;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },

  preloadedState,
});

// Persist cart state
store.subscribe(() => {
  try {
    const cartState = store.getState().cart;

    localStorage.setItem(
      "cartState",
      JSON.stringify(cartState)
    );
  } catch {
    // Ignore localStorage errors
  }
});