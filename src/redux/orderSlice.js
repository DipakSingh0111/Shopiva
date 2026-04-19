import { createSlice } from "@reduxjs/toolkit";

// Refresh hone par localStorage se purana data uthao
const savedOrders = JSON.parse(localStorage.getItem("myOrders")) || [];

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orderHistory: savedOrders,
  },
  reducers: {
    placeOrder: (state, action) => {
      const newOrder = {
        id: "ORD" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        }),
        status: "Placed", 
        ...action.payload,
      };
      state.orderHistory.unshift(newOrder); // Naya order sabse upar
      
      // Browser memory mein save karo
      localStorage.setItem("myOrders", JSON.stringify(state.orderHistory));
    },
    // Logout par data clear karne ke liye
    clearOrdersOnLogout: (state) => {
      state.orderHistory = [];
      localStorage.removeItem("myOrders");
    }
  },
});

export const { placeOrder, clearOrdersOnLogout } = orderSlice.actions;
export default orderSlice.reducer;
