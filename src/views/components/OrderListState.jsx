


export const OrderListState = ( order ) => {

    console.log(order);

    return (
        <div className="card w-75 mb-3">
            <div className="card-body" style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}>
                <div className="row">
                <h5 className="card-title">{ order.estado }</h5>
                </div>
                <div className="row">
                    <div className="col-3">Fecha de orden
                        <p className="card-text">{ order.fecha_creacion ? order.fecha_creacion.split('T')[0] : '' }</p>
                    </div>
                    <div className="col-3">Total
                        <p className="card-text">{ order.monto_total }.</p>
                    </div>
                    <div className="col-3">numero de orden
                        <p className="card-text"> {order.id} </p>
                    </div>
                </div>
                
                
                {/* <a href="#" class="btn btn-primary">Button</a> */}
            </div>
        </div>  
    )
}
