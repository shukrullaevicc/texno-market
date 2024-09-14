import { createSlice } from "@reduxjs/toolkit";

const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const initialState = {
  cart: getCartFromLocalStorage(),
  total: 0
};

const cartSlice = createSlice({
   name: "cart",
   initialState,
   reducers: {
      addToCart: (state, action) => {
         const existingProduct = state.cart.find((product) => product.id === action.payload.id);

         if (existingProduct) {
            existingProduct.quantity += 1;
         } else {
            state.cart.push({ ...action.payload, quantity: 1 });
         }

         localStorage.setItem("cart", JSON.stringify(state.cart));
      },

      removeFromCart: (state, action) => {
         const existingProduct = state.cart.find((product) => product._id === action.payload._id);

         if (existingProduct.quantity > 1) {
            existingProduct.quantity -= 1;
         }
         else {
            state.cart = state.cart.filter((product) => product._id !== action.payload._id);
         }

         localStorage.setItem("cart", JSON.stringify(state.cart));
      },

      calculateTotals: (state) => {
         const totalPrice = state.cart.reduce((sum, product) => sum + product.sale_price * product.quantity, 0);
         state.total = totalPrice;
      },

      deleteCart: (state, action) => {
         const deleteCart = state.cart.filter((product) => product._id !== action.payload._id);

         state.cart = deleteCart;
         localStorage.setItem("cart", JSON.stringify(state.cart));
      },
   },
});

export const { addToCart, removeFromCart, calculateTotals, deleteCart } = cartSlice.actions;
export default cartSlice.reducer;