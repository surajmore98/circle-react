import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { StatusCode } from "../../helper/StatusCode";
import { getAllPosts, insertPost, removePost, updatePostDetail } from "../../services/PostService";
import { updatePost } from "../PostSlice";

export const getPostsThunk = createAsyncThunk(
    "/posts",
    async (request, { rejectWithValue }) => {
        try {
            const response = await getAllPosts();
            return response.data;
        }
        catch (error) {
            toast.error("Something went Wrong.");
            return rejectWithValue(error.response);
        }
    }
);

export const addPostThunk = createAsyncThunk(
    "/posts/add",
    async (request, { rejectWithValue }) => {
        try {
            const response = await insertPost(request);
            if(response.status === StatusCode.CREATED) {
                toast.success("Post created Successfully.");
            }
            return response.data;
        }
        catch (error) {
            toast.error("Something went Wrong.");
            return rejectWithValue(error.response);
        }
    }
);

export const editPostThunk = createAsyncThunk(
    "/posts/edit",
    async (request, { rejectWithValue }) => {
        try {
            const response = await updatePostDetail(request);
            if(response.status === StatusCode.CREATED) {
                toast.success("Post updated Successfully.");
            }
            return response.data;
        }
        catch (error) {
            toast.error("Something went Wrong.");
            return rejectWithValue(error.response);
        }
    }
);

export const deletePostThunk = createAsyncThunk(
    "/posts/delete",
    async (request, { rejectWithValue }) => {
        try {
            const response = await removePost(request);
            if(response.status === StatusCode.CREATED) {
                toast.success("Post deleted Sucessfully.");
            }
            return response.data;
        }
        catch (error) {
            toast.error("Something went Wrong.");
            return rejectWithValue(error.response);
        }
    }
);