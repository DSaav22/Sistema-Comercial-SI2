import Modal from "react-modal"
import { useUiStore } from "../../controllers/modal/useUiStore";
import { useProductStore } from "../../controllers";
import { useEffect, useMemo, useState } from "react";





const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};



Modal.setAppElement('#root');

export const ProductModal = () => {


    const { isProductModalOpen, closeProductModal } = useUiStore();
    const { activeProduct, startModificateProduct } = useProductStore();
    const [ formSubmited, setFormSubmited ] = useState(false);

    const [ formValues, setFormValues ] = useState({
        name: '',
        price: 0,
        category: '',
        img: '',
        brand: '',
    });

    const nameClass = useMemo( () => {
        if ( !formSubmited ) return '';

        return ( formValues.name.legth > 0 )
            ? ''
            : 'is-invalid';
    }, [ formValues.name, formSubmited ] );

    useEffect(() => {
      
        if ( activeProduct !== null ) {
            setFormValues({ ...activeProduct });
        }
     
    }, [activeProduct]);
    

    const onInputChange = ( { target } ) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onDateChanged = ( product, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: product
        });
    }

    const onCloseModal = () => { //funcion para cerrar el modal
        closeProductModal();

    }

    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmited(true);
        
        if ( formValues.name.legth <= 0 ) return;

        console.log(formValues);
        await startModificateProduct( formValues );
        closeProductModal();
        setFormSubmited(false);
    }

    return (
        <Modal
            isOpen={ isProductModalOpen }
            onRequestClose={ onCloseModal }
            style={ customStyles }
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={ 200 }
        >

            <h1> Modificar Producto </h1>
            <hr />

            <form className="container" onSubmit={ onSubmit }>

                <div className="form-group mb-2">
                <label>Fecha y hora inicio</label>
                    
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={ `form-control ${nameClass}` }
                        placeholder="Título del evento"
                        name="name"
                        autoComplete="off"
                        value={ formValues.name }
                        onChange={ onInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Marca"
                        rows="5"
                        name="brand"
                        value={ formValues.brand}
                        onChange={ onInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )

}
