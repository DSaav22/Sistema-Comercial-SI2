import { useSelector } from "react-redux"
import { useProductStore } from "../../controllers"
import { ProductItem } from "./ProductItem"





export const ProductsList = () => {

    const { products } = useSelector( state => state.products )
    // console.log(products);
    // const heroes = useMemo( () => getHeroesByPublisher(publisher), [publisher] )

    // const heroes = getHeroesByPublisher(publisher); //no descomentar esta
    return (

        <div className="row rows-cols-1 row-cols-md-3 g-3 mt-3">
            { 

                products.map( product => (
                    <ProductItem 
                        key={product.id}
                        {...product}
                    />
                ) )

                // heroes.map( hero => (
           
                //     <HeroItem
                //         key={hero.id} 
                //         {...hero}
                //     />

                // )
            }
            
            
        
        </div>
    )
}
