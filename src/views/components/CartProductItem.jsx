import { useEffect } from "react";
import { useForm } from "../../helpers/useForm"
import { useUserCartStore } from "../../controllers/cart/useUserCartStore";






export const CartProductItem = ( { id, id_producto, id_carrito, producto_nombre, image, producto_precio, cantidad } ) => {
    
    const { setActiveProductCart } = useUserCartStore();

    const clickActiveProduct = () => {
        
        setActiveProductCart( { id, id_carrito, id_producto, producto_nombre, image, producto_precio, cantidad } );
    }


    return (

        <ul className="list-group list-group-horizontal ms-4 me-4">
                    
                <li className="list-group-item list-group-item-action w-100">
                    <div className="container text-center" onClick={ clickActiveProduct }>
                        <div className="row align-items-center">

                            <div className="col-2 ">  
                                <img src={ image } className="img-fluid" alt="not-image" />
                            </div>
                            <div className="col-4 align-items-center"> { producto_nombre } </div>
                            <div className="col-2  align-middle"> 
                                {/* <form onSubmit={ paySubmit }>
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        name="cantidad"
                                        value={ cantidad }
                                        onChange={ onInputChange }
                                    />
                                </form> */}
                                {cantidad}
                            </div>
                            <div className="col-2"> { producto_precio } </div>
                            <div className="col-2"> { cantidad*producto_precio } </div>

                        </div>
                    </div>
                </li>
                
        </ul>
    )

}
