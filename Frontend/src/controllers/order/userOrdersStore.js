import { useDispatch, useSelector } from "react-redux";
import { onLoadUserOrders, onSetActiveOrder } from "../../store";
import ecommerceApi from "../../api/ecommerceApi";




export const userOrdersStore = () => {
    
    const dispatch = useDispatch();
    const { orders, isLoadingOrders, activeOrder } = useSelector( state => state.userOrders );



    
    const setActiveOrder = ( order ) => {
        dispatch( onSetActiveOrder( order ) );
    }

    // Get pedidos del usuario
    const startLoadingUserOrders = async() => { 
        try {
            const { data } = await ecommerceApi.get('/pedidos');
            console.log(data);
            // return;
            dispatch( onLoadUserOrders( data ) );
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }
    }

    



    return {
        //Propiedades
        activeOrder,
        orders,
        isLoadingOrders,


        //Metodos
        setActiveOrder,
        startLoadingUserOrders,
    } 
     
    
}
