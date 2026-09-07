// // import { createSlice } from "@reduxjs/toolkit";
// // const savedCart = localStorage.getItem("cart");

// // const initialState = {
// //   items: savedCart ? JSON.parse(savedCart) : [],
// // };

// // const cartSlice = createSlice({
// //   name: "cart",

// //   initialState,

// //   reducers: {
// //     addToCart: (state, action) => {
// //       const product = action.payload;

// //       const existingItem = state.items.find(
// //         (item) => item.id === product.id
// //       );

// //       if (existingItem) {
// //         existingItem.quantity += product.quantity || 1;
// //       } else {
// //         state.items.push({
// //           ...product,
// //           quantity: product.quantity || 1,
// //         });
// //       }
// //     },

// //     removeFromCart: (state, action) => {
// //       state.items = state.items.filter(
// //         (item) => item.id !== action.payload
// //       );
// //     },

// //     increaseQuantity: (state, action) => {
// //       const item = state.items.find(
// //         (item) => item.id === action.payload
// //       );

// //       if (item) {
// //         item.quantity += 1;
// //       }
// //     },

// //     decreaseQuantity: (state, action) => {
// //       const item = state.items.find(
// //         (item) => item.id === action.payload
// //       );

// //       if (item && item.quantity > 1) {
// //         item.quantity -= 1;
// //       }
// //     },

// //     clearCart: (state) => {
// //       state.items = [];
// //     },
// //   },
// // });

// // export const {
// //   addToCart,
// //   removeFromCart,
// //   increaseQuantity,
// //   decreaseQuantity,
// //   clearCart,
// // } = cartSlice.actions;

// // export default cartSlice.reducer;
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   items: [],
//   savedItems: [],
//   coupon: null,
// };

// const cartSlice = createSlice({
//   name: "cart",

//   initialState,

//   reducers: {
//     // Add product to cart
//     addToCart: (state, action) => {
//       const product = action.payload;

//       const existingItem = state.items.find(
//         (item) => item.id === product.id
//       );

//       if (existingItem) {
//         existingItem.quantity += product.quantity || 1;
//       } else {
//         state.items.push({
//           ...product,
//           quantity: product.quantity || 1,
//         });
//       }

//       // If product was saved for later, remove it from saved items
//       state.savedItems = state.savedItems.filter(
//         (item) => item.id !== product.id
//       );
//     },

//     // Increase quantity
//     increaseQuantity: (state, action) => {
//       const item = state.items.find(
//         (item) => item.id === action.payload
//       );

//       if (item) {
//         item.quantity += 1;
//       }
//     },

//     // Decrease quantity
//     decreaseQuantity: (state, action) => {
//       const item = state.items.find(
//         (item) => item.id === action.payload
//       );

//       if (item && item.quantity > 1) {
//         item.quantity -= 1;
//       }
//     },

//     // Remove from cart
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(
//         (item) => item.id !== action.payload
//       );
//     },
//         clearCart:(state)=>{
//           state.items=[];
//         },
//     // Save item for later
//     saveForLater: (state, action) => {
//       const item = state.items.find(
//         (item) => item.id === action.payload
//       );

//       if (item) {
//         const alreadySaved = state.savedItems.some(
//           (savedItem) => savedItem.id === item.id
//         );

//         if (!alreadySaved) {
//           state.savedItems.push(item);
//         }

//         state.items = state.items.filter(
//           (cartItem) => cartItem.id !== action.payload
//         );
//       }
//     },

//     // Move saved item back to cart
//     moveToCart: (state, action) => {
//       const item = state.savedItems.find(
//         (savedItem) => savedItem.id === action.payload
//       );

//       if (item) {
//         const existingItem = state.items.find(
//           (cartItem) => cartItem.id === item.id
//         );

//         if (existingItem) {
//           existingItem.quantity += item.quantity;
//         } else {
//           state.items.push(item);
//         }

//         state.savedItems = state.savedItems.filter(
//           (savedItem) => savedItem.id !== action.payload
//         );
//       }
//     },

//     // Remove saved item
//     removeSavedItem: (state, action) => {
//       state.savedItems = state.savedItems.filter(
//         (item) => item.id !== action.payload
//       );
//     },

//     // Apply coupon
//     applyCoupon: (state, action) => {
//       state.coupon = action.payload;
//     },

//     // Remove coupon
//     removeCoupon: (state) => {
//       state.coupon = null;
//     },
//   },
// });

// export const {
//   addToCart,
//   increaseQuantity,
//   decreaseQuantity,
//   removeFromCart,
//   clearCart,
//   saveForLater,
//   moveToCart,
//   removeSavedItem,
//   applyCoupon,
//   removeCoupon,
// } = cartSlice.actions;

// export default cartSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(
  localStorage.getItem("cartState")
);

const initialState = savedCart || {
  items: [],
  savedItems: [],
  coupon: null,
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingItem = state.items.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      state.savedItems = state.savedItems.filter(
        (item) => item.id !== product.id
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
    },

    saveForLater: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        const alreadySaved = state.savedItems.some(
          (savedItem) => savedItem.id === item.id
        );

        if (!alreadySaved) {
          state.savedItems.push(item);
        }

        state.items = state.items.filter(
          (cartItem) => cartItem.id !== action.payload
        );
      }
    },

    moveToCart: (state, action) => {
      const item = state.savedItems.find(
        (savedItem) => savedItem.id === action.payload
      );

      if (item) {
        const existingItem = state.items.find(
          (cartItem) => cartItem.id === item.id
        );

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.items.push(item);
        }

        state.savedItems = state.savedItems.filter(
          (savedItem) => savedItem.id !== action.payload
        );
      }
    },

    removeSavedItem: (state, action) => {
      state.savedItems = state.savedItems.filter(
        (item) => item.id !== action.payload
      );
    },

    applyCoupon: (state, action) => {
      state.coupon = action.payload;
    },

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