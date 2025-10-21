import { createSlice } from '@reduxjs/toolkit';



export const authSlice = createSlice({
    name: 'auth',

    initialState: {
        status: 'checking', // 'authenticated' 'no-authenticated'
        // status: 'not-authenticated', // 'authenticated' 'no-authenticated'
        user: {

        },
        role: 'GUEST', // 'ADMIN' 'CLIENT' 'GUEST'
        errorMessage: undefined,
    },

    reducers: {

        onChecking: ( state ) => {
            // state.status = 'not-autheticated';
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },

        onLogin: ( state, { payload } ) => {
            state.status = 'authenticated';
        
            state.user = payload;
        
            state.errorMessage = undefined;
        
            // Asignamos rol en base al grupo
            switch (payload.groups?.toLowerCase()) {
                case 'administradores':
                    state.role = 'ADMIN';
                    break;
                case 'clientes':
                    state.role = 'CLIENT';
                    break;
                default:
                    state.role = 'GUEST';
                    break;
            }
        },
        
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
            state.role = 'GUEST';
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        }

    }
});


// Action creators are generated for each case reducer function
export const { 

    onChecking,
    onLogin,
    onLogout,
    clearErrorMessage, 

} = authSlice.actions;