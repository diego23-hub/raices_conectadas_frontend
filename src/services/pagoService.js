import { peticion } from './api';

export const simularPago = (reserva, metodo) =>
  peticion(`/reserva/${reserva.id}/pagar`, { 
    metodo: 'POST', 
    cuerpo: { metodo } 
});