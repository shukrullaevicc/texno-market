import { api } from "./index";

const productsApi = api.injectEndpoints({
   endpoints: (build) => ({

      // PRODUCTS
      getProducts: build.query({
         query: () => ({
         url: "/product/all",
         method: "GET",
         }),
         providesTags: ["PRODUCTS"],
      }),

      // SINGLE PRODUCT
      getProductDetails: build.query({
         query: (id) => ({
         url: `/product/single-product/${id}`,
         }),
         providesTags: ["PRODUCTS"],
      }),

      // SEARCH PRODUCT
      searchProduct: build.mutation({
         query: (searchQuery) => ({
         url: `/product/search?productName=${searchQuery}`,
         method: "POST",
         }),
         providesTags: ["PRODUCTS"],
      }),

      // LIKE PRODUCT
      likeProduct: build.mutation({
         query: (id) => ({
         url: `/product/${id}/like`,
         method: "PATCH",
         }),
         invalidatesTags: ["PRODUCTS"],
      }),

      // UNLIKE PRODUCT
      unLikeProduct: build.mutation({
         query: (id) => ({
         url: `/product/${id}/unlike`,
         method: "PATCH",
         }),
         invalidatesTags: ["PRODUCTS"],
      }),

      // CREATE PRODUCT
      createProduct: build.mutation({
         query: (body) => ({
         url: `/product/create`,
         method: "POST",
         body,
         }),
      }),
   }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useSearchProductMutation,
  useLikeProductMutation,
  useUnLikeProductMutation,
  useCreateProductMutation,
} = productsApi;