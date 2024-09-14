import { api } from "./index";

const userApi = api.injectEndpoints({
   endpoints: (build) => ({
      getProducts: build.query({
         query: () => ({
            url: "/product/all",
            method: "GET",
         }),
      }),
   }),
});

export const { useGetProductsQuery } = userApi