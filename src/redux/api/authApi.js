import { api } from "./index";

const authApi = api.injectEndpoints({
   endpoints: (build) => ({
      register: build.mutation({
         query: (body) => ({
         url: "/auth",
         method: "POST",
         body
         }),
      }),
      login: build.mutation({
         query: (body) => ({
         url: "/auth/login",
         method: "POST",
         body
         })
      })
   }),
});

export const { useRegisterMutation, useLoginMutation} = authApi;