import { useState } from 'react';
import ListaDestino from './components/destinos/ListaDestinos';
import ListaPaquetes from './components/paquetes/ListaPaquetes';
import FormularioLogin from './components/viajeros/FormularioLogin';
import FormularioRegistro from './components/viajeros/FormularioRegistro';
import FormularioReserva from './components/reservas/FormularioReserva';
import ListaEventos from './components/eventos/ListaEventos';
import ListaReservas from './components/reservas/ListaReservas';
import ListaProveedores from './components/proveedores/ListaProveedores';
import './index.css';

const MENU = [
  { vista: 'inicio', etiqueta: 'Inicio', acceso: 'todos' },
  { vista: 'destinos', etiqueta: 'Destinos', acceso: 'todos' },
  { vista: 'eventos', etiqueta: 'Eventos', acceso: 'todos' },
  { vista: 'paquetes', etiqueta: 'Paquetes', acceso: 'logueado' },
  { vista: 'reservas', etiqueta: 'Mis reservas', acceso: 'viajero' },
  { vista: 'proveedores', etiqueta: 'Proveedores', acceso: 'todos' },
  { vista: 'login', etiqueta: 'Inicio de sesión', acceso: 'invitado' },
  { vista: 'registro', etiqueta: 'Registro de usuarios', acceso: 'invitado' },
];

const tieneAcceso = (acceso, usuario) => {
  switch (acceso) { 
    case 'todos':
      return true;
    case 'invitado':
      return !usuario;
    case 'logueado':
      return !!usuario;
    case 'viajero':
      return usuario?.rol === 'viajero';
    case 'admin':
      return usuario?.rol === 'admin';
    default:
      return false;
  }
};

const leerSesion = () => {
  try {
    return JSON.parse(localStorage.getItem('usuario'));
  } catch {
    return null;
  }
};

function App() {
  const [vista, setVista] = useState('inicio');
  const [usuario, setUsuario] = useState(leerSesion);
  const [paqueteElegido, setPaqueteElegido] = useState(null);
  const [destinoElegido, setDestinoElegido] = useState(null);
  const elegirDestinoDetalle = (destino) => {
    setDestinoElegido(destino);
    setVista('detalle-destino'); 
  };

  const esCliente = usuario?.rol === 'viajero';

  const alIniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    setVista('inicio');
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setPaqueteElegido(null);
    setDestinoElegido(null);
    localStorage.removeItem('usuario');
    setVista('inicio');
  };

  const elegirPaquete = (paquete) => {
    setPaqueteElegido(paquete);
    setVista('reservar');
  };

  const puedeVer = (nombreVista) => {
    const opcion = MENU.find((m) => m.vista === nombreVista);
    return !!opcion && tieneAcceso(opcion.acceso, usuario);
  };

  const opcionesVisibles = MENU.filter((m) => tieneAcceso(m.acceso, usuario));

  return (
    <>
      <section id="center">
        <nav className="navbar">
          <div className="logo">Raíces conectadas</div>
          <ul className="nav-links">
            {opcionesVisibles.map((m) => (
              <li key={m.vista}>
                <a href={`#${m.vista}`} onClick={() => setVista(m.vista)}>
                  {m.etiqueta}
                </a>
              </li>
            ))}

            {usuario && (
              <>
                <li className="usuario-activo">
                  {usuario.nombres}
                  {usuario.rol === 'admin' && ' (Administrador)'}
                </li>
                <li>
                  <a href="#salir" onClick={cerrarSesion}>Cerrar sesión</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </section>

      <main className="content">
        {vista === 'inicio' && (
          <div>
            {/* Portada principal que ya tienes */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2>
                Bienvenid@{usuario ? `, ${usuario.nombres}` : ''} a Raíces conectadas
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6c757d', marginTop: '0.5rem' }}>
                Descubre y vive los bellos pueblos patrimoniales colombianos de una manera única.
              </p>

              {/* Botones de acceso rápido */}
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <button 
                  onClick={() => setVista('destinos')}
                  style={{ padding: '0.75rem 1.5rem', backgroundColor: '#2f4f3e', color: '#fff', border: 'none', borderRadius: '50rem', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Explorar Destinos
                </button>
                <button 
                  onClick={() => setVista('paquetes')}
                  style={{ padding: '0.75rem 1.5rem', backgroundColor: '#c8793f', color: '#fff', border: 'none', borderRadius: '50rem', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  Ver Paquetes Turísticos
                </button>
              </div>
            </div>

            {/* Sección inferior informativa para rellenar el espacio vacío */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '3rem', textAlign: 'center' }}>
              <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 16px rgba(34, 58, 45, 0.08)' }}>
                <h3 style={{ color: '#2f4f3e', fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>Turismo Auténtico</h3>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Conéctate con la historia, la arquitectura colonial y la cultura de los rincones más mágicos de Colombia.</p>
              </div>

              <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 16px rgba(34, 58, 45, 0.08)' }}>
                <h3 style={{ color: '#2f4f3e', fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>Reserva Fácil</h3>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Elige tus fechas, personaliza el viaje según las edades de tus acompañantes y asegura tu cupo al instante.</p>
              </div>

              <div style={{ background: '#fff', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 16px rgba(34, 58, 45, 0.08)' }}>
                <h3 style={{ color: '#2f4f3e', fontFamily: 'Georgia, serif', marginBottom: '0.75rem' }}>Proveedores Locales</h3>
                <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>Apoyamos el desarrollo regional conectando alojamientos y guías locales directamente con los viajeros.</p>
              </div>
            </div>
          </div>
        )}

        {vista === 'registro' && puedeVer('registro') && <FormularioRegistro />}

        {vista === 'login' && puedeVer('login') && (
          <FormularioLogin alIniciarSesion={alIniciarSesion} />
        )}

        {vista === 'destinos' && (
        <ListaDestino 
            usuario={usuario} 
            alSeleccionarDestino={elegirDestinoDetalle} 
          />
        )}

        {vista === 'detalle-destino' && destinoElegido && (
          <div className="detalle-destino-view">
            <button 
              onClick={() => setVista('destinos')} 
              style={{ marginBottom: '20px', backgroundColor: '#6c757d', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}
            >
              ← Volver a destinos
            </button>

            <h2>{destinoElegido.nombre}</h2>
            <span className="tipo-destino" style={{ display: 'inline-block', position: 'static', marginBottom: '15px' }}>
              {destinoElegido.tipo}
            </span>
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#3b3530' }}>
              {destinoElegido.descripcion}
            </p>
          </div>
        )}

        {vista === 'eventos' && <ListaEventos usuario={usuario} />}

        {vista === 'paquetes' && puedeVer('paquetes') && (
          <ListaPaquetes usuario={usuario} 
          alElegirPaquete={esCliente ? elegirPaquete : undefined}/>
        )}

        {vista === 'reservar' && esCliente && paqueteElegido && (
          <FormularioReserva
            usuario={usuario}
            paquete={paqueteElegido}
            alReservar={() => setVista('reservas')}
          />
        )}

        {vista === 'reservas' && puedeVer('reservas') && (
          <ListaReservas usuario={usuario} />
        )}

        {vista === 'proveedores' && <ListaProveedores usuario={usuario} />}
      </main>
    </>
  );
}

export default App;