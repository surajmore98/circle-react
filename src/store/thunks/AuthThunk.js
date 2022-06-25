import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { login, register } from "../../services/AuthService";

export const registerThunk = createAsyncThunk(
    "auth/register",
    async (request, { rejectWithValue }) => {
        try {
            const response = await register(request);
            return response.data;
        }
        catch (error) {
            if(error?.response?.status === 422) {
                toast.error("Username Already Exists.");
            } else {
                toast.error("Invalid User Details");
            }
            return rejectWithValue(error.response);
        }
    }
);

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (request, { rejectWithValue }) => {
        try {
            const response = await login(request);
            return response.data;
        }
        catch (error) {
            toast.error("Invalid User Details");
            return rejectWithValue(error.response);
        }
    }
);