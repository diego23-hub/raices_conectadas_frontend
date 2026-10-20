import { actualizarReserva } from './reservaService';

// SIMULACIÓN: luego esto se reemplaza por la llamada al backend / pasarela
export const simularPago = async (reserva, metodo) => {
    // Simula el tiempo de respuesta de la pasarela
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simula que a veces el pago es rechazado (20%)
    const aprobado = Math.random() > 0.2;
    if (!aprobado) {
        throw new Error('Pago rechazado');
    }

    return await actualizarReserva(reserva.id, {
        estado: 'pagada',
        pago: {
            metodo,
            referencia: `SIM-${Date.now()}`,
            fecha: new Date().toISOString(),
            monto: reserva.total
        }
    });
};