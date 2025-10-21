import { useFormik } from "formik";
import Select from "react-select";
import { useForm } from "../../../helpers/useForm";
import { useProductStore, useBranchStore, useInventoryStore } from "../../../controllers";
import { act, useEffect, useState } from "react";
import "./styles.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";





export const InventoryManagementPage = () => {
    
    const navigate = useNavigate();

    const { startCreateInventory, startLoadingInventories, activeInventory, inventories, startUpdateInventory, setActiveInventory } = useInventoryStore();
    const { startGetAllProducts, startGetProductById } = useProductStore();
    const { startGetAllBranches, startGetBranchById } = useBranchStore();

    const [isLoading, setIsLoading] = useState(true);

    //la parte de inventario Activo
    const [prodActiveInv, setProdActiveInv] = useState(null);
    const [sucurActiveInv, setSucurActiveInv] = useState(null);
    const [flagActive, setflagActive] = useState(false);

    const [productosMapeados, setProductosMapeados] = useState(null);
    const [sucursalesMapeadas, setSucursalesMapeadas] = useState(null);

    const [productos, setProductos] = useState(null);
    const [sucursales, setSucursales] = useState(null);

    const inventarioFromik = useFormik(
        {
            initialValues: {
                producto: null,
                sucursal: null,
                cantidad: 0,
            },         
        onSubmit: (values) => { //si se selecciono un inventario entonces actualizara
                activeInventory 
                ? updateInventory(values)          
                : createInventory(values)
        } 
    });  

    const createInventory = async (values) => { //creando inventario
        console.log(values);
        return;
        //inventario: {idproducto, idsucursal, cantidad} todos numeros
        if ( !values.producto || !values.sucursal ||  values.cantidad === 0 ) {
            Swal.fire({ icon: "error", text: "todos los campos deben tener un valor" });
            return;
        }
        if ( verifiExistsInventory(values) ) {
            Swal.fire({ icon: "error", text: "El inventario ya existe" });
            return ;
        }     
        const inventario = { 
            producto: values.producto.value, 
            sucursal: values.sucursal.value, 
            cantidad: values.cantidad 
        } 
        const result = await startCreateInventory( inventario );
       if ( result ){
            startLoadingInventories();
            Swal.fire('realizado correctamente', 'success');
            // returnToManagementPage();
       }      
    }

    const updateInventory = async ( values ) => {
        console.log('el values')
        console.log(values)
        if ( !values.producto || !values.sucursal ||  values.cantidad === 0 ) {
            Swal.fire({ icon: "error", text: "todos los campos deben tener un valor" });
            return;
        }
        const inventario = { 
            producto: values.producto.value, 
            sucursal: values.sucursal.value, 
            cantidad: values.cantidad 
        } 
        if ( inventario.producto === activeInventory.producto && inventario.sucursal === activeInventory.sucursal ) {
            //no hacer nada porque se esta actualizando la cantidad del mismo inventario seleccionado
        }else {
            if ( verifiExistsInventory(values) ) {
                if ( values.producto.value && values.sucursal.value )
                Swal.fire({ icon: "error", text: "El inventario ya existe" });
                return ;
            }  
        }
        console.log('el invenraio')
        console.log(inventario);
        const result = await startUpdateInventory( inventario );
        if ( result ){
            await startLoadingInventories();
            setActiveInventory( null );
            setflagActive(true); //ya se hizo la accion, ahora que cambie la ruta
            Swal.fire('realizado correctamente', 'success');
            // returnToManagementPage();
       }
    }

    const verifiExistsInventory = (values) => {      
        console.log(values)
        const producto = values.producto.value; 
        const sucursal = values.sucursal.value; 
        return inventories.some( 
                inventory => (inventory.producto === producto && inventory.sucursal === sucursal ) 
            );   
    }

    //por cada producto se almacena el nombre y el id en updateProductos
    const mapearProductos = () => {
        const updatedProductos = productos.map((producto) => ({ //por cada pais, se almacena el nombre y el id en la variable updatedCountries
            label: producto.nombre,
            value: producto.id,
            // ...producto
        }));
        setProductosMapeados( updatedProductos );
    }

    //por cada sucursal se almacena el nombre y el id en updateSucursales
    const mapearSucursales = () => {
        const updatedSucursales = sucursales.map((sucursal) => (  {          
            label: sucursal.nombre,
            value: sucursal.id,
            // label: sucursal.nombre,
            // value: sucursal.id,
            // ...sucursal
        }));
        setSucursalesMapeadas( updatedSucursales );
    }

    const { values, handleSubmit, setFieldValue, setValues } = inventarioFromik;

    useEffect(() => {

    }, [values]); //escucha values para renderizar

    useEffect(() => { //la 1er renderizada para que carguen los datos porque son asincronos
        onLoadData();
    }, [])

    useEffect(() => { 
        if ( flagActive && !activeInventory ) { //true = ya se hizo la actualizacion y activeInven ya es null  
            setflagActive( false ); 
            navigate(-1);
        }
    }, [ flagActive, activeInventory, inventories ]);
    

    const onLoadData = async () => { //solamente para incializar los datos y ponerlos en productos y sucursales
        try {
            const p = await startGetAllProducts(); //obtener todos los productos [{},{},...]
            const s = await startGetAllBranches(); //obtener todas las sucursales [{},{},...]
            setProductos(p);
            setSucursales(s);          
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } finally {
            // setIsLoading(false); // para señalar que ya no se esta cargando
        }
    };

    useEffect(() => { //escucha que ya esten listos los productos y las sucursales, ahora queda mapearlos
        if ( productos && sucursales && isLoading ) {
            mapearProductos();
            mapearSucursales();
        }
    }, [productos, sucursales])
    
    useEffect(() => { //para quitar el loading... ya esta todo cargado
        // console.log('llego a escuchar los mapeados')
        if ( productosMapeados && sucursalesMapeadas && isLoading) {
            // console.log('productos mapeados');
            // console.log(productosMapeados);
            // console.log('sucursales mapeadas');
            // console.log(sucursalesMapeadas);
            setIsLoading(false);
        }             
    }, [productosMapeados, sucursalesMapeadas, isLoading]);

    useEffect(() => {      
        if ( prodActiveInv && sucurActiveInv )
            setflagActive(true);  
    }, [prodActiveInv, sucurActiveInv])
    
    
    const onLoadActiveInventoryData = async () => { //para que se carguen los datos del activeInventory
        try {
            const { nombre } = await startGetProductById(activeInventory.producto);  //id producto
            // console.log(activeInventory)
            const data  = await startGetBranchById(activeInventory.sucursal); //id sucursal, active.sucursal ya es un id
            
            setProdActiveInv(nombre); //nombre producto
            setSucurActiveInv(data.nombre); //nombre sucursal
            
        } catch (error) {
            console.error("Error al cargar los datos:", error);
        } 
    };

    if ( activeInventory ){
        onLoadActiveInventoryData();
    }

    const onClickRetun = () => {
        navigate('/admin/inventory');
    }

    if (isLoading) {
        return <p>Loading...</p>;  
    }

    return (
        
        <div className=" m-5 App">
            <form onSubmit={ handleSubmit }>
                {/* <div className="form-group mb-2"> */}
                <div className="row ">
                    <div className="col-4">
                        <p> Seleecione Producto </p>
                    </div>
                    <div className="col-8">
                        <Select
                            className="mb-2"
                            id="producto"
                            name="producto"
                            label="producto"
                            options={ productosMapeados }
                            value={values.producto}
                            // onChange={value => {
                            //   setFieldValue("producto", value);
                            //   setFieldValue("state", null);
                            //   setFieldValue("city", null);
                            // }}
                            // onChange={(value) => { setValues({ producto: value }, false); }}
                            onChange={ (value) =>  setFieldValue( "producto", value )  }
                        />
                    </div>
                </div>
                 
                {/* </div> */}
                {/* <div className="form-group mb-2"> */}
                <div className="row">
                    <div className="col-4">
                        <p> Seleecione la Sucursal </p>
                    </div>
                    <div className="col-8">
                        <Select
                            className="mb-2"
                            id="sucursal"
                            name="sucursal"
                            label="sucursal"
                            options={ sucursalesMapeadas }
                            value={values.sucursal}
                            // onChange={(value) => { setValues({ sucursal: value }, false); }}
                            onChange={ (value) =>  setFieldValue( "sucursal", value )  }
                        />
                    </div>
                </div>
                    
                {/* </div> */}

                {/* La parte de cantidad */}
                <div className="form-group mb-2">
                    <div className="row">
                        <div className="col-3">
                            <p className="">cantidad</p>
                        </div>
                        <div className="col-9">
                            <input 
                                id="cantidad"
                                name="cantidad"
                                label="cantidad"
                                type="number"
                                value={ values.cantidad }
                                onChange={ (e) => { 
                                    const value = e.target.value? parseInt(e.target.value, 10) : 0; 
                                    setFieldValue( "cantidad", value ) 
                                } }
                                // onChange={ setFieldValue } 
                            />
                        
                        </div>
                    </div>
                </div> 
                {
                    !activeInventory 
                    ? <button type="submit" className="btn btn-primary">Registrar inventario</button>

                    : <button type="submit" className="btn btn-primary">Actualizar inventario</button>
                }
                                 
            </form>   
            <button className="btn btn-secondary mt-2" onClick={ onClickRetun }> Atras </button>
            
            {/* la tarjeta q mostrara si existe un invenatio selccionado */}
            {
                activeInventory 
                ?   <div className="row mt-3 justify-content-center">            
                        <div className="card text-bg-light w-75">
                            <div className="card-header">ID Inventario a Actualizar: { activeInventory.id }</div>
                            <div className="card-body">
                                <h5 className="card-title">Sucursal: { sucurActiveInv }  </h5>
                                <p className="card-title"> Producto: { prodActiveInv }  </p>
                                <p className="card-title"> cantidad: { activeInventory.cantidad }  </p>
                            </div>
                        </div>
                    </div>
                
                : <div></div>
            }
        </div> 
    )
}
