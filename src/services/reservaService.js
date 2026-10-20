const URL_API = 'http://localhost:3001/reservas';

export const obtenerReserva = async () => {
    const respuesta = await fetch (URL_API);

    if (!respuesta.ok) {
        throw new Error ('Error consultando reservas')
    }
    return await respuesta.json();
};

export const obtenerReservaPorCliente = async (idViajero) => {
    const respuesta = await fetch (`${URL_API}?idViajero=${idViajero}`);

    if (!respuesta.ok){
        throw new Error ('Error consultando las reservas del cliente');
    }

    return await respuesta.json ();
};

export const crearReserva = async (reserva) => {
    const respuesta = await fetch (URL_API, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reserva)
    });

    if (!respuesta.ok) {
        throw new Error ('Error creando la reserva');
    }

    return await respuesta.json();
};

export const eliminarReserva = async (id) => {
    const respuesta = await fetch (`${URL_API}/${id}`,{
        method: 'DELETE'
    });
    if (!respuesta.ok){
        throw new Error ('Error cancelando la reserva')
    }
    return true;
}

