import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartItemCalculation } from "@/lib/utils/cartPriceCalculation";

export interface ICartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  productPhoto: string;
  categoryId: string;
  description: string;
}

interface ICartState {
  cartItems: ICartItem[];
  totalPriceBeforeDiscount: number;
  itemLevelDiscount: number;
  additionalDiscount: number;
  totalDiscount: number;
  subTotal: number;
  categoryId: string;
  showProductConflictDialog: boolean;
  pendingItem?: ICartItem;
  couponId: string;
}

const initialState: ICartState = {
  cartItems: [],
  totalPriceBeforeDiscount: 0,
  itemLevelDiscount: 0,
  additionalDiscount: 0,
  totalDiscount: 0,
  subTotal: 0,
  categoryId: "",
  showProductConflictDialog: false,
  pendingItem: undefined,
  couponId: "",
};

export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<ICartItem>) => {
      const { productId, quantity } = action.payload;

      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
      );

      if (itemIndex !== -1) {
        // Update quantity if item exists
        state.cartItems[itemIndex].quantity += quantity;
      } else {
        // Add new item to the cart
        state.cartItems.push(action.payload);
      }

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    increaseItem: (state, action: PayloadAction<{ productId: string }>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (itemIndex !== -1) {
        // Increase item quantity
        state.cartItems[itemIndex].quantity += 1;
      }

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    decreaseItem: (state, action: PayloadAction<{ productId: string }>) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === action.payload.productId
      );

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];
        // Decrease quantity
        item.quantity -= 1;

        // Remove item if quantity reaches 0
        if (item.quantity === 0) {
          state.cartItems.splice(itemIndex, 1);
        }
      }

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    removeItemFromCart: (state, action: PayloadAction<string>) => {
      // Filter out the item by productId
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    setAdditionalDiscount: (state, action: PayloadAction<number>) => {
      // Update additional discount
      state.additionalDiscount = action.payload;

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    resetCart: () => initialState, // Reset the cart to its initial state

    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },

    setCouponId: (state, action: PayloadAction<string>) => {
      state.couponId = action.payload;
    },

    showConflictDialog: (state, action: PayloadAction<ICartItem>) => {
      state.showProductConflictDialog = true;
      state.pendingItem = action.payload;
    },

    hideConflictDialog: (state) => {
      state.showProductConflictDialog = false;
      state.pendingItem = undefined;
    },

    clearCartAndAddItem: (state) => {
      if (state.pendingItem) {
        state.cartItems = [state.pendingItem];
        state.pendingItem = undefined;
        state.showProductConflictDialog = false;

        // Recalculate prices
        const priceData = cartItemCalculation(
          state.cartItems,
          state.additionalDiscount
        );
        Object.assign(state, priceData);
      }
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addItemToCart,
  increaseItem,
  decreaseItem,
  removeItemFromCart,
  setAdditionalDiscount,
  resetCart,
  setCategoryId,
  setCouponId,
  showConflictDialog,
  hideConflictDialog,
  clearCartAndAddItem
} = cartSlice.actions;

export default cartSlice.reducer;