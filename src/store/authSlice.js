import { createSlice } from "@reduxjs/toolkit";

let user = null;

(() => {
  if (localStorage.getItem("user") !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  }
})();
const iniState = {
  name: "auth",
  user: user,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: iniState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
