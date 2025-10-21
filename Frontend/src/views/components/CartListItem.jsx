import { useCartStore } from "../../controllers"



export const CartListItem = ( {id, id_usuario, fecha_creacion, detalles } ) => {

    const { activeCart, setActiveCart } = useCartStore();


    const isActive = activeCart && activeCart.id === id;

    const onClickActiveCart = () => {
        setActiveCart( {id, id_usuario, fecha_creacion, detalles } )
    }

    return (

        <ul className="list-group list-group-horizontal ms-4 me-4 ">
                
            <li className={ `list-group-item list-group-item-action w-100 ${isActive ? 'active' : ''}` }  
                                onClick={ onClickActiveCart }>
                <div className="container text-center">
                    <div className="row align-items-start">

                        <div className="col-1 "> { id } </div>
                        <div className="col"> { id_usuario } </div>
                        <div className="col"> { fecha_creacion } </div>
                        <div className="col"> { detalles.length } </div>

                    </div>
                </div>
            </li>
            
        </ul>
    )

}
