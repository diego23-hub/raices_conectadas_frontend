import { useEffect, useState } from "react";
import { obtenerReservaPorCliente, eliminarReserva, actualizarReserva } from "../../services/reservaService"; // NUEVO: actualizarReserva
import { obtenerPaquetes } from "../../services/paqueteService";
import BotonPago from '../reservas/BotonPago';
import { calcularDias } from '../reservas/fecha'

function ListaReservas({ usuario }) {
    const [reservas, setReservas] = useState([]);
    const [paquetes, setPaquetes] = useState([]);
    const [mensaje, setMensaje] = useState('');
    const [idEditando, setIdEditando] = useState(null); // NUEVO: qué reserva se está editando

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

    // NUEVO: devuelve el paquete completo (para mostrar duración, precio, etc.)
    const buscarPaquete = (idPaquete) => {
        return paquetes.find((p) => String(p.id) === String(idPaquete));
    };

    const nombrePaquete = (idPaquete) => {
        const paquete = buscarPaquete(idPaquete);
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

    // NUEVO: guardar la edición (solo reservas pendientes) y recalcular totales
    const guardarEdicion = async (e, reserva) => {
        e.preventDefault();

        const adultos = Number(e.target.adultos.value);
        const jovenes = Number(e.target.jovenes.value);
        const ninos = Number(e.target.ninos.value);
        const bebes = Number(e.target.bebes.value);
        const personas = adultos + jovenes + ninos + bebes;        
        const paquete = buscarPaquete(reserva.idPaquete);
        const limiteMaximo = paquete?.limitePersonas || 10;
        if (personas < 1) {
            setMensaje('Debe haber al menos 1 persona viajando');
            return;
        }
        if (personas > limiteMaximo) {
            setMensaje(`La cantidad máxima permitida es de ${limiteMaximo} personas`);
            return;
        }
        const fechaInicio = e.target.fechaInicio.value; // NUEVO
        const fechaFinal = e.target.fechaFinal.value;   // NUEVO

        // NUEVO: validar fechas y ajustar el precio según los días elegidos
        if (fechaFinal < fechaInicio) {
            setMensaje('La fecha de fin no puede ser anterior a la de inicio');
            return;
        }
        const dias = calcularDias(fechaInicio, fechaFinal);
        if (dias > 30) {
            setMensaje('La reserva no puede superar 30 días');
            return;
        }
        // CAMBIO: antes era solo el precio del paquete; ahora se ajusta por días
        const precio = Math.round((paquete?.precio || 0) / (paquete?.duracionDias || 1) * dias);

        const subtotal = (adultos + jovenes) * precio + ninos * (precio * 0.8) + bebes * (precio * 0.5);        
        const esNacional = usuario?.tipoDoc === 'CC' || usuario?.tipoDoc === 'TI';
        const iva = subtotal * (esNacional ? 0.19 : 0);

        try {
            await actualizarReserva(reserva.id, {
                ...reserva,
                cantidadPersonas: personas,
                detalleEdades: { adultos, jovenes, ninos, bebes },
                fechaInicio, // CAMBIO: ahora usa la variable de arriba
                fechaFinal,  // CAMBIO: ahora usa la variable de arriba
                subtotal,
                iva,
                total: subtotal + iva
            });
            setIdEditando(null);
            setMensaje('Reserva actualizada con éxito');
            cargaDatos();
        } catch (error) {
            console.error(error);
            setMensaje('Error actualizando la reserva');
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

                        {/* NUEVO: si se está editando, muestra el formulario en vez de la info */}
                        {idEditando === reserva.id ? (
                            <form onSubmit={(e) => guardarEdicion(e, reserva)}>
                                <label>Adultos: </label>
                                <input type="number" name="adultos" min="0"
                                    defaultValue={reserva.detalleEdades?.adultos ?? reserva.cantidadPersonas} required />

                                <label> Jóvenes: </label>
                                <input type="number" name="jovenes" min="0"
                                    defaultValue={reserva.detalleEdades?.jovenes ?? 0} required />

                                <label> Niños: </label>
                                <input type="number" name="ninos" min="0"
                                    defaultValue={reserva.detalleEdades?.ninos ?? 0} required />

                                <label> Bebés: </label>
                                <input type="number" name="bebes" min="0"
                                    defaultValue={reserva.detalleEdades?.bebes ?? 0} required />

                                <label> Inicio: </label>
                                <input type="date" name="fechaInicio"
                                    defaultValue={reserva.fechaInicio || ''} required />

                                <label> Fin: </label>
                                <input type="date" name="fechaFinal"
                                    defaultValue={reserva.fechaFinal || ''} required />

                                <button type="submit">Guardar</button>
                                <button type="button" onClick={() => setIdEditando(null)}>Cancelar</button>
                            </form>
                        ) : (
                            <>
                                {reserva.fechaInicio && reserva.fechaFinal ? (
                                    <span>Del {reserva.fechaInicio} al {reserva.fechaFinal}</span>
                                ) : (
                                    <span>Fecha: {reserva.fecha}</span>
                                )} — {' '}

                                <span>{reserva.cantidadPersonas} persona(s)</span> — {' '}
                                <span>Total: ${reserva.total?.toLocaleString('es-CO')}</span> — {' '}
                                <span>Estado: {reserva.estado}</span>
                                {reserva.numSeguimiento && <span>N.º de seguimiento: RC-{reserva.numSeguimiento}</span>}

                                {/* NUEVO: más información de la reserva */}
                                <div>
                                    <small>
                                    Subtotal: ${reserva.subtotal?.toLocaleString('es-CO')} | IVA: ${reserva.iva?.toLocaleString('es-CO')}
                                    </small>
                                    {reserva.fechaInicio && reserva.fechaFinal && (
                                    <div>
                                        <small> 
                                    
                                    Días reservados: {calcularDias(reserva.fechaInicio, reserva.fechaFinal)}
                                    {buscarPaquete(reserva.idPaquete)?.duracion && (
                                    <> Paquete base: {buscarPaquete(reserva.idPaquete).duracion}</>
                                    )}

                                        </small>
                                    </div>
                                    )}
                                </div>

                                {reserva.estado === 'pendiente' && (
                                    <>
                                        <BotonPago reserva={reserva} alPagar={cargaDatos} />
                                        {/* NUEVO: botón editar, solo si no ha pagado */}
                                        <button onClick={() => setIdEditando(reserva.id)}>
                                            Editar
                                        </button>
                                        <button onClick={() => cancelarReserva(reserva.id)}>
                                            Cancelar
                                        </button>
                                    </>
                                )}

                                {reserva.estado === 'pagada' && (
                                    <small> ✔ Ref: {reserva.pago?.referencia}</small>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaReservas;