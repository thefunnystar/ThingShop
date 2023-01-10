import { createSlice } from "@reduxjs/toolkit";

const iniState = {
  user: "",
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: iniState,
  reducers: {
    update: (state, action) => {
      console.log({ action });
      return action.payload;
    },
  },
});

export const { update } = cartSlice.actions;

export default cartSlice.reducer;
