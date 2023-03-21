import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";

import {
  CreateBlog,
  DeleteBlog,
  DeleteBlogImageFromCloud,
  GetAllBlogs,
  GetSingleBlogFromBackend,
  PublishAndUnpublishBlog,
  UpdateBlog,
} from "./BlogApi";
import { InitialBlogStateType } from "./types";

const BlogExtraReducers = (
  builder: ActionReducerMapBuilder<InitialBlogStateType>
) => {
  // ============= GetAllBlogs ======================
  builder.addCase(GetAllBlogs.pending, (state) => {
    state.blogLoading = "default";
  });
  builder.addCase(GetAllBlogs.rejected, (state) => {
    state.blogLoading = null;
  });
  builder.addCase(GetAllBlogs.fulfilled, (state, action) => {
    state.blogLoading = null;
    state.blogs = action.payload;
  });
  // ============= CreateBlog ======================
  builder.addCase(CreateBlog.pending, (state) => {
    state.blogLoading = "default";
  });
  builder.addCase(CreateBlog.rejected, (state) => {
    state.blogLoading = null;
  });
  builder.addCase(CreateBlog.fulfilled, (state, action) => {
    state.blogLoading = null;
    state.blogs.unshift(action.payload);
  });
  // ============= UpdateBlog ======================
  builder.addCase(UpdateBlog.pending, (state) => {
    state.blogLoading = "default";
  });
  builder.addCase(UpdateBlog.rejected, (state) => {
    state.blogLoading = null;
  });
  builder.addCase(UpdateBlog.fulfilled, (state, action) => {
    state.blogLoading = null;
    state.blogs = state.blogs.map((blog) =>
      blog?._id === action.payload?._id ? action.payload : blog
    );
  });
  // ============= DeleteBlog ======================
  builder.addCase(DeleteBlog.pending, (state) => {
    state.blogLoading = "default";
  });
  builder.addCase(DeleteBlog.rejected, (state) => {
    state.blogLoading = null;
  });
  builder.addCase(DeleteBlog.fulfilled, (state, action) => {
    state.blogLoading = null;
    state.blogs = state.blogs.filter((blog) => blog?.slug !== action.meta.arg);
    state.currentBlog = null;
  });
  // ============= GetSingleBlogFromBackend ======================
  builder.addCase(GetSingleBlogFromBackend.pending, (state) => {
    state.blogLoading = "default";
  });
  builder.addCase(GetSingleBlogFromBackend.rejected, (state) => {
    state.blogLoading = null;
  });
  builder.addCase(GetSingleBlogFromBackend.fulfilled, (state, action) => {
    state.blogLoading = null;
    state.currentBlog = action.payload;
  });
  // ============= PublishAndUnpublishBlog ======================
  builder.addCase(PublishAndUnpublishBlog.pending, (state) => {
    state.blogLoading = "default";
  });
  builder.addCase(PublishAndUnpublishBlog.rejected, (state) => {
    state.blogLoading = null;
  });
  builder.addCase(
    PublishAndUnpublishBlog.fulfilled,
    (state, action: PayloadAction<{ _id: string; isPublished: boolean }>) => {
      state.blogLoading = null;
      state.currentBlog = {
        ...state.currentBlog,
        isPublished: action.payload.isPublished,
      };
    }
  );
  // ============= DeleteImageFromCloud ======================
  builder.addCase(DeleteBlogImageFromCloud.pending, (state, action) => {
    state.blogLoading = "delete-image";
  });
  builder.addCase(DeleteBlogImageFromCloud.rejected, (state) => {
    state.blogLoading = null;
  });
  builder.addCase(DeleteBlogImageFromCloud.fulfilled, (state, action) => {
    state.blogLoading = null;
    console.log(action);

    state.blogs =
      state.blogs.length > 0
        ? state.blogs.map((project) =>
            project.slug === action.meta.arg.slug
              ? { ...action.payload }
              : project
          )
        : [];
    state.currentBlog = action.payload;
  });
};

export default BlogExtraReducers;
