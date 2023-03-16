import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../fetchConfig/api/axios";
import { AddAlertMessage } from "../UI/UISlice";
import { LoginUserParams } from "./types";

export const Login = createAsyncThunk(
  "auth/Login",
  async (body: LoginUserParams, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/login", body, {
        withCredentials: true,
      });
      dispatch(
        AddAlertMessage({ message: "Logged in successfully", type: "success" })
      );
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message:
            err.response.data.message ||
            "Something went wrong with the Login. Please try again.",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const LogOut = createAsyncThunk(
  "auth/LogOut",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get("/auth/logout", {
        withCredentials: true,
      });

      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message:
            err.response.data.message ||
            "Something went wrong with Logging out. Please try again.",
        })
      );
      return rejectWithValue(err);
    }
  }
);

export const Register = createAsyncThunk(
  "auth/Register",
  async (body: LoginUserParams, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post("/auth/sign-up", body);
      return response.data;
    } catch (err: any) {
      dispatch(
        AddAlertMessage({
          message:
            err.response.data.message ||
            "Something went wrong with Registering. Please try again.",
        })
      );
      return rejectWithValue(err);
    }
  }
);
