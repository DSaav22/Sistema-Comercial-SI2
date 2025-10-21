import { useEffect, useState } from "react";
import { useProductStore } from "../../controllers";





export const OrderListItem = ( detalle ) => {

    const { startGetProductById } = useProductStore();

    const [producto, setProducto] = useState(null)

    useEffect(() => {   

        const load = async(  ) => {
            const prod = await startGetProductById( detalle.id_producto );
            setProducto(prod);
            // console.log(prod)
        }
        load();
    }, []);


    //metodo para conseguir la foto del producto y si nombre
    const getIdAndImageProduct = ( id ) => {
        console.log('asa');
    }

    const clickActiveProduct = () => {  
        console.log('click');
    }

    return (
        
        <ul className="list-group list-group-horizontal ms-4 me-4 w-75 mb-2">
                    
            <li className="list-group-item list-group-item-action w-100">
                <div className="container text-center" onClick={ clickActiveProduct }>
                    <div className="row align-items-center">

                        <div className="col-2 ">  
                            <img src="/assets/images/no_image.jpg"  className="img-fluid" alt="not-image" />
                        </div>

                        <div className="col-4 align-items-center"> {producto ? producto.nombre : "Cargando..."} </div>

                        <div className="col-2  align-middle">   
                            <div className="row"> Cantiad </div>                           
                            <div className="row"> { detalle.cantidad } </div>                                             
                        </div>

                        <div className="col-2  align-middle">   
                            <div className="row"> Precio </div>                           
                            <div className="row"> { detalle.precio } </div>                                             
                        </div>

                        <div className="col-2  align-middle">   
                            <div className="row"> Total </div>                           
                            <div className="row"> { detalle.precio_total } </div>                                             
                        </div>

                    </div>
                </div>
            </li>
                
        </ul>


    )



}
