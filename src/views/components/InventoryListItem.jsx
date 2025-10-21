import { useEffect, useState } from "react";
import {  useBranchStore, useInventoryStore, useProductStore  } from "../../controllers"



export const InventoryListItem = (  { id, producto, sucursal, cantidad } ) => {

    const { activeInventory, setActiveInventory } = useInventoryStore();
    const { startGetProductById } = useProductStore();
    const { startGetBranchById } = useBranchStore();
    
    const [isLoading, setIsLoading] = useState(true);
    const [dataProducto, setDataProducto] = useState(null);
    const [data, setData] = useState(null);
    const [dataSucursal, setDataSucursal] = useState(null);
    
    const isActive = activeInventory && activeInventory.id === id;

    
    const onLoadData = async () => {
        try {
            console.log('inventario en el load data: ');
            console.log( {id, producto, sucursal, cantidad} );
            const { nombre } = await startGetProductById(producto);  
            const data  = await startGetBranchById(sucursal);  //sucursal ya es un id
            
            setDataProducto(nombre);
            setDataSucursal(data.nombre);
            
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } finally {
            setIsLoading(false); // para señalar que ya no se esta cargando
        }
    };

    const onClickActiveInventory = () => {
        setActiveInventory( { id, producto, sucursal, cantidad } );
    }

    useEffect(() => {
        onLoadData();
    }, [])
    
    if (isLoading) {
        return <p>Loading...</p>;  
    }

    return (

        <ul className="list-group list-group-horizontal ms-4 me-4 ">
                
            <li className={ `list-group-item list-group-item-action w-100 ${isActive ? 'active' : ''}` }  
                                onClick={ onClickActiveInventory }>
                <div className="container text-center">
                    <div className="row align-items-start">

                        <div className="col-1 "> { id } </div>
                        <div className="col"> { dataProducto } </div>
                        <div className="col"> { dataSucursal } </div>
                        <div className="col"> { cantidad } </div>

                    </div>
                </div>
            </li>
            
        </ul>
    )


}
