const URL_API = 'http://localhost:3001/paquetes';

export const obtenerPaquetes = async () => {
  const respuesta = await fetch(URL_API);
  if (!respuesta.ok) throw new Error('Error consultando paquetes');
  return await respuesta.json();
};

export const crearPaquete = async (paquete) => {
  const respuesta = await fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paquete)
  });
  if (!respuesta.ok) throw new Error('Error creando el paquete');
  return await respuesta.json();
};

export const actualizarPaquete = async (id, paquete) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paquete)
  });
  if (!respuesta.ok) throw new Error('Error actualizando el paquete');
  return await respuesta.json();
};

export const eliminarPaquete = async (id) => {
  const respuesta = await fetch(`${URL_API}/${id}`, {
    method: 'DELETE'
  });
  if (!respuesta.ok) throw new Error('Error eliminando el paquete');
  return true;
};