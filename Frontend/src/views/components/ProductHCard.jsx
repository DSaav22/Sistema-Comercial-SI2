import { useDispatch } from "react-redux";
import { useProductStore, useUiStore } from "../../controllers";
// import { ProductModal } from "./ProductModal";
import { onDeleteProduct, onSetActiveProduct } from "../../store";
import { Navigate, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";





export const ProductHCard = ( { id, nombre: name, precio: price, categoria: category, tipo:brand, foto: image } ) => {


    // const { openProductModal } = useUiStore();

    // const openModal = (  ) => {
    //     // console.log({ click: event });
    //     openProductModal();
    // }

    const navigate = useNavigate();
    const dispatch = useDispatch(); 

    // const { startDeleteProduct } = useProductStore();

    const onClickEdit = () => {

        dispatch( onSetActiveProduct({ id, name, price, category, brand, image }) );
        navigate(`/admin/product/create`); // Cambia a la ruta de la página de edición
    }



  return (

    <>
        <div className="card mb-3 ">
            <div className="row g-0">

                <div className="col-md-8 mt-2  w-25 justify-content-center ">
                    <img 
                        src={image} 
                        className="img-fluid h-25" 
                        alt="..."
                        // style={{ objectFit: 'contain', width: 'auto', height: 'auto' }}
                    />
                </div>
                
                <div className="col-md-8 b">
                    <div className="card-body d-flex ">
                        <h5 className="card-title"> {name}</h5>
                        <p className="card-text"> { price } </p>
                        <p className="card-text"><small className="text-body-secondary"> { brand } </small></p>
                        {/* <div className="row d-inline-flex gap-1 d-flex w-100"> */}
                            <button 
                                type="button" 
                                className="btn btn-primary w-25"
                                onClick={ onClickEdit }
                            >
                                Editar
                            </button>

                        {/* </div> */}
                    </div>
                </div>

            </div>
        </div>

        {/* <ProductModal /> */}
    </>

  )
}
