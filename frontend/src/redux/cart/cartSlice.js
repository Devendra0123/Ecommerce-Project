import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


// Add Items to Cart
export const addItemsToCart = createAsyncThunk('cart/addCartProduct', async(item) =>{
    const {id, quantity} = item;
 
    const { data } = await axios.get(`/api/v1/product/${id}`);
    
    const payload = {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
    }
 
    return payload;
  });

  // Remove Items From Cart
  export const removeItemsFromCart = createAsyncThunk('cart/removeCartProduct', async(id) =>{
   return id;
  });

  // Save Shippinng info
  export const saveShippingInfo = createAsyncThunk('cart/shaveShippingInfo', async(data) =>{
    return data;
   });

  const cartSlice = createSlice({
    name:"cart",
    initialState:{
     cartItems: [],
     shippingInfo: {},
      status: 'idle',
      error: null,
      loading: false,
      success: null,
    },
    reducers:{
      clearErrors: (state) => {
        return {
          ...state,
          error: null
        }
      }
    },
    extraReducers: {
  
      //Get All Products
      [addItemsToCart.pending]: (state) => {
        state.status = 'loading';
        state.error = null;
        state.loading = true;
      },
      [addItemsToCart.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        const item = action.payload;

        const isItemExist = state.cartItems.find(
          (i) => i.product === item.product
        );

        if (isItemExist) {
    
            state.cartItems = state.cartItems.map((i) =>
              i.product === isItemExist.product ? item : i
            )
          
        } else {
         
            state.cartItems = [...state.cartItems, item]
          
        }
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      },
      [addItemsToCart.rejected]: (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      },

      // Remove Items From Cart
      [removeItemsFromCart.pending]: (state) => {
        state.status = 'loading';
        state.error = null;
        state.loading = true;
      },
      [removeItemsFromCart.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      },
      [removeItemsFromCart.rejected]: (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      },

      // Save Shipping Info
      [saveShippingInfo.pending]: (state) => {
        state.status = 'loading';
        state.error = null;
        state.loading = true;
      },
      [saveShippingInfo.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        state.shippingInfo = action.payload;
        localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
      },
      [saveShippingInfo.rejected]: (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      },
    }
});

export const {clearErrors} = cartSlice.actions;
export default cartSlice.reducer;