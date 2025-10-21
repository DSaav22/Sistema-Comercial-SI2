import { useNavigate } from "react-router-dom"
import { useUserCartStore } from "../../controllers";




export const SecondNavbar = () => {
  
  const { setActiveProductCart } = useUserCartStore();


    const navigate = useNavigate();

    const onClickCarrito = () => {
      setActiveProductCart(null);
      navigate('/admin/cart');
    }

  return (
    <nav className="navbar bg-body-tertiary justify-content-center">
        <div className="container-fluid justify-content-center">
            <a className="navbar-brand" href="#">Cocina</a>
            <a className="navbar-brand" href="#" onClick={ onClickCarrito }>Carrito </a>
            <a className="navbar-brand" href="#">Jardineria</a>
        </div>
    </nav>
  )
}
