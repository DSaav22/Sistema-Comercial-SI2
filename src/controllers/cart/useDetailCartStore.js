import ecommerceApi from "../../api/ecommerceApi";





export const useDetailCartStore = () => {


    // Get detalles
    const startLoadingDetails = async() => { 
        try {
            const { data } = await ecommerceApi.get('/category');
            // console.log({data})
            // dispatch( onLoadDetails( data ) );
        } catch (error) {
            console.log('Error cargando');
            console.log(error)
        }
    }

    //POST - crear detalles
    const startCreateDetails = async( detail ) => {
        //detail es {id_carrito, id_producto, cantidad}
        try {
            const { data } = await ecommerceApi.post( '/detalles_carrito/', detail ); 
            console.log(data);
            // dispatch( onAddNewCategory({ ...detail, id: data.id }) ); //aqui ponemos el id, asignado por el backend, al store
            return { success: true };
        } catch (error) {
            console.log(error);
        }
    }

    return {

        //Metodos
        startCreateDetails,
    }



}
