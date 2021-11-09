import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// Get All Products
export const fetchProducts = createAsyncThunk('fetchProducts', async (productData) => {
  const {keyword, currentPage, price, ratings, category} = productData;

  let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

  if (category) {
    if(category==="All"){
     link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    }else{
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
  }

  const { data } = await axios.get(link);

 return data;
});

// Get Product Details
export const productDetails = createAsyncThunk('product/productDetails', async(id) =>{
  const {data} = await axios.get(`/api/v1/product/${id}`);
  return data;
});

// Get All Review Of A PRODUCT
export const getAllReviews = createAsyncThunk('product/getAllReviws', async(id) =>{
  const {data} = await axios.get(`/api/v1/reviews?id=${id}`);
  return data;
});

// New Review
export const newReview = createAsyncThunk('product/newReview', async(reviewData) =>{

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.put(`/api/v1/review`, reviewData, config);
  return data;
});

// Get All Products --- ADMIN
export const getAdminProducts = createAsyncThunk('product/getAdminProducts', async() =>{

  const { data } = await axios.get("/api/v1/admin/products");

  return data;
});

// Create Product --- ADMIN
export const createProduct = createAsyncThunk('product/createProduct', async(productData) =>{

  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.post(
    `/api/v1/admin/product/new`,
    productData,
    config
  );
  return data;
});


// Update Product --- ADMIN
export const updateProduct = createAsyncThunk('product/updateProduct', async(productInfo) =>{
  const {productId, productData} = productInfo;
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const { data } = await axios.put(
    `/api/v1/product/${productId}`,
    productData,
    config
  );
  return data;
});

// Delete Product --- ADMIN
export const deleteProduct = createAsyncThunk('product/deleteProduct', async(id) =>{

  const { data } = await axios.delete(`/api/v1/product/${id}`);

  return data;
});

// Delete Review oF a Product --- ADMIN
export const deleteReviews = createAsyncThunk('product/deleteReviews', async(reviewId,productId) =>{

  const { data } = await axios.delete(
    `/api/v1/reviews?id=${reviewId}&productId=${productId}`
  );
  return data;
});


const productsSlice = createSlice({
  name:"projects",
  initialState:{
    products: [],
    product:{},
    reviews: [],
    productsCount: 0,
    resultPerPage: 0,
    filteredProductsCount: 0,
    productDetails: {},
    productReviews: [],
    status: 'idle',
    error: null,
    loading: false,
    success: null,
    isDeleted: false,
    isUpdated: false
  },
  reducers:{
    getAllProducts:(state)=>state.products,
    clearErrors: (state) => {
      return {
        ...state,
        error: null
      }
    },
    newReviewReset: (state) => {
      return {
        ...state,
        success: false,
      }
    },
    deleteReviewReset: (state) => {
      return {
        ...state,
        isDeleted: false,
      }
    },
    updateProductReset: (state) => {
      return {
        ...state,
        isUpdated: false,
      }
    },
    deleteProductReset: (state) => {
      return {
        ...state,
        isDeleted: false,
      }
    },
    newProductReset: (state) => {
      return {
        ...state,
        success: false,
      }
    }
  },
  extraReducers: {

    //Get All Products
    [fetchProducts.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.status = 'succeeded'
     state.products = action.payload.products;
     state.productsCount = action.payload.productsCount;
     state.resultPerPage = action.payload.resultPerPage;
     state.filteredProductsCount = action.payload.filteredProductsCount
    },
    [fetchProducts.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },

    // Product Details
    [productDetails.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
      state.loading = true;
    },
    [productDetails.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
     state.product = action.payload.product;
    },
    [productDetails.rejected]: (state, action) => {
      state.loading = false;
      state.status = 'failed';
      state.error = action.error.message;
    },

    // Get All Reviews
    [getAllReviews.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
      state.loading = true;
    },
    [getAllReviews.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
     state.reviews = action.payload.reviews;
     
    },
    [getAllReviews.rejected]: (state, action) => {
      state.loading = false;
      state.status = 'failed';
      state.error = action.error.message;
    },

    // New Review
    [newReview.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
      state.loading = true;
    },
    [newReview.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
     state.success = action.payload.success;
     
    },
    [newReview.rejected]: (state, action) => {
      state.loading = false;
      state.status = 'failed';
      state.error = action.error.message;
    },

       // Get All Products --- ADMIN
       [getAdminProducts.pending]: (state) => {
        state.status = 'loading';
        state.error = null;
        state.loading = true;
      },
      [getAdminProducts.fulfilled]: (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
       state.products = action.payload.products;
       
      },
      [getAdminProducts.rejected]: (state, action) => {
        state.loading = false;
        state.status = 'failed';
        state.error = action.error.message;
      },

         // Create Product --- ADMIN
         [createProduct.pending]: (state) => {
          state.status = 'loading';
          state.error = null;
          state.loading = true;
        },
        [createProduct.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.loading = false;
         state.product = action.payload.product;
         state.success = action.payload.success;
        },
        [createProduct.rejected]: (state, action) => {
          state.loading = false;
          state.status = 'failed';
          state.error = action.error.message;
        },

        // Delete Product --- ADMIN
        [deleteProduct.pending]: (state) => {
          state.status = 'loading';
          state.error = null;
          state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.loading = false;
         state.isDeleted = action.payload.success
        },
        [deleteProduct.rejected]: (state, action) => {
          state.loading = false;
          state.status = 'failed';
          state.error = action.error.message;
        },

        
        // Update Product --- ADMIN
        [updateProduct.pending]: (state) => {
          state.status = 'loading';
          state.error = null;
          state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.loading = false;
         state.isUpdated = action.payload.success
        },
        [updateProduct.rejected]: (state, action) => {
          state.loading = false;
          state.status = 'failed';
          state.error = action.error.message;
        },

            // Delete Reviews --- ADMIN
            [deleteReviews.pending]: (state) => {
              state.status = 'loading';
              state.error = null;
              state.loading = true;
            },
            [deleteReviews.fulfilled]: (state, action) => {
              state.status = 'succeeded';
              state.loading = false;
             state.isDeleted = action.payload.success
            },
            [deleteReviews.rejected]: (state, action) => {
              state.loading = false;
              state.status = 'failed';
              state.error = action.error.message;
            },
  }
});

export const {getAllProducts,deleteReviewReset,clearErrors,newReviewReset,updateProductReset,deleteProductReset,newProductReset} = productsSlice.actions;
export default productsSlice.reducer;