import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: localStorage.getItem("user") || null,
   token: localStorage.getItem("token") || null
}

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers:{
      login: (state, action) => {
         state.user = action.payload.user;
         state.token = action.payload.token;
         localStorage.setItem("user", JSON.stringify(state.user));
         localStorage.setItem("token", state.token);
      },

      register: (state, action) => {
         state.user = action.payload.user;
         state.token = action.payload.token;
         localStorage.setItem("user", JSON.stringify(state.user));
         localStorage.setItem("token", state.token);
      },

      signOut: (state) => {
         state.user = null;
         state.token = null;
         localStorage.removeItem("user");
         localStorage.removeItem("token");
      }
   }
})

export const { login, register, signOut } = authSlice.actions;
export default authSlice.reducer