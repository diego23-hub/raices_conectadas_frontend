import { peticion } from './api';

export const obtenerProveedores = () => 
  peticion('/proveedor');

export const crearProveedor = (proveedor) => 
  peticion('/proveedor', 
    { metodo: 'POST', 
      cuerpo: proveedor 
    });

export const actualizarProveedor = (id, proveedor) => 
  peticion(`/proveedor/${id}`, 
    { metodo: 'PUT', 
      cuerpo: proveedor 
    });

export const eliminarProveedor = async (id) => {
  await peticion(`/proveedor/${id}`, { metodo: 'DELETE' });
  return true;
};