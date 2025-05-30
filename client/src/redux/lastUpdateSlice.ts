import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RepoType } from "./repoType";
import { lastUpdatedThunk } from "../components/LastUpdated/lastUpdatedThunk";

interface LastUpdate {
  repo: RepoType[];
  loading: boolean;
  error: string | null;
}

const initialState: LastUpdate = {
  repo: [],
  loading: false,
  error: null,
};

const lastUpdate = createSlice({
  name: "update",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(lastUpdatedThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        lastUpdatedThunk.fulfilled,
        (state, action: PayloadAction<RepoType[]>) => {
          state.loading = false;
          state.repo = action.payload;
        }
      )
      .addCase(lastUpdatedThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});
export const {} = lastUpdate.actions;
export default lastUpdate.reducer;
