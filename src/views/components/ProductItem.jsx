

// import {imageUrl} from '../../assets/images/No_Image_Available.jpg';

import Swal from "sweetalert2";
import { useAuthStore, useDetailCartStore, useProductStore, useUserCartStore } from "../../controllers"
import { useEffect, useState } from "react";



//Aqui es el elemento de la galeria

//{ id, name, brand, image }
export const ProductItem = ( { id, nombre, precio, brand, foto } ) => {
  
    const { user } = useAuthStore();
    const { cart, startAddProductCart } = useUserCartStore();
    const { startCreateDetails } = useDetailCartStore();
    const { activeProduct, setActiveProduct } = useProductStore();

    const [viewFlag, setViewFlag] = useState(false);
    const [addProductFlag, setAddProductFlag] = useState(false);

    const [onlyPageFlag, setOnlyPageFlag] = useState(false);

    const onClickDetalles = () => {
        setViewFlag(true); //la funcion ha sido accionada
        // setActiveProduct( { id, nombre, precio, brand, foto } );
    }

    const onClickAddCart = async () => {   
        setAddProductFlag(true); //la funcion ha sido accionada     
    }

    const clicSetActive = () => {
        console.log('prod activo actualizado');
        setActiveProduct({ id, nombre, precio, brand, foto });
    }

    const viewDetails = () => {
        console.log('viendo detalles')
    }

    const addToCart = async () => {
        //primero suma si el producto ya existe, sino procede a añadirlo al carrito
        const result = await startAddProductCart( cart, activeProduct ); //idCrrito, producto
        console.log(result);
        if ( result ) {             
            Swal.fire("Añadido a su carrito");
        }
    }   //falta actualizar el store

    useEffect(() => {
      
        if ( viewFlag ){
            viewDetails();
            setViewFlag(false);
        }
            //
        if ( addProductFlag ) {
            addToCart();
            setAddProductFlag(false);
        }
  
    }, [viewFlag, addProductFlag])
    

  return (

    <div className="col animate__animated animate__fadeIn ">
        <div className="card" onClick={ clicSetActive }>
            {/* Imagen */}
            <div className="row no-gutters">
                <div className="col w-100">
                    <img                      
                        src= {foto}
                        className="card-img" 
                        alt="not-found"
                    />
                </div>
            </div>

            {/* Datos */}
            <div className="col">
                <div className="card-body ">

                    <h5 className="card-title">{ nombre }</h5>
                    <p className="card-text"> { precio }</p>

                    <p className="card-text">
                        <small className="text-muted">{ brand }</small>
                    </p>

                    {/* row para los Botones */}
                    {/* <div className="container bg-secondary "> */}
                        
                        <div className="row  align-items-start">                        
                            {/* <button className="btn btn-info btn-sm w-50 position-relative">Detalles</button>
                            <button className="btn btn-info btn-sm w-50 ">Agregar al carrito</button> */}

                            <div className="col-sm-5 col-md-6 ">
                                <button 
                                    type="button" 
                                            className="btn btn-success w-100"
                                            onClick={ onClickDetalles }
                                        >
                                            Detalles
                                </button>                     
                                </div>
                            <div className="col-sm-5 offset-sm-2 col-md-6 offset-md-0 ">
                                <button type="button" className="btn btn-success w-100" onClick={ onClickAddCart }>
                                    Agregar al carrito
                                </button>                          
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>

            
        </div>
    </div>

  )


}
