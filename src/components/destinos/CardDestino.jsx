function CardDestino({ destino, usuario, alEditar, alEliminar, alVerDetalle }) {
  const esAdmin = usuario?.rol === 'admin';

  return (
    <div className="card-destino">
      <h3>{destino.nombre}</h3>
      <span className="tipo-destino">{destino.tipo}</span>
      <p>{destino.descripcion}</p>
      {!esAdmin && (
        <button 
          onClick={() => alVerDetalle(destino)} 
          style={{ marginTop: '15px', backgroundColor: '#5b8a6f', color: '#fff', padding: '6px 12px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Ver más
        </button>
      )}

      {/* Botones de administración visibles solo si es admin */}
      {esAdmin && (
        <div className="acciones-admin" style={{ marginTop: '10px' }}>
          <button onClick={() => alEditar(destino)}>Editar</button>
          <button 
            onClick={() => alEliminar(destino.id)} 
            style={{ marginLeft: '8px', backgroundColor: '#d9534f', color: '#fff' }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default CardDestino;