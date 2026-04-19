import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import cartSlice from "./cartSlice";
import orderReducer from "./orderSlice";

const store = configureStore({
  reducer: {
    counter: counterSlice,
    cart: cartSlice,
    orders: orderReducer
  },
});

export default store;
