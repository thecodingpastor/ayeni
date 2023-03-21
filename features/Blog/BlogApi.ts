import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddAlertMessage } from "../UI/UISlice";
import axios from "../../fetchConfig/api/axios";

const defaultErrorMessage = "Something went wrong, please try again later.";

export const GetAllBlogs = createAsyncThunk(
  "blog/GetAllBlogs",
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = userId
        ? await axios.get("/blogs/get?userId=" + userId)
        : await axios.get("/blogs/get");

      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const CreateBlog = createAsyncThunk(
  "blog/CreateBlog",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/blogs", data);

      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const UpdateBlog = createAsyncThunk(
  "blog/UpdateBlog",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch("/blogs", data);
      dispatch(
        AddAlertMessage({
          message: "Blog updated successfully",
          type: "success",
        })
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const DeleteBlog = createAsyncThunk(
  "blog/DeleteBlog",
  async (slug: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete("/blogs?slug=" + slug);
      dispatch(
        AddAlertMessage({
          message: "Blog deleted",
          type: "success",
        })
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const GetSingleBlogFromBackend = createAsyncThunk(
  "blog/GetSingleBlogFromBackend",
  async (slug: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/blogs/" + slug);
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message:
            err.response.data.message ||
            "Could not fetch project at this time. Please try later",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const PublishAndUnpublishBlog = createAsyncThunk(
  "blog/PublishAndUnpublishBlog",
  async (
    { slug, isPublished }: { slug: string; isPublished: boolean },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.put("/blogs/publish", {
        slug,
        isPublished,
      });

      dispatch(
        AddAlertMessage({
          message: response.data.isPublished
            ? "Blog published successfully"
            : "Blog will no longer appear to the public",
          type: "success",
        })
      );

      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const DeleteBlogImageFromCloud = createAsyncThunk(
  "blog/DeleteBlogImageFromCloud",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/delete-image?model=blog&slug=${data.slug}&imageCloudId=${data.imageCloudId}`
      );
      dispatch(
        AddAlertMessage({
          message: "Image deleted successfully",
          type: "success",
        })
      );

      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message: err.response.data.message || defaultErrorMessage,
        })
      );
      return rejectWithValue(err);
    }
  }
);
