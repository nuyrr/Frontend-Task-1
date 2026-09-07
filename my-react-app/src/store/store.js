// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });
// store.subscribe(() => {
//   const cartItems = store.getState().cart.items;

//   localStorage.setItem("cart", JSON.stringify(cartItems));
// });
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const savedCartState = localStorage.getItem("cartState");

const preloadedState = savedCartState
  ? {
      cart: JSON.parse(savedCartState),
    }
  : undefined;

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

// Save cart changes to localStorage
store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem(
    "cartState",
    JSON.stringify(state.cart)
  );
});