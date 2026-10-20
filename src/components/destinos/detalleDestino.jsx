function DetalleDestino({ destino, alVolver }) {
  return (
    <div className="content" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={alVolver} 
        style={{ marginBottom: '20px', backgroundColor: '#6c757d', color: '#fff' }}
      >
        ← Volver a destinos
      </button>

      <h2>{destino.nombre}</h2>
      <span className="tipo-destino" style={{ display: 'inline-block', position: 'static', marginBottom: '15px' }}>
        {destino.tipo}
      </span>
      
      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#3b3530' }}>
        {destino.descripcion}
      </p>

      {/* Aquí después podrás agregar más elementos como galerías de fotos, reseñas, etc. */}
    </div>
  );
}

export default DetalleDestino;