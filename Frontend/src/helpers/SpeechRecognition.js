export const processSpeechCommand = async (text, products, cart, cartProducts, startAddProductCart, startRemoveProductCart) => {
    const normalizedText = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 

    const addKeywords = ["agregar", "anadir", "sumar", "meter", "aumentar"];
    const removeKeywords = ["quitar", "eliminar", "borrar", "sacar", "restar"];

    const containsKeyword = (keywords, text) => {
        return keywords.some(keyword => text.includes(keyword));
    };

    if (containsKeyword(addKeywords, normalizedText)) {
        const matchedProduct = findProductInText(products, normalizedText);

        if (matchedProduct) {
            console.log(`Agregando producto: ${matchedProduct.nombre}`);
            console.log(cart);
            await startAddProductCart(cart, matchedProduct); 
        } else {
            console.log("Producto no encontrado para agregar.");
        }

    } else if (containsKeyword(removeKeywords, normalizedText)) {
        const matchedProduct = findProductInText(products, normalizedText);

        if (matchedProduct) {
            console.log(`Quitando producto: ${matchedProduct.nombre}`);
            console.log(cartProducts);
            const detalle = cartProducts.find(det => det.id_producto === matchedProduct.id);
            if (detalle) {
                await startRemoveProductCart(detalle.id);
            } else {
                console.log("El producto no está en el carrito.");
            }
        } else {
            console.log("Producto no encontrado para quitar.");
        }

    } else {
        console.log("Comando no reconocido.");
    }
};

// Auxiliar
const findProductInText = (products, text) => {
    for (const product of products) {
        if (text.includes(product.nombre.toLowerCase())) {
            return product;
        }
    }
    return null;
};