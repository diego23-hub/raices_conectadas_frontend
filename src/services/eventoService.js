import { peticion } from './api';

export const obtenerEventos = () => 
  peticion('/evento');

export const crearEvento = (evento) => 
  peticion('/evento', 
    { metodo: 'POST', 
      cuerpo: evento 
    });

export const actualizarEvento = (id, evento) => 
  peticion(`/evento/${id}`, 
    { metodo: 'PUT', 
      cuerpo: evento 
    });

export const eliminarEvento = async (id) => {
  await peticion(`/evento/${id}`, { metodo: 'DELETE' });
  return true;
};