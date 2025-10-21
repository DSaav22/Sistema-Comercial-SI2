import { useNavigate } from "react-router-dom";
import { useAuthStore, useUserCartStore, usePagoStore } from "../../../controllers/index";
import { CartProductItem } from "../../components/CartProductItem";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ModalPago } from "./ModalPago";


export const UserCartPage = () => {

    const navigate = useNavigate();
    const { user } = useAuthStore();
    
    const [isCartModified, setIsCartModified] = useState(false); //bandera q indica q hubo cambios tanto edit como delete
    const [pushEditCantidadFlag, setpushEditCantidadFlag] = useState(false); //para evitar que haga solicitud cuando se selecciona un detalle

    const { cart,
            cartProducts, 
            activeProductCart, 
            startGetLastCart,
            startEditQuantityProductCart, 
            startRemoveProductCart,
            totalPay, 

        } = useUserCartStore();

    const { startStripePago } = usePagoStore();

    const [counter, setCounter] = useState( activeProductCart ? activeProductCart.cantidad : 0 );

    const id = activeProductCart ? activeProductCart.id : 0 ;
    const [modalAbierto, setModalAbierto] = useState(false);
    
    useEffect(() => {
        if (user) {
            //para que despliegue los carritos pertenecientes al usuario
            startGetLastCart()          
        }
    }, [user]) 

    useEffect(() => {
        if (activeProductCart) {
            // return;
            // const id = activeProductCart.id; 
            // console.log('segundo',  id)
            setCounter(activeProductCart.cantidad);
        }
    }, [ activeProductCart ]);

    useEffect(() => {
        
        if ( (counter > 0) && pushEditCantidadFlag ) {
            // return;
            setpushEditCantidadFlag(false);
            const detalle = {
                id: activeProductCart.id ,
                id_carrito: activeProductCart.id_carrito ,
                id_producto: activeProductCart.id_producto ,
                producto_nombre: activeProductCart.producto_nombre ,
                producto_precio: activeProductCart.producto_precio ,
                cantidad: counter,
            } 
            // console.log(detalle)
            startEditQuantityProductCart( detalle ); //lo mandamos como objeto para que pueda tener su forma {id: x, counter: x}
        } else console.log('no entro a mandar peticion')
    }, [counter]);
    
 
    
    const onClickQuantity = ( event ) => {
        if (!activeProductCart) return;
        setIsCartModified(true);
        setpushEditCantidadFlag(true);
        if ( event.target.id == '1' )
            setCounter( (c) => c + 1 );
        if ( event.target.id == '2' ) {
            if ( counter > 0 ) {
                setCounter( (c) => c - 1 );
            }
        }
    }   

    const onClickDelete = () => {
        setIsCartModified(true);
        startRemoveProductCart( activeProductCart.id ); //id del detalle del producto activo que es un detalle
    }

    const onClickSaveChanges = () => {
        Swal.fire({
            title: "Desea guardar los cambios hechos a su carrito?",
            showDenyButton: true,
            confirmButtonText: "guardar cambios",
            denyButtonText: `Cancelar`
          }).then((result) => {
            if (result.isConfirmed) {
                //llamar a la funcion para hacer el PUT
                setIsCartModified(false);             
                Swal.fire("realizado", "", "success");
            } 
          });      
    }


    //pasarela de pago stripe
    const onClickBuy = () => {
        setModalAbierto(true);
    };

    const onConfirmarPago = ({ direccion, latitud, longitud }) => {
        startStripePago({
            id_carrito: cart,
            direccion,
            latitud,
            longitud
        });
        setModalAbierto(false);
    };

    return (
        <>
        <div className="container-fluid">


        {/* barra superior de detalles */}
        <div className="list-group">
            <ul className="list-group list-group-horizontal ms-4 me-4">               
                <li className="list-group-item w-100 " style={{ backgroundColor: 'rgba(169, 169, 169, 0.5)' }}>
                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col-6"> Producto </div>
                            <div className="col-2"> Cantidad </div>
                            <div className="col-2"> Precio </div>
                            <div className="col-2"> Subtotal </div>
                        </div>
                    </div>
                </li>       
            </ul>
        {/* La lista de los carritos del cliente  */}
            <div className="overflow-auto mb-2" style={{ maxHeight: '50vh' }}>
                {    
                               
                     cartProducts.map( product => (                        
                        <CartProductItem 
                            key={ product.id }
                            { ...product }
                        />
                    ) )    
                                  
                }
            </div>

        </div>

        {/* la parte debajo de la lista */}
        {/* la tarjeta */}
        <div className="row justify-content-center" style={{ backgroundColor: 'rgba(144, 238, 144, 0.5)' }}> Item Seleccionado</div>

        {
             activeProductCart 
                ?   <div className="container " >
                        <CartProductItem 
                            key={activeProductCart.id}
                            { ...activeProductCart }
                        />
                    </div>
                : <div className="row justify-content-center "> Seleccione un producto </div>
        }
        
        {/* los Botones*/}
            <div className="row align-items-start" style={{ backgroundColor: 'rgba(144, 238, 144, 0.5)' }}>
                <div className="col-6 ">
                    {/* <button 
                        className={`btn  w-100 ${ !isCartModified? 'btn-secondary' : 'btn-primary' }`}
                        onClick={onClickSaveChanges}
                        disabled={ !isCartModified }
                    >Guadar Cambios</button> */}
                </div>
                <div className="col-2"> 
                    <button 
                        id="1" 
                        className="btn btn-primary w-100" 
                        onClick={ onClickQuantity }
                        disabled={ !activeProductCart }
                    >+1
                    </button> 
                </div>
                <div className="col-2"> 
                    <button 
                        id="2" 
                        className="btn btn-primary w-100" 
                        onClick={ onClickQuantity }
                        disabled={ !activeProductCart }
                    >-1</button> 
                </div>
                <div className="col-2"> 
                    <button className="btn btn-danger w-100" onClick={ onClickDelete } >Quitar de carrito</button> 
                </div>
            </div>


        {/* los totales a pagar */}
        <div className="container-fluid pt-2 ">
                <div className="row">
                    <div className="col-6"> </div>              
                    <div className="col-6  "> 
                        <div className="list-group">
                            <ul className="list-group list-group-horizontal ">
                                <li className="list-group-item w-100 ">
                                    Total a pagar
                                </li>
                            </ul>  

                            {/* <ul className="list-group list-group-horizontal ">                                          
                                <li className="list-group-item w-100  " style={{ backgroundColor: 'rgba(0, 123, 255, 0.5)' }}>                   
                                    <div className="row align-items-start">
                                        <div className="col-6 "> Subtotal </div>
                                        <div className="col-2"> Cantidad </div>
                                    </div>                            
                                </li>                               
                            </ul> */}
                            <ul className="list-group list-group-horizontal ">                                          
                                <li className="list-group-item w-100" style={{ backgroundColor: 'rgba(0, 123, 255, 0.5)' }}>                   
                                    <div className="row align-items-start">
                                        <div className="col-6 "><h5>Total: </h5>  </div>
                                        <div className="col-2"> { totalPay } Bs. </div>
                                    </div>                            
                                </li>                               
                            </ul>
                        </div>
        
                        <div className="row mt-2">
                            <button className="btn btn-primary" onClick={onClickBuy}> Ir a Pagar con Stripe </button>
                        </div>
                    </div>
                </div>
            </div>   
            </div>
            <ModalPago
                isOpen={modalAbierto}
                onClose={() => setModalAbierto(false)}
                onConfirmarPago={onConfirmarPago}
            />
        </>
    )


}
