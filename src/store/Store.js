import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";
import LoaderReducer from "./LoaderSlice";
import PostReducer from "./PostSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    loader: LoaderReducer,
    post: PostReducer
  },
})