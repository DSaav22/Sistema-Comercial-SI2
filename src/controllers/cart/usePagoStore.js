import { useDispatch, useSelector } from "react-redux";
import ecommerceApi from "../../api/ecommerceApi";
import { loadStripe } from '@stripe/stripe-js';
import { getEnvVariables } from '../../helpers';

export const usePagoStore = () => {

    const { VITE_STRIPE_PUBLISHABLE_KEY } = getEnvVariables();
    const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY);

    const startStripePago = async( detail ) => {
        //detail es {id_carrito, direccion, latitud, longitud}
        detail.url_front_base = window.location.origin;
        try {
            const { data } = await ecommerceApi.post( '/pagar/', detail ); 
            console.log(data);
            // Redirige al Checkout de Stripe
            const stripe = await stripePromise;
            const result = await stripe.redirectToCheckout({
                sessionId: data.sessionId,
            });
            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {

        //Metodos
        startStripePago,
    }
}