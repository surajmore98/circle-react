import { createSlice } from '@reduxjs/toolkit'
import { loginThunk, registerThunk } from './thunks/AuthThunk';
import { addBookmarkThunk, getBookmarksThunk, removeBookmarkThunk } from './thunks/BookmarkThunk';
import { editUserThunk, followThunk, unfollowThunk } from './thunks/UserThunk';

const initialState = {
  token: "",
  user: { },
  followUser: { },
  bookmarks: [],
  isLoading: false
}

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state.token = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: {
    [registerThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [loginThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [registerThunk.fulfilled]: (state, action) => {
      state.token = action.payload?.encodedToken;
      state.user = action.payload?.createdUser;
      state.isLoading = false;
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.token = action.payload?.encodedToken;
      state.user = action.payload?.foundUser;
      state.isLoading = false;
      
    },
    [registerThunk.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [loginThunk.rejected]: (state, action) => {
      state.isLoading = false;
    },
    [getBookmarksThunk.pending]: (state) => {
        state.isLoading = true;
    },
    [getBookmarksThunk.fulfilled]: (state, action) => {
        state.bookmarks = action?.payload?.bookmarks;
        state.isLoading = false;
    },
    [getBookmarksThunk.rejected]: (state) => {
        state.isLoading = false;
    },
    [addBookmarkThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [addBookmarkThunk.fulfilled]: (state, action) => {
      state.bookmarks = action?.payload?.bookmarks;
      state.isLoading = false;
    },
    [addBookmarkThunk.rejected]: (state) => {
      state.isLoading = false;
    },
    [removeBookmarkThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [removeBookmarkThunk.fulfilled]: (state, action) => {
      state.bookmarks = action?.payload?.bookmarks;
      state.isLoading = false;
    },
    [removeBookmarkThunk.rejected]: (state) => {
      state.isLoading = false;
    },
    [followThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [followThunk.fulfilled]: (state, action) => {
      state.user = action?.payload?.user;
      state.followUser = action?.payload?.followUser;
      state.isLoading = false;
    },
    [followThunk.rejected]: (state) => {
      state.isLoading = false;
    },
    [unfollowThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [unfollowThunk.fulfilled]: (state, action) => {
      state.user = action?.payload?.user;
      state.followUser = action?.payload?.followUser;
      state.isLoading = false;
    },
    [unfollowThunk.rejected]: (state) => {
      state.isLoading = false;
    },
    [editUserThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [editUserThunk.fulfilled]: (state, action) => {
      state.user = action?.payload?.user;
      state.isLoading = false;
    },
    [editUserThunk.rejected]: (state) => {
      state.isLoading = false;
    }
  }
})

export const { updateToken, updateUser } = AuthSlice.actions;

export default AuthSlice.reducer;