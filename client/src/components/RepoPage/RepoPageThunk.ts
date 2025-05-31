import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RepoType } from "../../redux/repoType";

interface ThunkArgs {
  owner: string;
  repo: string;
}
export const repoPageThunk = createAsyncThunk<RepoType, ThunkArgs>(
  "/repo/fetchOwnRepo",
  async ({ owner, repo }, thunkAPI) => {
    try {
      const res = await fetch(
        `https://git-app-kappa.vercel.app/api/github/repos/${owner}/${repo}`
      );
      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          "Ошибка при получении списка репозиториев"
        );
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ошибка при получении данных");
    }
  }
);
