// Capa que habla directamente con el backend para eventos (JSON Server)
const URL_API = 'http://localhost:3001/eventos';

// GET, trae a todos los eventos
export const obtenerEventos = async () => {
  const respuesta = await fetch(URL_API);

  if (!respuesta.ok) {
    throw new Error('Error consultando eventos');
  }

  return await respuesta.json();
};

// POST, para registrar un nuevo evento
export const crearEvento = async (evento) => {
  const respuesta = await fetch(URL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(evento)
  });

  if (!respuesta.ok) {
    throw new Error('Error creando el evento');
  }

  return await respuesta.json();
};

// PUT, actualiza un evento existente por su id
export const actualizarEvento = async (id, evento) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(evento)
  });

  if (!respuesta.ok) {
    throw new Error('Error actualizando el evento');
  }

  return await respuesta.json();
};

// DELETE, elimina un evento por su id
export const eliminarEvento = async (id) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'DELETE'
  });

  if (!respuesta.ok) {
    throw new Error('Error eliminando el evento');
  }

  return true;
};