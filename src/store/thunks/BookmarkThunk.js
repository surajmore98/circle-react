import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addBookmark, getBookmarks, removeBookmark } from "../../services/UserService";

export const addBookmarkThunk = createAsyncThunk(
    "/users/bookmark",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await addBookmark(request);
            return response.data;
        }
        catch (error) {
            toast.error("Error while bookmarking the Post.");
            return rejectWithValue(error.response);
        }
    }
);

export const removeBookmarkThunk = createAsyncThunk(
    "/users/remove-bookmark",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await removeBookmark(request);
            return response.data;
        }
        catch (error) {
            toast.error("Error while un-bookmarking the Post.");
            return rejectWithValue(error.response);
        }
    }
);

export const getBookmarksThunk = createAsyncThunk(
    "/users/bookmarks",
    async (request, { rejectWithValue }) => {
        try
        {
            const response = await getBookmarks(request);
            return response.data;
        }
        catch (error) {
            toast.error("something went wrong.");
            return rejectWithValue(error.response);
        }
    }
);