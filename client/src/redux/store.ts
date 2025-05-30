import { configureStore } from "@reduxjs/toolkit";
import allReposReducer from "./allReposSlice";
import RepoPageReducer from "./RepoPageSlice";
import charReducer from "./chartSlice";
import lastUpdateReducer from "./lastUpdateSlice";

export const store = configureStore({
  reducer: {
    allReposSlice: allReposReducer,
    RepoPageSlice: RepoPageReducer,
    chartSlice: charReducer,
    lastUpdateSlice: lastUpdateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
