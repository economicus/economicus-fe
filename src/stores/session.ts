import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import login from "../apis/login";

export interface CounterState {
  // value: number;

  loading: boolean;
  error: boolean;

  isLoggedin: boolean;
  token: string;
}

const initialState: CounterState = {
  // value: 0,
  // user: {

  // } // NOTE: 아직 axios에서 links롤 통해 다른 요청을 받아오는 법을 모른다. 추후 추가 필요

  isLoggedin: false,
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
>("user/login", async ({ email, password }, { rejectWithValue }) => {
  // NOTE: 추후 수정 필요
  try {
    const response = await login(email, password);
    if (response instanceof Error) throw response;
    return response;
  } catch (e) {
    return rejectWithValue("loginThunk: Error");
  }
});

export const counterSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logout: () => initialState, // NOTE: 이렇게 자체를 바꿔도 되나? 안될것같은데...
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        // 호출 전
        state.loading = true;

        state.isLoggedin = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        // 성공
        state.loading = false;
        state.error = false;

        state.isLoggedin = true;
        state.token = payload.access_token;
      })
      .addCase(loginThunk.rejected, (state) => {
        // 실패
        state.loading = false;
        state.error = true;

        state.isLoggedin = false;
        state.token = "";
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = counterSlice.actions;

export default counterSlice.reducer;
