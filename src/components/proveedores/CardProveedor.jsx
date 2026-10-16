// src/components/proveedores/CardProveedor.jsx

function CardProveedor({ proveedor, usuario, alEditar, alEliminar }) {
  const esAdmin = usuario?.rol === 'admin';

  return (
    <div className="card-proveedor" style={{ border: '1px solid #e0e0e0', borderRadius: '8px', padding: '16px', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <h3>{proveedor.nombre}</h3>
        <span className="badge-tipo" style={{ background: '#e2f0d9', color: '#385723', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
          {proveedor.tipo}
        </span>
      </div>

      <p style={{ margin: '8px 0 4px 0', color: '#666' }}>
        <strong>Ubicación:</strong> {proveedor.lugar || 'No especificada'}
      </p>
      
      <p style={{ margin: '4px 0', fontSize: '14px' }}>
        {proveedor.descripcion}
      </p>

      <div className="contacto-info" style={{ marginTop: '12px', fontSize: '14px', borderTop: '1px solid #eee', paddingTop: '8px' }}>
        <p style={{ margin: '2px 0' }}><strong>Teléfono:</strong> {proveedor.telefono}</p>
        <p style={{ margin: '2px 0' }}><strong>Correo:</strong> {proveedor.correo}</p>
      </div>

      {/* Botones de administración (Solo Admin) */}
      {esAdmin && (
        <div className="acciones-admin" style={{ marginTop: '15px', borderTop: '1px dashed #ccc', paddingTop: '10px' }}>
          <button onClick={() => alEditar(proveedor)}>Editar</button>
          <button 
            onClick={() => alEliminar(proveedor.id)} 
            style={{ marginLeft: '8px', backgroundColor: '#d9534f', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

export default CardProveedor;