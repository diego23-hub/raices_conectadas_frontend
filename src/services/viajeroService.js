import { peticion, guardarToken, borrarToken } from './api';

export const iniciarSesion = async (correo, contrasena) => {
  const { token, usuario } = await peticion('/auth/login', {
    metodo: 'POST',
    cuerpo: { correo, contrasena }
  });
  guardarToken(token);
  return usuario;
};

export const cerrarSesionApi = () => borrarToken();

export const crearViajero = (viajero) =>
  peticion('/usuario', { metodo: 'POST', cuerpo: viajero });