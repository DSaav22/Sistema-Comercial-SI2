

import { createSlice } from '@reduxjs/toolkit';



export const inventorySlice = createSlice({
    name: 'inventory',

    initialState: {
        isLoadingInventories: true,
        inventories: [

        ],
        activeInventory: null,
    },

    reducers: {
        
        onSetActiveInventory: ( state, {payload} ) => {
            state.activeInventory = payload;
        },

        onAddNewInventory: ( state, { payload } ) => {
            state.inventories.push( payload );
            state.activeInventory = null;
        },

        onUpdateInventory: ( state, { payload } ) => {
            // console.log(payload)
            state.inventories = state.inventories.map( inventory => {
                if ( inventory.id === payload.id ) {
                    return payload;
                }

                return inventory;
            });
        },

        onDeleteInventory: ( state ) => {
            if ( state.activeInventory ) {
                state.inventories = state.inventories.filter( inventory => inventory.id !== state.activeInventory.id );
                state.activeInventory = null;
            }
        },

        onLoadInventories: ( state, { payload = [] } ) => {
            state.isLoadingInventories = false;
            payload.forEach( inventory => {
                const exists = state.inventories.some( dbInventory => dbInventory.id === inventory.id );
                if ( !exists ) {
                    state.inventories.push( inventory );
                }
            } )
        },

        onLogoutInventory: ( state ) => {
            state.isLoadingInventories = true,
            state.inventories = [],
            state.activeInventory = null
        }

    }
});


// Action creators are generated for each case reducer function
export const { 
    
    onSetActiveInventory,
    onAddNewInventory,
    onUpdateInventory,
    onDeleteInventory,
    onLoadInventories,
    onLogoutInventory, 

} = inventorySlice.actions;