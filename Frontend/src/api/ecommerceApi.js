import axios from 'axios';
import { getEnvVariables } from '../helpers';




const { VITE_API_URL } = getEnvVariables();

const ecommerceApi = axios.create({

    baseURL: VITE_API_URL

});

//TODO: Configurar interceptores
ecommerceApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        // 'x-token': localStorage.getItem('token') // todavia no tengo tokens
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }

    return config;
} )

ecommerceApi.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // Redirige a login
            window.location.href = '/auth/login';
        }

        // Rechaza el error para que los demás puedan manejarlo si lo necesitan
        return Promise.reject(error);
    }
);

export default ecommerceApi;
