import { useState } from 'react';
import ListaDestino from './components/destinos/ListaDestinos';
import ListaPaquetes from './components/paquetes/ListaPaquetes';
import FormularioLogin from './components/viajeros/FormularioLogin';
import FormularioRegistro from './components/viajeros/FormularioRegistro';
import FormularioReserva from './components/reservas/FormularioReserva';
import ListaEventos from './components/eventos/ListaEventos';
import ListaReservas from './components/reservas/ListaReservas';
import ListaProveedores from './components/proveedores/ListaProveedores';
import MapaDestino from './components/destinos/MapaDestino';
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

  const [menuAbierto,setMenuAbierto] = useState(false);

  const cambiarVista = (nuevaVista) => {
    setVista(nuevaVista);
    setMenuAbierto(false); // Cierra el menú al cambiar de vista en móvil
  };
  
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
    setMenuAbierto(false);
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
        {/* NUEVO: Botón de Hamburguesa para Móviles */}
          <button className="hamburger" onClick={() => setMenuAbierto(!menuAbierto)} aria-label="Abrir menú">
            {menuAbierto ? '✕' : '☰'}
          </button>

          <ul className={`nav-links ${menuAbierto ? 'activo' : ''}`}>
            {opcionesVisibles.map((m) => (
              <li key={m.vista}>
                <a href={`#${m.vista}`} onClick={() => cambiarVista(m.vista)}>
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
          <div className="contenedor-inicio">
            {/* Portada principal */}
            <div className="hero-portada">
              <span className="badge-portada">
                Turismo patrimonial en Colombia
              </span>
              <h2>
                Bienvenidos a Raíces conectadas
              </h2>
              <p>
                Descubre y vive los bellos pueblos patrimoniales colombianos de una manera única y auténtica.
              </p>

              <div className="hero-botones">
                <button className="btn-explorar" onClick={() => setVista('destinos')}>
                  Explorar Destinos
                </button>
                <button className="btn-paquetes" onClick={() => {
                  if (usuario) {
                    setVista('paquetes');
                  } else {
                    alert('Debes iniciar sesión o registrarte para ver los paquetes turísticos.');
                    setVista('login'); }
                  }}
                  >
                  Ver Paquetes Turísticos  
                </button>
              </div>
            </div>

            {/* Sección inferior de características (Fuera del cuadro verde) */}
            <div className="grid-caracteristicas">
              <div className="card-caracteristica card-verde">
                <h3>Turismo Auténtico</h3>
                <p>Conéctate con la historia, la arquitectura colonial y la cultura de los rincones más mágicos de Colombia.</p>
              </div>

              <div className="card-caracteristica card-terracota">
                <h3>Reserva Fácil</h3>
                <p>Elige tus fechas, personaliza el viaje según las edades de tus acompañantes y asegura tu cupo al instante.</p>
              </div>

              <div className="card-caracteristica card-dorado">
                <h3>Proveedores Locales</h3>
                <p>Apoyamos el desarrollo regional conectando alojamientos y guías locales directamente con los viajeros.</p>
              </div>
            </div>
          </div>
        )}

        {vista === 'registro' && puedeVer('registro') && (
           <FormularioRegistro alRegistrar={() => setVista('login')}/>
        )}

        {vista === 'login' && puedeVer('login') && (
          <FormularioLogin alIniciarSesion={alIniciarSesion} />
        )}

        {vista === 'destinos' && (
          <ListaDestino 
            usuario={usuario} 
            alSeleccionarDestino={elegirDestinoDetalle} 
          />
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

        {/* Vista de Detalle de Destino Única y Limpia con el Mapa Integrado */}
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
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#3b3530', marginBottom: '20px' }}>
              {destinoElegido.descripcion}
            </p>

            {/* Componente del Mapa Interactivo y Movilidad */}
            <MapaDestino destino={destinoElegido} />
          </div>
        )}
      </main>
    </>
  );
}

export default App;