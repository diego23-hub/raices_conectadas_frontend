import { peticion } from './api';

export const obtenerPaquetes = () => 
  peticion('/paquete');

export const crearPaquete = (paquete) => 
  peticion('/paquete', 
    { metodo: 'POST', 
      cuerpo: paquete 
    });

export const actualizarPaquete = (id, paquete) => 
  peticion(`/paquete/${id}`, 
    { metodo: 'PUT', 
      cuerpo: paquete 
    });

export const eliminarPaquete = async (id) => {
  await peticion(`/paquete/${id}`, { metodo: 'DELETE' });
  return true;
};