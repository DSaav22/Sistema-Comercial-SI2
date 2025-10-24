import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../controllers';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { processSpeechCommand } from '../../helpers/SpeechRecognition';
import { useUserCartStore } from '../../controllers';
import { useProductStore } from '../../controllers'; 
import { useSelector } from "react-redux";

export const Navbar = () => {

    const navigate = useNavigate();
    const { startLogout } = useAuthStore();
    const [usuario, setUsuario] = useState(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition, isMicrophoneAvailable } = useSpeechRecognition();
    const { startAddProductCart, startRemoveProductCart, cartProducts, cart } = useUserCartStore();
    const { startGetAllProducts } = useProductStore();

    const [products, setProducts] = useState([]); 

    useEffect(() => {
        const nombreUsuario = localStorage.getItem('usuario');
        if (nombreUsuario) {
            setUsuario(nombreUsuario);
        }
        const fetchProducts = async () => {
            if (products.length === 0) { // <-- Verificamos antes de cargar
                const allProducts = await startGetAllProducts();
                setProducts(allProducts);
            } else {
                console.log('Productos ya cargados en cache');
            }
        };

        fetchProducts();
    }, []);

    const onLogout = () => {
        startLogout();
        setUsuario(null);
        navigate('/', {
            replace: true
        });
    };

    const onLogin = () => {
        navigate('/auth/login', {
            replace: true
        });
    };

    // Función para abrir el modal
    const openModal = () => {
        setIsModalOpen(true);
        SpeechRecognition.startListening();  // Inicia la escucha
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setIsModalOpen(false);
        SpeechRecognition.stopListening();  // Detén la escucha
        console.log("Texto confirmado: ", transcript);
    };

    // Función para confirmar el texto escuchado
    const handleTextConfirmation = async () => {
        console.log("Texto confirmado: ", transcript);
        await processSpeechCommand(transcript, products, cart, cartProducts, startAddProductCart, startRemoveProductCart);
        closeModal(); // Cerrar el modal después de la confirmación
    };

    // Función para reiniciar el texto escuchado
    const handleResetTranscript = () => {
        resetTranscript(); 
        SpeechRecognition.startListening(); 
    };

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark p-2 px-3">
            <Link className="navbar-brand px-3" to="/">
                E-Commerce
            </Link>

            <div className="navbar-collapse d-flex justify-content-center w-100">
                <div className="navbar-nav d-flex justify-content-center w-100">
                    <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/products">
                        Productos
                    </NavLink>
                    
                    <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/orders">
                        Mis Pedidos
                    </NavLink>
                    
                    <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/reports">
                        Reportes
                    </NavLink>

                    <form className="d-flex w-50 justify-content-center flex-grow-1" role="search">
                        <input
                            className="form-control me-2 flex-grow-1 "
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            style={{ maxWidth: '800px' }}
                        />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <button onClick={openModal}>
                        <i className="fa fa-microphone"></i> Iniciar Reconocimiento de Voz
                    </button>
                </div>
            </div>

            <div className="navbar-collapse collapse order-3 dual-collapse2 d-flex justify-content-end">
                {usuario && (
                    <ul className="navbar-nav ml-auto">
                        <span className="nav-item nav-link text-primary">
                            {usuario}
                        </span>

                        <button
                            className="nav-item nav-link btn"
                            onClick={onLogout}
                        >
                            Logout
                        </button>
                    </ul>
                )}
                {usuario == null && (
                    <ul className="navbar-nav ml-auto">
                        <button
                            className="nav-item nav-link btn"
                            onClick={onLogin}
                        >
                            Login
                        </button>
                    </ul>
                )}
            </div>

            <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{
                overlay: {
                zIndex: 2000,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                zIndex: 2001, 
                }
            }}>
                <h2>Reconocimiento de Voz</h2>
                {browserSupportsSpeechRecognition && isMicrophoneAvailable ? (
                    <>
                        <p>Di una orden específica, iniciando con un verbo y mencionando el nombre completo del producto, como</p>
                        <h5>"<u>Agregar</u> <em>mochila</em> al carrito"</h5>
                        <p>No uses ordenes complejas. Keep It Simple, s...</p>
                        <p>Puedes usar palabras como: "agregar", "anadir", "sumar", "meter", "aumentar" para agregar items al carrito</p>
                        <p>Puedes usar palabras como: "quitar", "eliminar", "borrar", "sacar", "restar" para quitar items al carrito</p>
                        <br />
                        <h3>{listening ? "Escuchando..." : "Dejamos de escuchar. Reiniciar?"}</h3>
                        <p><strong>Texto escuchado:</strong> {transcript}</p>
                        <p>Confirmá que te escuchamos bien para continuar.</p>
                        <button onClick={handleTextConfirmation}>Confirmar</button>
                        <button onClick={handleResetTranscript}>Reiniciar</button>
                        <button onClick={closeModal}>Cerrar</button>
                    </>
                ) : (
                    <>
                        {!browserSupportsSpeechRecognition && (
                            <p>Tu navegador no soporta esta funcionalidad.</p>
                        )}
                        {!isMicrophoneAvailable && (
                            <p>No tienes un micrófono conectado o permitido.</p>
                        )}
                    </>
                )}
            </Modal>

        </nav>
    );
};
