// src/components/proveedores/ListaProveedores.jsx

import { useEffect, useState } from 'react';
import CardProveedor from './CardProveedor';
import { 
  obtenerProveedores, 
  crearProveedor, 
  actualizarProveedor, 
  eliminarProveedor 
} from '../../services/proveedorService';

function ListaProveedores({ usuario }) {
  const [proveedores, setProveedores] = useState([]);
  const [mensaje, setMensaje] = useState('');
  
  // Estado para filtrar por tipo (todos, hotel, transporte, guia, restaurante)
  const [filtroTipo, setFiltroTipo] = useState('todos');

  // Estados para el formulario de administración
  const [modoFormulario, setModoFormulario] = useState(false);
  const [proveedorActual, setProveedorActual] = useState(null);

  const consultarProveedores = async () => {
    try {
      const datos = await obtenerProveedores();
      setProveedores(datos);
    } catch (error) {
      console.error(error);
      setMensaje('Error consultando los proveedores');
    }
  };

  useEffect(() => {
    consultarProveedores();
  }, []);

  const manejarEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este proveedor?")) return;
    try {
      await eliminarProveedor(id);
      setMensaje('Proveedor eliminado con éxito');
      consultarProveedores();
    } catch (error) {
      console.error(error);
      setMensaje('Error eliminando el proveedor');
    }
  };

  const abrirCrear = () => {
    setProveedorActual(null);
    setModoFormulario(true);
  };

  const abrirEditar = (proveedor) => {
    setProveedorActual(proveedor);
    setModoFormulario(true);
  };

  const guardarProveedorSubmit = async (e) => {
    e.preventDefault();

    const objetoProveedor = {
      nombre: e.target.nombre.value,
      tipo: e.target.tipo.value,
      lugar: e.target.lugar.value,
      telefono: e.target.telefono.value,
      correo: e.target.correo.value,
      descripcion: e.target.descripcion.value,
    };

    try {
      if (proveedorActual) {
        await actualizarProveedor(proveedorActual.id, objetoProveedor);
        setMensaje('Proveedor actualizado con éxito');
      } else {
        await crearProveedor(objetoProveedor);
        setMensaje('Proveedor creado con éxito');
      }
      setModoFormulario(false);
      consultarProveedores();
    } catch (error) {
      console.error(error);
      setMensaje('Error al guardar el proveedor');
    }
  };

  const esAdmin = usuario?.rol === 'admin';

  // Filtrar proveedores según la categoría seleccionada
  const proveedoresFiltrados = filtroTipo === 'todos' 
    ? proveedores 
    : proveedores.filter(p => p.tipo.toLowerCase() === filtroTipo.toLowerCase());

  return (
    <div className="lista-proveedores" style={{ padding: '20px' }}>
      <h2>Aliados y Proveedores Turísticos</h2>
      <p>Encuentra hoteles, transporte y guías certificados para tu viaje.</p>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      {/* Botón de crear (Solo Admin) */}
      {esAdmin && !modoFormulario && (
        <button onClick={abrirCrear} style={{ marginBottom: '20px', padding: '8px 12px', cursor: 'pointer' }}>
          + Nuevo Proveedor
        </button>
      )}

      {/* Formulario de Administración */}
      {modoFormulario && (
        <form onSubmit={guardarProveedorSubmit} className="form-admin-proveedor" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', background: '#f9f9f9' }}>
          <h3>{proveedorActual ? 'Editar Proveedor' : 'Registrar Nuevo Proveedor'}</h3>
          
          <div style={{ marginBottom: '10px' }}>
            <label>Nombre de la Empresa / Prestador: </label><br/>
            <input type="text" name="nombre" defaultValue={proveedorActual?.nombre || ''} required style={{ width: '100%', padding: '6px' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Tipo de Proveedor: </label><br/>
            <select name="tipo" defaultValue={proveedorActual?.tipo || 'Hotel'} style={{ width: '100%', padding: '6px' }}>
              <option value="Hotel">Hotel / Hospedaje</option>
              <option value="Transporte">Transporte</option>
              <option value="Guía">Guía Turístico</option>
              <option value="Restaurante">Restaurante</option>
            </select>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Lugar / Municipio (Ej. Santa Fe de Antioquia): </label><br/>
            <input type="text" name="lugar" defaultValue={proveedorActual?.lugar || ''} required style={{ width: '100%', padding: '6px' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Teléfono de contacto: </label><br/>
            <input type="text" name="telefono" defaultValue={proveedorActual?.telefono || ''} required style={{ width: '100%', padding: '6px' }} />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>Correo electrónico: </label><br/>
            <input type="email" name="correo" defaultValue={proveedorActual?.correo || ''} required style={{ width: '100%', padding: '6px' }} />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>Descripción de servicios: </label><br/>
            <textarea name="descripcion" defaultValue={proveedorActual?.descripcion || ''} required style={{ width: '100%', padding: '6px' }} />
          </div>

          <button type="submit" style={{ padding: '8px 15px', background: '#2c5e3b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Guardar</button>
          <button type="button" onClick={() => setModoFormulario(false)} style={{ marginLeft: '10px', padding: '8px 15px', cursor: 'pointer' }}>
            Cancelar
          </button>
        </form>
      )}

      {/* Filtros rápidos para el cliente */}
      <div className="filtros-proveedores" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <strong>Filtrar por:</strong>
        <button onClick={() => setFiltroTipo('todos')} style={{ background: filtroTipo === 'todos' ? '#2c5e3b' : '#eee', color: filtroTipo === 'todos' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Todos</button>
        <button onClick={() => setFiltroTipo('Hotel')} style={{ background: filtroTipo === 'Hotel' ? '#2c5e3b' : '#eee', color: filtroTipo === 'Hotel' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Hoteles</button>
        <button onClick={() => setFiltroTipo('Transporte')} style={{ background: filtroTipo === 'Transporte' ? '#2c5e3b' : '#eee', color: filtroTipo === 'Transporte' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Transporte</button>
        <button onClick={() => setFiltroTipo('Guía')} style={{ background: filtroTipo === 'Guía' ? '#2c5e3b' : '#eee', color: filtroTipo === 'Guía' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Guías</button>
      </div>

      {/* Listado en cuadrícula */}
      <div className="grid-proveedores" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {proveedoresFiltrados.length === 0 ? (
          <p>No hay proveedores registrados en esta categoría.</p>
        ) : (
          proveedoresFiltrados.map((proveedor) => (
            <CardProveedor
              key={proveedor.id}
              proveedor={proveedor}
              usuario={usuario}
              alEditar={abrirEditar}
              alEliminar={manejarEliminar}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ListaProveedores;