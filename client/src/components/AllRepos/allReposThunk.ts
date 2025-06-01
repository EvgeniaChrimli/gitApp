import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RepoType } from "../../redux/repoType";

interface ThyunkArg {
  page: number;
  per_page: number;
}

export const allReposThunk = createAsyncThunk<RepoType[], ThyunkArg>(
  "repos/fetchDetailed",
  async ({ page, per_page }, thunkAPI) => {
    try {
      const responce = await fetch(
        `/api/github/search/repositories?q=stars:>1&sort=stars&order=desc&page=${page}&per_page=${per_page}`
      );
      if (!responce.ok) {
        return thunkAPI.rejectWithValue(
          "Ошибка при получении списка репозиториев"
        );
      }
      const data = await responce.json();

      return data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при получении данных");
    }
  }
);
