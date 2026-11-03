export const API = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const obtenerToken = () => localStorage.getItem('token');
export const guardarToken = (token) => localStorage.setItem('token', token);
export const borrarToken = () => localStorage.removeItem('token');

export const peticion = async (ruta, { metodo = 'GET', cuerpo } = {}) => {
  const token = obtenerToken();
  const respuesta = await fetch(`${API}${ruta}`, {
    method: metodo,
    headers: {
      ...(cuerpo !== undefined && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...(cuerpo !== undefined && { body: JSON.stringify(cuerpo) })
  });

  if (!respuesta.ok) {
    const error = await respuesta.json().catch(() => ({}));
    throw new Error(error.message || 'Error en la solicitud');
  }
  return await respuesta.json();
};