import { useEffect, useState } from "react";
import { useProductStore } from "../../../controllers/index.js"
import { ProductListItem } from "../../components/ProductListItem.jsx";
import { useNavigate } from "react-router-dom";

export const ProductsListPage = () => {

    const navigate = useNavigate();
    const { products, 
            startLoadingProducts, 
            activeProduct, 
            startDeleteProduct, 
            setActiveProduct, 
            isLoadingProducts } = useProductStore();

    const [flag, setflag] = useState(false)

    useEffect(() => {
      startLoadingProducts();
    }, [])
    
    useEffect(() => {
        if ( !activeProduct && flag ) { //para que vaya a  crear
            setflag(false); 
            navigate('/admin/product/manage');
        }
    }, [activeProduct, flag])

    // useEffect(() => {
    //     // startLoadingProducts();
    //     // console.log('rederizafdo')
    // }, [isLoadingProducts])
    
    
    const onClickCreate = () => {
        setActiveProduct(null);
        setflag(true);   
    }

    const onClickUpdate = () => {
        setflag(false);
        navigate('/admin/product/manage');
    }

    const onClickDeleteProduct = () => {
        startDeleteProduct();
    }

    return (

        <div className="list-group">
            {/* <a href="#" className="list-group-item list-group-item-action">A simple item</a> */}
       
            <ul className="list-group list-group-horizontal ms-4 me-4">
                
                <li className="list-group-item w-100 " style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
                    <div className="container text-center">
                        <div className="row align-items-start">
                            <div className="col-1"> ID </div>
                            <div className="col"> Categoria </div>
                            <div className="col"> Nombre </div>
                            <div className="col"> Tipo </div>
                            <div className="col"> Precio </div>
                        </div>
                    </div>
                </li>
                
            </ul>

            <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                {

                    // !isLoadingProducts
                    // ?   
                    products.map( product => (
                        <ProductListItem 
                            key={ product.id }
                            { ...product }
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
                                Registrar Producto
                            </button>                     
                        </div>
                        <div className="col-4 ">
                            <button 
                                type="button"
                                disabled={!activeProduct} 
                                className="btn btn-primary w-100"
                                onClick={ onClickUpdate }
                            >
                                Editar Producto
                            </button>                     
                        </div>
                        <div className="col-4 ">
                            <button type="button" 
                                className="btn btn-danger w-100" 
                                onClick={ onClickDeleteProduct }
                                disabled={ !activeProduct }
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
