import { useDispatch, useSelector } from "react-redux"
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../../store";
import ecommerceApi from "../../api/ecommerceApi";
import ecommerceApiOpen from "../../api/ecommerceApiOpen";





export const useAuthStore = () => {

    const { status, user, errorMessage, role } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    
    const startLogin = async( { username, password } ) => {

        dispatch( onChecking() );
        try {
            const { data } = await ecommerceApiOpen.post('/token', { username, password }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }  );
            console.log(data);
            // Guarda el token
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);

            // Extrae la info del usuario directamente de la respuesta
            const usuario = data.user;

            localStorage.setItem('usuario', usuario.username);
            var id = usuario.url.split('/').slice(-2, -1)[0];
            localStorage.setItem('id', id); // Extrae el ID del URL tipo "/users/3/"
            
            const rol = usuario.groups && usuario.groups.length > 0 ? usuario.groups[0] : 'administradores';
            localStorage.setItem('role', rol);
            dispatch( onLogin( { name: usuario.username, id: Number(id), groups: rol } ) ); //revisar que nos retornara el backend
        } catch (error) {
            console.log(error)
            dispatch( onLogout('Credenciales Incorrectas') );
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 3000 )
        }
    }

    const startRegister = async( { username, email, password, groups } ) => { //Crear Usuario
        dispatch( onChecking() );
        try {
            var jsonBody = { username, email, password, groups: Array.isArray(groups) ? groups : [groups] };
            console.log(JSON.stringify(jsonBody));
            const { data } = await ecommerceApiOpen.post('/register', jsonBody, {
                headers: {
                    'Content-Type': 'application/json'
                }
            } ); 
            console.log(data);
            // Guarda el token
            localStorage.setItem('token', data.access);
            localStorage.setItem('refresh', data.refresh);

            // Extrae la info del usuario directamente de la respuesta
            const usuario = data.user;

            localStorage.setItem('usuario', usuario.username);
            var id = usuario.url.split('/').slice(-2, -1)[0];
            localStorage.setItem('id', id); // Extrae el ID del URL tipo "/users/3/"
            
            const rol = usuario.groups && usuario.groups.length > 0 ? usuario.groups[0] : 'administradores';
            localStorage.setItem('role', rol);
            dispatch( onLogin( { name: usuario.username, id: Number(id), groups: rol } ) );
        } catch (error) { 
            console.log('Error en registro:', error.response?.data);  
            dispatch( onLogout(JSON.stringify(error.response?.data)) );  
            setTimeout( () => {
                dispatch( clearErrorMessage() );
            }, 3000 )   
        }
    }
    

    //esto es para recuperar 
    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        const usuario = localStorage.getItem('usuario');
        const uid = localStorage.getItem('id');
        const role = localStorage.getItem('role');

        if (!token || !usuario || !uid || !role) {
            localStorage.clear();
            dispatch(onLogout());
            return;
        }

        try {
            dispatch(onLogin({
                name: usuario,
                id: Number(uid),
                groups: role
            }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    return {
        //Propiedades
        status,
        user,
        role,
        errorMessage,

        //Metodos
        startLogin,
        startRegister,
        checkAuthToken,
        startLogout,

    }

}
