import { api } from "./index";

const authApi = api.injectEndpoints({
   endpoints: (build) => ({

      // REGISTER
      register: build.mutation({
         query: (body) => ({
         url: "/auth",
         method: "POST",
         body
         }),
      }),

      // LOGIN
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