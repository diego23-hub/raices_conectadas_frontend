import { useState } from 'react';

function MapaDestino({ destino }) {
  if (!destino) {
    return <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando información del mapa...</p>;
  }

  // Función para abrir la ruta en el planificador de transporte
  const abrirMoovit = (nombreLugar, direccion) => {
    const destinoCompleto = `${nombreLugar}, ${direccion}`;
    const urlRuta = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destinoCompleto)}&travelmode=transit`;
    window.open(urlRuta, '_blank');
  };

  return (
    <div className="seccion-mapa-interactivo" style={{ marginTop: '2rem' }}>
      <h3>Mapa interactivo y Movilidad</h3>
      <p>Explora los sitios de interés, hoteles, restaurantes y rutas de transporte de este pueblo patrimonial.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '20px', alignItems: 'start' }}>
        
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

        {/* Panel lateral de servicios ofrecidos por proveedores */}
        <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', maxHeight: '450px', overflowY: 'auto' }}>
          <h4 style={{ color: 'var(--raices-verde)', marginBottom: '15px' }}>Servicios Cercanos</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ padding: '10px', background: '#faf6f0', borderRadius: '8px', borderLeft: '3px solid #c8793f' }}>
              <strong>Hotel Colonial Real</strong>
              <p style={{ fontSize: '0.85rem', color: '#6c757d', margin: '4px 0' }}>Alojamiento asociado</p>
              <button 
                onClick={() => abrirMoovit("Hotel Colonial Real", destino.nombre)}
                style={{ fontSize: '0.75rem', padding: '6px 10px', backgroundColor: '#2f4f3e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                Ver su mejor ruta según su ubicación inicial y final 🚍
              </button>
            </div>

            <div style={{ padding: '10px', background: '#faf6f0', borderRadius: '8px', borderLeft: '3px solid #2f4f3e' }}>
              <strong>Restaurante Sabor Ancestral</strong>
              <p style={{ fontSize: '0.85rem', color: '#6c757d', margin: '4px 0' }}>Gastronomía típica</p>
              <button 
                onClick={() => abrirMoovit("Restaurante Sabor Ancestral", destino.nombre)}
                style={{ fontSize: '0.75rem', padding: '6px 10px', backgroundColor: '#2f4f3e', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
              >
                Ver su mejor ruta según su ubicación inicial y final 🚍
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default MapaDestino;