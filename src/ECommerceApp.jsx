

import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { store } from "./store/store"
import { AppRouter } from "./router/AppRouter"
// import { AuthProvider } from "./auth/AuthProvider"



export const EcommerceApp = () => {

  return (
    
      <Provider store={ store }>
        {/* <BrowserRouter> */}
          <AppRouter/>
        {/* </BrowserRouter> */}
      </Provider>
      
    
  )

}
