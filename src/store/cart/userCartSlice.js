import { createSlice } from '@reduxjs/toolkit';





export const userCartSlice = createSlice({
    name: 'userCart',

    initialState: {
        
        cart: null,
        user: null,

        data_creation: null,
        isLoadingCartProducts: true,
        // isLoadingPaymentMethods: true,

        cartProducts: [
            //{ productId: 1, name: 'Product A', price: 100, quantity: 2 },
        ],
        // paymentMethods: [
        //     //{ paymentId: 1, type: 'creditCard', details: { number: '**** **** **** 1234' } },
        // ],
        
        totalPay: 0,
        activeProductCart: null,
        // activePaymentMethod: null,        
    },

    reducers: {

        onSetActiveProductCart: ( state, { payload} ) => {
            // console.log(payload);
            state.activeProductCart = payload;
        },

        onSetActivePaymentMethod: ( state, { payload } ) => {
            state.activePaymentMethod = payload;
        },

        onLoadCartProducts: ( state, { payload = [] } ) => {   
            state.isLoadingCartProducts = false;
            //ver si puedo optimizar user
            state.user = payload.id_usuario;
            state.cart = payload.id;
            state.data_creation = payload.fecha_creacion.slice(0, 10);;
            payload.detalles.forEach( carrito => { //ya no es por producto sino por carrito, asi se maneja
                const exists = state.cartProducts.some( dbCarrito => dbCarrito.id === carrito.id );
                if ( !exists ) {
                    state.cartProducts.push( carrito );
                }
            } );

            state.totalPay = state.cartProducts.reduce((total, detalle) => {
                return total + (detalle.producto_precio * detalle.cantidad);
            }, 0); 
        },

        //sera mediante id producto la busqueda
        onFindCartProduct: ( state, { payload } ) => {
            return state.cartProducts.some( cart => cart.id_producto === payload.id_producto );          
        },
        
        //si lo pilla lo actualiza, si no lo añade
        onAddCartProduc: ( state, { payload } ) => {
            const exists =  state.cartProducts.some( cart => cart.id_producto === payload.id_producto );        
            if ( exists ){
                state.cartProducts = state.cartProducts.map( cart => {            
                    if ( cart.id_producto === payload.id_producto ){
                        return payload;
                    } 
                    return cart;
                } );
            }else {
                state.cartProducts.push( payload );
                state.activeProductCart = null;  
            }
            state.totalPay = state.cartProducts.reduce((total, detalle) => {
                return total + (detalle.producto_precio * detalle.cantidad);
            }, 0); 
        },

        //este va en la vista de galeria
        onAddNewCartProduct: ( state, { payload } ) => {
            state.cartProducts.push( payload );
            state.activeProductCart = null;         
            // para calcular totalPay
            state.totalPay = state.cartProducts.reduce((total, detalle) => {
                return total + (detalle.producto_precio * detalle.cantidad);
            }, 0); 
        },

        onUpdateCartProduct: ( state, { payload } ) => {
            //el payload es el activeProduct (el detalle)
            console.log('el payload = active')
            console.log(payload)
            state.cartProducts = state.cartProducts.map( cart => { //reemplazo por id detalle        
                if ( cart.id === payload.id ){
                    state.activeProductCart = payload;
                    return payload;
                } 
                return cart;
            } );          
            // state.cartProducts.push( payload );
            // state.activeProductCart = null; //no puede desactivarse porque necesita seguir modificando si quiere        
            // para calcular totalPay
            state.totalPay = state.cartProducts.reduce((total, detalle) => {
                return total + (detalle.producto_precio * detalle.cantidad);
            }, 0); 
        },

        // onAddNewPaymentMethod: ( state, { payload } ) => {
        //     state.events.push( payload );
        //     state.activeEvent = null;
        // },

        onDeleteCartProduct: ( state, { payload }) => {
            //Eliminar totalmente el producto del carrito 
            //{ idDetalle }
            console.log(payload);
            state.cartProducts = state.cartProducts.filter( p => p.id !== payload );
            // para calcular totalPay
            state.totalPay = state.cartProducts.reduce((total, detalle) => {
                return total + (detalle.producto_precio * detalle.cantidad);
            }, 0); 
        },

        // onDeletePaymentMethod: (state, { payload } ) => {
        //     //lo hacemos mediante id
        //     state.paymentMethods = state.paymentMethods.filter(
        //       (method) => method.id !== payload.id
        //     );
        // },

        //este va en la vista de carrito
        onUpdateProductCartQuantity: ( state, { payload } ) => {
            //actulizar cantidad si suma o resta al añadir al carrito algun producto
            console.log(payload);
            const { id, counter } = payload;       
            // console.log(payload);
            state.cartProducts = state.cartProducts.map( product => {
                if ( product.id === payload.id ) {
                    const newProduct = { ...product, cantidad: counter }
                    state.activeProductCart = { ...newProduct }
                    return newProduct;
                }
                return product;
            });

            state.totalPay = state.cartProducts.reduce((total, detalle) => {
                return total + (detalle.producto_precio * detalle.cantidad);
            }, 0); 
        },

        onLoadPaymentMethods: ( state, { payload = [] } ) => {
            state.isLoadingPaymentMethods = false;
            payload.forEach( method => {
                const exists = state.paymentMethods.some( dbMethod => dbMethod.id === method.id );
                if ( !exists ) {
                    state.paymentMethods.push( method );
                }
            } )
        },

       
        onLogoutEcommerce: ( state ) => {

            state.user = null;
            state.isLoadingCartProducts = true;
            state.isLoadingPaymentMethods = true;
            state.cartProducts = [];
            state.paymentMethods = [];
            state.activeProductCart = null;
            state.activePaymentMethod = null;
            state.totalPay = 0;

        }
    }
});


// Action creators are generated for each case reducer function
export const { 

    onSetActiveProductCart,
    onSetActivePaymentMethod,
    // onAddNewCartProduct,
    onAddNewPaymentMethod,
    onDeleteCartProduct,
    onDeletePaymentMethod,
    onFindCartProduct,
    onAddCartProduc,
    onUpdateCartProduct,
    onUpdateProductCartQuantity,
    onLoadCartProducts,
    onLoadPaymentMethods,
    onLogoutEcommerce, 

} = userCartSlice.actions;