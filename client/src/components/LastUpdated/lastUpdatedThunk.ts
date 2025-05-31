import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RepoType } from "../../redux/repoType";

export const lastUpdatedThunk = createAsyncThunk<RepoType[]>(
  "repos/lastUpdatedThunk",
  async (_, thunkAPI) => {
    try {
      const responce = await fetch(
        `https://git-app-kappa.vercel.app/api/github/search/repositories?q=stars:>20000&sort=updated&order=desc&per_page=4`
      );
      if (!responce.ok) {
        return thunkAPI.rejectWithValue("Ошибка сервера");
      }
      const data = await responce.json();
      return data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при получении данных");
    }
  }
);
