import { NavLink } from 'react-router-dom';

const adminRoutes = [
  { path: '/admin/category', label: 'Gestionar Categorías' },
  //{ path: '/admin/category/manage', label: 'Crear/Editar Categoría' },
  { path: '/admin/product', label: 'Gestionar Productos' },
  //{ path: '/admin/product/create', label: 'Crear Producto' },
  { path: '/admin/branch', label: 'Gestionar Sucursales' },
  //{ path: '/admin/branch/manage', label: 'Crear Sucursales' },
  //{ path: '/enlace/address', label: 'Direcciones' },
  //{ path: '/enlace/payoptions', label: 'Métodos de Pago' },
  { path: '/admin/inventory', label: 'Gestionar Inventario' },
  //{ path: '/admin/inventory/manage', label: 'Crear Inventario' },
  { path: '/admin/cart', label: 'Ver Carritos Usuario' },
];

export const SidebarAdmin = () => {
  return (
    <div className="list-group">
      {adminRoutes.map(({ path, label }) => (
        <NavLink
          key={path}
          to={path}
          className={({ isActive }) =>
            `list-group-item list-group-item-action ${isActive ? 'active' : ''}`
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
};
