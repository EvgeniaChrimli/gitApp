import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { allReposThunk } from "../components/AllRepos/allReposThunk";
import type { RepoType } from "./repoType";

interface HeroState {
  repos: RepoType[];
  selectedLanguage: string;
  favorite: RepoType[];
  loading: boolean;
  error: string | null;
}

const initialState: HeroState = {
  repos: [],
  favorite: [],
  selectedLanguage: "All",
  loading: false,
  error: null,
};

const allReposSlice = createSlice({
  name: "allrepos",
  initialState,
  reducers: {
    addToFavorite(state, action: PayloadAction<number>) {
      const favorites = state.repos.find((item) => item.id === action.payload);
      if (
        favorites &&
        !state.favorite.some((item) => item.id === favorites.id)
      ) {
        state.favorite.push(favorites);
      }
      localStorage.setItem("like", JSON.stringify(state.favorite));
    },
    initFavorite(state, action) {
      state.favorite = action.payload;
    },
    removeFavorite(state, action: PayloadAction<number>) {
      const update = state.favorite.filter(
        (item) => item.id !== action.payload
      );
      state.favorite = update;
      localStorage.setItem("like", JSON.stringify(state.favorite));
    },
    setSelectedLanguage(state, action) {
      state.selectedLanguage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(allReposThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        allReposThunk.fulfilled,
        (state, action: PayloadAction<RepoType[]>) => {
          state.loading = false;
          state.repos = action.payload;
        }
      )
      .addCase(allReposThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});

export const {
  addToFavorite,
  initFavorite,
  removeFavorite,
  setSelectedLanguage,
} = allReposSlice.actions;
export default allReposSlice.reducer;
