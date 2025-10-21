import { useNavigate } from "react-router-dom";
import { useBranchStore } from "../../../controllers"
import { useForm } from "../../../helpers/useForm";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";





let formData = {
    name: '',
    location: '',
}

export const BranchManagement = () => {

    const navigate = useNavigate();
    const [createFlag, setcreateFlag] = useState(false); //para manejar el crear y separar del editar
    const [returnFlag, setreturnFlag] = useState(false); //falso=NiCreoNiEdito para cambiar de pagina una vez hecho cambios

    const { activeBranch, 
            setActiveBranch,
            startCreateBranch, 
            startUpdateBranch, 
            startLoadingBranches, 
            branches, 
            isLoadingBranches } = useBranchStore();

    const { name, location, onInputChange } = useForm( formData );
    
    // const prevBranchesLength = branches.length;

    useEffect(() => {
        if ( activeBranch ) {
            // Si activeBranch tiene un valor, se actualizara el estado del formulario
            formData = {...activeBranch } ;           
        }else{
            formData = { name: '', location: '' }
        }
    }, [activeBranch]); // Esto solo se ejecutará cuando activeBranch cambie

    const createSubmit = async( event ) => {
        
        event.preventDefault();   
        console.log('createSubmit se ejecuto')
        const result = await startCreateBranch( { name, location } );
        if (result.success) {
            // setcreateFlag( prevCreateFlag => !prevCreateFlag ); //de false a true
            Swal.fire('Se ha registrado correctamente', result.message, 'success');

            returnToManagementPage();
        }
    }

    const updateSubmit = async ( event ) => {
        event.preventDefault();
        console.log(formData)
        const result = await startUpdateBranch({name, location});
        if (result.success){
            Swal.fire('cambios realizados correctamente', 'success');
            setActiveBranch(null);
            returnToManagementPage();
        }
    }

    const returnToManagementPage = () => {
        //crear sucursal ya asigna null en su Slice
        startLoadingBranches();
        setreturnFlag(true);
    }

    const onCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        
        if (returnFlag && !activeBranch){
            setreturnFlag(false);
            navigate(-1);
            // navigate('/admin/branch');
            // navigate(0);
        }
    
    }, [branches, returnFlag, activeBranch])
    


    return (
        <>
            <div className="container justify-content-center">

                <form onSubmit={ !!activeBranch ? updateSubmit : createSubmit }>

                    <div className="form-group mb-3">
                        <label htmlFor="formGroupExampleInput" className="form-label">Nombre de la Sucursal</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            // id="formGroupExampleInput" 
                            placeholder="Introduzca el nombre"
                            name="name"
                            value={ name }
                            onChange={ onInputChange }
                        />
                    </div>

                    <div className="form-group mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label"> Locacion </label>
                        <input 
                            type="text" 
                            className="form-control" 
                            // id="formGroupExampleInput2" 
                            placeholder="Locacion"
                            name="location"
                            value={ location }
                            onChange={ onInputChange }
                        />
                    </div>

                    {
                        (!!activeBranch)
                            ? <div className="d-grid gap-2">
                                    <input 
                                        type="submit" 
                                        className="btnSubmit btn btn-primary" 
                                        value="Editar Sucursal" 
                                        />

                                        {/* <input 
                                        type="button" 
                                        className="btn btn-danger" 
                                        onClick={ onClickDelete }
                                        value="Eliminar" /> */}
                                                              
                                </div>

                            : <div className="d-grid gap-2">
                                    <input 
                                        type="submit" 
                                        className="btnSubmit btn btn-primary" 
                                        value="Crear Sucursal" />
                                </div>
                    }

                    <div className="d-grid gap-2">
                        <input 
                                type="button" 
                                className="btn btn-secondary" 
                                onClick={ onCancel }
                                value="Atras" />  
                    </div>
                </form>
                </div>
        </>
    )

  
}
