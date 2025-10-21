import { useEffect, useState } from "react";
import { useProductStore } from "../../../controllers/product/useProductStore"
import { useForm } from "../../../helpers/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCategoryStore } from "../../../controllers/category/useCategoryStore";
import Swal from "sweetalert2";

let formData = {
    name: '',
    price: 0,
    category: '',
    brand: '',
};

export const ProductManagement = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { startCreateProduct, startUpdateProduct, startDeleteProduct } = useProductStore();
    const { startLoadingCategories } = useCategoryStore();
    const { categories } = useSelector(state => state.categories);
    const [previewImage, setPreviewImage] = useState(null);
    const { name, price, category, brand, onInputChange, setFormState } = useForm(formData);
    const { activeProduct } = useSelector(state => state.products);
    const [photo, setPhoto] = useState(null); // imagen

    useEffect(() => {
        startLoadingCategories();
        console.log("Active Product:", activeProduct);
        if (activeProduct !== null) {
            formData = {
                name: activeProduct.nombre || '',
                price: activeProduct.precio || 0,
                brand: activeProduct.tipo || '',
                category: activeProduct.categoria_id || '',
            };
            setPreviewImage(null);
        }
    }, [activeProduct]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
        }
    };

    const createSubmit = async (event) => {
        event.preventDefault();
        const result = await startCreateProduct({
            name,
            price,
            category,
            brand,
            image: photo          // el archivo
        });
        navigate('/admin/product');
    };

    const updateSubmit = async (event) => {
        event.preventDefault();
        const result = await startUpdateProduct({
            name,
            price,
            category,
            brand,
            image: photo          // el archivo
        });
        navigate('/admin/product');
    };

    const onClickDelete = () => {
        Swal.fire({
            title: "Desea Elminar el producto?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Eliminar",
        }).then((result) => {
            if (result.isConfirmed) {
                startDeleteProduct();
                Swal.fire("Eliminado!", "", "success");
                navigate(`/admin/product`);
            }
        });
    };

    const onCancel = () => {
        navigate(`/admin/product`);
    };

    return (
        <div className="container justify-content-center">
            <form onSubmit={!!activeProduct ? updateSubmit : createSubmit}>

                <div className="form-group mb-3">
                    <label className="form-label">Categoría</label>
                    <select
                        className="form-select"
                        name="category"
                        value={category}
                        onChange={onInputChange}
                    >
                        <option value="">Seleccione una categoría</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.nombre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Nombre del Producto</label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label"> Precio </label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="price"
                        value={price}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label"> Marca </label>
                    <input 
                        type="text" 
                        className="form-control"
                        name="brand"
                        value={brand}
                        onChange={onInputChange}
                    />
                </div>

                {!!activeProduct?.foto && (
                    <div className="mb-3 text-center">
                        <p>Imagen actual:</p>
                        <img
                        src={activeProduct.foto}
                        alt="Imagen actual"
                        style={{ maxHeight: "200px", objectFit: "contain" }}
                        />
                    </div>
                )}
                <div className="form-group mb-3">
                    <label className="form-label">Foto</label>
                    <input 
                        type="file"
                        className="form-control"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>

                {previewImage && (
                    <div className="mt-2 text-center">
                        <p>Previsualización:</p>
                        <img
                        src={previewImage}
                        alt="Previsualización"
                        style={{ maxHeight: "200px", objectFit: "contain" }}
                        />
                    </div>
                )}

                {
                    (!!activeProduct)
                        ? <div className="d-grid gap-2">
                                <input type="submit" className="btn btn-primary" value="Editar Producto" />
                                <input type="button" className="btn btn-danger" onClick={onClickDelete} value="Eliminar" />
                                <input type="button" className="btn btn-secondary" onClick={onCancel} value="Atras" />
                          </div>
                        : <div className="d-grid gap-2">
                                <input type="submit" className="btn btn-success" value="Crear Producto" />
                          </div>
                }
            </form>
        </div>
    );
};
