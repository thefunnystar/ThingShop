import { createSlice } from "@reduxjs/toolkit";

let cartCount = 0;
let items = [];
items.length = 0;

(() => {
  if (localStorage.getItem("cart")) {
    cartCount = Number(localStorage.getItem("cartCount"));
    items = JSON.parse(localStorage.getItem("cart"));
  } else {
    items = [];
    items.length = 0;
  }
})();
const iniState = {
  name: "cart",
  cartCount: cartCount,
  items: items,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: iniState,
  reducers: {
    add: (state, action) => {
      const item = action.payload.item;
      let prevItems = state.items;
      console.log(state.cart.length);
      prevItems = [...prevItems, item];
      state.items = prevItems;
      state.cartCount = prevItems.length;

      localStorage.setItem("cart", JSON.stringify(prevItems));
      localStorage.setItem("cartCount", prevItems.length);
    },
  },
});

export const { add } = cartSlice.actions;

export default cartSlice.reducer;
