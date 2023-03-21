import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import BlogExtraReducers from "./BlogExtraReducers";
import { RootState } from "../../fetchConfig/store";
import { InitialBlogStateType, SingleBlogType } from "./types";

const prevBlog =
  (typeof window !== "undefined" &&
    JSON.parse(localStorage.getItem("draft_blog"))) ||
  null;

const initialState: InitialBlogStateType = {
  blogs: [],
  blogLoading: null,
  currentBlog: null,
  draftBlog: {
    title: prevBlog?.title || "",
    estimatedReadTime: prevBlog?.estimatedReadTime || "",
    intro: prevBlog?.intro || "",
    mainContent: prevBlog?.mainContent || "",
    images: prevBlog?.images || [],
    tags: prevBlog?.tags || [],
  },
};

export const BlogSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    ClearAllProjects: (state) => {
      state.blogs = [];
    },
    SetCurrentBlog: (state, action) => {
      state.currentBlog = action.payload;
    },
    GetCurrentBlog: (state, action: PayloadAction<string>) => {
      if (state.blogs.length > 0) {
        state.currentBlog =
          state.blogs.find(
            (p) => p.slug === action.payload || p._id === action.payload
          ) || null;
      }
    },
    SetDraftBlog: (state, action: PayloadAction<SingleBlogType>) => {
      state.draftBlog = action.payload;
    },
  },
  extraReducers: BlogExtraReducers,
});

export const {
  ClearAllProjects,
  SetDraftBlog,
  SetCurrentBlog,
  GetCurrentBlog,
} = BlogSlice.actions;

export const SelectBlog = (state: RootState) => state.blog;
export default BlogSlice.reducer;
