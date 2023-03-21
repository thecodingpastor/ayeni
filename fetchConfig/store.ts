import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import UIREducer from "../features/UI/UISlice";
import ProjectReducer from "../features/Project/projectSlice";
import AuthReducer from "../features/auth/authSlice";
import BlogReducer from "../features/Blog/BlogSlice";

export const store = configureStore({
  reducer: {
    UI: UIREducer,
    auth: AuthReducer,
    project: ProjectReducer,
    blog: BlogReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppDispatch: () => AppDispatch = useDispatch;
