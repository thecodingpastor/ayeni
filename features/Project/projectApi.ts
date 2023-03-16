import { createAsyncThunk } from "@reduxjs/toolkit";
import { AddAlertMessage } from "../UI/UISlice";
import { AxiosInstance } from "axios";
import axios from "../../fetchConfig/api/axios";

const defaultErrorMessage = "Something went wrong, please try again later.";

export const GetAllProjects = createAsyncThunk(
  "project/GetAllProjectsAuth",
  async (userId: string, { dispatch, rejectWithValue }) => {
    try {
      const response = userId
        ? await axios.get("/projects/get?userId=" + userId)
        : await axios.get("/projects/get");

      return response.data.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message:
            err.response.data.message ||
            "Could not fetch projects at this time. Please try later",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const GetSingleProjectFromBackend = createAsyncThunk(
  "project/GetSingleProjectFromBackend",
  async (slug: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/projects/" + slug);
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

export const UpdateProject = createAsyncThunk(
  "project/UpdateProject",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.patch("/projects/", data);
      dispatch(
        AddAlertMessage({
          message: "Project updated successfully",
          type: "success",
        })
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message:
            err.response.data.message ||
            "Could not edit project at this time. Please try later",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const CreateProject = createAsyncThunk(
  "project/CreateProject",
  async (body: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/projects/", body);

      dispatch(
        AddAlertMessage({
          message: "Project created successfully",
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

export const DeleteProject = createAsyncThunk(
  "project/DeleteProject",
  async (slug: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete("/projects?slug=" + slug);
      dispatch(
        AddAlertMessage({
          message: response.data || "Project deleted successfully",
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

export const PublishAndUnpublishProject = createAsyncThunk(
  "project/PublishAndUnpublishProject",
  async (
    { slug, isPublished }: { slug: string; isPublished: boolean },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.put("/projects/publish", {
        slug,
        isPublished,
      });

      dispatch(
        AddAlertMessage({
          message: response.data.isPublished
            ? "Project published successfully"
            : "Project will no longer appear to the public",
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

export const DeleteImageFromCloud = createAsyncThunk(
  "project/DeleteImageFromCloud",
  async (data: any, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `/projects/delete-image?projectSlug=${data.projectSlug}&imageCloudId=${data.imageCloudId}`
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
