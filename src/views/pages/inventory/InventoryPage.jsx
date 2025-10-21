import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useInventoryStore } from "../../../controllers"
import { InventoryListItem } from "../../components/InventoryListItem";
import Swal from "sweetalert2";






export const InventoryPage = () => {

    const navigate = useNavigate();
    const { setActiveInventory,  startLoadingInventories, activeInventory, inventories, startDeleteInventory  } = useInventoryStore();
    
    const [createFlag, setcreateFlag] = useState(false); //bandera para activar si dio en crear
    const [editFlag, seteditFlag] = useState(false); //bandera para activar si dio en editar

    useEffect(() => {
      
        startLoadingInventories();

    }, [])
    
    useEffect(() => { //para que vaya a crear y editar
        if ( !activeInventory && createFlag ) { //se cumple para que pase a la pag para 'crear'
            setcreateFlag(false);
            navigate('manage');
        }else if ( activeInventory && editFlag ) {
            seteditFlag(false);
            console.log('editar seleccionado')
            navigate('manage');
        }    
    
    }, [activeInventory, editFlag, createFlag]);
    

    const onClickCreate = () => {
        setActiveInventory(null);
        setcreateFlag(true);
    }

    const onClickUpdate = () => {
        seteditFlag(true);
    }

    const onClickDeleteBranch = () => {

        Swal.fire({
            title: "Desea eliminar?",
            showDenyButton: true,
            confirmButtonText: "Cancelar", //lo puse al reves por el color del boton
            denyButtonText: `Eliminar`
          }).then((result) => {
            if (result.isDenied) {
                deleteInventory();
            } 
          });
        
    }

    const deleteInventory = async() => {
        const result = await startDeleteInventory(activeInventory.id );
        if (result) {
            setActiveInventory(null);
            startLoadingInventories();
            Swal.fire("Saved!", "", "success");
        }
    }


  return (
     <div className="list-group">

        {/* ID, Producto, Sucursal, Cantidad */}
        <ul className="list-group list-group-horizontal ms-4 me-4">             
            <li className="list-group-item w-100 " style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col-1"> ID </div>
                        <div className="col"> Producto </div>
                        <div className="col"> Sucursal </div>
                        <div className="col"> Cantidad </div>
                    </div>
                </div>
            </li>                 
        </ul>
    
        {/* Componente que Lista de los inventarios */}
            <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                {
                    inventories.map( inventory => (
                        <InventoryListItem 
                            key={ inventory.id }
                            { ...inventory }
                        />
                    ) )
                }
            </div>
    
        {/* Botones Crear, edita, elminar */}
        <ul className="list-group list-group-horizontal ms-4 me-4">      
            <li className="list-group-item w-100">          
                <div className="row align-items-start">
                    <div className="col-4 ">
                        <button 
                            type="button" 
                            className="btn btn-primary w-100"
                            onClick={ onClickCreate }
                        >
                            Registrar Inventario
                        </button>                     
                    </div>
                    <div className="col-4 ">
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
                    </div>
                </div>          
            </li>
        </ul>
    </div>
  )


}
