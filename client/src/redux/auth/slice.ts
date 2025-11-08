import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { refresh, signin, signout, signup } from "./ops";

interface User {
  username: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  isRefreshing: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = {
          username: action.payload.user.username,
          email: action.payload.user.email,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      })
      .addCase(signin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.user = {
          username: action.payload.user.username,
          email: action.payload.user.email,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      })
      .addCase(refresh.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.isRefreshing = false;
        state.token = action.payload.token;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.isRefreshing = false;
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      })
      .addCase(signout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signout.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        state.token = null;
        state.user = null;
        state.isLoggedIn = false;
      })
      .addCase(signout.rejected, (state, action) => {
        state.error =
          typeof action.payload === "string" ? action.payload : "Unknown error";
      });
  },
});

export const selectLoading = (state: RootState) => state.auth.loading;
export const selectError = (state: RootState) => state.auth.error;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsRefreshing = (state: RootState) => state.auth.isRefreshing;

export const authReducer = authSlice.reducer;
