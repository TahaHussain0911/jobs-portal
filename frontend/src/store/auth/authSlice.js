import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
  accessToken: null,
  user: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    saveLoginData(state, action) {
      state.isLogin = true;
      state.accessToken = action.payload.token;
      state.user = action.payload.user;
    },
    saveAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    saveUserData(state, action) {
      state.user = action.payload;
    },
    logoutUser(state, action) {
      state.isLogin = false;
      state.accessToken = null;
      state.user = null;
    },
  },
});

export const { saveLoginData, saveAccessToken, logoutUser, saveUserData } =
  authSlice.actions;
export default authSlice.reducer;
