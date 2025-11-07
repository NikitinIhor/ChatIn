import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    name: string | null;
    email: string | null;
  };
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  isRefreshing: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: {
    name: null,
    email: null,
  },
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
  extraReducers: (builder) => {},
});

export const authReducer = authSlice.reducer;
