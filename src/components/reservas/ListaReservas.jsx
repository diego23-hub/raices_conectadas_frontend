import { useEffect,useState } from "react";
import { obtenerReservaPorCliente, eliminarReserva } from "../../services/reservaService";
import { obtenerPaquetes } from "../../services/paqueteService";

function ListaReservas ({usuario}) {
    const [reservas, setReservas] = useState ([]);
    const [paquetes, setPaquete ] = useState ([]);
    const [mensaje, setMensaje] = useState ('');

    const cargaDatos = async ()=>{
        try{
            const [datosReservas, datosPaquetes] = await Promise.all ([
                obtenerReservaPorCliente(usuario.id),
                obtenerPaquetes()
            ]); 
            setReservas (datosReservas);
            setPaquete (datosPaquetes);
        } catch (error) {
            console.error(error);
            setMensaje ('Error consultando reserva')
        }
    };
    useEffect(() => {
        cargaDatos();
    }, []);

    const nombrePaquete = (idPaquete) =>{
        const paquete = paquetes.find ((p) => p.id === idPaquete);
        return paquete? paquete.nombre : 'Paquete no encontrado';
    };

    const cancelarReserva = async(id) => {
        try{
            await eliminarReserva (id);
            cargaDatos();
        } catch (error){
            console.error(error)
            setMensaje ('Error cancelando la reserva')
        }
    };
    return (
        <div className="lista-reservas ">
            <h2>Mis reservas</h2>
            {mensaje && <p className="mensaje">{mensaje}</p>}

            {reservas.length ===0 && <p> Aún no tienes reservas</p>}
            <ul>
                {reservas.map((reserva) => (
<li key={reserva.id}>
            <strong>{nombrePaquete(reserva.idPaquete)}</strong> — {reserva.fecha} —{' '}
            {reserva.cantidadPersonas} persona(s)
            <button onClick={() => cancelarReserva(reserva.id)}>Cancelar</button>
          </li>
                ))}
            </ul>
        </div>
    )
}

export default ListaReservas

