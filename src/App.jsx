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

  const esCliente = usuario?.rol === 'viajero';

  const alIniciarSesion = (datosUsuario) => {
    setUsuario(datosUsuario);
    localStorage.setItem('usuario', JSON.stringify(datosUsuario));
    setVista('inicio');
  };

  const cerrarSesion = () => {
    setUsuario(null);
    setPaqueteElegido(null);
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
            <h2>
              Bienvenid@{usuario ? `, ${usuario.nombres}` : ''} a Raíces conectadas
            </h2>
            <p>Descubre los bellos pueblos patrimoniales colombianos</p>
          </div>
        )}

        {vista === 'registro' && puedeVer('registro') && <FormularioRegistro />}

        {vista === 'login' && puedeVer('login') && (
          <FormularioLogin alIniciarSesion={alIniciarSesion} />
        )}

        {vista === 'destinos' && <ListaDestino usuario={usuario} />}

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