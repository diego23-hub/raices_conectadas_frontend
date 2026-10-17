
import { useState } from 'react';
import { crearReserva } from '../../services/reservaService';

function FormularioReserva({usuario, paquete, alReservar }) {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFinal, setFechaFinal] = useState('');
  const [adultos, setAdultos] = useState(1);
  const [ninos, setNinos] = useState(0);  
  const [bebes, setBebes] = useState(0);  
  const [jovenes, setJovenes] = useState(0);  
  const [mensaje, setMensaje] = useState('');
  const limiteMaximo = paquete.limitePersonas || 10;
  const cantidadTotal = Number(adultos) + Number(ninos) + Number(bebes) + Number(jovenes);

  const esNacional = usuario?.tipoDoc === 'CC' || usuario?.tipoDoc === 'TI';

  const precioBase = paquete?.precio || 0;
  
  const subtotalAdultos = Number(adultos) * precioBase;
  const subtotalJovenes = Number(jovenes) * precioBase; 
  const subtotalNinos = Number(ninos) * (precioBase * 0.8); 
  const subtotalBebes = Number(bebes) *(precioBase * 0.5); 

  const subtotal = subtotalAdultos + subtotalJovenes + subtotalNinos + subtotalBebes;

  const porcentajeIva = esNacional ? 0.19 : 0;
  const valorIva = subtotal * porcentajeIva;
  const totalEstimado = subtotal + valorIva;  

  const guardarReserva = async (evento) => {
    evento.preventDefault();
    setMensaje('');

    if (!fechaInicio || !fechaFinal || cantidadTotal< 1) {
      setMensaje ('completa las fechas y la cantidad de personas');
      return;
    }

    if (fechaFinal < fechaInicio){
      setMensaje ('La fecha de fin no puede ser anterior a la de inicio');
      return;
    }

    if (cantidadTotal < 1) {
      setMensaje('Debe haber al menos 1 persona viajando');
      return;
    }

    if (cantidadTotal > limiteMaximo ) {
      setMensaje(`La cantidad maxíma permitidas es de ${limiteMaximo} personas`)

    }

    const nuevaReserva = { 
      idViajero: usuario.id,
      idPaquete: paquete.id,
      fechaInicio, fechaFinal,
      cantidadPersonas: cantidadTotal,
      subtotal,
      iva: valorIva,
      total: totalEstimado,
      detalleEdades: {
        adultos: Number(adultos), 
        jovenes: Number(jovenes),
        ninos: Number(ninos),
        bebes: Number(bebes)},
      estado: 'confirmada'
    };

    try {
      await crearReserva(nuevaReserva);
      setMensaje('¡Reserva creada con éxito!');
      setFechaInicio('');
      setFechaFinal('');
      setAdultos(1);
      setNinos(0);
      setBebes(0);
      setJovenes(0);

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

      <div className='mb-3'>
        <label className='form-label'>Cantidad de personas por edad (Máx. {limiteMaximo})</label>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem' }}>Adultos (16+ años)</label>
            <input
              type="number"
              min="0"
              max={limiteMaximo}
              value={adultos}
              onChange={(e) => setAdultos(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem' }}>Jóvenes (12-15 años)</label>
            <input
              type="number"
              min="0"
              max={limiteMaximo}
              value={jovenes}
              onChange={(e) => setJovenes(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem' }}>Niños (2-11 años)</label>
            <input
              type="number"
              min="0"
              max={limiteMaximo}
              value={ninos}
              onChange={(e) => setNinos(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem' }}>Bebés (&lt; 2 años)</label>
            <input
              type="number"
              min="0"
              max={limiteMaximo}
              value={bebes}
              onChange={(e) => setBebes(e.target.value)}
            />
          </div>
        </div>
      </div>

<div className="precotizacion" style={{ marginTop: '1rem', borderTop: '1px solid #ccc', paddingTop: '0.5rem' }}>
        <p>Subtotal: ${subtotal.toLocaleString('es-CO')}</p>
        <p>
          IVA (19%): ${valorIva.toLocaleString('es-CO')}{' '}
          {!esNacional && <small style={{ color: 'green' }}>(Exento por ser extranjero/pasaporte)</small>}
        </p>
        <strong>Total estimado: ${totalEstimado.toLocaleString('es-CO')}</strong>
      </div>

      <button type="submit" style={{ marginTop: '1rem' }}>Confirmar reserva</button>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </form>
  );
}
export default FormularioReserva;