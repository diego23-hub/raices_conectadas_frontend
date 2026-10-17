import { useState } from 'react';
import { crearViajero, buscarViajeroPorCorreo } from '../../services/viajeroService';

const viajeroInicial = {
  tipoDoc:'',
  numDoc:'',
  nombres: '',
  apellidos: '',
  telefono:'',
  correo: '',
  contrasena: '',
  rol:'viajero'
};

function FormularioRegistro({ alRegistrar }) {
  const [viajero, setViajero] = useState(viajeroInicial);
  const [mensaje, setMensaje] = useState('');

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    if (name === 'numDoc'){
      if (viajero.tipoDoc === 'Pasaporte') {
        if (value.length <= 12) {
          setViajero({ ...viajero, [name]: value });
        }
      } 
      else {
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

    try {
      // 1. Verificamos si el correo ya está registrado
      const existente = await buscarViajeroPorCorreo(viajero.correo);

      if (existente) {
        setMensaje('Ese correo ya está registrado');
        return; // corta la ejecución, no crea el viajero
      }

      // 2. Si no existe, lo creamos
      await crearViajero(viajero);
      setMensaje('Viajero registrado correctamente');
      setViajero(viajeroInicial);

      if (alRegistrar) alRegistrar();
    } catch (error) {
      console.error(error);
      setMensaje('Error registrando el viajero');
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
          <option value='Cédula de ciudadanía'>Cédula de ciudadanía</option>
          <option value='Tarjeta de identidad'>Tarjeta de identidad</option>
          <option value='Cédula de extranjería'>Cédula de extranjería</option>
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
        />
      </div>  

      <div className="mb-3">
        <input
          type="text"
          name="nombres"
          placeholder="Nombres"
          value={viajero.nombres}
          onChange={manejarCambio}
        />
      </div>

      <div className="mb-3">
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={viajero.apellidos}
          onChange={manejarCambio}
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
        />
      </div>

      <div className="mb-3">
        <input
          type="email"
          name="correo"
          placeholder="Correo"
          value={viajero.correo}
          onChange={manejarCambio}
        />
      </div>

      <div className="mb-3">
        <input
          type="password"
          name="contrasena"
          placeholder="Contraseña"
          value={viajero.contrasena}
          onChange={manejarCambio}
        />
      </div>

      <button type="submit">Registrar</button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}

export default FormularioRegistro;