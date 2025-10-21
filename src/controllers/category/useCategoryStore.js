import { useDispatch, useSelector } from "react-redux"
import { onAddNewCategory, onDeleteCategory, onLoadCategories, onSetActiveCategory, onUpdateCategory } from "../../store";
import ecommerceApi from "../../api/ecommerceApi";
import Swal from "sweetalert2";




export const useCategoryStore = () => {
    
    const dispatch = useDispatch();
    const { categories, activeCategory, isLoadingCategory } = useSelector( state => state.categories );
    

    //////////////////////////////////////////////////////////////
    const setActiveCategory = ( category ) => {
        dispatch( onSetActiveCategory( category ) );
    }

    // Get categorias
    const startLoadingCategories = async() => { 
        try {
            const { data } = await ecommerceApi.get('/categorias');
            dispatch( onLoadCategories( data.results ) );
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }
    }

    //POST - crear Categoria
    const startCreateCategory = async( category ) => {
        try {
            var datajson = {
                nombre : category.name,
                descripcion : category.description
            }
            console.log(datajson)
            const { data } = await ecommerceApi.post( '/categorias/', datajson ); //no tiene id porq es un prod nuevo
            console.log(data);
            dispatch( onAddNewCategory({ nombre: datajson.nombre, descripcion: datajson.descripcion, id: data.id }) ); //aqui ponemos el id, asignado por el backend, al store
            return { success: true };
        } catch (error) {
            console.log(error);
            Swal.fire('Error al crear', error, 'error');
        }
    }

    // PUT - actualizar categoria
    const startUpdateCategory = async( category ) => {
        try {
            var datajson = {
                nombre : category.name,
                descripcion : category.description
            }
            const { data } = await ecommerceApi.put(`/categorias/${activeCategory.id}/`, datajson);
            console.log(data);
            dispatch( onUpdateCategory( {...data}) );
            return { success: true, message: 'Categoría actualizada con éxito' };
        } catch (error) {
            console.log(error);
            Swal.fire('Error al actualizar', error, 'error');
        }
    }

    // Delete - borrar
    const startDeleteCategory = async() => {
        try {         
            const { data } = await ecommerceApi.delete( `/categorias/${ Number(activeCategory.id) }/` );
            console.log(data);
            dispatch( onDeleteCategory( ) );
            return;
        } catch (error) {
            console.log(error);
            console.log(error.data);
            Swal.fire('Error al borrar', 'error');
        }
    }

    return {
        //propiedades
        categories,
        activeCategory,
        isLoadingCategory,

        //Metodos
        setActiveCategory,
        startLoadingCategories,
        startCreateCategory,
        startUpdateCategory,
        startDeleteCategory,
    }

}
