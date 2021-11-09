import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

  // Create Order
  export const createOrder = createAsyncThunk('order/createOrder', async(order) =>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post("/api/v1/order/new", order, config);
      return data;
   });

   // My Order
   export const myOrder = createAsyncThunk('order/myOrder', async() =>{
    const { data } = await axios.get("/api/v1/orders/me");
    console.log(data);
      return data;
   });

    // Order Details
    export const orderDetails = createAsyncThunk('order/orderDetails', async(id) =>{
        const { data } = await axios.get(`/api/v1/order/${id}`);
          return data;
       });

        // Get All Orders -- ADMIN
    export const getAllOrders = createAsyncThunk('order/getAllOrders', async() =>{
      const { data } = await axios.get("/api/v1/admin/orders");
      return data;
     });

        // Update Order -- ADMIN
    export const updateOrder = createAsyncThunk('order/updateOrder', async(id,order) =>{
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        `/api/v1/admin/order/${id}`,
        order,
        config
      );      
      return data;
     });

     // Delete Order -- ADMIN
    export const deleteOrder = createAsyncThunk('order/deleteOrder', async(id) =>{
      const { data } = await axios.delete(`/api/v1/admin/order/${id}`);      
      return data;
     });

       
  const orderSlice = createSlice({
    name:"order",
    initialState:{
      orders: [],
      order: {},
      status: 'idle',
      error: null,
      loading: false,
      success: null,
      isUpdated: false,
      isDeleted: false
    },
    reducers:{
      clearErrors: (state) => {
        return {
          ...state,
          error: null
        }
      },
      updateOrderReset: (state) => {
        return {
          ...state,
          isUpdated: false
        }
      },
      deleteOrderReset: (state) => {
        return {
          ...state,
          isUpdated: false
        }
      }
    },
    extraReducers: {
  
      // Create Order
      [createOrder.pending]: (state) => {
        state.status = 'loading';
        state.error = null;
        state.loading = true;
      },
      [createOrder.fulfilled]: (state,action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.error = null;
        state.order = action.payload;
      },
      [createOrder.rejected]: (state, action) => {
        state.status = 'failed';
        state.loading = false;
        state.error = action.error.message;
      },

      // My Order
      [myOrder.pending]: (state) => {
        state.status = 'loading';
        state.error = null;
     
      },
      [myOrder.fulfilled]: (state,action) => {
        state.status = 'succeeded';
        state.error = null;
        state.orders = action.payload.orders;
      },
      [myOrder.rejected]: (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      },

         // Order Details
         [orderDetails.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
            state.loading = true;
          },
          [orderDetails.fulfilled]: (state, action) => {
            state.status = 'succeeded';
            state.loading = false;
            state.error = null;
            state.order = action.payload.order;
          },
          [orderDetails.rejected]: (state, action) => {
            state.status = 'failed';
            state.loading = false;
            state.error = action.error.message;
          },

           // get All Orders --- ADMIN
         [getAllOrders.pending]: (state) => {
          state.status = 'loading';
          state.error = null;
          state.loading = true;
        },
        [getAllOrders.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.loading = false;
          state.error = null;
          state.orders = action.payload.orders;
        },
        [getAllOrders.rejected]: (state, action) => {
          state.status = 'failed';
          state.loading = false;
          state.error = action.error.message;
        },

            // Update Order--- ADMIN
            [updateOrder.pending]: (state) => {
              state.status = 'loading';
              state.error = null;
              state.loading = true;
            },
            [updateOrder.fulfilled]: (state, action) => {
              state.status = 'succeeded';
              state.loading = false;
              state.error = null;
              state.isUpdated = action.payload.success;
            },
            [updateOrder.rejected]: (state, action) => {
              state.status = 'failed';
              state.loading = false;
              state.error = action.error.message;
            },

                 // Delete Order--- ADMIN
                 [deleteOrder.pending]: (state) => {
                  state.status = 'loading';
                  state.error = null;
                  state.loading = true;
                },
                [deleteOrder.fulfilled]: (state, action) => {
                  state.status = 'succeeded';
                  state.loading = false;
                  state.error = null;
                  state.isDeleted = action.payload.success;
                },
                [deleteOrder.rejected]: (state, action) => {
                  state.status = 'failed';
                  state.loading = false;
                  state.error = action.error.message;
                },
    }
});

export const {clearErrors,updateOrderReset,deleteOrderReset} = orderSlice.actions;
export default orderSlice.reducer;