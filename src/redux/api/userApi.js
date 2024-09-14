import { api } from "./index";

const userApi = api.injectEndpoints({
   endpoints: (build) => ({
      user: build.query({
         query: () => ({
            url: "/admin/registered-users",
            method: "GET"
         }),
      }),
   }),
});

export const { useUserQuery } = userApi