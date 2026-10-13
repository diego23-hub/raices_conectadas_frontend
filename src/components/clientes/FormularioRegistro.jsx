import { useState } from 'react';
import { crearCliente, buscarClientePorCorreo } from '../../services/clienteService';

const clienteInicial = {
  nombres: '',
  apellidos: '',
  correo: '',
  contrasena: '',
  rol:'cliente'
};

function FormularioRegistro({ alRegistrar }) {
  const [cliente, setCliente] = useState(clienteInicial);
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (evento) => {
    setCliente({
      ...cliente,
      [evento.target.name]: evento.target.value
    });
  };

  const guardarCliente = async (evento) => {
    evento.preventDefault();

    try {
      // 1. Verificamos si el correo ya está registrado
      const existente = await buscarClientePorCorreo(cliente.correo);

      if (existente) {
        setMensaje('Ese correo ya está registrado');
        return; // corta la ejecución, no crea el cliente
      }

      // 2. Si no existe, lo creamos
      await crearCliente(cliente);
      setMensaje('Cliente registrado correctamente');
      setCliente(clienteInicial);

      if (alRegistrar) alRegistrar();
    } catch (error) {
      console.error(error);
      setMensaje('Error registrando el cliente');
    }
  };

  return (
    <form onSubmit={guardarCliente}>
      <div className="mb-3">
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={cliente.nombres}
          onChange={manejarCambio}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={cliente.apellidos}
          onChange={manejarCambio}
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={cliente.correo}
          onChange={manejarCambio}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={cliente.contrasena}
          onChange={manejarCambio}
        />
      </div>

      <button type="submit">Registrar</button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}

export default FormularioRegistro;