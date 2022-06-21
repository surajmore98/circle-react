import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: false
}

export const LoaderSlice = createSlice({
    name: "loader",
    initialState,
    reducers: {
        updateLoader: (state, action) => {
            state.isLoading = action.payload
        }
    }
})

export const { updateLoader } = LoaderSlice.actions;

export default LoaderSlice.reducer;