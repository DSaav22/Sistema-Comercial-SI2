
import { useCategoryStore } from "../../controllers";

export const CategoryCard = ( { id, nombre:name, descripcion } ) => {

    const { setActiveCategory, activeCategory } = useCategoryStore();
    
        const onClickActiveCategory = () => {
            setActiveCategory( { id,  name } );
        }
    
        const isActive = activeCategory && activeCategory.id === id;
    

  return (
        <ul className="list-group list-group-horizontal ms-4 me-4 ">
            <li className={ `list-group-item list-group-item-action w-100 ${isActive ? 'active' : ''}` }  
                                onClick={ onClickActiveCategory }>
                <div className="container text-center">
                    <div className="row align-items-start">
                        <div className="col-1 "> { id } </div>
                        <div className="col"> { name } </div>
                        <div className="col"> { descripcion } </div>
                    </div>
                </div>
            </li>
            
        </ul>
  )

}
