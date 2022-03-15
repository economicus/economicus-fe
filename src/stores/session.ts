import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import login from "../apis/login";

export interface SessionState {
  loading: boolean;
  error: boolean;

  isLoggedin: boolean;
  token: string;
}

const initialState: SessionState = {
  loading: false, // NOTE: 로딩이 여기에 필요할까?
  error: false,

  isLoggedin: false,
  token: "",

  // user: {
  // } // NOTE: 아직 axios에서 links롤 통해 다른 요청을 받아오는 법을 모른다. 추후 추가 필요
};

export const loginThunk = createAsyncThunk<
  {
    access_token: string;
    refresh_token: string;
  },
  { email: string; password: string },
  { rejectValue: string }
>("session/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const response = await login(email, password);
    if (response instanceof Error) throw response;
    return response;
  } catch (e) {
    return rejectWithValue("loginThunk: Error");
  }
});

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    logout: () => initialState, // NOTE: 이렇게 자체를 바꿔도 되나? 추후 확인 필요
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

        alert("이메일 혹은 비밀번호를 확인해주세요.");
      });
  },
});

// Action creators are generated for each case reducer function
export const { logout } = sessionSlice.actions;

export default sessionSlice.reducer;
