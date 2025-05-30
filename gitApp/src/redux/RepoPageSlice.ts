import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { repoPageThunk } from "../components/RepoPage/RepoPageThunk";
import type { RepoType } from "./repoType";

interface RepoPageState {
  repo: RepoType | null;
  loading: boolean;
  error: string | null;
}

const initialState: RepoPageState = {
  repo: null,
  loading: false,
  error: null,
};

const RepoPageSlice = createSlice({
  name: "repoPage",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(repoPageThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        repoPageThunk.fulfilled,
        (state, action: PayloadAction<RepoType>) => {
          state.loading = false;
          state.repo = action.payload;
        }
      )
      .addCase(repoPageThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Что-то пошло не так";
      });
  },
});
export const {} = RepoPageSlice.actions;
export default RepoPageSlice.reducer;
