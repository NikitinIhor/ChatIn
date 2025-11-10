import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { handleThunkError } from "../utils";

export const getAllUsers = createAsyncThunk(
  "users/getAll",
  async (search: string | undefined, thunkAPI) => {
    try {
      const state = thunkAPI.getState() as any;
      const token = state.auth.token;

      const res = await axios.get(
        `/chat/users${search ? `?search=${search}` : ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.data;
    } catch (error) {
      return handleThunkError(error, thunkAPI);
    }
  }
);
