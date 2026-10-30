function CardEvento({ evento, usuario, alEditar, alEliminar, nombreDestino }) {
  const esAdmin = usuario?.rol === 'admin';

  return (
    <div className="card-evento">
      <h3>{evento.nombre}</h3>
      <span className="tipo-evento">{evento.tipoEvento}</span>
      <p>{evento.descripcion}</p>
      <p className="fechas-evento">
        {evento.fechaInicio} - {evento.fechaFin}
      </p>
      <p>Destino: {nombreDestino}</p>

    {esAdmin && ( 
      <div className="acciones-admin" style={{marginTop: '10px'}}>
        <button onClick={()=> alEditar(evento)}>Editar</button>
        <button 
            onClick={() => alEliminar(evento.id)} 
            style={{ marginLeft: '8px', backgroundColor: '#d9534f', color: '#fff' }}>
          Eliminar
      </button>
      </div>

    )
    }

    </div>
  );
}

export default CardEvento;