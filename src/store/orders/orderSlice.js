import { createSlice } from '@reduxjs/toolkit';




// Este Slice pertenece al enpoint Ver Pedidos por ID

export const orderSlice = createSlice({

    name: 'order',

    initialState: {

        order: null,

        isLoadingDetails: true,
        estado: null,
        id_usuario: null,
        id_carrito: null,
        monto_total: null,
        direccion_entrega: null,
        latitud: null,
        longitud: null,
        fecha_creacion: null,
        fecha_entrega: null,

        detalis: [
            
                // {
                //     id: 1,
                //     id_producto: 1,
                //     cantidad: 2,
                //     precio: 1000,
                //     precio_total: 2000,
                //     fecha_creacion: '2023-10-01',
                // },   
        ],
        
        activeDetail: null,
    },

    reducers: {
        onSetActiveDetail: (state, { payload } ) => {
            state.activeDetail = payload;
        },

        onLoadDetails: ( state, { payload = [] }) => {
            state.isLoadingDetails = false;

            state.order = payload.id;
            state.estado = payload.estado;
            state.id_usuario = payload.id_usuario;
            state.id_carrito = payload.id_carrito;
            state.monto_total = payload.monto_total;
            state.direccion_entrega = payload.direccion_entrega;
            state.latitud = payload.latitud;
            state.longitud = payload.longitud;
            state.fecha_creacion = payload.fecha_creacion;
            state.fecha_entrega = payload.fecha_entrega;

            payload.forEach( detail => {
                const exists = state.detalis.some( dbDetail => dbDetail.id === detail.id );
                if ( !exists ) {
                    state.detalis.push( detail );
                }
            } )
        },
      
        onAddNewDetail: (state, { payload } ) => {
            state.detalis.push( payload );
            state.activeDetail = null;
        },

        onUpdateDetail: ( state, { payload }) => {
            state.detalis = state.detalis.map( detail => {
                
                if ( detail.id === payload.id ){
                    return payload;
                } 

                return detail;
            } );
        },

        onDeleteDetail: ( state ) => {
            if ( state.activeDetail ) {
                state.detalis = state.detalis.filter( detail => detail.id !== state.activeDetail.id  );
                state.activeDetail = null;
            }
        },

        onClearOrder: (state) => {

            state.order = null;
            state.isLoadingDetails = true;

            state.detalis = [];
            state.estado = null;
            state.id_usuario = null;
            state.id_carrito = null;
            state.monto_total = null;
            state.direccion_entrega = null;
            state.latitud = null;
            state.longitud = null;
            state.fecha_creacion = null;
            state.fecha_entrega = null;
            state.activeDetail = null;

        }

    }
});


// Action creators are generated for each case reducer function
export const { 

    onSetActiveDetail,
    onLoadDetails,
    onAddNewDetail,
    onUpdateDetail,
    onDeleteDetail, 
    onClearOrder

} = orderSlice.actions;