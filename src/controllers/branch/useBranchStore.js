import { useDispatch, useSelector } from "react-redux";
import { onLoadBranches, onSetActiveBranch, onAddNewBranch, onUpdateBranch, onDeleteBranch } from "../../store";
import Swal from "sweetalert2";
import ecommerceApi from "../../api/ecommerceApi";






export const useBranchStore = () => {

    const dispatch = useDispatch();
    const { branches, activeBranch, isLoadingBranches } = useSelector( state => state.branches )


    const setActiveBranch = ( branch ) => {
        dispatch( onSetActiveBranch( branch ) );
    }

    // Get Sucursales
    const startLoadingBranches = async() => { 
        try {
            const { data } = await ecommerceApi.get('/sucursales/');
            // console.log(data.results)
            dispatch( onLoadBranches( data.results ) );
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error.response.data)
        }
    }

    // Get y retornar Sucursales
    const startGetAllBranches = async() => { 
        try {
            const { data } = await ecommerceApi.get('/sucursales/');
            return data.results;
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }
    }

    const startGetBranchById = async( id ) => { 
            // console.log(id)
            try {
                const { data } = await ecommerceApi.get(`/sucursales/${id}/`);
                // console.log(data)
                return data;
            } catch (error) {
                console.log('Error cargando lo solicitado');
                console.log(error.response)
            }
        }

    //POST - crear sucursal
    const startCreateBranch = async( {name:nombre, location:direccion} ) => {
        try {
            const { data } = await ecommerceApi.post( '/sucursales/', {nombre, direccion}, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ); 
            console.log('los datos antes de meter al dispacth')
            console.log(data)
            dispatch( onAddNewBranch({ nombre, direccion, id: data.id }) ); 
            // startLoadingBranches();
            return { success: true, message: 'Sucursal creada con éxito' };
        } catch (error) {
            console.log(error.response.data);
            Swal.fire('Error al crear', 'error');
        }
    }

    // PUT - actualizar sucursal
    const startUpdateBranch = async ( {name, location} ) => {
        const updatedBranch = {
            nombre: name,          // 'name' a 'nombre'
            direccion: location
        };
        console.log(activeBranch.id)
        console.log(updatedBranch);
        try {
            console.log('startupdate activado')
            const { data } = await ecommerceApi.put(`/sucursales/${activeBranch.id}/`, updatedBranch, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // console.log(data);
            dispatch( onUpdateBranch( data) );
            return { success: true, message: 'Sucursal actualizada con éxito' };
        } catch (error) {
            console.log(error.response.data);
            Swal.fire('Error al actualizar', error, 'error');
        }
    }

    // Delete 
    const startDeleteBranch = async() => {
        try {         
            const { data } = await ecommerceApi.delete( `/sucursales/${ Number(activeBranch.id) }/` );
            console.log(data);
            dispatch( onDeleteBranch( ) );
            startLoadingBranches();
            return;
        } catch (error) {
            console.log(error.response.data);
            Swal.fire('Error al borrar', 'error');
        }
    }

    return {
        //Propiedades
        branches, 
        activeBranch, 
        isLoadingBranches,

        //Metodos
        setActiveBranch,
        startLoadingBranches,
        startCreateBranch,
        startUpdateBranch,
        startDeleteBranch,
        startGetBranchById,
        startGetAllBranches,

    }

}
