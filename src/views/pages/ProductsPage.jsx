import { useEffect } from "react"
import { ProductsList } from "../components/ProductsList"
import { Carousel } from "../ui/Carousel"
import { useAuthStore, useProductStore, useUserCartStore } from "../../controllers"




export const ProductsPage = () => {

  const { user } = useAuthStore();
  const { startLoadingProducts } = useProductStore();
  const { startGetLastCart } = useUserCartStore();

  useEffect(() => {

    if ( user ) {
      startLoadingProducts();
      startGetLastCart();
    }
  }, [user]);

  return (

    // Ya esta dentro de un container
    <>
        
        <ProductsList />
    
    </>

  )
}
