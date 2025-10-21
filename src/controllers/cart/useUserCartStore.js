import { useDispatch, useSelector } from "react-redux"
import { onAddCartProduc, 
        onDeleteCartProduct, 
        onLoadCartProducts, 
        onLoadPaymentMethods, 
        onSetActiveProductCart, 
        onUpdateCartProduct, 
        onUpdateProductCartQuantity 
} from "../../store";

import ecommerceApi from "../../api/ecommerceApi";





export const useUserCartStore = () => {

    const dispatch = useDispatch();
    const { cart, activeProductCart, activePaymentMethod, cartProducts, paymentMethods, totalPay } = useSelector( state => state.userCart );

    const setActiveProductCart = ( product ) => {
        dispatch( onSetActiveProductCart(product) );
    }

    // const setActivePaymentMethdo = ( method ) => {
    //     // dispatch( onSetActiveProductCart(method) );
    // }

    // Busca el carrito del usuario mediante su id, y luego los carga
    // const startAllUserCart = async( id ) => { 
    //     try {
    //         const { data } = await ecommerceApi.get(`/carritos`);
    //         const existingCart = data.results.find( pCart => pCart.id_usuario === id );
    //         if ( existingCart )
    //             dispatch( onLoadCartProducts( existingCart ) );
    //     } catch (error) {
    //         console.log('Error cargando el carro del usuario');
    //         console.log(error)
    //     }
    // }

    const startGetLastCart = async( ) => { 
        try {
            //si no lo encuentra crea uno nuevo porque el usuario no tenia ni un carrito
            const { data } = await ecommerceApi.get(`/ultimo_carrito`); //devuelve el carrito   
            dispatch( onLoadCartProducts( data ) ); //es necesario enviar todo, hay q llenar todo el slice
        } catch (error) {
            console.log('Error cargando el carro del usuario');
            console.log(error)
        }
    }

    // Get obtener el carrito meditante idCarrito, no retorna nada
    // const startLoadingUserCart = async( id ) => { 
    //     console.log(id);
    //     try {
    //         const { data } = await ecommerceApi.get(`/carritos/${id}`);
    //         console.log(data);
    //         // console.log(data[0]);
    //         dispatch( onLoadCartProducts( data ) );
    //     } catch (error) {
    //         console.log('Error cargando eventos');
    //         console.log(error)
    //     }
    // }

    // Get obtener el carrito del idUsuario
    const startLoadingUserCartByIDUser = async( id ) => { 
        try {
            const { data } = await ecommerceApi.get(`/carritos`);
            console.log(data.results);
            const existingCart = data.results.find( pCart => pCart.id_usuario === id );
            if ( existingCart ){      
                //por el momento que retorne solamente el id de carrito, es lo que necesito        
                return existingCart.id; 
            }
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }
    }

    //Añadir productos del carrito del usuario desde la pag Galeria
    const startAddProductCart = async ( id, producto ) => { //id carrito y el producto
        console.log(id);
        console.log(producto);
        const prod = {
            id_carrito: id,
            id_producto: producto.id,
            producto_nombre: producto.nombre,
            producto_precio: producto.precio,
            // image: producto.foto,
            cantidad: 1,
        }
        try {
            const data = await ecommerceApi.post(`/detalles_carrito/`, prod); //retorna todos los detalles del carrito mediante su id
            console.log(data.data); //me devolvio un detalle   
            dispatch( onAddCartProduc( data.data ) );
            return { success: true };
        } catch (error) {
            console.log('error en userCartSotre');
            console.log(error);
        }
    }

    //Modificar (reemplazo) el detalle 
    const startEditQuantityProductCart = async ( detalle ) => {
        // console.log('peticion hecha')
        // console.log(detalle)
        // return;
        const { data } = await ecommerceApi.put(`/detalles_carrito/${detalle.id}/`, detalle);
        console.log(data);
        dispatch( onUpdateCartProduct( detalle ) );
    }

    //Eliminar totalmente un producto del carrito 
    //esta sera una funcion especial porque hace peticion a detalles_carrito
    const startRemoveProductCart = async ( idDetalle ) => {
        try {     
            console.log('el id del Detalle', idDetalle);
            const { data } = await ecommerceApi.delete(`/detalles_carrito/${idDetalle}/`);
            console.log(data);
            dispatch( onDeleteCartProduct( idDetalle ) );
            setActiveProductCart(null);
        } catch (error) {
            console.log('error al borrar')
            console.log(error);
        }
    }

    //Eliminar

    // Get productos del carrito del usuario
    // const startLoadingProductsCart = async( id ) => { 
    //     try {
    //         const { data } = await ecommerceApi.get(`/v1/cart?userid=${id}`);
    //         dispatch( onLoadCartProducts( data ) );
    //     } catch (error) {
    //         console.log('Error cargando eventos');
    //         console.log(error)
    //     }
    // }

    // Get metodos de pago del carrito del usuario <===== No es necesario, solo necesitamos 1 carrito, este ya  tiene todo
    // const startLoadingPaymentMethods = async(id) => { 
    //     try {
    //         const { data } = await ecommerceApi.get('/v1/cart');
    //         dispatch( onLoadPaymentMethods( data ) );
    //     } catch (error) {
    //         console.log('Error cargando eventos');
    //         console.log(error)
    //     }
    // }


    return {
        //Propiedades
        cart,
        activeProductCart,
        activePaymentMethod,
        cartProducts,
        paymentMethods,
        totalPay,

        //Metodos
        setActiveProductCart, 
        // setActivePaymentMethdo, 
        startGetLastCart,
        // startLoadingUserCart, 
        startAddProductCart,
        startEditQuantityProductCart, 
        startRemoveProductCart, 
        startLoadingUserCartByIDUser,
    }
  
}
