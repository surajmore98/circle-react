import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addLike, removeLike } from "../../services/PostService";

export const addLikeThunk = createAsyncThunk(
    "posts/like",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await addLike(request);
            return response.data;
        }
        catch (error) {
            toast.error("Error while liking the Post.");
            return rejectWithValue(error.response);
        }
    }
);

export const removeLikeThunk = createAsyncThunk(
    "posts/dislike",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await removeLike(request);
            return response.data;
        }
        catch (error) {
            toast.error("Error while unliking the Post.");
            return rejectWithValue(error.response);
        }
    }
);