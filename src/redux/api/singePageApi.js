import { api } from "../api";

export const singlePageApi = api.injectEndpoints({
  endpoints: (build) => ({
    getSingleProduct: build.query({
      query: (_id) => `/product/${_id}`,
    }),
  }),
});

export const { useGetSingleProductQuery } = singlePageApi;