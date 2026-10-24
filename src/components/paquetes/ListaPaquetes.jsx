import { useEffect, useState } from 'react';
import CardPaquetes from './CardPaquete';
import { 
  obtenerPaquetes, 
  crearPaquete, 
  actualizarPaquete, 
  eliminarPaquete 
} from '../../services/paqueteService';
import { obtenerDestinos } from '../../services/destinoService';


function ListaPaquetes({ usuario, alElegirPaquete }) {
  const [paquetes, setPaquetes] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // Estados para controlar el formulario de administración (Crear / Editar)
  const [modoFormulario, setModoFormulario] = useState(false);
  const [paqueteActual, setPaqueteActual] = useState(null);

  const [destinos, setDestinos] = useState([]);

  const consultarPaquetes = async () => {
    try {
      const datos = await obtenerPaquetes();
      setPaquetes(datos);
    } catch (error) {
      console.error(error);
      setMensaje('Error consultando los paquetes');
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
    consultarPaquetes();
    consultarDestinos();
  }, []);

  // ELIMINAR PAQUETE
  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este paquete?")) return;
    try {
      await eliminarPaquete(id);
      setMensaje('Paquete eliminado con éxito');
      consultarPaquetes();
    } catch (error) {
      console.error(error);
      setMensaje('Error eliminando el paquete');
    }
  };

  // ABRIR FORMULARIO PARA CREAR
  const abrirCrear = () => {
    setPaqueteActual(null);
    setModoFormulario(true);
  };

  // ABRIR FORMULARIO PARA EDITAR
  const abrirEditar = (paquete) => {
    setPaqueteActual(paquete);
    setModoFormulario(true);
  };

  // GUARDAR (CREAR O EDITAR)
  const guardarPaqueteSubmit = async (e) => {
    e.preventDefault();

    const objetoPaquete = {
      nombre: e.target.nombre.value,
      idDestino: Number(e.target.idDestino.value),
      precio: Number(e.target.precio.value),
      descripcion: e.target.descripcion.value,
      limitePersonas: Number(e.target.limitePersonas.value || 10),
      duracion: e.target.duracion.value,
      duracionDias: Number(e.target.duracionDias.value || 1),
      incluye: e.target.incluye.value,
      itinerario: e.target.itinerario.value,
    };

    try {
      if (paqueteActual) {
        await actualizarPaquete(paqueteActual.id, objetoPaquete);
        setMensaje('Paquete actualizado con éxito');
      } else {
        await crearPaquete(objetoPaquete);
        setMensaje('Paquete creado con éxito');
      }
      setModoFormulario(false);
      consultarPaquetes();
    } catch (error) {
      console.error(error);
      setMensaje('Error al guardar el paquete');
    }
  };

  const esAdmin = usuario?.rol === 'admin';

  return (
    <div className="lista-paquetes">
      <h2>Paquetes Turísticos</h2>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* Botón de crear visible solo para Administrador */}
      {esAdmin && !modoFormulario && (
        <button onClick={abrirCrear} style={{ marginBottom: '20px' }}>
          + Nuevo Paquete
        </button>
      )}

      {/* --- AQUÍ ESTÁ EL FORMULARIO DE ADMINISTRACIÓN CON LOS NUEVOS CAMPOS --- */}
      {modoFormulario && (
        <form onSubmit={guardarPaqueteSubmit} className="form-admin-paquete" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
          <h3>{paqueteActual ? 'Editar Paquete' : 'Crear Paquete'}</h3>
          
          <div>
            <label>Nombre del paquete: </label>
            <input type="text" name="nombre" defaultValue={paqueteActual?.nombre || ''} required />
          </div>

          <div>
            <label>Destino: </label>
            <select name="idDestino" defaultValue={paqueteActual?.idDestino || ''} required>
              <option value="" disabled>Selecciona un destino</option>
              {destinos.map((destino) => (
                <option key={destino.id} value={destino.id}>{destino.nombre}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Precio: </label>
            <input type="number" name="precio" defaultValue={paqueteActual?.precio || ''} required />
          </div>

          <div>
            <label>Límite de personas: </label>
            <input type="number" name="limitePersonas" defaultValue={paqueteActual?.limitePersonas || 10} min="1" required />
          </div>

          <div>
            <label>Duración (ej. 3 días y 2 noches): </label>
            <input type="text" name="duracion" defaultValue={paqueteActual?.duracion || ''} required />
          </div>
          {/* NUEVO: número de días, se usa para calcular el precio según los días que elija el cliente */}
          <div>
            <label>Número de días (para calcular el precio): </label>
            <input type="number" name="duracionDias" defaultValue={paqueteActual?.duracionDias || 1} min="1" required />
          </div>

          <div>
            <label>¿Qué incluye?: </label>
            <textarea name="incluye" defaultValue={paqueteActual?.incluye || ''} required />
          </div>

          <div>
            <label>Itinerario: </label>
            <textarea name="itinerario" defaultValue={paqueteActual?.itinerario || ''} required />
          </div>

          <div>
            <label>Descripción: </label>
            <textarea name="descripcion" defaultValue={paqueteActual?.descripcion || ''} required />
          </div>

          <button type="submit">Guardar</button>
          <button type="button" onClick={() => setModoFormulario(false)} style={{ marginLeft: '10px' }}>
            Cancelar
          </button>
        </form>
      )}

      {/* LISTADO DE TARJETAS */}
      <div className="grid-paquetes">
        {paquetes.map((paquete) => (
          <div key={paquete.id} className="card-contenedor" style={{ border: '1px solid #eee', padding: '15px', marginBottom: '15px' }}>
            <CardPaquetes 
              paquete={paquete} 
              usuario={usuario}
              alReservar={alElegirPaquete}
              alEditar={abrirEditar}
              alEliminar={manejarEliminar}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPaquetes;