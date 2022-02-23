import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

import login, { tmpRet } from "../apis/login";

export interface CounterState {
  // value: number;

  isloggedin: boolean;
  token: string;
  loading: boolean;
  error: boolean;
}

const initialState: CounterState = {
  // value: 0,
  // user: {

  // } // NOTE: 아직 axios에서 links롤 통해 다른 요청을 받아오는 법을 모른다. 추후 추가 필요

  isloggedin: false,
  token: "",
  loading: false, // NOTE: 로딩이 여기에 필요할까?
  error: false,
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
    const response = await login(email, password);
    console.log("res", response);
    return response;
  } catch (e) {
    console.log("error!!!!!!!!");
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
        console.log("hello???????", payload);

        state.error = false;
        state.loading = false;
        state.isloggedin = true;
        state.token = payload.access_token;
      })
      .addCase(loginThunk.rejected, (state) => {
        // 실패
        state.error = true;
      });
  },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
