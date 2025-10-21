// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
import './styles.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { EcommerceApp } from './ECommerceApp'; //Aplicacion
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Modal from 'react-modal';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './store'; // Asegúrate de importar el store y el persistor
Modal.setAppElement('#root');
const router = createBrowserRouter([

      {
        path: "*",
        element: <EcommerceApp />,
      },],

      {
        future: {
          v7_fetcherPersist: true,
          v7_normalizeFormMethod: true,
          v7_partialHydration: true,
          v7_relativeSplatPath: true,
          v7_skipActionErrorRevalidation: true,
        },
      }
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <PersistGate loading={null} persistor={persistor}> */}
      <RouterProvider router={router} future={{ v7_startTransition: true }}/>
    {/* </PersistGate> */}
    {/* <MainApp /> */}
  </React.StrictMode>
);



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )
