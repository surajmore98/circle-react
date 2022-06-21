import { createSlice } from "@reduxjs/toolkit";
import { addLikeThunk, removeLikeThunk } from "./thunks/LikeThunk";
import { getPostsThunk, addPostThunk, editPostThunk, deletePostThunk } from "./thunks/PostThunk";
import { getUsersThunk } from "./thunks/UserThunk";

const initialState = {
    posts: [],
    users: [],
    isLoading: false
}

export const PostSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        updatePost: (state, action) => {
            state.posts = action.payload;
        }
    },
    extraReducers: {
        [getPostsThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [getPostsThunk.fulfilled]: (state, action) => {
            state.posts = action?.payload?.posts;
            state.isLoading = false;
        },
        [getPostsThunk.rejected]: (state) => {
            state.isLoading = false;
        },
        [addPostThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [addPostThunk.fulfilled]: (state, action) => {
            state.posts = action?.payload?.posts;
            state.isLoading = false;
        },
        [addPostThunk.rejected]: (state) => {
            state.isLoading = false;
        },
        [editPostThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [editPostThunk.fulfilled]: (state, action) => {
            state.posts = action?.payload?.posts;
            state.isLoading = false;
        },
        [editPostThunk.rejected]: (state) => {
            state.isLoading = false;
        },
        [deletePostThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [deletePostThunk.fulfilled]: (state, action) => {
            state.posts = action?.payload?.posts;
            state.isLoading = false;
        },
        [deletePostThunk.rejected]: (state) => {
            state.isLoading = false;
        },
        [addLikeThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [addLikeThunk.fulfilled]: (state, action) => {
            state.posts = action?.payload?.posts;
            state.isLoading = false;
        },
        [addLikeThunk.rejected]: (state) => {
            state.isLoading = false;
        },
        [removeLikeThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [removeLikeThunk.fulfilled]: (state, action) => {
            state.posts = action?.payload?.posts;
            state.isLoading = false;
        },
        [removeLikeThunk.rejected]: (state) => {
            state.isLoading = false;
        },
        [getUsersThunk.pending]: (state) => {
            state.isLoading = true;
        },
        [getUsersThunk.fulfilled]: (state, action) => {
            state.users = action?.payload?.users;
            state.isLoading = false;
        },
        [getUsersThunk.rejected]: (state) => {
            state.isLoading = false;
        }
    }
});

export const { updatePost } = PostSlice.actions;

export default PostSlice.reducer;