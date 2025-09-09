// redux/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//  Fetch wishlist from backend
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (userId) => {
        const res = await API.get(`/getWishlist/${userId}`);
        return res.data.wishlist; // adjust according to your API response
    }
);

//  Add to wishlist (API + Redux state)
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async ({ userId, productId }) => {
        const res = await axios.post(`/api/wishlist`, { userId, productId });
        return res.data.wishlist;
    }
);

//  Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async ({ userId, productId }) => {
        const res = await axios.delete(`/api/wishlist/${userId}/${productId}`);
        return res.data.wishlist;
    }
);

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWishlist.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchWishlist.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchWishlist.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addToWishlist.fulfilled, (state, action) => {
                state.items = action.payload;
            })
            .addCase(removeFromWishlist.fulfilled, (state, action) => {
                state.items = action.payload;
            });
    },
});

export default wishlistSlice.reducer;
