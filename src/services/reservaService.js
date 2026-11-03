import { peticion } from './api';

export const obtenerReserva = () => 
  peticion('/reserva');

export const obtenerReservaPorCliente = () => 
    peticion('/reserva/mis');

export const crearReserva = (reserva) => 
  peticion('/reserva', 
    { metodo: 'POST', 
      cuerpo: reserva 
    });

export const actualizarReserva = (id, reserva) => 
  peticion(`/reserva/${id}`, 
    { metodo: 'PUT', 
      cuerpo: reserva 
    });

export const eliminarReserva = async (id) => {
  await peticion(`/reserva/${id}`, { metodo: 'DELETE' });
  return true;
};