import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const generateVariantId = (item) => {
  const size = item.selectedSize || "";
  const color = item.selectedColor || "";
  const lens = item.lens?.selectedLens || "";
  const policy = item.policy?.name || "";
  return `${item.id}-${size}-${color}-${lens}-${policy}`;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: savedCart },
  reducers: {
    addToCart: (state, action) => {
      const newItem = { ...action.payload };

      newItem.subCategoryName = newItem.subCategoryName || "";

      newItem.variantId = generateVariantId(newItem);

      const existingItem = state.items.find(
        (item) => item.variantId === newItem.variantId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        newItem.quantity = 1;
        state.items.push(newItem);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    incrementQuantity: (state, action) => {
      const variantId = action.payload;
      const item = state.items.find((i) => i.variantId === variantId);
      if (item) item.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decrementQuantity: (state, action) => {
      const variantId = action.payload;
      const item = state.items.find((i) => i.variantId === variantId);
      if (item && item.quantity > 1) item.quantity -= 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      const variantId = action.payload;
      state.items = state.items.filter((i) => i.variantId !== variantId);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
