import { createSlice } from '@reduxjs/toolkit';





export const userOrdersSlice = createSlice({

    name: 'userOrdersSlice',

    initialState: {
        count: null,
        next: null,
        previous: null,
        isLoadingOrders: true,
        orders: [

        ],
        activeOrder: null,
    },

    reducers: {

        onSetActiveOrder: (state, { payload }) => {
            state.activeOrder = payload;
        },

        onLoadUserOrders: (state, { payload = [] }) => {
            state.isLoadingOrders = false;
            state.count = payload.count;
            state.next = payload.next;
            state.previous = payload.previous;
            payload.results.forEach( order => {
                const exists = state.orders.some( dbOrder => dbOrder.id === order.id );
                if ( !exists ) {
                    state.orders.push( order );
                }
            } )
        },

        onAddUserOrder: (state, { payload }) => {
            state.orders.push(payload);
            state.count = (state.count || 0) + 1;
            state.activeOrder = null;
        },

        onUpdateUserOrder: (state, { payload }) => {
            state.orders = state.orders.map( order => {             
                if ( order.id === payload.id ){
                    return payload;
                } 
                return order;
            } );
        },

        onDeleteUserOrder: ( state ) => {
            if ( state.activeOrder ) {
                state.orders = state.orders.filter( order => order.id !== state.activeOrder.id  );
                state.activeOrder = null;
                state.count = (state.count || 1) - 1;
            }
        },

        // onStartLoadingOrders: (state) => {
        //     state.isLoadingOrders = true;
        // },

        onClearOrders: (state) => {
            state.orders = [];
            state.count = null;
            state.next = null;
            state.previous = null;
            state.activeOrder = null;
            state.isLoadingOrders = false;
        }
    
    }
});


// Action creators are generated for each case reducer function
export const { 

    onSetActiveOrder, 
    onLoadUserOrders, 
    onAddUserOrder, 
    onUpdateUserOrder, 
    onDeleteUserOrder, 
    onClearOrders,  

} = userOrdersSlice.actions;