import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RepoType } from "../../redux/repoType";

export const chartHtunk = createAsyncThunk<RepoType[]>(
  "repos/fetchDetailed",
  async (_, thunkAPI) => {
    try {
      const responce = await fetch(
        `https://git-app-kappa.vercel.app/api/github/search/repositories`
      );
      if (!responce.ok) {
        return thunkAPI.rejectWithValue("Ошибка сервера");
      }
      const data = await responce.json();
      console.log(data.items);
      return data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при получении данных");
    }
  }
);
