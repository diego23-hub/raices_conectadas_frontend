import { useEffect, useState } from 'react';
import CardDestino from './CardDestino'; 
import { obtenerDestinos, eliminarDestino, crearDestino, actualizarDestino } from '../../services/destinoService';

function ListaDestino({ usuario, alSeleccionarDestino }) {
  console.log("Objeto usuario recibido:", usuario); // <-- Mira esto en la consola (F12)
    const [destinos, setDestinos] = useState([]);
    const [mensaje, setMensaje] = useState("");
    
    // Estados para controlar el formulario de creación/edición
    const [modoFormulario, setModoFormulario] = useState(false); // true si está abierto
    const [destinoActual, setDestinoActual] = useState(null); // null = creando, objeto = editando

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

    // ELIMINAR
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

    // ABRIR FORMULARIO PARA CREAR
    const abrirCrear = () => {
        setDestinoActual(null);
        setModoFormulario(true);
    };

    // ABRIR FORMULARIO PARA EDITAR
    const abrirEditar = (destino) => {
        setDestinoActual(destino);
        setModoFormulario(true);
    };

    // GUARDAR (CREAR O EDITAR)
    const guardarDestinoSubmit = async (e) => {
        e.preventDefault();
        const nombre = e.target.nombre.value;
        const tipo = e.target.tipo.value;
        const descripcion = e.target.descripcion.value;

        const objetoDestino = { nombre, tipo, descripcion };

        try {
            if (destinoActual) {
                // Actualizar
                await actualizarDestino(destinoActual.id, objetoDestino);
                setMensaje('Destino actualizado con éxito');
            } else {
                // Crear
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

    return (
        <div className="lista-destinos">
            <h2>Destinos disponibles</h2>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            {/* Botón de crear visible solo para administradores */}
            {usuario?.rol === 'admin' && !modoFormulario && (
                <button onClick={abrirCrear} style={{ marginBottom: '20px' }}>
                    + Nuevo Destino
                </button>
            )}

            {/* Formulario flotante o desplegable para Crear / Editar */}
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

            <div className="grid-destinos">
                {destinos.map((destino) => (
                    <CardDestino
                        key={destino.id}
                        destino={destino}
                        usuario={usuario}
                        alEditar={abrirEditar}
                        alEliminar={manejarEliminar}

                        alVerDetalle={alSeleccionarDestino}
                    />
                ))}
            </div>
        </div>
    );
}

export default ListaDestino;