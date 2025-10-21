import { useState } from "react";
import { useForm } from "../../../helpers/useForm";




const formData = {
    name: '',
    lastName: '',
    phone: 0,
    email: '',
    address: '',
}

export const AddressSendPage = () => {

    const {name, lastName, phone, email, address, onInputChange } = useForm( formData );

    const [selectedRadio, setSelectedRadio] = useState(null);

    const onClickCheckBox = (event) => {
        setSelectedRadio(event.target.value );
    };

    const addDirectionSubtmit = ( event ) => {
        event.preventDefault();
        console.log(formData);
    }
   

    return (
        <>
            <div className="container">
                <ul className="list-group">
                    <li className="list-group-item">
                        <input 
                            className="form-check-input me-1" 
                            type="radio" 
                            name="listGroupRadio" 
                            value="first" 
                            id="firstRadio" 
                            checked = { selectedRadio === "first" }
                            onChange={ onClickCheckBox }
                        />
                        <label className="form-check-label" htmlFor="firstRadio">First radio</label>
                    </li>
                    <li className="list-group-item">
                        <input 
                            className="form-check-input me-1" 
                            type="radio" 
                            name="listGroupRadio" 
                            value="second" 
                            id="secondRadio"
                            checked={selectedRadio === "second"}
                            onChange={ onClickCheckBox }
                        />
                        <label className="form-check-label" htmlFor="secondRadio">Second radio</label>
                    </li>
                    <li className="list-group-item">
                        <input 
                            className="form-check-input me-1" 
                            type="radio" 
                            name="listGroupRadio" 
                            value="third" 
                            id="thirdRadio"
                            checked={selectedRadio === "third"}
                            onChange={ onClickCheckBox }
                        />
                        <label className="form-check-label" htmlFor="thirdRadio">Third radio</label>
                    </li>
                </ul>
              
    
                <div className="container" style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}>
                    <form onSubmit={ addDirectionSubtmit }>

                    <div className="row align-items-start">
                        <button className="btn btn-primary">Continuar con la direccion seleccionada</button>
                    </div>
                    <hr />
                        <span>O ingresa nueva direccion</span>
                    <br />
                        {/* nombre */}
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Nombres"
                                name="name"
                                value={ name }
                                onChange={ onInputChange }
                            />
                        </div>
                        {/* apellido */}
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Apellidos"
                                name="lastName"
                                value={ lastName }
                                onChange={ onInputChange }
                            />
                        </div>
                        {/* telefono */}
                        <div className="form-group mb-2">
                            <input 
                                type="number"
                                className="form-control"
                                placeholder="Telefono"
                                name="phone"
                                value={ phone }
                                onChange={ onInputChange }
                            />
                        </div>
                        {/* correo */}
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="email"
                                value={ email }
                                onChange={ onInputChange }
                            />
                        </div>
                        {/* direccion */}
                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Direccion"
                                name="address"
                                value={ address }
                                onChange={ onInputChange }
                            />
                        </div>
                    </form>                  
                    
                </div>

                <div className="container ">

                    <div className="row">
                        <button className="btn btn-primary"> Registrar direccion</button>
                    </div>
                    <label htmlFor="">asdasd</label>
                    <label htmlFor="">asdasd</label>
                    <label htmlFor="">asdasd</label>

                </div>
                
            </div>
            
        
        </>
    )
}
