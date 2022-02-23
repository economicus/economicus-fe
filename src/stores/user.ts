import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import login, { tmpRet } from "../apis/login";

export interface CounterState {
  // value: number;

  isloggedin: boolean;
  token: string;
  loading: boolean;
}

const initialState: CounterState = {
  // value: 0,

  isloggedin: false,
  token: "",
  loading: false, // NOTE: 로딩이 여기에 필요할까?
};

export const loginThunk = createAsyncThunk<
  {
    access_token: string;
    refresh_token: string;
  },
  { email: string; password: string },
  { rejectValue: string }
>("user/login", async (params, thunkAPI) => {
  // NOTE: 추후 수정 필요
  try {
    const { email, password } = params;
    return await login(email, password);
  } catch (e) {
    thunkAPI.rejectWithValue("tmp error");
  }
});

export const counterSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        // 호출 전

        state.loading = true;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        // 성공

        state.loading = false;
        state.isloggedin = true;
        state.token = payload.access_token;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
