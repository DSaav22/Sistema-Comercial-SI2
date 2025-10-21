import { useNavigate } from "react-router-dom";



export const OptionsPayMethods = () => {

    const navigate = useNavigate();

    const onClickPaymentMethod = ( paymentMethod ) => {
        switch (paymentMethod) {
            case 'visa':
                navigate('/admin/paymethod/visa');  //redirigir
                break;
            case 'mastercard':
                navigate('/admin/paymethod/mastercard');  //redirigir
                break;
            case 'paypal':
                navigate('/admin/paymethod/paypal');  //redirigir
                break;
            default:
                navigate('/admin/paymethod');  //redirigir
                break;
        }
    }

    return (
        <>
       
        <div className="container d-flex align-items-center justify-content-center bg-secondary">

            <div className="col">

                <div className="card text-center">
                    <div className="card-header">
                        Seleccione el metodo de pago
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-3">
                                <img 
                                    src="https://www.clipees.com/wp-content/uploads/Visa-100x100.png" 
                                    className="img-fluid cursor-pointer"
                                    style={{ cursor: 'pointer' }}
                                    alt="" onClick={ onClickPaymentMethod('tarjeta') } 
                                /> 
                            </div>                           
                            <div className="col-3">
                                <img 
                                    src="https://www.clipees.com/wp-content/uploads/Visa-100x100.png" 
                                    className="img-fluid"
                                    style={{ cursor: 'pointer' }}
                                    alt="" onClick={ onClickPaymentMethod('paypal') } 
                                />
                            </div>
                            <div className="col-3">
                                <img 
                                    src="https://www.clipees.com/wp-content/uploads/Visa-100x100.png" 
                                    className="img-fluid"
                                    style={{ cursor: 'pointer' }}
                                    alt="" onClick={ onClickPaymentMethod('qr') } 
                                />
                            </div>
                            <div className="col-3">
                                <img 
                                    src="/assets/images/no_image.jpg" 
                                    className="img-fluid"  
                                    style={{ cursor: 'pointer' }}
                                    alt="" onClick={ onClickPaymentMethod('qr') }                                
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div></div>

        </div>
        
        </>
    )

}
