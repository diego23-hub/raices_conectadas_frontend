import { useState } from 'react';
import CardEvento from './CardEventos';

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const DIAS = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'];

const COLORES = {
  deportivo: '#2c5e3b',
  recreativo: '#c97b43',
  cultural: '#b5651d',
  ambiental: '#3f8f5a',
  historico: '#7a5c3e',
  religioso: '#6b5b95',
  gastronomico: '#c0392b',
  artesanal: '#d4a24c',
  tradicional: '#8e5a2b',
  folclorico: '#e67e22',
  ecoturistico: '#27ae60',
};

const normalizar = (t) =>
  t?.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() || '';

const colorDe = (tipo) => COLORES[normalizar(tipo)] || '#6c757d';

// Fecha local en formato YYYY-MM-DD (igual al que guardas en el JSON)
const aTexto = (anio, mes, dia) =>
  `${anio}-${String(mes + 1).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;

function CalendarioEventos({ eventos, destinos = [], usuario, alEditar, alEliminar }) {
  const hoy = new Date();
  const [anio, setAnio] = useState(hoy.getFullYear());
  const [mes, setMes] = useState(hoy.getMonth());
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);

  const primerDiaSemana = new Date(anio, mes, 1).getDay();
  const diasEnMes = new Date(anio, mes + 1, 0).getDate();

  const cambiarMes = (delta) => {
    const f = new Date(anio, mes + delta, 1);
    setAnio(f.getFullYear());
    setMes(f.getMonth());
    setDiaSeleccionado(null);
  };

  const irAHoy = () => {
    setAnio(hoy.getFullYear());
    setMes(hoy.getMonth());
    setDiaSeleccionado(aTexto(hoy.getFullYear(), hoy.getMonth(), hoy.getDate()));
  };

  // Eventos que cubren un día (comparación de strings YYYY-MM-DD)
  const eventosDelDia = (texto) =>
    eventos.filter((e) => e.fechaInicio <= texto && texto <= e.fechaFin);

  // Celdas: vacías al inicio + días del mes
  const celdas = [];
  for (let i = 0; i < primerDiaSemana; i++) celdas.push(null);
  for (let d = 1; d <= diasEnMes; d++) celdas.push(d);

  const textoHoy = aTexto(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const eventosSeleccionados = diaSeleccionado ? eventosDelDia(diaSeleccionado) : [];

  return (
    <div className="calendario">
      <div className="calendario-encabezado">
        <button onClick={() => cambiarMes(-1)}>‹</button>
        <h3>{MESES[mes]} {anio}</h3>
        <button onClick={() => cambiarMes(1)}>›</button>
        <button onClick={irAHoy} className="btn-hoy">Hoy</button>
      </div>

      <div className="calendario-grid">
        {DIAS.map((d) => (
          <div key={d} className="calendario-dia-semana">{d}</div>
        ))}

        {celdas.map((dia, i) => {
          if (!dia) return <div key={`v${i}`} className="calendario-celda vacia" />;

          const texto = aTexto(anio, mes, dia);
          const delDia = eventosDelDia(texto);
          const visibles = delDia.slice(0, 3);
          const extra = delDia.length - visibles.length;

          return (
            <div
              key={texto}
              className={
                'calendario-celda' +
                (texto === textoHoy ? ' hoy' : '') +
                (texto === diaSeleccionado ? ' seleccionada' : '')
              }
              onClick={() => setDiaSeleccionado(texto)}
            >
              <span className="numero-dia">{dia}</span>

              {visibles.map((ev) => (
                <div
                  key={ev.id}
                  className="chip-evento"
                  style={{ background: colorDe(ev.tipoEvento) }}
                  title={ev.nombre}
                >
                  {ev.nombre}
                </div>
              ))}
              {extra > 0 && <div className="mas-eventos">+{extra} más</div>}
            </div>
          );
        })}
      </div>

      {diaSeleccionado && (
        <div className="calendario-detalle">
          <h4>Eventos del {diaSeleccionado}</h4>
          {eventosSeleccionados.length > 0 ? (
            <div className="grid-eventos">
              {eventosSeleccionados.map((ev) => (
                <CardEvento
                  key={ev.id}
                  evento={ev}
                  usuario={usuario}
                  alEditar={alEditar}
                  alEliminar={alEliminar}
                  nombreDestino={destinos.find((d) => d.id === ev.idDestino)?.nombre}
                />
              ))}
            </div>
          ) : (
            <p style={{ color: '#6c757d' }}>No hay eventos este día.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default CalendarioEventos;