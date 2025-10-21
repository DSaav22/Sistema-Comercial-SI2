import { SecondNavbar } from "../ui/SecondNavbar"
import { Sidebar } from "../ui/Sidebar"
import { MainLayout } from '../MainLayout';
import { ProductManagement } from "./ProductManagement/ProductManagement"
import { ProductsPage } from "./ProductsPage"
import { useUserCartStore } from "../../controllers";
import { useEffect } from "react";



export const HomePage = () => {
   

  return (  

    <>

      <SecondNavbar />
      <ProductsPage />
    </>
    
  )


}
