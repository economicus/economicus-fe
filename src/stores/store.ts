import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { counterSlice } from "./session";

export const store = configureStore({
  reducer: {
    user: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
