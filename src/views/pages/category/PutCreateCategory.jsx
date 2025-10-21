import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useCategoryStore } from '../../../controllers';
import { useForm } from '../../../helpers/useForm';

let formData = {
    name: '',
    description: '',
};

export const PutCreateCategory = () => {

    const navigate = useNavigate();
    const [returnFlag, setReturnFlag] = useState(false);

    const {
        activeCategory,
        setActiveCategory,
        startCreateCategory,
        startUpdateCategory,
        startDeleteCategory,
        startLoadingCategories,
        categories,
        isLoadingCategory
    } = useCategoryStore();

    const { name, description, onInputChange, setFormState } = useForm(formData);

    useEffect(() => {
        if (activeCategory) {
            formData = { ...activeCategory };
            setFormState(formData);
        } else {
            formData = { name: '', description: '' };
            setFormState(formData);
        }
    }, [activeCategory]);

    const createSubmit = async (event) => {
        event.preventDefault();
        const result = await startCreateCategory({ name, description });
        if (result.success) {
            Swal.fire('Categoría registrada correctamente', 'success');
            returnToManagementPage();
        }
    };

    const updateSubmit = async (event) => {
        event.preventDefault();
        const result = await startUpdateCategory({ name, description });
        if (result.success) {
            Swal.fire('Cambios guardados', result.message, 'success');
            setActiveCategory(null);
            returnToManagementPage();
        }
    };

    const onClickDelete = async () => {
        Swal.fire({
            title: "¿Desea eliminar esta categoría?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await startDeleteCategory();
                Swal.fire("¡Eliminada!", "La categoría ha sido eliminada.", "success");
                setActiveCategory(null);
                returnToManagementPage();
            }
        });
    };

    const returnToManagementPage = () => {
        startLoadingCategories();
        setReturnFlag(true);
    };

    const onCancel = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (returnFlag && !activeCategory) {
            setReturnFlag(false);
            navigate(-1); // volver a la vista anterior
        }
    }, [categories, returnFlag, activeCategory]);

    return (
        <div className="container justify-content-center">
            <form onSubmit={!!activeCategory ? updateSubmit : createSubmit}>

                <div className="form-group mb-3">
                    <label className="form-label">Nombre de la Categoría</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        name="name"
                        value={name}
                        onChange={onInputChange}
                    />
                </div>

                <div className="form-group mb-3">
                    <label className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Descripción"
                        name="description"
                        value={description}
                        onChange={onInputChange}
                    />
                </div>

                <div className="d-grid gap-2">
                    {
                        (!!activeCategory)
                            ? <>
                                <input
                                    type="submit"
                                    className="btn btn-primary"
                                    value="Editar Categoría"
                                />
                                <input
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={onClickDelete}
                                    value="Eliminar"
                                />
                            </>
                            : <input
                                type="submit"
                                className="btn btn-primary"
                                value="Crear Categoría"
                            />
                    }
                    <input
                        type="button"
                        className="btn btn-secondary"
                        onClick={onCancel}
                        value="Atrás"
                    />
                </div>
            </form>
        </div>
    );
};
