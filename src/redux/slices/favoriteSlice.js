import { createSlice } from "@reduxjs/toolkit";

const getFavoriteFromLocalStorage = () => {
   const storedFavorite = localStorage.getItem("favorite");
   return storedFavorite ? JSON.parse(storedFavorite) : [];
}

const initialState = {
   favorite: getFavoriteFromLocalStorage(),
};

const favoriteSlice = createSlice({
   name: "favorite",
   initialState,
   reducers: {
      addToFavorite: (state, action) => {
         const existingProduct = state.favorite.find((product) => product.id === action.payload.id);

         if (existingProduct) {
            existingProduct;
         } else {
            state.favorite.push({...action.payload, likes: 1});
         }
         localStorage.setItem("favorite", JSON.stringify(state.favorite));
      },

      deleteFavorite: (state, action) => {
         const filteredFavorite = state.favorite.filter((product) => product.id !== action.payload.id);

         state.favorite = filteredFavorite;
         localStorage.setItem("favorite", JSON.stringify(state.favorite));
      },
   },
});

export const { addToFavorite, deleteFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;