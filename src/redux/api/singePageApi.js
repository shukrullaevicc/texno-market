import { api } from "../api";

export const singlePageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSingleProduct: build.query({
      query: (id) => `/product/${id}`,
    }),
  }),
});

export const { useGetSingleProductQuery } = singlePageApi;