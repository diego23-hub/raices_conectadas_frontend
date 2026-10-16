const URL_API = 'http://localhost:3001/destinos';

export const obtenerDestinos = async () => {
  const respuesta = await fetch(URL_API);
  if (!respuesta.ok) throw new Error('Error consultando destinos');
  return await respuesta.json();
};

export const crearDestino = async (destino) => {
  const respuesta = await fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(destino)
  });
  if (!respuesta.ok) throw new Error('Error creando el destino');
  return await respuesta.json();
};

export const actualizarDestino = async (id, destino) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(destino)
  });
  if (!respuesta.ok) throw new Error('Error actualizando el destino');
  return await respuesta.json();
};

export const eliminarDestino = async (id) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'DELETE'
  });
  if (!respuesta.ok) throw new Error('Error eliminando el destino');
  return true;
};