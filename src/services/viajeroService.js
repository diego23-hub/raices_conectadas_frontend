// esta es la capa que habla directamente con el back
const URL_API = 'http://localhost:3001/viajeros';
// dicha url apunta al json server

// GET, trae a todos los viajeros
export const obtenerViajeros = async () => {
  const respuesta = await fetch(URL_API);

  if (!respuesta.ok) {
    throw new Error('Error consultando viajeros');
  }

  return await respuesta.json();
};

// GET - buscar un viajero por correo (lo usamos para el login)
// json-server permite filtrar con query params: ?correo=valor
export const buscarViajeroPorCorreo = async (correo) => {
  const respuesta = await fetch(`${URL_API}?correo=${correo}`);

  if (!respuesta.ok) {
    throw new Error('Error buscando el viajero');
  }

  const viajeros = await respuesta.json();

  // json-server siempre devuelve un arreglo, aunque encuentre uno solo
  // si no encontró nada, devolvemos null
  return viajeros.length > 0 ? viajeros[0] : null;
};

// POST, para registrar un nuevo viajero
export const crearViajero = async (viajero) => {
  const respuesta = await fetch(URL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(viajero)
  });

  if (!respuesta.ok) {
    throw new Error('Error creando el viajero');
  }

  return await respuesta.json();
};

// PUT, actualiza a un viajero existente por su id
export const actualizarViajero = async (id, viajero) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(viajero)
  });

  if (!respuesta.ok) {
    throw new Error('Error actualizando el viajero');
  }

  return await respuesta.json();
};

// DELETE, elimina a un viajero por su id
export const eliminarViajero = async (id) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'DELETE'
  });

  if (!respuesta.ok) {
    throw new Error('Error eliminando el viajero');
  }

  return true;
};