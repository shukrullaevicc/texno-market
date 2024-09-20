import { api } from "./index";

const userApi = api.injectEndpoints({
   endpoints: (build) => ({
      user: build.query({
         query: () => ({
            url: "/admin/registered-users",
            method: "GET"
         }),
      }),

      likeProduct: build.mutation({
         query: (id) => ({
            url: `/product/${id}/like`,
            method: "PATCH",
         }),
      }),

      unLikeProduct: build.mutation({
         query: (id) => ({
            url: `/product/${id}/unlike`,
            method: "PATCH",
         }),
      }),
   }),
});

export const { useUserQuery, useLikeProductMutation, useUnLikeProductMutation } = userApi