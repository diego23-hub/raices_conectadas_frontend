import { peticion } from './api';

export const obtenerDestinos = () => 
  peticion('/destino');

export const crearDestino = (destino) => 
  peticion('/destino', 
    { metodo: 'POST', 
      cuerpo: destino 
    });

export const actualizarDestino = (id, destino) => 
  peticion(`/destino/${id}`, 
    { metodo: 'PUT', 
      cuerpo: destino 
    });

export const eliminarDestino = async (id) => {
  await peticion(`/destino/${id}`, { metodo: 'DELETE' });
  return true;
};
