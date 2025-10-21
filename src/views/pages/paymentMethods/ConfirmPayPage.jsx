



export const ConfirmPayPage = () => {



    return (
        <div className="container">
           
            <div className="row mt-5">

                <div className="card text-center bg-success">                   
                    <div className="card-body bg-success">
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="row justify-content-start">                          
                            <h5 className="text-white"> Tu pago ha sido registrado, en un momento te confimaremos el pedido.</h5>
                            {/* <p class="text-white bg-dark">.text-white</p> */}
                        </div>
                    </div>
                </div>

            </div>

            <div className="row">
                <div className="card ">
                {/* <div className="card-header">
                    Featured
                </div> */}
                <div className="card-body">
                    <div className="row mt-4">
                        <div className="col-6">
                            <h5>Numero de orden </h5>
                        </div>
                        <div className="col-6">
                            <p className="card-text">With support</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6">
                            <h5>ID Organizacion </h5>
                        </div>
                        <div className="col-6">
                            <p className="card-text">With support</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6">
                            <h5>Nro. Factura </h5>
                        </div>
                        <div className="col-6">
                            <p className="card-text">With support</p>
                        </div>
                    </div>
                    <div className="row mt-4">
                        <div className="col-6">
                            <h5>Importe </h5>
                        </div>
                        <div className="col-6">
                            <p className="card-text">With support</p>
                        </div>
                    </div>
                    
                    <div className="row mt-4 justify-content-center">
                        <h5 className="text-center"> A la  brevedad recibira un comprobante de pago</h5>
                    </div>

                    <div className="row mt-4 justify-content-center">
                        
                        <button className="btn btn-primary w-25 mb-4"> Volver </button>
                    </div>
                </div>
                </div>
            </div>     
                
           
        </div>
    )


}
