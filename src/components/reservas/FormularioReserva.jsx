
import { useState } from 'react';
import { crearReserva } from '../../services/reservaService';

function FormularioReserva({usuario, paquete, alReservar }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [cantidadPersonas, setCantidadPersonas] = useState(1);
  const [mensaje, setMensaje] = useState('');

  const limiteMaximo = paquete.limitePersonas || 10;

  const totalEstimado = paquete.precio * cantidadPersonas; 
  const guardarReserva = async (evento) => {
    evento.preventDefault();

    if (!fechaInicio || !fechaFinal || cantidadPersonas < 1) {
      setMensaje ('completa las fechas y la cantidad de personas');
      return;
    }

    if (fechaInicio < fechaFinal){
      setMensaje ('La fecha de fin no puede ser anterior a la de inicio');
    }

    if (cantidadPersonas > limiteMaximo ) {
      setMensaje(`La cantidad maxíma permitidas es de ${limiteMaximo} personas`)

    }

    const nuevaReserva = { 
      idCliente: usuario.id,
      idPaquete: paquete.id,
      fechaInicio, fechaFinal,
      cantidadPersonas: Number(cantidadPersonas),
      estado: 'confirmada'
    };

    try {
      await crearReserva(nuevaReserva);
      setMensaje('¡Reserva creada con éxito!');
      setFechaInicio('');
      setFechaFinal('');
      setCantidadPersonas(1);

      if (alReservar) alReservar(); 
    } catch (error) {
      console.error(error);
      setMensaje('Error creando la reserva');
    }
  };

  return (
    <form onSubmit={guardarReserva} className='formulario-reserva'> 
      <h3>Reservar: {paquete.nombre}</h3>
      <p className='precio-unitario'>
        precio por persona: ${paquete.precio.toLocaleString('es-CO')}
      </p>


      <label>
        Fecha de inicio
        <input
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
        />
      </label>

      <label>
        Fecha de fin
        <input
          type="date"
          value={fechaFinal}
          min={fechaInicio} // Opcional: evita visualmente seleccionar antes de la fecha de inicio
          onChange={(e) => setFechaFinal(e.target.value)}
        />
      </label>

      <label>
        Cantidad de personas (Máx. {limiteMaximo})
        <input
          type="number"
          min="1"
          max={limiteMaximo}
          value={cantidadPersonas}
          onChange={(e) => setCantidadPersonas(e.target.value)}
        />
      </label>

      <div className="precotizacion">
        <strong>Total estimado: ${totalEstimado.toLocaleString('es-CO')}</strong>
      </div>

      <button type="submit">Confirmar reserva</button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}

export default FormularioReserva;