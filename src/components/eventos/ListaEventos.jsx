import { useEffect, useState } from 'react';
import CalendarioEventos from '../eventos/CalendarioEventos';

import { 
  obtenerEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} from '../../services/eventoService';
import { obtenerDestinos } from '../../services/destinoService';

function ListaEventos({ usuario }) {
  const [eventos, setEventos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const [modoFormulario, setModoFormulario] = useState(false);
  const [eventoActual, setEventoActual] = useState(null);
  const [filtroTipo, setFiltroTipo] = useState('todos');
  const [destinos, setDestinos] = useState([]);

  const consultarEventos = async () => {
    try {
      const datos = await obtenerEventos();
      setEventos(datos);
    } catch (error) {
      console.error(error);
      setMensaje('Error consultando los eventos');
    }
  };

  const consultarDestinos = async () => {
    try {
      const datos = await obtenerDestinos();
      setDestinos(datos);
    } catch (error) {
      console.error(error);
      setMensaje('Error consultando los destinos');
    }
  };

  useEffect(() => {
    consultarEventos();
    consultarDestinos();
  }, []);

  // ELIMINAR EVENTO
  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este evento?")) return;
    try {
      await eliminarEvento(id);
      setMensaje('Evento eliminado con éxito');
      consultarEventos();
    } catch (error) {
      console.error(error);
      setMensaje('Error eliminando el evento');
    }
  };

  // ABRIR FORMULARIO CREAR
  const abrirCrear = () => {
    setEventoActual(null);
    setModoFormulario(true);
  };

  // ABRIR FORMULARIO EDITAR
  const abrirEditar = (evento) => {
    setEventoActual(evento);
    setModoFormulario(true);
  };

  // GUARDAR (CREAR O EDITAR)
  const guardarEventoSubmit = async (e) => {
    e.preventDefault();

    const objetoEvento = {
      nombre: e.target.nombre.value,
      idDestino: Number(e.target.idDestino.value),
      tipoEvento: e.target.tipoEvento.value,
      descripcion: e.target.descripcion.value,
      fechaInicio: e.target.fechaInicio.value,
      fechaFin: e.target.fechaFin.value,
    };

    try {
      if (eventoActual) {
        await actualizarEvento(eventoActual.id, objetoEvento);
        setMensaje('Evento actualizado con éxito');
      } else {
        await crearEvento(objetoEvento);
        setMensaje('Evento creado con éxito');
      }
      setModoFormulario(false);
      consultarEventos();
    } catch (error) {
      console.error(error);
      setMensaje('Error al guardar el evento');
    }
  };

  // ---> 1. LÓGICA DE FILTRADO (Quitando tildes y mayúsculas para mayor seguridad) <---
  const normalizar = (texto) => {
    return texto?.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() || "";
  };

  const eventosFiltrados = eventos.filter((evento) => {
    if (filtroTipo === 'todos') return true;
    return normalizar(evento.tipoEvento).includes(normalizar(filtroTipo));
  });

  return (
    <div className="lista-eventos">
      <h2>Eventos disponibles</h2>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* Botón de crear visible solo para Administrador */}
      {usuario?.rol === 'admin' && !modoFormulario && (
        <button onClick={abrirCrear} style={{ marginBottom: '20px' }}>
          + Nuevo Evento
        </button>
      )}

      {/* Formulario desplegable */}
      {modoFormulario && (
        <form onSubmit={guardarEventoSubmit} className="form-admin-evento" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
          <h3>{eventoActual ? 'Editar Evento' : 'Crear Evento'}</h3>
          
          <div>
            <label>Nombre del evento: </label>
            <input type="text" name="nombre" defaultValue={eventoActual?.nombre || ''} required />
          </div>

          <div>
            <label>Destino: </label>
            <select name="idDestino" defaultValue={eventoActual?.idDestino || ''} required>
              <option value="" disabled>Selecciona un destino</option>
              {destinos.map((destino) => (
                <option key={destino.id} value={destino.id}>{destino.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Tipo de evento: </label>
            <input type="text" name="tipoEvento" defaultValue={eventoActual?.tipoEvento || 'CULTURAL'} required />
          </div>

          <div>
            <label>Fecha de Inicio: </label>
            <input type="date" name="fechaInicio" defaultValue={eventoActual?.fechaInicio || ''} required />
          </div>

          <div>
            <label>Fecha de Fin: </label>
            <input type="date" name="fechaFin" defaultValue={eventoActual?.fechaFin || ''} required />
          </div>

          <div>
            <label>Descripción: </label>
            <textarea name="descripcion" defaultValue={eventoActual?.descripcion || ''} required />
          </div>

          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setModoFormulario(false)} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        </form>
      )}

<div className="filtros-eventos" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
  <strong>Filtrar por:</strong>
  
  <button 
    onClick={() => setFiltroTipo('todos')} 
    style={{ background: filtroTipo === 'Todos' ? '#333' : '#eee', color: filtroTipo === 'Todos' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Todos
  </button>

  <button 
    onClick={() => setFiltroTipo('Cultural')} 
    style={{ background: filtroTipo === 'Cultural' ? '#b5651d' : '#eee', color: filtroTipo === 'Cultural' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Cultural
  </button>

  <button 
    onClick={() => setFiltroTipo('Histórico')} 
    style={{ background: filtroTipo === 'Histórico' ? '#7a5c3e' : '#eee', color: filtroTipo === 'Histórico' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Histórico
  </button>

  <button 
    onClick={() => setFiltroTipo('Gastronómico')} 
    style={{ background: filtroTipo === 'Gastronómico' ? '#c0392b' : '#eee', color: filtroTipo === 'Gastronómico' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Gastronómico
  </button>

  <button 
    onClick={() => setFiltroTipo('Folclórico')} 
    style={{ background: filtroTipo === 'Folclórico' ? '#e67e22' : '#eee', color: filtroTipo === 'Folclórico' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Folclórico
  </button>

  <button 
    onClick={() => setFiltroTipo('Artesanal')} 
    style={{ background: filtroTipo === 'Artesanal' ? '#d4a24c' : '#eee', color: filtroTipo === 'Artesanal' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Artesanal
  </button>

  <button 
    onClick={() => setFiltroTipo('Religioso')} 
    style={{ background: filtroTipo === 'Religioso' ? '#6b5b95' : '#eee', color: filtroTipo === 'Religioso' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Religioso
  </button>

  <button 
    onClick={() => setFiltroTipo('Ambiental')} 
    style={{ background: filtroTipo === 'Ambiental' ? '#3f8f5a' : '#eee', color: filtroTipo === 'Ambiental' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Ambiental
  </button>

  <button 
    onClick={() => setFiltroTipo('Ecoturístico')} 
    style={{ background: filtroTipo === 'Ecoturístico' ? '#27ae60' : '#eee', color: filtroTipo === 'Ecoturístico' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Ecoturístico
  </button>

  <button 
    onClick={() => setFiltroTipo('Recreativo')} 
    style={{ background: filtroTipo === 'Recreativo' ? '#c97b43' : '#eee', color: filtroTipo === 'Recreativo' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
    Recreativo
</button>
</div>

      {/* NUEVO: el calendario reemplaza la grilla de tarjetas */}
      <CalendarioEventos
        eventos={eventosFiltrados}
        usuario={usuario}
        alEditar={abrirEditar}
        alEliminar={manejarEliminar}
      />
    </div>
  );
}

export default ListaEventos;