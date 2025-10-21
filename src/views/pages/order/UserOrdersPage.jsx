import { use, useEffect } from "react";
import { userOrdersStore } from "../../../controllers/order/userOrdersStore";
import { OrderListItem } from "../../components/OrderListItem";
import { OrderListState } from "../../components/OrderListState";





export const UserOrdersPage = () => {


    const { orders, isLoadingOrders, startLoadingUserOrders } = userOrdersStore();


    useEffect(() => {
        startLoadingUserOrders();
    }, []); 


    const onClick = () => {
        console.log('click');
        startLoadingUserOrders();
    }

    return (

        <div className="container">

            
            
            {/* Datos totales de la orden */}
                    {/* Detalles de la orde */}
            <div className="overflow-auto mb-2" style={{ maxHeight: '50vh' }}>
                {                                   
                    orders.map( order => (     
                        <div key={order.id}>
                            <OrderListState { ...order } />    
                            {
                                order.detalles.map( detalle => (  
                                    <OrderListItem 
                                        key={ detalle.id }
                                        { ...detalle }
                                    />                          
                                )) 
                            }
                            <hr />
                       </div>
                    ) )                                  
                }
            </div>

            {/* <button onClick={ onClick }> mostrar </button> */}
        </div>

    )


}
