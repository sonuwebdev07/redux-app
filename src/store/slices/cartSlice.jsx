import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    cartTotalQty: 0,
    cartTotalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            //state.cartItems.push(action.payload)
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            )

            if (itemIndex >= 0) {
                state.cartItems[itemIndex].productQuantity += 1
            }

            else {
                let tempProductItem = { ...action.payload, productQuantity: 1 }
                state.cartItems.push(tempProductItem)
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );

            if (state.cartItems[itemIndex].productQuantity > 1) {
                state.cartItems[itemIndex].productQuantity -= 1;


            } else if (state.cartItems[itemIndex].productQuantity === 1) {
                const nextCartItems = state.cartItems.filter(
                    (item) => item.id !== action.payload.id
                );

                state.cartItems = nextCartItems;
            }
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },

        clearCart(state, action) {
            state.cartItems = [];
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
    }
})

export const { addToCart, clearCart, decreaseCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;