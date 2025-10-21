import { useDispatch, useSelector } from "react-redux"

import { onCloseProductModal, onOpenProductModal } from "../../store";




export const useUiStore = () => {
    
    const dispatch = useDispatch();
    const { isProductModalOpen } = useSelector( state => state.ui );

    const openProductModal = () => {
        console.log('abriendo modal')
        dispatch( onOpenProductModal() );
    }

    const closeProductModal = () => {
        dispatch( onCloseProductModal() );
    } 

    const toggleProductModal = () => {
        (isProductModalOpen)
            ? openProductModal()
            : closeProductModal();
    }

    return {
        //* propiedades
        isProductModalOpen,

        //* Metodos
        openProductModal,
        closeProductModal,
        toggleProductModal,
    }

}