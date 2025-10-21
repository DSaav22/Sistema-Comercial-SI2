import { useDispatch, useSelector } from "react-redux";
import { onAddNewProduct, onDeleteProduct, onLoadProducts, onSetActiveProduct, onUpdateProduct } from "../../store";
import ecommerceApi from "../../api/ecommerceApi";
import Swal from "sweetalert2";




export const useProductStore = () => {

    const dispatch = useDispatch();

    const { products, activeProduct } = useSelector( state => state.products );

    const setActiveProduct = ( productsElement ) => {
        dispatch( onSetActiveProduct( productsElement ) );
    }

    // Get productos pero solo actualiza el estado
    const startLoadingProducts = async() => { 
        try {
            const { data } = await ecommerceApi.get('/productos');
            // console.log(data.results)
            dispatch( onLoadProducts( data.results ) );        
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error)
        }
    }

    //GET y retornar todos los productos
    const startGetAllProducts = async() => { 
        try {
            const { data } = await ecommerceApi.get('/productos');
            return data.results; //retornamos los productos para darles algun uso afuera
        } catch (error) {
            console.log('Error obtieniendo los productos');
            console.log(error.response)
        }
    }

    const startGetProductById = async( id ) => { 
        //retorna: { todo }
        try {
            const { data } = await ecommerceApi.get(`/productos/${id}`);
            // console.log(data)
            return data;
        } catch (error) {
            console.log('Error cargando lo solicitado');
            console.log(error.response)
        }
    }

    //POST - crear Producto
    const startCreateProduct = async( {name, price, category, brand, image} ) => {
        const formData = new FormData();
        formData.append('categoria', category);  // nombre de la categoría
        formData.append('nombre', name);
        formData.append('tipo', brand);
        formData.append('medidas', '10');
        formData.append('precio', Number(price));
        if (image) {
            formData.append('foto', image);
        }
        try {
            const { data } = await ecommerceApi.post('/productos/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log("recibido:", data);
            dispatch(onAddNewProduct({ ...data }));
        } catch (error) {
            console.log(error.response?.data);
            Swal.fire('Error al guardar', 'Hubo un problema al crear el producto', 'error');
        }
    }

    // PUT - actualizar productos
    const startUpdateProduct = async({ name, price, category, brand, image } ) => {
        const formData = new FormData();
        formData.append('categoria', category); // nombre de la categoría
        formData.append('nombre', name);
        formData.append('tipo', brand);
        formData.append('medidas', '10');
        formData.append('precio', Number(price));
        if (image) {
            formData.append('foto', image);
        }
    
        try {
            const { data } = await ecommerceApi.put(`/productos/${activeProduct.id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            dispatch(onUpdateProduct({ ...data }));
        } catch (error) {
            console.log(error.response?.data);
            Swal.fire('Error al guardar', 'Hubo un problema al actualizar el producto', 'error');
        }
    }

    const startDeleteProduct = async() => {
            console.log('el prodcuto activo');
            console.log(activeProduct);
        try {          
            // await ecommerceApi.delete( `/productos/${ Number(activeProduct.id) }/` );
            await ecommerceApi.delete( `/productos/${ activeProduct.id }/` );
            dispatch( onDeleteProduct( ) );
            return;
        } catch (error) {
            console.log(error);
            Swal.fire('Error al borrar', error, 'error');
        }
    }

    return {
        //Propiedades
        products,
        activeProduct,

        //Metodos
        startLoadingProducts,
        startCreateProduct,
        setActiveProduct,
        startUpdateProduct,
        startDeleteProduct,
        startGetProductById,
        startGetAllProducts,
    }


}
