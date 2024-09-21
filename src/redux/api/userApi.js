import { api } from "./index";

const userApi = api.injectEndpoints({
   endpoints: (build) => ({

      // USER PROFILE
      getProfile: build.query({
         query: () => ({
         url: "/auth/profile",
         }),
      }),

      // USERS
      getUsers: build.query({
         query: () => ({
         url: "/admin/registered-users",
         }),
         providesTags: ["USERS"],
      }),

      // DELETE USER
      deleteUser: build.mutation({
         query: ({ id }) => ({
         url: `/admin/delete-user/${id}`,
         method: "DELETE",
         }),
         invalidatesTags: ["USERS"],
      }),

      // PROMOTE USER
      promoteUser: build.mutation({
         query: (body) => ({
         url: `/admin/add-admin`,
         method: "POST",
         body,
         }),
         invalidatesTags: ["USERS"],
      }),
   }),
});

export const {
  useGetProfileQuery,
  useGetUsersQuery,
  useDeleteUserMutation,
  usePromoteUserMutation,
} = userApi;
