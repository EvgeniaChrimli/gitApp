import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RepoType } from "./repoType";
import { chartHtunk } from "../components/Chart/chartThunk";

interface ReposLanguageType {
  [language: string]: number;
}

interface RepoPageState {
  repo: RepoType[];
  reposLanguage: ReposLanguageType;
  loading: boolean;
  error: string | null;
}

const initialState: RepoPageState = {
  repo: [],
  reposLanguage: {},
  loading: false,
  error: null,
};

const chartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(chartHtunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        chartHtunk.fulfilled,
        (state, action: PayloadAction<RepoType[]>) => {
          state.loading = false;
          state.repo = action.payload;

          const counts: ReposLanguageType = {};
          action.payload.forEach((repo) => {
            const lang = repo.language || "Unknown";
            counts[lang] = (counts[lang] || 0) + 1;
          });
          state.reposLanguage = counts;
        }
      )
      .addCase(chartHtunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});
export const {} = chartSlice.actions;
export default chartSlice.reducer;
