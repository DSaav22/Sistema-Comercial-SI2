import { useDispatch, useSelector } from "react-redux";
import ecommerceApi from "../../api/ecommerceApi";
import { onAddNewInventory, onDeleteInventory, onLoadInventories, onSetActiveInventory, onUpdateInventory } from "../../store/inventory/inventorySlice";
import Swal from "sweetalert2";







export const useInventoryStore = () => {

    const dispatch = useDispatch();
    const { isLoadingInventories, activeInventory, inventories } = useSelector( state => state.inventories );  
    

    const setActiveInventory = ( inventory ) => {
        // console.log('Store activeinventario')
        dispatch( onSetActiveInventory( inventory ) );
    }   

    const startLoadingInventories = async() => { 
        try {
            const { data } = await ecommerceApi.get('/inventarios/');
            // console.log(data.results);
            dispatch( onLoadInventories( data.results ) );
        } catch (error) {
            console.log('Error cargando inventarios');
            console.log(error)
        }
    }

    // const startGetInventories = async() => { 
    //     try {
    //         const { data } = await ecommerceApi.get('/inventarios/');
    //         // console.log(data.results);
    //     } catch (error) {
    //         console.log('Error cargando inventarios');
    //         console.log(error)
    //     }
    // }

    const startCreateInventory = async( inventory ) => {
        console.log({inventory})
        try {
            const { data } = await ecommerceApi.post( '/inventarios/', inventory ); //no tiene id porq es un prod nuevo 
            dispatch( onAddNewInventory({ ...inventory, id: data.id }) ); //aqui ponemos el id, asignado por el backend, al store
            return { success: true };
        } catch (error) {
            console.log(error);
            Swal.fire('Error al crear', 'error');
        }
    }

    const startUpdateInventory = async( inventory ) => {
        // console.log(inventory)
        try {
            const { data } = await ecommerceApi.put(`/inventarios/${activeInventory.id}/`, inventory);
            // console.log('hizo la actualizacion')
            dispatch( onUpdateInventory( {...data}) );
            return { success: true, message: 'Categoría actualizada con éxito' };
        } catch (error) {
            console.log(error);
            Swal.fire('Error al actualizar', error, 'error');
        }
    }

    const startDeleteInventory = async() => {
        try {         
            const { data } = await ecommerceApi.delete( `/inventarios/${ Number(activeInventory.id) }/` );
            dispatch( onDeleteInventory() );
            return { success: true, message: 'Categoría actualizada con éxito' };
        } catch (error) {
            console.log(error);
            Swal.fire('Error al borrar', 'error');
        }
    }

    return {

        //propiedades
        isLoadingInventories,
        activeInventory,
        inventories,

        //metodos
        startLoadingInventories,
        startCreateInventory,
        startUpdateInventory,
        startDeleteInventory,
        setActiveInventory,
        // startVerifyInventory,
    }
}
