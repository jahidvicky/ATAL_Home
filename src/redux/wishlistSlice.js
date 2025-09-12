// src/redux/slices/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API/Api";

// 1. Fetch wishlist
export const fetchWishlist = createAsyncThunk(
    "wishlist/fetchWishlist",
    async (userId) => {
        const res = await API.get(`/getWishlist/${userId}`);
        return res.data.products || []; // adjust according to your API response
    }
);

// 2. Add to wishlist
export const addToWishlist = createAsyncThunk(
    "wishlist/addToWishlist",
    async ({ userId, productId }) => {
        await API.post("/addWishlist", { userId, productId });
        const res = await API.get(`/getWishlist/${userId}`);
        return res.data.products || [];
    }
);

// 3. Remove from wishlist
export const removeFromWishlist = createAsyncThunk(
    "wishlist/removeFromWishlist",
    async ({ userId, productId }) => {
        await API.delete("/removeWishlist", { data: { userId, productId } });
        const res = await API.get(`/getWishlist/${userId}`);
        return res.data.products || [];
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
