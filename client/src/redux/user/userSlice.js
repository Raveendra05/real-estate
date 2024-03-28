import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  Error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSucess: (state, action) => {
      state.currentUser = action.payload;
      (state.loading = false), (state.Error = null);
    },
    signInFailure: (state, action) => {
      (state.Error = action.payload), (state.loading = false);
    },
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSucess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.Error = null;
    },
    updateUserFailure: (state, action) => {
      state.Error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSucess: (state, action) => {
      state.currentUser = null;
      (state.loading = false), (state.Error = null);
    },
    deleteUserFailure: (state, action) => {
      (state.Error = action.payload), (state.loading = false);
    },
    signOutUserStart: (state) => {
        state.loading = true;
      },
      signOutUserSucess: (state, action) => {
        state.currentUser = null;
        (state.loading = false), (state.Error = null);
      },
      signOutUserFailure: (state, action) => {
        (state.Error = action.payload), (state.loading = false);
      },
  },
});
export const {
  signInFailure,
  signInStart,
  signInSucess,
  updateUserStart,
  updateUserSucess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFailure,
  signOutUserStart , 
  signOutUserSucess,
  signOutUserFailure
} = userSlice.actions;

export default userSlice.reducer;
