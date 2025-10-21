import { createSlice } from '@reduxjs/toolkit';




export const cartSlice = createSlice({
    name: 'cart',

    initialState: {
        count: 0,
        next: null,
        previous: null,
        
        isLoadingCarts: null,
        carts: [

        ],
        activeCart: null,
    },

    reducers: {

        onSetActiveCart: ( state, { payload } ) => {
            state.activeCart = payload;
        },

        onLoadCarts: ( state, { payload = [] } ) => {
            state.isLoadingCarts = false;
            payload.forEach( cart => {
                const exists = state.carts.some( dbCart => dbCart.id === cart.id );
                if ( !exists ) {
                    state.carts.push( cart );
                }
            } )
        },

        onAddNewCart: ( state, { payload } ) => {
            state.carts.push( payload );
            state.activeCart = null;
        },

        onUpdateCart: ( state, { payload } ) => {
            // console.log(payload)
            state.carts = state.carts.map( cart => {
                if ( cart.id === payload.id ) {
                    return payload;
                }
                return cart;
            });
        },

        onDeleteCart: ( state ) => {
            if ( state.activeCart ) {
                state.carts = state.carts.filter( cart => cart.id !== state.activeCart.id );
                state.activeCart = null;
            }
        },

        onLogoutCart: ( state ) => {
            state.isLoadingCarts = true,
            state.carts = [],
            state.activeCart = null
        }
    }
});


// Action creators are generated for each case reducer function
export const { 

    onSetActiveCart,
    onAddNewCart,
    onUpdateCart,
    onDeleteCart,
    onLoadCarts,
    onLogoutCart,  

} = cartSlice.actions;