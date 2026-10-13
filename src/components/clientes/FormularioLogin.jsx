import { useState } from 'react';
import { buscarClientePorCorreo } from '../../services/clienteService';

const credencialesIniciales = {
  correo: '',
  contrasena: ''
};

function FormularioLogin({ alIniciarSesion }) {
  const [credenciales, setCredenciales] = useState(credencialesIniciales);
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (evento) => {
    setCredenciales({
      ...credenciales,
      [evento.target.name]: evento.target.value
    });
  };

  const iniciarSesion = async (evento) => {
    evento.preventDefault();

    try {
      const cliente = await buscarClientePorCorreo(credenciales.correo);

      if (!cliente) {
        setMensaje('El correo no está registrado');
        return;
      }

      if (cliente.contrasena !== credenciales.contrasena) {
        setMensaje('Contraseña incorrecta');
        return;
      }

      setMensaje(`Bienvenido, ${cliente.nombres}`);

      const usuario = { ...cliente };
      delete usuario.contrasena;

      if (alIniciarSesion) alIniciarSesion(cliente);
    } catch (error) {
      console.error(error);
      setMensaje('Error iniciando sesión');
    }
  };

  return (
    <form onSubmit={iniciarSesion}>
      <div className="mb-3">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={credenciales.correo}
          onChange={manejarCambio}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={credenciales.contrasena}
          onChange={manejarCambio}
        />
      </div>

      <button type="submit">Ingresar</button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}

export default FormularioLogin;