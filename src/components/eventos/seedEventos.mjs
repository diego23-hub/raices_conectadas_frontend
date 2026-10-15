
const URL_API = 'http://localhost:3001/eventos';

const eventosIniciales = [
  {
    id: 1,
    idDestino: 1,
    nombre: "Festival del Viento y el Parapente en Floridablanca, Santander",
    tipoEvento: "DEPORTIVO",
    descripcion: "Festival que reúne a los mejores pilotos de parapente nacionales e internacionales aprovechando los vientos de la zona.",
    fechaInicio: "2026-03-15",
    fechaFin: "2026-03-19"
  },
  {
    id: 5,
    idDestino: 2,
    nombre: "Festival de Cine de Santa Fe de Antioquia",
    tipoEvento: "CULTURAL",
    descripcion: "El festival de cine independiente más antiguo de la región, con proyecciones al aire libre en plazas coloniales.",
    fechaInicio: "2026-12-04",
    fechaFin: "2026-12-08"
  },
  {
    id: 6,
    idDestino: 3,
    nombre: "Festival Nacional del Viento y las Cometas de Villa de Leyva, Boyacá",
    tipoEvento: "RECREATIVO",
    descripcion: "Cientos de cometas de todas las formas y colores llenan el cielo de la gran plaza principal aprovechando los vientos de agosto.",
    fechaInicio: "2026-08-15",
    fechaFin: "2026-08-17"
  },
  {
    id: 7,
    idDestino: 5,
    nombre: "Mompox Jazz Festival",
    tipoEvento: "CULTURAL",
    descripcion: "Encuentro musical de talla mundial a orillas del río Magdalena, fusionando jazz tradicional con ritmos caribeños.",
    fechaInicio: "2026-10-15",
    fechaFin: "2026-10-18"
  },
  {
    id: 8,
    idDestino: 6,
    nombre: "Hay Festival Jericó",
    tipoEvento: "CULTURAL",
    descripcion: "Celebración cultural que reúne literatura, música, cine y artes con intelectuales nacionales e internacionales.",
    fechaInicio: "2026-01-23",
    fechaFin: "2026-01-25"
  },
  {
    id: 9,
    idDestino: 4,
    nombre: "Festiver (Festival de Cine Verde)",
    tipoEvento: "AMBIENTAL",
    descripcion: "Festival dedicado al cine verde y ambiental, buscando concientizar a través de producciones audiovisuales.",
    fechaInicio: "2026-09-17",
    fechaFin: "2026-09-20"
  }
];

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function sembrarEventos() {
  for (const evento of eventosIniciales) {
    const respuesta = await fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(evento)
    });

    const creado = await respuesta.json();
    console.log('Creado:', creado.nombre, '- id:', creado.id);

    await esperar(300);
  }

  console.log('¡Listo! Eventos sembrados en db.json');
}

sembrarEventos();