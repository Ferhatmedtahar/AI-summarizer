import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./ArticleSlice.js";

export const store = configureStore({
  reducer: {
    [articleApi.reducerPath]: articleApi.reducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(articleApi.middleware),
});