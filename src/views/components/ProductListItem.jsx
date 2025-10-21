import { useState } from "react";
import { useProductStore } from "../../controllers"

export const ProductListItem = ({ id, categoria, categoria_id, nombre, tipo, precio, foto }) => {

    const { setActiveProduct, activeProduct } = useProductStore();

    const onClickActiveProduct = () => {
        setActiveProduct( { id,  categoria, categoria_id, nombre, tipo, precio, foto } );
    };

    const isActive = activeProduct && activeProduct.id === id;

    return (
        <ul className="list-group list-group-horizontal ms-4 me-4 ">
                
            <li className={ `list-group-item list-group-item-action w-100 ${isActive ? 'active' : ''}` }  
                                onClick={ onClickActiveProduct }>
                <div className="container text-center">
                    <div className="row align-items-start">

                        <div className="col-1 "> { id } </div>
                        <div className="col"> { categoria } </div>
                        <div className="col"> { nombre } </div>
                        <div className="col"> { tipo } </div>
                        <div className="col"> { precio } </div>

                    </div>
                </div>
            </li>
            
        </ul>

    )



}
