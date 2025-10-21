import { useCartStore } from "../../../controllers"




export const UserCartDetailPage = () => {

    const {} = useCartStore();

  return (
    <div className='container'>
        <div className="list-group">
        
            {/* ID, cliente, fecha, prod en carrito */}
            <ul className="list-group list-group-horizontal ms-4 me-4">             
                <li className="list-group-item w-100 " style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col-1"> ID </div>
                            <div className="col"> Producto </div>
                            <div className="col"> Precio  </div>
                            <div className="col"> Cantidad </div>
                        </div>
                    </div>
                </li>                 
            </ul>
                
                    {/* Componente que Lista de los inventarios */}
                        <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                            {
                                // carts.map( cart => (
                                //     <CartListItem 
                                //         key={ cart.id }
                                //         { ...cart }
                                //     />
                                // ) )
                            }
                        </div>
                
                    {/* Botones Crear, edita, elminar */}
                    {/* <ul className="list-group list-group-horizontal ms-4 me-4">      
                        <li className="list-group-item w-100">           */}
                            <div className="row align-items-start">
                                <div className="col-4 ">
                                    <button 
                                        type="button" 
                                        className="btn btn-primary w-100"
                                        onClick={ onClickView }
                                    >
                                        Ver Detalles
                                    </button>                     
                                </div>
                                {/* <div className="col-4 ">
                                    <button 
                                        type="button"
                                        disabled={!activeInventory} 
                                        className="btn btn-primary w-100"
                                        onClick={ onClickUpdate }
                                    >
                                        Editar Inventario
                                    </button>                     
                                </div>
                                <div className="col-4 ">
                                    <button type="button" 
                                        className="btn btn-danger w-100" 
                                        onClick={ onClickDeleteBranch }
                                        disabled={ !activeInventory }
                                    >
                                        Eliminar
                                    </button>                          
                                </div> */}
                            </div>          
                        {/* </li>
                    </ul> */}
                </div>
        </div>
  )



}
