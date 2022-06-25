import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { followUser, getUsers, unfollowUser } from "../../services/UserService";

export const getUsersThunk = createAsyncThunk(
    "/users",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await getUsers(request);
            return response.data;
        }
        catch (error) {
            toast.error("something went wrong.");
            return rejectWithValue(error.response);
        }
    }
);

export const followThunk = createAsyncThunk(
    "/users/follow",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await followUser(request);
            return response.data;
        }
        catch (error) {
            toast.error("Error While Following User.");
            return rejectWithValue(error.response);
        }
    }
);

export const unfollowThunk = createAsyncThunk(
    "/users/unfollow",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await unfollowUser(request);
            return response.data;
        }
        catch (error) {
            toast.error("Error While Unfollowing User");
            return rejectWithValue(error.response);
        }
    }
);