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

// Helper function to get user-specific localStorage key
export const getUserCartKey = (userId: string | null) => {
  return userId ? `cart_${userId}` : null;
};

// Helper function to save cart to localStorage
export const saveCartToLocalStorage = (userId: string | null, cartItems: ICartItem[]) => {
  const cartKey = getUserCartKey(userId);
  if (cartKey) {
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }
};

// Helper function to clear cart from localStorage
export const clearCartFromLocalStorage = (userId: string | null) => {
  const cartKey = getUserCartKey(userId); // It returns cart_<userId> key
  if (cartKey) {
    localStorage.removeItem(cartKey);  // Clear the cart from localStorage
  } else {
    // If no userId, clear the default cart
    localStorage.removeItem('cart'); // Make sure this key exists
  }
};
export const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<{ item: ICartItem, userId?: string | null | undefined }>) => {
      const { item, userId } = action.payload;
      const { productId, quantity } = item;

      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.productId === productId
      );

      if (itemIndex !== -1) {
        // Update quantity if item exists
        state.cartItems[itemIndex].quantity += quantity;
      } else {
        // Add new item to the cart
        state.cartItems.push(item);
      }

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);

      // Save to localStorage with user-specific key
      saveCartToLocalStorage(userId ?? null, state.cartItems);
    },

    increaseItem: (state, action: PayloadAction<{ productId: string, userId: string | null }>) => {
      const { productId, userId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
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

      // Save to localStorage with user-specific key
      saveCartToLocalStorage(userId, state.cartItems);
    },

    decreaseItem: (state, action: PayloadAction<{ productId: string, userId: string | null }>) => {
      const { productId, userId } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (item) => item.productId === productId
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

      // Save to localStorage with user-specific key
      saveCartToLocalStorage(userId, state.cartItems);
    },

    removeItemFromCart: (state, action: PayloadAction<{ productId: string, userId: string | null }>) => {
      const { productId, userId } = action.payload;
      // Filter out the item by productId
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== productId
      );

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);

      // Save to localStorage with user-specific key
      saveCartToLocalStorage(userId, state.cartItems);
    },

    setAdditionalDiscount: (state, action: PayloadAction<{ discount: number, userId: string | null }>) => {
      const { discount, userId } = action.payload;
      // Update additional discount
      state.additionalDiscount = discount;

      // Recalculate prices
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);

      // Save to localStorage with user-specific key
      saveCartToLocalStorage(userId, state.cartItems);
    },

    resetCart: (state, action: PayloadAction<string | null>) => {
      const userId = action.payload;
      // Clear from localStorage
      clearCartFromLocalStorage(userId);
      // Reset state to initial
      return initialState;
    },

    setUserCart: (state, action: PayloadAction<ICartItem[]>) => {
      state.cartItems = action.payload;
      const priceData = cartItemCalculation(
        state.cartItems,
        state.additionalDiscount
      );
      Object.assign(state, priceData);
    },

    loadUserCart: (state, action: PayloadAction<string | null>) => {
      const userId = action.payload;
      if (userId) {
        const cartKey = getUserCartKey(userId);
        const storedCart = cartKey ? localStorage.getItem(cartKey) : null;

        if (storedCart) {
          state.cartItems = JSON.parse(storedCart);
          const priceData = cartItemCalculation(
            state.cartItems,
            state.additionalDiscount
          );
          Object.assign(state, priceData);
        } else {
          // Reset to empty cart if no stored cart found
          Object.assign(state, initialState);
        }
      } else {
        // Reset to empty cart if no userId
        Object.assign(state, initialState);
      }
    },

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

    clearCartAndAddItem: (state, action: PayloadAction<string | null>) => {
      const userId = action.payload;
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

        // Save to localStorage with user-specific key
        saveCartToLocalStorage(userId, state.cartItems);
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
  clearCartAndAddItem,
  setUserCart,
  loadUserCart
} = cartSlice.actions;

export default cartSlice.reducer;