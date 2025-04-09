// storeAccess.ts
import { store } from '@/redux/store';

export const getStore = () => store;
export const getState = () => store.getState();
export const getCartItems = () => store.getState().cartSlice.cartItems;