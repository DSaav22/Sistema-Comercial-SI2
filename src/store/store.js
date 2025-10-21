import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { productSlice } from "./product/productSlice";
import { authSlice } from "./auth/authSlice";
// import { uiSlice } from "./modal/uiSlice";
import { categorySlice } from "./category/categorySlice";
import { branchSlice } from "./branch/branchSlice";
import { userCartSlice } from "./cart/userCartSlice";
import { inventorySlice } from "./inventory/inventorySlice";
import { cartSlice } from "./cart/cartSlice";
import { orderSlice } from "./orders/orderSlice";
import { userOrdersSlice } from "./orders/userOrdersSlice";




// const persistConfig = {
//     key: 'auth', // Este es el nombre de la clave en localStorage
//     storage,
//     whitelist: ['auth'] // Aquí especificas qué slice debe persistir (solo 'auth' en este caso)
// };
// const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
   
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
          serializableCheck: false,
    }),

    reducer: {     
        // auth: persistedAuthReducer,
        auth: authSlice.reducer,
        products: productSlice.reducer,
        categories: categorySlice.reducer,
        branches: branchSlice.reducer,
        userCart: userCartSlice.reducer,
        inventories: inventorySlice.reducer, 
        carts: cartSlice.reducer,
        userOrders: userOrdersSlice.reducer,
        order: orderSlice.reducer,
        // ui: uiSlice.reducer,
        // calendar: calendarSlice.reducer,
    }
})

// const persistor = persistStore(store);

export { store, 
        // persistor 
};