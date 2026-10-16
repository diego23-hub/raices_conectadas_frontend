function CardPaquetes ({paquete,alReservar, usuario, alEditar, alEliminar }){
    const esAdmin = usuario?.rol === 'admin'


    const precioFormateado = paquete.precio.toLocaleString('es-CO');
    return (
        <div className="card-paquetes">
            <h3>{paquete.nombre}</h3>
            <span className="tipo-paquetes">{paquete.tipo}</span>
            <p>{paquete.descripcion}</p>
            <span className="precio-paquetes">${precioFormateado}</span>
            {alReservar && (
        <button onClick={() => alReservar (paquete)}>Reservar</button>
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