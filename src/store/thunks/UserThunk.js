import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { editUser, followUser, getUsers, unfollowUser } from "../../services/UserService";

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
            toast.success("You succesfully Followed User.");
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
            toast.success("You succesfully Unfollowed User.");
            return response.data;
        }
        catch (error) {
            toast.error("Error While Unfollowing User");
            return rejectWithValue(error.response);
        }
    }
);

export const editUserThunk = createAsyncThunk(
    "/users/edit",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await editUser(request);
            return response.data;
        }
        catch (error) {
            toast.error("Error While Updating User Details");
            return rejectWithValue(error.response);
        }
    }
)