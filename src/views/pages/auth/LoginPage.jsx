
import { useAuthStore } from '../../../controllers'
import { useForm } from '../../../helpers/useForm'
import './LoginPage.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
}

/// =====================   principaalll ===================///////////

export const LoginPage = () => {
    const dispatch = useDispatch();
    const { errorMessage } = useSelector(state => state.auth);
    const { startLogin, startRegister } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm( loginFormFields );
    const { registerName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm( registerFormFields )
    
    
    const loginSubmit = ( event ) => {
        event.preventDefault();
        // console.log({ loginEmail, loginPassword });
        startLogin({ username: loginEmail, password: loginPassword });
    }

    const registerSubmit = ( event) => {
        event.preventDefault();
        if ( registerPassword !== registerPassword2 ){
            Swal.fire('Error en registro', 'Las contraseñas no coinciden', 'error');
            return;
        }
        //{username, email, password, groups[] } Luego arreglar
        startRegister( {username:registerName, email:registerEmail, password: registerPassword, groups: ["administradores"]} );
    }

    useEffect(() => {
        if (errorMessage) {
            toast.error(errorMessage, {
                position: "top-center",
                autoClose: 5000,  // Se cierra después de 5 segundos
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }, [errorMessage]);

  return (
    
    <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>

                    <form onSubmit={ loginSubmit }>

                        <div className="form-group mb-2">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={ loginEmail }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={ loginPassword }
                                onChange={ onLoginInputChange }
                            />
                        </div>
                        <div className="d-grid gap-2">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>

                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ registerSubmit }>
                        <div className="form-group mb-2">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={ registerName }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={ registerEmail }
                                onChange={ onRegisterInputChange }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="registerPassword"
                                value={ registerPassword }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="form-group mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="registerPassword2"
                                value={ registerPassword2 }
                                onChange={ onRegisterInputChange }
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
    </div>

  )



}
