import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./Product/productSlice";
import userReducer from "./User/userSlice";
import cartReducer from "./cart/cartSlice";
import orderReducer from "./order/orderSlice";

export const store = configureStore({
  reducer: {
    productsReducer,
    userReducer,
    cartReducer,
    orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});