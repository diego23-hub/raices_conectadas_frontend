import { useState } from 'react';

function CardPaquetes({ paquete, alReservar, usuario, alEditar, alEliminar }) {
    const [expandido, setExpandido] = useState(false);
    const esAdmin = usuario?.rol === 'admin';
    const precioFormateado = paquete.precio?.toLocaleString('es-CO');

    return (
        <div className="card-paquetes">
            <h3>{paquete.nombre}</h3>
            <span className="tipo-paquetes">{paquete.tipo}</span>
            <p>{paquete.descripcion}</p>

            {/* INFORMACIÓN ADICIONAL (Se muestra solo si está expandido) */}
            {expandido && (
                <div className="info-adicional" style={{ marginTop: '10px', padding: '10px', background: '#f9f9f9', borderRadius: '5px' }}>
                    <p><strong>Duración:</strong> {paquete.duracion || 'No especificada'}</p>
                    <p><strong>¿Qué incluye?:</strong> {paquete.incluye || 'No especificado'}</p>
                    <p><strong>Itinerario:</strong> {paquete.itinerario || 'No especificado'}</p>
                    <p><strong>Límite de personas:</strong> {paquete.limitePersonas || 10}</p>
                </div>
            )}

            {/* Botón Ver Más / Ver Menos */}
            <button 
                onClick={() => setExpandido(!expandido)} 
                className="btn-ver-mas"
            >
                {expandido ? 'Ver menos ▲' : 'Ver más ▼'}
            </button>

            <div style={{ marginTop: '10px' }}>
                <span className="precio-paquetes">${precioFormateado}</span>
            </div>

            {alReservar && (
                <button onClick={() => alReservar(paquete)} style={{ marginTop: '10px', display: 'block' }}>
                    Reservar
                </button>
            )}
        
            {/* Botones de administración visibles solo si es admin */}
            {esAdmin && (
                <div className="acciones-admin" style={{ marginTop: '10px' }}>
                    <button onClick={() => alEditar(paquete)}>Editar</button>
                    <button 
                        onClick={() => alEliminar(paquete.id)} 
                        style={{ marginLeft: '8px', backgroundColor: '#d9534f', color: '#fff' }}
                    >
                        Eliminar
                    </button>
                </div>
            )}
        </div>
    );
}

export default CardPaquetes;