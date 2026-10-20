const URL_API = 'http://localhost:3001/paquetes';


const paquetesIniciales = [
  {
    "id": 1,
    "nombre": "Aguadas, Caldas",
    "precio": 950000,
    "descripcion": "Cuna del pasillo colombiano y tierra de la cultura cafetera, famosa por la calidez de su gente y la tejeduría artesanal del icónico sombrero aguadeño. Vive una experiencia entre fincas cafeteras, talleres interactivos con maestras artesanas y catas de café premium.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento en finca cafetera, talleres interactivos, catas de café y guía local.",
    "itinerario": "Día 1: Llegada y recibimiento. Día 2: Taller de sombreros y caficultura. Día 3: Despedida.",
    "limitePersonas": 10
  },
  {
    "id": 2,
    "nombre": "Barichara, Santander",
    "precio": 1200000,
    "descripcion": "Considerado el pueblo más lindo de Colombia, destaca por sus calles empedradas, su arquitectura colonial impecable y su ancestral técnica de construcción en tapia pisada. Disfruta de desconexión total en hotel boutique, caminata ecológica por el Camino Real a Guane y taller de tallado en piedra.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento en hotel boutique, caminata ecológica por el Camino Real y taller de tallado en piedra.",
    "itinerario": "Día 1: Llegada y recorrido colonial. Día 2: Caminata a Guane. Día 3: Taller de piedra y despedida.",
    "limitePersonas": 10
  },
  {
    "id": 3,
    "nombre": "Ciénaga, Magdalena",
    "precio": 1100000,
    "descripcion": "Capital del realismo mágico, un destino costero impregnado de historia bananera, arquitectura caribeña y leyendas folclóricas que inspiraron a Gabriel García Márquez. Vive esta aventura descubriendo la arquitectura bananera y recorriendo en lancha los pueblos palafitos de la Ciénaga Grande.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento, tour por la zona bananera y recorrido en lancha por los pueblos palafitos.",
    "itinerario": "Día 1: Bienvenida e historia bananera. Día 2: Paseo en lancha por los palafitos. Día 3: Tiempo libre y salida.",
    "limitePersonas": 10
  },
  {
    "id": 4,
    "nombre": "Jardín, Antioquia",
    "precio": 1100000,
    "descripcion": "Tesoro del suroeste antioqueño que conserva intacta la arquitectura de la colonización paisa, con balcones coloridos y una plaza vibrante. Incluye pasadía de aventura y tradición con transporte desde Medellín, cabalgata, caminata ecológica y visita a la Cueva del Esplendor.",
    "duracion": "1 día (Pasadía)",
    "incluye": "Transporte desde Medellín, cabalgata, caminata ecológica y entrada a la Cueva del Esplendor.",
    "itinerario": "Día 1: Salida de Medellín, caminata, cabalgata, Cueva del Esplendor y regreso.",
    "limitePersonas": 10
  },
  {
    "id": 5,
    "nombre": "Guadalajara de Buga, Valle del Cauca",
    "precio": 490000,
    "descripcion": "Uno de los centros religiosos más importantes del país, hogar de la Basílica del Señor de los Milagros y un centro histórico colonial muy bien conservado. Disfruta de una experiencia única con visita guiada a la basílica, museos religiosos y cata de dulces en hacienda azucarera.",
    "duracion": "2 días y 1 noche",
    "incluye": "Alojamiento, guía turística a la basílica y museos, y cata de dulces típicos.",
    "itinerario": "Día 1: Llegada, visita a la Basílica y museos. Día 2: Ruta del dulce en hacienda y regreso.",
    "limitePersonas": 10
  },
  {
    "id": 6,
    "nombre": "Jericó, Antioquia",
    "precio": 680000,
    "descripcion": "Pueblo de paisajes montañosos espectaculares, famoso por ser la cuna de la Madre Laura y por la fabricación artesanal del tradicional carriel antioqueño. Vive un fin de semana con visita guiada al santuario, taller con maestro guarnielero y parapente sobre el cañón del río Cauca.",
    "duracion": "2 días y 1 noche",
    "incluye": "Alojamiento, visita al santuario, taller de marroquinería y experiencia de parapente.",
    "itinerario": "Día 1: Llegada y santuario. Día 2: Taller de carriel, vuelo en parapente y retorno.",
    "limitePersonas": 10
  },
  {
    "id": 7,
    "nombre": "Monguí, Boyacá",
    "precio": 780000,
    "descripcion": "Famoso por sus calles de piedra y arquitectura franciscana, reconocido mundialmente por la fabricación artesanal de balones cosidos a mano. Disfruta con subida al páramo y taller para crear tu propio balón de fútbol.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento, excursión guiada al páramo de Ocetá y taller de elaboración de balones.",
    "itinerario": "Día 1: Llegada y centro histórico. Día 2: Ascenso al Páramo de Ocetá. Día 3: Taller de balones y salida.",
    "limitePersonas": 10
  },
  {
    "id": 8,
    "nombre": "Honda, Tolima",
    "precio": 850000,
    "descripcion": "Conocida como la ciudad de los puentes, fue el principal puerto fluvial de la colonia y conserva una arquitectura andaluza única a orillas del río Magdalena. Vive la experiencia recorriendo puentes históricos, calles coloniales y paseos en canoa con pescadores locales.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento, tour de puentes coloniales y paseo en canoa por el río Magdalena.",
    "itinerario": "Día 1: Llegada y recorrido por el puerto. Día 2: Paseo en canoa y museos. Día 3: Despedida.",
    "limitePersonas": 10
  },
  {
    "id": 9,
    "nombre": "Playa de Belén, Norte de Santander",
    "precio": 820000,
    "descripcion": "Un oasis de paz con fachadas blancas y zócalos rojizos, puerta de entrada al impresionante paisaje del Parque Nacional Natural Los Estoraques. Vive unos días explorando gigantescas formaciones rocosas y disfrutando de la tranquilidad del pueblo.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento y guía especializado para el Parque Nacional Natural Los Estoraques.",
    "itinerario": "Día 1: Llegada y descanso. Día 2: Exploración de Los Estoraques. Día 3: Miradores y salida.",
    "limitePersonas": 10
  },
  {
    "id": 10,
    "nombre": "San Juan Girón, Santander",
    "precio": 550000,
    "descripcion": "Monumento nacional caracterizado por calles empedradas, paredes blancas y puentes de calicanto que transportan a la época colonial. Ideal para un plan romántico de fin de semana con cena privada, recorrido de mitos y leyendas y ruta del dulce tradicional.",
    "duracion": "2 días y 1 noche",
    "incluye": "Alojamiento, cena romántica privada y recorrido nocturno de mitos y leyendas.",
    "itinerario": "Día 1: Llegada, tarde colonial y cena. Día 2: Ruta del dulce tradicional y retorno.",
    "limitePersonas": 10
  },
  {
    "id": 11,
    "nombre": "Santa Cruz de Mompox, Bolívar",
    "precio": 1650000,
    "descripcion": "Isla flotante sobre el río Magdalena suspendida en el tiempo, famosa por su música, historia libertaria y la sofisticada técnica artesanal de filigrana en oro y plata. Vive una experiencia exclusiva con taller de joyería y atardecer en bote por el río.",
    "duracion": "4 días y 3 noches",
    "incluye": "Alojamiento exclusivo, taller de joyería en filigrana y recorrido en bote al atardecer.",
    "itinerario": "Día 1: Llegada y caminata nocturna. Día 2: Taller de filigrana. Día 3: Paseo en bote por el río. Día 4: Salida.",
    "limitePersonas": 10
  },
  {
    "id": 12,
    "nombre": "Santa Fe de Antioquia, Antioquia",
    "precio": 180000,
    "descripcion": "Antigua capital del departamento y joya arquitectónica colonial de clima cálido, custodiada por el histórico Puente de Occidente. Disfruta de un pasadía premium con recorrido histórico, almuerzo típico y tarde de descanso en hostería con piscina.",
    "duracion": "1 día (Pasadía)",
    "incluye": "Transporte ida y vuelta, recorrido histórico, almuerzo típico y acceso a hostería con piscina.",
    "itinerario": "Día 1: Salida, visita al Puente de Occidente, almuerzo típico, tarde de piscina y retorno.",
    "limitePersonas": 10
  },
  {
    "id": 13,
    "nombre": "Salamina, Caldas",
    "precio": 950000,
    "descripcion": "Conocida como la Ciudad Luz de Caldas, destaca por su arquitectura de colonización y sus espectaculares trabajos de madera tallada. Vive unos días explorando el pueblo y viajando en Jeep Willys hacia el Valle de la Samaria para admirar las palmas de cera.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento, recorrido patrimonial y tour en Jeep Willys al Valle de la Samaria.",
    "itinerario": "Día 1: Llegada y arquitectura en madera. Día 2: Excursión al Valle de la Samaria. Día 3: Despedida.",
    "limitePersonas": 10
  },
  {
    "id": 14,
    "nombre": "El Socorro, Santander",
    "precio": 790000,
    "descripcion": "Cuna de la Revolución de los Comuneros y de la Independencia de Colombia, llena de monumentos históricos e iglesias imponentes. Vive la experiencia entre historia, senderismo y catación en haciendas de café orgánico.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento, tour histórico de los comuneros y catación en hacienda de café orgánico.",
    "itinerario": "Día 1: Llegada y monumentos. Día 2: Senderismo y hacienda cafetera. Día 3: Salida.",
    "limitePersonas": 10
  },
  {
    "id": 15,
    "nombre": "Guaduas, Cundinamarca",
    "precio": 420000,
    "descripcion": "Parte fundamental de la Ruta Mutis y lugar de nacimiento de Policarpa Salavarrieta, con casas de teja de barro y cercanía al histórico Camino Real. Ideal para una escapada de fin de semana con visitas culturales y miradores naturales.",
    "duracion": "2 días y 1 noche",
    "incluye": "Alojamiento, visita a la casa museo de Policarpa y recorrido guiado por miradores naturales.",
    "itinerario": "Día 1: Llegada y recorrido histórico. Día 2: Ruta Mutis, miradores y retorno.",
    "limitePersonas": 10
  },
  {
    "id": 16,
    "nombre": "Santa Cruz de Lorica, Córdoba",
    "precio": 920000,
    "descripcion": "Conocida como la Ciudad Antigua y Señorial, mezcla arquitectura republicana y caribeña con influencia sirio-libanesa. Vive unos días de turismo gastronómico, aprendizaje de tejido en caña flecha y sabores de cocina árabe-caribeña.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento, taller de tejido en caña flecha y tour gastronómico de cocina árabe-caribeña.",
    "itinerario": "Día 1: Llegada y arquitectura junto al río Sinú. Día 2: Taller de caña flecha y gastronomía. Día 3: Salida.",
    "limitePersonas": 10
  },
  {
    "id": 17,
    "nombre": "Pore, Casanare",
    "precio": 1450000,
    "descripcion": "Único Pueblo Patrimonio de los Llanos Orientales, famoso por sus ruinas jesuitas y su importancia histórica en la campaña libertadora. Vive una aventura extrema con safari llanero y recorridos por paisajes naturales únicos.",
    "duracion": "3 días y 2 noches",
    "incluye": "Alojamiento, safari llanero con avistamiento de fauna y recorrido guiado por las ruinas jesuitas.",
    "itinerario": "Día 1: Llegada y ruinas históricas. Día 2: Safari llanero y atardecer en la sabana. Día 3: Salida.",
    "limitePersonas": 10
  }
];
const esperar = (ms)=> new Promise((resolve) => setTimeout(resolve,ms));

async function sembrarPaquetes() {
  for (const paquete of paquetesIniciales) {
    const respuesta = await fetch(URL_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paquete)
    });


    const creado = await respuesta.json();
    console.log('Creado:', creado.nombre, '- id:', creado.id);

    await esperar (300);
  }


  console.log('¡Listo! paquetes sembrados en db.json');
}


sembrarPaquetes();
