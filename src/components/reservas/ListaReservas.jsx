import { useEffect, useState } from "react";
import { obtenerReservaPorCliente, eliminarReserva } from "../../services/reservaService";
import { obtenerPaquetes } from "../../services/paqueteService";
import BotonPago from '../reservas/BotonPago';

function ListaReservas({ usuario }) {
    const [reservas, setReservas] = useState([]);
    const [paquetes, setPaquetes] = useState([]);
    const [mensaje, setMensaje] = useState('');

    const cargaDatos = async () => {
        try {
            const [datosReservas, datosPaquetes] = await Promise.all([
                obtenerReservaPorCliente(usuario.id),
                obtenerPaquetes()
            ]);
            setReservas(datosReservas);
            setPaquetes(datosPaquetes);
        } catch (error) {
            console.error(error);
            setMensaje('Error consultando reserva');
        }
    };

    useEffect(() => {
        cargaDatos();
    }, []);

    const nombrePaquete = (idPaquete) => {
        const paquete = paquetes.find((p) => String(p.id) === String(idPaquete));
        return paquete ? paquete.nombre : 'Paquete no encontrado';
    };

    const cancelarReserva = async (id) => {
        try {
            await eliminarReserva(id);
            cargaDatos();
        } catch (error) {
            console.error(error);
            setMensaje('Error cancelando la reserva');
        }
    };

    return (
        <div className="lista-reservas">
            <h2>Mis reservas</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}

            {reservas.length === 0 && <p>Aún no tienes reservas</p>}

            <ul>
                {reservas.map((reserva) => (
                    <li key={reserva.id}>
                        <strong>{nombrePaquete(reserva.idPaquete)}</strong> — {' '}

                        {reserva.fechaInicio && reserva.fechaFinal ? (
                            <span>Del {reserva.fechaInicio} al {reserva.fechaFinal}</span>
                        ) : (
                            <span>Fecha: {reserva.fecha}</span>
                        )} — {' '}

                        <span>{reserva.cantidadPersonas} persona(s)</span> — {' '}
                        <span>Total: ${reserva.total?.toLocaleString('es-CO')}</span> — {' '}
                        <span>Estado: {reserva.estado}</span>

                        {reserva.estado === 'pendiente' && (
                            <>
                                <BotonPago reserva={reserva} alPagar={cargaDatos} />
                                <button onClick={() => cancelarReserva(reserva.id)}>
                                    Cancelar
                                </button>
                            </>
                        )}

                        {reserva.estado === 'pagada' && (
                            <small> ✔ Ref: {reserva.pago?.referencia}</small>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaReservas;