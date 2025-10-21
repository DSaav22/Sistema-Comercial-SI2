import { useDispatch, useSelector } from "react-redux";
// import { onAddNewCart, onLoadCarts, onSetActiveCart, onUpdateCart } from "../../store";
import ecommerceApi from "../../api/ecommerceApi";
import { onAddNewCart, onDeleteCart, onLoadCarts, onSetActiveCart, onUpdateCart } from "../../store/cart/cartSlice";





export const useCartStore = () => {

    const dispatch = useDispatch();
    
    const { carts, activeCart, isLoadingCarts } = useSelector( state => state.carts );
  
    const setActiveCart = ( cart ) => {
       dispatch( onSetActiveCart( cart ) );
    }

    // Get carritos
    const startLoadingCarts = async() => { 
        try {
            const { data } = await ecommerceApi.get('/carritos');
            console.log(data.results);
            dispatch( onLoadCarts( data.results ) );
        } catch (error) {
            console.log('Error cargando los datos');
            console.log(error)
        }
    }

    //POST - crear Carrito
    const startCreateCart = async( cart ) => {
        try {
            const { data } = await ecommerceApi.post( '/cart', cart ); //no tiene id porq es un prod nuevo
            console.log(data);
            dispatch( onAddNewCart({ ...cart, id: data.id }) ); //aqui ponemos el id, asignado por el backend, al store
            return { success: true, message: 'creado con éxito' };
        } catch (error) {
            console.log('Error cargando los datos');
            console.log(error);
        }
    }

    // PUT - actualizar carrito
    const startUpdateCart = async( cart ) => {
        try {
            const { data } = await ecommerceApi.put(`/cart/${activeCart.id}`, cart);
            console.log(data);
            dispatch( onUpdateCart( {...cart}) );
            return { success: true, message: 'actualizado con éxito' };
        } catch (error) {
            console.log(error);
            console.log('Error cargando los datos');
        }
    }

    // Delete - borrar
    const startDeleteCart = async() => {
        try {         
            const { data } = await ecommerceApi.delete( `/Cart/${ Number(activeCart.id) }` );
            console.log(data);
            dispatch( onDeleteCart() );
            return;
        } catch (error) {
            console.log('Error cargando los datos');
            console.log(error);
        }
    }
  
    return {
        //propiedades
        carts,
        activeCart,
        isLoadingCarts,
        
        //Metodos 
        setActiveCart,
        startLoadingCarts,
        startCreateCart,
        startUpdateCart,
        startDeleteCart,
    }
}
