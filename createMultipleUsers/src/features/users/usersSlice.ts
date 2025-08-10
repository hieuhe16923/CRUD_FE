// src/features/users/usersSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { User, UsersState } from "./types";
import { createUsersApi } from "../../services/userService";
import { AxiosError } from "axios"; // Import runtime
import type { AxiosError as AxiosErrorType } from "axios"; // Import type riêng

const initialState: UsersState = {
  tempUsers: [],
  tempUsers2: [], // thêm state mới
  loading: false,
  error: null,
  success: false,
};

export const createUsersThunk = createAsyncThunk<
  User[],
  User[],
  { rejectValue: string }
>("users/createUsers", async (users, { rejectWithValue }) => {
  try {
    await createUsersApi(users);
    return users; // Trả về luôn input để append vào state
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      const axiosErr = err as AxiosErrorType<{ message?: string }>;
      return rejectWithValue(axiosErr.response?.data?.message ?? "API error");
    }
    if (err instanceof Error) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue("Unknown error");
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addTempUser(state, action: PayloadAction<User>) {
      state.tempUsers2.push(action.payload);
      state.success = false;
      state.error = null;
    },
    removeTempUser(state, action: PayloadAction<number>) {
      state.tempUsers2.splice(action.payload, 1);
    },
    clearTempUsers(state) {
      state.tempUsers2 = [];
    },
    resetStatus(state) {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    setTempUsers(state, action: PayloadAction<User[]>) {
      state.tempUsers2 = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createUsersThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        createUsersThunk.fulfilled,
        (state, action: PayloadAction<User[]>) => {
          state.loading = false;
          state.error = null;
          state.success = true;
          // Thay vì gán hẳn, append thêm
          state.tempUsers = [...state.tempUsers, ...action.payload];
        }
      )

      .addCase(createUsersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Failed";
        state.success = false;
      });
  },
});

export const {
  addTempUser,
  removeTempUser,
  clearTempUsers,
  resetStatus,
  setTempUsers,
} = usersSlice.actions;
export default usersSlice.reducer;
