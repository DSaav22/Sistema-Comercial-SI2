
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({

    name: 'ui',
    initialState: {
        isProductModalOpen: false
    },

    reducers: {
        onOpenProductModal: ( state ) => {
            console.log('Slice abriendo modal')
            state.isProductModalOpen = true;
        },
        onCloseProductModal: ( state ) => {
            state.isProductModalOpen = false;
        },
    }
    
});


// Action creators are generated for each case reducer function
export const { onOpenProductModal, onCloseProductModal } = uiSlice.actions;