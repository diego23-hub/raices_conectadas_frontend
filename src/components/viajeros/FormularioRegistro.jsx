import { useState } from 'react';
import { crearViajero } from '../../services/viajeroService';

const viajeroInicial = {
  tipoDoc: '',
  numDoc: '',
  nombres: '',
  apellidos: '',
  telefono: '',
  correo: '',
  contrasena: '',
};

function FormularioRegistro({ alRegistrar }) {
  const [viajero, setViajero] = useState(viajeroInicial);
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    if (name === 'numDoc') {
      if (viajero.tipoDoc === 'Pasaporte') {
        if (value.length <= 12) {
          setViajero({ ...viajero, [name]: value });
        }
      } else {
        if (value.length <= 10) {
          setViajero({ ...viajero, [name]: value });
        }
      }
      return;
    }

    if (name === 'telefono') {
      if (value.length <= 10) {
        setViajero({
          ...viajero,
          [name]: value
        });
      }
      return;
    }

    setViajero({
      ...viajero,
      [evento.target.name]: evento.target.value
    });
  };

  const guardarViajero = async (evento) => {
    evento.preventDefault();
    setMensaje('');

    if (!/^\d{5,15}$/.test(viajero.numDoc.trim())) {
      setMensaje('El número de documento debe contener entre 5 y 15 dígitos numéricos.');
      return;
    }

    if (viajero.nombres.trim().length < 2 || viajero.apellidos.trim().length < 2) {
      setMensaje('Los nombres y apellidos deben tener al menos 2 caracteres.');
      return;
    }

    if (!/^\d{7,15}$/.test(viajero.telefono.trim())) {
      setMensaje('El número de teléfono debe contener entre 7 y 15 dígitos.');
      return;
    }

    if (viajero.contrasena.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    try {
      await crearViajero(viajero);
      setMensaje('Viajero registrado correctamente');
      setViajero(viajeroInicial);
      if (alRegistrar) alRegistrar();
    } catch (error) {
      console.error(error);
      setMensaje(error.message);
    }
  };

  return (
    <form onSubmit={guardarViajero}>
      <div className='mb-3'>
        <label htmlFor='tipoDoc' className='form-label'>Tipo de documento</label>
        <select
          id='tipoDoc'
          name='tipoDoc'
          value={viajero.tipoDoc}
          onChange={manejarCambio}
          required
        >
          <option value=''>Seleccione su tipo de documento</option>
          <option value='CC'>Cédula de ciudadanía</option>
          <option value='TI'>Tarjeta de identidad</option>
          <option value='CE'>Cédula de extranjería</option>
          <option value='Pasaporte'>Pasaporte</option>
        </select>
      </div>

      <div className='mb-3'>
        <input
          type='text'
          name='numDoc'
          placeholder='Número de documento'
          value={viajero.numDoc}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={viajero.nombres}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={viajero.apellidos}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          inputMode='tel'
          name="telefono"
          placeholder="Número de teléfono"
          value={viajero.telefono}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={viajero.correo}
          onChange={manejarCambio}
          required
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={viajero.contrasena}
          onChange={manejarCambio}
          required
        />
      </div>

      <button type="submit">Registrar</button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}

export default FormularioRegistro;