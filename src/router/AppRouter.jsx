// import { Route, Routes } from "react-router-dom"
import { useAuthStore } from "../controllers";
import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom"


import { MainLayout } from "../views/MainLayout";
import { AdminLayout } from "../views/AdminLayout";

import { HomePage } from "../views/pages/HomePage"
import { ProductsPage } from "../views/pages/ProductsPage";
import { LoginPage } from "../views/pages/auth/LoginPage";

import { ProductsListPage } from "../views/pages/ProductManagement/ProductListPage";
import { ProductManagement } from "../views/pages/ProductManagement/ProductManagement";
import { CategoryPage } from "../views/pages/category/CategoryPage";
import { PutCreateCategory } from "../views/pages/category/PutCreateCategory";
import { BranchesPage } from "../views/pages/Branch/BranchesPage";
import { BranchManagement } from "../views/pages/Branch/BranchManagement";
import { AddressSendPage } from "../views/pages/address/AddressSendPage";
import { OptionsPayMethods } from "../views/pages/paymentMethods/OptionsPayMethods";
import { InventoryPage } from "../views/pages/inventory/InventoryPage";
import { InventoryManagementPage } from "../views/pages/inventory/InventoryManagementPage";
import { UserCartPage } from "../views/pages/cart/UserCartPage";
import { CartPage } from "../views/pages/cart/CartPage";
import { ConfirmPayPage } from "../views/pages/paymentMethods/ConfirmPayPage";
import { CancelPayPage } from "../views/pages/paymentMethods/CancelPayPage";
import { UserOrdersPage } from "../views/pages/order/UserOrdersPage";



export const AppRouter = () => {

  const { status, role, checkAuthToken } = useAuthStore();

  useEffect(() => {    
    checkAuthToken();
  }, [])

  if ( status === 'checking' ) {
    return (
      <h3>Cargando...</h3>
    )
  }

  return (
    <Routes>
      {
        (status === 'not-authenticated')
          ? (
            <>
              <Route path="/auth/login" element={<LoginPage />} />
              <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )
          : (
            <>
              {/* Público o clientes */}
              <Route path="/products" element={<MainLayout><ProductsPage /></MainLayout>} />
              <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
              <Route path="/success" element={<MainLayout><ConfirmPayPage /></MainLayout>} />
              <Route path="/cancel" element={<MainLayout><CancelPayPage /></MainLayout>} />
              <Route path="/orders" element={<MainLayout><UserOrdersPage /></MainLayout>} />

              {/* Admin Pages con AdminLayout */}
              <Route path="/admin/*" element={<AdminLayout>
                <Routes>
                  <Route path="product/manage" element={<ProductManagement />} />
                  <Route path="product" element={<ProductsListPage />} />
                  <Route path="category" element={<CategoryPage />} />
                  <Route path="category/manage" element={<PutCreateCategory />} />
                  <Route path="branch" element={<BranchesPage />} />
                  <Route path="branch/manage" element={<BranchManagement />} />
                  <Route path="cart" element={<UserCartPage />} />
                  <Route path="inventory" element={<InventoryPage />} />
                  <Route path="inventory/manage" element={<InventoryManagementPage />} />
                  <Route path="admcart" element={<CartPage />} />
                </Routes>
              </AdminLayout>} />

              {/* Otros con AdminLayout también */}
              <Route path="/enlace/*" element={<AdminLayout>
                <Routes>
                  <Route path="address" element={<AddressSendPage />} />
                  <Route path="payoptions" element={<OptionsPayMethods />} />
                </Routes>
              </AdminLayout>} />

              {/* Catch all */}
              <Route path="/*" element={<Navigate to="/" />} />
            </>
          )
      }
    </Routes>
  );

}

