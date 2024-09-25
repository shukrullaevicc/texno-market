import { api } from "./index";

const categoryApi = api.injectEndpoints({
  endpoints: (build) => ({
   
    getCategories: build.query({
      query: () => ({
        url: "/product/category"
      }),
    }),
    
    getProductType:  build.query({
        query: () => ({
          url: "/product/product-type"
        }),
      }),
  }),
});

export const {useGetCategoriesQuery, useGetProductTypeQuery} = categoryApi