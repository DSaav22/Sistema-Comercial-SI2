import { useEffect, useState } from "react";
import { useBranchStore } from "../../../controllers"
import { BranchListItem } from "../../components/BranchListItem";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";



export const BranchesPage = () => {

    const navigate = useNavigate();
    const { branches, 
            startLoadingBranches, 
            activeBranch, 
            startDeleteBranch, 
            setActiveBranch, 
            isLoadingBranches } = useBranchStore();

    const [createFlag, setCreateflag] = useState(false); //bandera q permite ir a modo crear
    const [updateFlag, setupdateFlag] = useState(false); //bandera q permite ir a modo editar

    useEffect(() => {
      startLoadingBranches();
    }, [])
    
    useEffect(() => {
        if ( !activeBranch && createFlag ) { //para que vaya a  crear
            setCreateflag(false); //limpiamos la bandera
            navigate('/admin/branch/manage');
        }
        if ( activeBranch && updateFlag ) {
            setupdateFlag(false); //limpiamos la bandera
            navigate('/admin/branch/manage');
        }
    }, [activeBranch, createFlag, updateFlag])

    const onClickCreate = () => {
        setActiveBranch(null);
        setCreateflag(true);   
    }

    const onClickUpdate = () => {
        setupdateFlag(true);
    }

    const onClickDeleteBranch = () => {
        Swal.fire({
            title: "Desea eliminar la sucursal?",
            showDenyButton: true,
            confirmButtonText: "Cancelar",
            denyButtonText: `Eliminar`
          }).then((result) => {
            if (result.isDenied) {
                startDeleteBranch();
                Swal.fire("Realizado", "", "success");
            } 
          });
    }

    return (

        <div className="list-group">
            {/* <a href="#" className="list-group-item list-group-item-action">A simple item</a> */}
       
            <ul className="list-group list-group-horizontal ms-4 me-4">
                
                <li className="list-group-item w-100 " style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
                    <div className="container text-center">
                        <div className="row align-items-start">

                            <div className="col-1"> ID </div>
                            <div className="col"> Nombre </div>
                            <div className="col"> Direccion </div>

                        </div>
                    </div>
                </li>
                
            </ul>

            <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                {

                    // !isLoadingBranches
                    // ?   
                    branches.map( branch => (
                        <BranchListItem 
                            key={ branch.id }
                            { ...branch }
                        />
                    ) )
                                   
                    // : <p> cargando </p>

                }
            </div>

            <ul className="list-group list-group-horizontal ms-4 me-4">
                
                <li className="list-group-item w-100">          
                    <div className="row align-items-start">

                        <div className="col-4 ">
                            <button 
                                type="button" 
                                className="btn btn-primary w-100"
                                onClick={ onClickCreate }
                            >
                                Registrar Sucursal
                            </button>                     
                        </div>
                        <div className="col-4 ">
                            <button 
                                type="button"
                                disabled={!activeBranch} 
                                className="btn btn-primary w-100"
                                onClick={ onClickUpdate }
                            >
                                Editar Sucursal
                            </button>                     
                        </div>
                        <div className="col-4 ">
                            <button type="button" 
                                className="btn btn-danger w-100" 
                                onClick={ onClickDeleteBranch }
                                disabled={ !activeBranch }
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
