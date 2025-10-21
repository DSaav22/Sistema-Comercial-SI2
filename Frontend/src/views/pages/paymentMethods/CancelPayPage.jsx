






export const CancelPayPage = () => {



    return (
        <div className="container">
           
            <div className="row mt-5">

                <div className="card text-center bg-danger">                   
                    <div className="card-body bg-danger">
                        <br />
                        <br />
                        <br />
                        <br />
                        <div className="row justify-content-start">                          
                            <h5 className="text-white"> Lamentamos que no hayas podido completar el pago, puedes intentar nuevamente luego.</h5>
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
                        <h5 className="text-center"> Puede intentarlo mas tarde</h5>
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
