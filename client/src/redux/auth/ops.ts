import axios from "axios";

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  clearAuthHeader,
  handleThunkError,
  setAuthHeader,
  URL,
} from "../utils";
import type {
  RefreshUserResponse,
  SigninCredentials,
  SigninResponse,
  SignupCredentials,
} from "./types";

axios.defaults.baseURL = URL;

export const signup = createAsyncThunk<
  SigninResponse,
  SignupCredentials,
  { rejectValue: string }
>("auth/signup", async (credentials, thunkAPI) => {
  try {
    await axios.post("/auth/signup", credentials);

    const signinPayload = {
      email: credentials.email,
      password: credentials.password,
    };

    const res = await axios.post("/auth/signin", signinPayload);

    setAuthHeader(res.data.data.accessToken);

    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const signin = createAsyncThunk<
  SigninResponse,
  SigninCredentials,
  { rejectValue: string }
>("auth/signin", async (credentials, thunkAPI) => {
  try {
    const res = await axios.post("/auth/signin", credentials);

    setAuthHeader(res.data.data.accessToken);

    return res.data;
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});

export const refresh = createAsyncThunk<RefreshUserResponse>(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const res = await axios.post("/auth/refresh");

      setAuthHeader(res.data.data.accessToken);

      return res.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);

export const signout = createAsyncThunk("auth/signout", async (_, thunkAPI) => {
  try {
    await axios.post("/auth/signout");

    clearAuthHeader();
  } catch (error) {
    return handleThunkError(error, thunkAPI);
  }
});
