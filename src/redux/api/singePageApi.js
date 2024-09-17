import { api } from "../api";

export const singlePageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSingleProduct: build.query({
      query: (id) => `/product/single-product/${id}`,
    }),
  }),
});

export const { useGetSingleProductQuery } = singlePageApi;