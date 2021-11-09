import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// Register User
export const register = createAsyncThunk('user/registerUser', async (userData) => {

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(`/api/v1/register`, userData, config);
    return data;
});

// Login User
export const login = createAsyncThunk("loginUser", async(userData) => {
  
    const config = { headers: { "Content-Type": "application/json" } };
    const {data} = await axios.post(`/api/v1/login`, userData,
    config);
    return data;
  });

// Load User
export const loadUser = createAsyncThunk("loadUser", async() => {
  
  const { data } = await axios.get(`/api/v1/me`);
  return data;
});

// Logout User
export const logout = createAsyncThunk("logoutUser", async() => {
  await axios.get(`/api/v1/logout`);
});

// Update Profile
export const updateProfile = createAsyncThunk("updateUserProile", async(userData) => {
  
  const config = { headers: { "Content-Type": "multipart/form-data" } };

  const { data } = await axios.put(`/api/v1/me/update`, userData, config);
 
  return data;
});

// Update Password
export const updatePassword = createAsyncThunk("user/updateUserPassword", async(passwords) => {
  
  const config = { headers: { "Content-Type": "application/json" } };

  const { data } = await axios.put(
    `/api/v1/password/update`,
    passwords,
    config
  );
  return data;
});

// Forgot Password
export const forgotPassword = createAsyncThunk("forgotPassword", async(email) => {
  
  const config = { headers: { "Content-Type": "application/json" } };

  const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
  return data;
});

// Reset Password
export const resetPassword = createAsyncThunk("resetPassword", async(token, passwords) => {
  
  const config = { headers: { "Content-Type": "application/json" } };

  const { data } = await axios.put(
    `/api/v1/password/reset/${token}`,
    passwords,
    config
  );
  return data;
});

// Get All Users --- ADMIN
export const getAllUsers = createAsyncThunk("user/getAllUsers", async() => {
  
  const { data } = await axios.get(`/api/v1/admin/users`);
  return data;
});

// Get User Details --- ADMIN
export const getUserDetails = createAsyncThunk("user/getUserDetails", async(id) => {
  
  const { data } = await axios.get(`/api/v1/admin/user/${id}`);  
  return data;
});

// Update User  --- ADMIN
export const updateUser = createAsyncThunk("user/updateUser", async(userInfo) => {
  
  const config = { headers: { "Content-Type": "application/json" } };
   const {userId,userData} = userInfo;
  const { data } = await axios.put(
    `/api/v1/admin/user/${userId}`,
    userData,
    config
  );
    return data;
});

// Delete User  --- ADMIN
export const deleteUser = createAsyncThunk("user/deleteUser", async(id) => {
  
  const { data } = await axios.delete(`/api/v1/admin/user/${id}`);
    return data;
});


// User SLICE
const userSlice = createSlice({
  name:"user",
  initialState:{
    users: [],
    user:{},
    status: 'idle',
    error: null,
    isAuthenticated: false,
    loading: false,
    isUpdated: false,
    isDeleted: false,
    message: null,
    success: null,
  },
  reducers:{
    getUser:(state)=>state.user,
    clearError:(state)=>{
        return {
            ...state,
            error:null,
        }
    },
    updateProfileReset:(state)=>{
      return {
        ...state,
        isUpdated: false,
      }
    },
    updatePasswordReset:(state)=>{
      return {
        ...state,
        isUpdated: false,
      }
    },
    updateUserReset:(state)=>{
      return {
        ...state,
        isUpdated: false,
      }
    },
    deleteUserReset:(state)=>{
      return {
        ...state,
        isDeleted: false,
      }
    },
  },
  extraReducers: {

    // Login
    [login.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    [login.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;  
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
      state.user = null;
    },

    // Register
    [register.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    [ register.fulfilled ]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;  
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.isUpdated = action.payload.success;
    },
    [register.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
      state.user = null;
    },

     // Logout User
     [logout.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    [ logout.fulfilled ]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;  
      state.user = null;
      state.isAuthenticated = false;
    },
    [logout.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },

    // Load User
    [loadUser.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    [ loadUser.fulfilled ]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;  
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    [loadUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
      state.isAuthenticated = false;
      state.user = null;
    },

  
    // Update Profile 
    [updateProfile.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.isUpdated = action.payload.success;  
    },
    [updateProfile.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },

    // Update Password
    [updatePassword.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    [updatePassword.fulfilled]: (state, action) => {
      console.log(action.payload);
      state.status = 'succeeded';
      state.loading = false;
      state.user = action.payload.user;
      state.isUpdated = action.payload.success;  
    },
    [updatePassword.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },

    // Forgot Password
    [forgotPassword.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    [forgotPassword.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.message = action.payload.message
    },
    [forgotPassword.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },

    // Reset Password
    [resetPassword.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    [resetPassword.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.success = action.payload.message
    },
    [resetPassword.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },

    // Get All Users
    [getAllUsers.pending]: (state, action) => {
      state.status = 'loading';
      state.error = null;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.users = action.payload.users;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    // Get User Details
    [getUserDetails.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.user = action.payload.user
    },
    [getUserDetails.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },

     // Get User Details
     [getUserDetails.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.user = action.payload.user
    },
    [getUserDetails.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },

     // Update User
     [updateUser.pending]: (state, action) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.loading = false;
      state.isUpdated = action.payload.success
    },
    [updateUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.loading = false;
      state.error = action.error.message;
    },

         // Delete User
         [deleteUser.pending]: (state, action) => {
          state.status = 'loading';
          state.loading = true;
          state.error = null;
        },
        [deleteUser.fulfilled]: (state, action) => {
          state.status = 'succeeded';
          state.loading = false;
          state.isDeleted = action.payload.success;
          state.message = action.payload.message;
        },
        [deleteUser.rejected]: (state, action) => {
          state.status = 'failed';
          state.loading = false;
          state.error = action.error.message;
        },
  }
});

export const {getUser,clearError,deleteUserReset,updateProfileReset,updatePasswordReset,updateUserReset} = userSlice.actions;
export default userSlice.reducer;