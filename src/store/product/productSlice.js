


import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({

    name: 'product',

    initialState: {
        page: 0,
        isLoadingProducts: true,
        products: [

        ],
        activeProduct: null,
    },

    reducers: {

        onSetActiveProduct: ( state, {payload} ) => {
            state.activeProduct = payload;
        },

        onLoadProducts: ( state, { payload = [] }) => {
            state.isLoadingProducts = false;
            payload.forEach( product => {
                const exists = state.products.some( dbProduct => dbProduct.id === product.id );
                if ( !exists ) {
                    state.products.push( product );
                }
            } )
        },

        onAddNewProduct: (state, {payload} ) => {
            state.products.push( payload );
            state.activeProduct = null;
        },

        onUpdateProduct: ( state, { payload }) => {
            state.products = state.products.map( product => {
                
                if ( product.id === payload.id ){
                    return payload;
                } 

                return product;
            } )
        },

        onDeleteProduct: ( state ) => {

            if ( state.activeProduct ) {
                state.products = state.products.filter( product => product.id !== state.activeProduct.id  );
                state.activeProduct = null;
            }
        },


    }

});


// Action creators are generated for each case reducer function
export const { 
    
    onSetActiveProduct, 
    onAddNewProduct, 
    onLoadProducts,
    onUpdateProduct,
    onDeleteProduct,

} = productSlice.actions;