import { api } from "../api"; // Assuming you have the base API file

export const singlePageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSingleProduct: build.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const { useGetSingleProductQuery } = singlePageApi;
