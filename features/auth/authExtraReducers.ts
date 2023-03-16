import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { InitialAuthStateType } from "./types";

import { Login, LogOut, Register } from "./authApi";

const authExtraReducers = (
  builder: ActionReducerMapBuilder<InitialAuthStateType>
) => {
  // =============LOGIN ======================
  builder.addCase(Login.pending, (state) => {
    state.userLoading = true;
  });
  builder.addCase(Login.rejected, (state) => {
    state.userLoading = false;
    state.user = null;
    state.accessToken = null;
    // Handling error pending
  });
  builder.addCase(Login.fulfilled, (state, action) => {
    state.userLoading = false;
    state.user = action.payload.user;
    state.accessToken = action.payload.accessToken;
  });
  // ==================LOGOUT ========================
  builder.addCase(LogOut.pending, (state) => {
    state.userLoading = true;
  });
  builder.addCase(LogOut.rejected, (state) => {
    // Handling error pending
  });
  builder.addCase(LogOut.fulfilled, (state, action) => {
    state.userLoading = false;
    state.user = null;
    state.accessToken = null;
    window.location.reload();
  });
  // =============Register ======================
  builder.addCase(Register.pending, (state) => {
    state.userLoading = true;
  });
  builder.addCase(Register.rejected, (state) => {
    state.userLoading = false;
    state.user = null;
    state.accessToken = null;
    // Handling error pending
  });
  builder.addCase(Register.fulfilled, (state, action) => {
    state.userLoading = false;
    state.user = action.payload.user;
    state.accessToken = action.payload.accessToken;
  });
};

export default authExtraReducers;
