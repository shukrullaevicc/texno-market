import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   username: localStorage.getItem("username") || null,
   token: localStorage.getItem("token") || null
}

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers:{
      login: (state, action) => {
         state.token = action.payload.token;
         localStorage.setItem("token", state.token)
         localStorage.setItem("username",action.payload.username)
      },

      register: (state, action) => {
         state.user = action.payload.user;
         state.token = action.payload.token
         localStorage.setItem("token", state.token)
         localStorage.setItem("username", action.payload.username)
      },

      signOut: (state) => {
         state.token = null;
         localStorage.removeItem("username");
         localStorage.removeItem("token");
      }
   }
})

export const { login, register, signOut } = authSlice.actions;
export default authSlice.reducer