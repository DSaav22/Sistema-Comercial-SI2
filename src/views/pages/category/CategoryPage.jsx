import { useEffect, useState } from "react";
import { useCategoryStore } from "../../../controllers";
import { CategoryCard } from "../../components/CategoryCard";
import { useNavigate } from "react-router-dom";

export const CategoryPage = () => {
  
    const navigate = useNavigate();
    const { categories, startLoadingCategories, isLoadingCategory, activeCategory, startDeleteCategory, setActiveCategory } = useCategoryStore();
    
    const [flag, setflag] = useState(false)

    useEffect(() => {
        startLoadingCategories();
    }, [  ]);

    useEffect(() => {
        if ( !activeCategory && flag ) { //para que vaya a  crear
            setflag(false); 
            navigate('/admin/category/manage');
        }
    }, [activeCategory, flag])

    if (isLoadingCategory) {
        return <div>Loading categories...</div>; // los datos están cargando.
    }

    const onClickCreate = () => {
        setActiveCategory(null);
        setflag(true);   
    }

    const onClickUpdate = () => {
        setflag(false);
        navigate('/admin/category/manage');
    }

    const onClickDelete = () => {
        startDeleteCategory();
    }


    return (
        // Horizontal
        <>
            <div className="list-group">
                   
                        <ul className="list-group list-group-horizontal ms-4 me-4">
                            
                            <li className="list-group-item w-100 " style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
                                <div className="container text-center">
                                    <div className="row align-items-start">
            
                                        <div className="col-1"> ID </div>
                                        <div className="col"> Nombre </div>
                                        <div className="col"> Descripcion </div>
            
                                    </div>
                                </div>
                            </li>
                            
                        </ul>
            
                        <div className="overflow-auto" style={{ maxHeight: '50vh' }}>
                            {
                                categories.map( category => (
                                    <CategoryCard 
                                        key={category.id}
                                        {...category}
                                    />
                                ) )
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
                                            Registrar Categoria
                                        </button>                     
                                    </div>
                                    <div className="col-4 ">
                                        <button 
                                            type="button"
                                            disabled={!activeCategory} 
                                            className="btn btn-primary w-100"
                                            onClick={ onClickUpdate }
                                        >
                                            Editar Categoria
                                        </button>                     
                                    </div>
                                    <div className="col-4 ">
                                        <button type="button" 
                                            className="btn btn-danger w-100" 
                                            onClick={ onClickDelete }
                                            disabled={ !activeCategory }
                                        >
                                            Eliminar
                                        </button>                          
                                    </div>
            
                                </div>          
                            </li>
            
                        </ul>
                    </div>
        </>
        
        
    )
}
