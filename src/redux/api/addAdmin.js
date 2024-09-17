import { api } from "./index";

const authApi = api.injectEndpoints({
   endpoints: (build) => ({
      addAdmin: build.mutation({
         query: (body) => ({
         url: "/admin/add-admin",
         method: "POST",
         body
         }),
      })
   }),
});

export const { useAddAdminMutation } = authApi;