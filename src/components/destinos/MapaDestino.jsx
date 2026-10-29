import { useEffect, useState } from 'react';
import { obtenerProveedores } from '../../services/proveedorService';

function MapaDestino({ destino, proveedoresProps }) {
  const [proveedoresCercanos, setProveedoresCercanos] = useState([]);
  const [cargandoProveedores, setCargandoProveedores] = useState(true);

  useEffect(() => {
    const cargarYFiltrarProveedores = async () => {
      if (!destino) return;

      try {
        setCargandoProveedores(true);
        // Si no te pasan los proveedores por props, los consulta del servicio
        const listaProveedores = proveedoresProps || (await obtenerProveedores());

        const filtrados = listaProveedores.filter((prov) => prov.idDestino === destino.id);
        
        setProveedoresCercanos(filtrados);
      } catch (error) {
        console.error("Error al cargar proveedores del mapa:", error);
      } finally {
        setCargandoProveedores(false);
      }
    };

    cargarYFiltrarProveedores();
  }, [destino, proveedoresProps]);

  if (!destino) {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando información del mapa...</p>;
  }

  // Función para abrir la ruta en Google Maps / Moovit
  const abrirRuta = (nombreLugar, direccion) => {
    const destinoCompleto = `${nombreLugar}, ${direccion}`;
    const urlRuta = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinoCompleto)}&travelmode=transit`;
    window.open(urlRuta, '_blank');
  };

  return (
    <div className="seccion-mapa-interactivo" style={{ marginTop: '2rem' }}>
      <h3>Mapa interactivo y Movilidad</h3>
      <p>Explora los sitios de interés, hoteles, transporte y guías certificados en <strong>{destino.nombre}</strong>.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', alignItems: 'start' }}>
        
        {/* Contenedor del mapa de Google Maps */}
        <div style={{ width: '100%', height: '450px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <iframe
            title={`Mapa de ${destino.nombre}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(destino.nombre + ", Colombia")}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
          ></iframe>
        </div>

        {/* Panel lateral con los Proveedores Reales del Municipio */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', maxHeight: '450px', overflowY: 'auto' }}>
          <h4 style={{ color: '#2c5e3b', marginBottom: '15px' }}>Servicios y Aliados Cercanos</h4>

          {cargandoProveedores ? (
            <p style={{ fontSize: '0.9rem', color: '#666' }}>Buscando aliados cerca...</p>
          ) : proveedoresCercanos.length === 0 ? (
            <p style={{ fontSize: '0.9rem', color: '#666' }}>
              No hay proveedores registrados aún para <strong>{destino.nombre}</strong>.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {proveedoresCercanos.map((prov) => (
                <div
                  key={prov.id}
                  style={{
                    padding: '12px',
                    background: '#faf6f0',
                    borderRadius: '8px',
                    borderLeft: `4px solid ${
                      prov.tipo === 'Hotel' ? '#c8793f' : prov.tipo === 'Transporte' ? '#2f4f3e' : '#6b5b95'
                    }`
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong>{prov.nombre}</strong>
                    <span style={{ fontSize: '11px', background: '#e2f0d9', color: '#385723', padding: '2px 6px', borderRadius: '4px' }}>
                      {prov.tipo}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: '#555', margin: '4px 0 8px 0' }}>
                    {prov.descripcion}
                  </p>

                  <p style={{ fontSize: '0.75rem', color: '#777', margin: '2px 0' }}>
                     {prov.telefono}
                  </p>

                  <button
                    onClick={() => abrirRuta(prov.nombre, destino.nombre)}
                    style={{
                      marginTop: '8px',
                      fontSize: '0.75rem',
                      padding: '6px 10px',
                      backgroundColor: '#2f4f3e',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                  >
                    Ver mejor ruta hasta aquí 🚍
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default MapaDestino;