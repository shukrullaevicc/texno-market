import { api } from "./index";

const profileApi = api.injectEndpoints({
   endpoints: (build) => ({
      profileApi: build.query({
         query: () => ({
            url: "/auth/profile",
            method: "GET",
         }),
      }),
   }),
});

export const { useProfileApiQuery } = profileApi;