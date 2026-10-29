import { useEffect, useState } from 'react';
import CardDestino from './CardDestino'; 
import { obtenerDestinos, eliminarDestino, crearDestino, actualizarDestino } from '../../services/destinoService';

function ListaDestino({ usuario, alSeleccionarDestino }) {
  console.log("Objeto usuario recibido:", usuario); 
    const [destinos, setDestinos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    
    // Estados
    const [modoFormulario, setModoFormulario] = useState(false); 
    const [destinoActual, setDestinoActual] = useState(null); 
    const [filtroTipo, setFiltroTipo] = useState('todos');

    const [busquedaTexto, setBusquedaTexto] = useState('');

    const consultarDestino = async () => {
        try {
            const datos = await obtenerDestinos();
            setDestinos(datos);
        } catch (error) {
            console.error(error);
            setMensaje('Error consultando los destinos');
        }
    };

    useEffect(() => {
        consultarDestino();
    }, []);

    const manejarEliminar = async (id) => {
        if (!window.confirm("¿Estás seguro de eliminar este destino?")) return;
        try {
            await eliminarDestino(id);
            setMensaje('Destino eliminado con éxito');
            consultarDestino();
        } catch (error) {
            console.error(error);
            setMensaje('Error eliminando el destino');
        }
    };

    const abrirCrear = () => {
        setDestinoActual(null);
        setModoFormulario(true);
    };

    const abrirEditar = (destino) => {
        setDestinoActual(destino);
        setModoFormulario(true);
    };

    const guardarDestinoSubmit = async (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const tipo = e.target.tipo.value;
        const descripcion = e.target.descripcion.value;

        const objetoDestino = { nombre, tipo, descripcion };

        try {
            if (destinoActual) {
                await actualizarDestino(destinoActual.id, objetoDestino);
                setMensaje('Destino actualizado con éxito');
            } else {
                await crearDestino(objetoDestino);
                setMensaje('Destino creado con éxito');
            }
            setModoFormulario(false);
            consultarDestino();
        } catch (error) {
            console.error(error);
            setMensaje('Error al guardar el destino');
        }
    };

    // =========================================================================
    // 1. AQUÍ DEBE IR LA LÓGICA DE FILTRADO (Antes del return)
    // =========================================================================
    const destinosFiltrados = destinos.filter((destino) => {
        // Validación del filtro por tipo de botón
        const coincideTipo = filtroTipo === 'todos' || destino.tipo?.toLowerCase().includes(filtroTipo.toLowerCase());
        
        // Validación del buscador de texto (busca coincidencias en nombre o descripción)
        const textoBusquedaLower = busquedaTexto.toLowerCase();
        const coincideTexto = 
            destino.nombre?.toLowerCase().includes(textoBusquedaLower) ||
            destino.descripcion?.toLowerCase().includes(textoBusquedaLower);

        return coincideTipo && coincideTexto;
    });

    return (
        <div className="lista-destinos">
            <h2>Destinos disponibles</h2>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            {usuario?.rol === 'admin' && !modoFormulario && (
                <button onClick={abrirCrear} style={{ marginBottom: '20px' }}>
                    + Nuevo Destino
                </button>
            )}

            {modoFormulario && (
                <form onSubmit={guardarDestinoSubmit} className="form-admin-destino" style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc' }}>
                    <h3>{destinoActual ? 'Editar Destino' : 'Crear Destino'}</h3>
                    <div>
                        <label>Nombre: </label>
                        <input type="text" name="nombre" defaultValue={destinoActual?.nombre || ''} required />
                    </div>
                    <div>
                        <label>Tipo: </label>
                        <input type="text" name="tipo" defaultValue={destinoActual?.tipo || 'PATRIMONIAL'} required />
                    </div>
                    <div>
                        <label>Descripción: </label>
                        <textarea name="descripcion" defaultValue={destinoActual?.descripcion || ''} required />
                    </div>
                    <button type="submit">Guardar</button>
                    <button type="button" onClick={() => setModoFormulario(false)} style={{ marginLeft: '10px' }}>Cancelar</button>
                </form>
            )}

            <div className="barra-busqueda" style={{ marginBottom: '15px' }}>
                <input 
                    type="text" 
                    placeholder=" Buscar destino por nombre o descripción..." 
                    value={busquedaTexto}
                    onChange={(e) => setBusquedaTexto(e.target.value)}
                    style={{ width: '100%', padding: '10px', fontSize: '15px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>

            <div className="filtros-destinos" style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                <strong>Filtrar por:</strong>
                <button onClick={() => setFiltroTipo('todos')} style={{ background: filtroTipo === 'todos' ? '#2c5e3b' : '#eee', color: filtroTipo === 'todos' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Todos</button>
                <button onClick={() => setFiltroTipo('Inmaterial')} style={{ background: filtroTipo === 'Inmaterial' ? '#2c5e3b' : '#eee', color: filtroTipo === 'Inmaterial' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Inmaterial</button>
                <button onClick={() => setFiltroTipo('Arquitectónico')} style={{ background: filtroTipo === 'Arquitectónico' ? '#2c5e3b' : '#eee', color: filtroTipo === 'Arquitectónico' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Arquitectónico</button>
                <button onClick={() => setFiltroTipo('Gastronómico')} style={{ background: filtroTipo === 'Gastronómico' ? '#2c5e3b' : '#eee', color: filtroTipo === 'Gastronómico' ? '#fff' : '#333', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Gastronómico</button>
            </div>


            <div className="grid-destinos">
                {/* =========================================================================
                    2. AQUÍ DEBES MAPEAR 'destinosFiltrados' (Ya no 'destinos')
                   ======================================================================== */}
                {destinosFiltrados.length > 0 ? (
                    destinosFiltrados.map((destino) => (
                        <CardDestino
                            key={destino.id}
                            destino={destino}
                            usuario={usuario}
                            alEditar={abrirEditar}
                            alEliminar={manejarEliminar}
                            alVerDetalle={alSeleccionarDestino}
                        />
                    ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#6c757d' }}>
                        No hay destinos disponibles para esta categoría.
                    </p>
                )}
            </div>
        </div>
    );
}

export default ListaDestino;