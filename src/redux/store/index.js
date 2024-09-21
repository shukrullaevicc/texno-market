import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../slices/authSlice";
import cartReducer from "../slices/cartSlice";
import { api } from "../api";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        [api.reducerPath] : api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
})