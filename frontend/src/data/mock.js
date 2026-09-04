export const TRAMOS = [
  { id: "todos", nombre: "Todos los tramos" },
  { id: "norte-0-30", nombre: "Autopista Norte Km 0-30" },
  { id: "norte-15-22", nombre: "Autopista Norte Km 15-22" },
  { id: "boyaca-0-50", nombre: "Av. Boyacá Km 0-50" },
  { id: "a30-0-40", nombre: "Autopista 30 Km 0-40" },
  { id: "c80-0-60", nombre: "Calle 80 Km 0-60" },
];

export const CATEGORIZACION = {
  "norte-15-22": {
    municipio: "Bogotá D.C. — Chía",
    tramo: "Autopista Norte Km 15-22",
    km: "7 km",
    peajes: 2,
    carriles: "4 carriles por sentido",
    velocidad: "80 km/h",
    tipo: "Autopista urbana",
    pavimento: "Bueno",
    iluminacion: "Completa",
    horaPico: "7–9 AM · 5–7 PM",
    flujo: "12.500 vehículos/día",
  },
  "norte-0-30": {
    municipio: "Bogotá D.C. — Chía — Cajicá",
    tramo: "Autopista Norte Km 0-30",
    km: "30 km",
    peajes: 3,
    carriles: "3 carriles por sentido",
    velocidad: "100 km/h",
    tipo: "Autopista interurbana",
    pavimento: "Muy bueno",
    iluminacion: "Parcial (tramo urbano)",
    horaPico: "6–9 AM · 4–8 PM",
    flujo: "48.200 vehículos/día",
  },
  "boyaca-0-50": {
    municipio: "Bogotá D.C.",
    tramo: "Av. Boyacá Km 0-50",
    km: "50 km",
    peajes: 2,
    carriles: "3 carriles por sentido",
    velocidad: "80 km/h",
    tipo: "Arteria urbana",
    pavimento: "Regular",
    iluminacion: "Completa",
    horaPico: "6–10 AM · 4–8 PM",
    flujo: "95.400 vehículos/día",
  },
  "a30-0-40": {
    municipio: "Bogotá D.C. — Soacha",
    tramo: "Autopista 30 Km 0-40",
    km: "40 km",
    peajes: 2,
    carriles: "4 carriles por sentido",
    velocidad: "90 km/h",
    tipo: "Autopista urbana",
    pavimento: "Bueno",
    iluminacion: "Completa",
    horaPico: "6–9 AM · 5–7 PM",
    flujo: "61.800 vehículos/día",
  },
  "c80-0-60": {
    municipio: "Bogotá D.C.",
    tramo: "Calle 80 Km 0-60",
    km: "60 km",
    peajes: 1,
    carriles: "3 carriles por sentido",
    velocidad: "60 km/h",
    tipo: "Arteria urbana",
    pavimento: "Bueno",
    iluminacion: "Completa",
    horaPico: "7–9 AM · 5–8 PM",
    flujo: "78.900 vehículos/día",
  },
};

export const SINIESTROS = [
  { id: "SIN-1042", tipo: "Colisión", severidad: "critica", actor: "Automóvil", lesionados: 2, fallecidos: 1, causa: "Exceso de velocidad", zona: "Autopista Norte Km 18", fecha: "28/08/2026 06:42", tramoId: "norte-15-22", x: 300, y: 370 },
  { id: "SIN-1041", tipo: "Volcamiento", severidad: "alta", actor: "Transporte pesado", lesionados: 3, fallecidos: 0, causa: "Distancia insegura", zona: "Autopista 30 Km 15", fecha: "28/08/2026 05:17", tramoId: "a30-0-40", x: 520, y: 300 },
  { id: "SIN-1040", tipo: "Choque múltiple", severidad: "media", actor: "Motocicleta", lesionados: 1, fallecidos: 0, causa: "Cambio brusco de carril", zona: "Calle 80 Km 5", fecha: "27/08/2026 22:03", tramoId: "c80-0-60", x: 430, y: 322 },
  { id: "SIN-1039", tipo: "Atropello", severidad: "critica", actor: "Peatón", lesionados: 1, fallecidos: 1, causa: "Baja visibilidad nocturna", zona: "Autopista Norte Km 22", fecha: "27/08/2026 20:48", tramoId: "norte-15-22", x: 620, y: 262 },
  { id: "SIN-1038", tipo: "Colisión", severidad: "alta", actor: "Automóvil", lesionados: 0, fallecidos: 0, causa: "Falla de frenos", zona: "Av. Boyacá Km 42", fecha: "27/08/2026 18:25", tramoId: "boyaca-0-50", x: 230, y: 405 },
  { id: "SIN-1037", tipo: "Colisión", severidad: "baja", actor: "Motocicleta", lesionados: 1, fallecidos: 0, causa: "Pavimento húmedo", zona: "Autopista Norte Km 16", fecha: "27/08/2026 15:31", tramoId: "norte-15-22", x: 210, y: 392 },
  { id: "SIN-1036", tipo: "Choque múltiple", severidad: "media", actor: "Automóvil", lesionados: 4, fallecidos: 0, causa: "Congestionamiento súbito", zona: "Calle 80 Km 8", fecha: "26/08/2026 08:12", tramoId: "c80-0-60", x: 470, y: 305 },
  { id: "SIN-1035", tipo: "Volcamiento", severidad: "alta", actor: "Transporte pesado", lesionados: 1, fallecidos: 0, causa: "Carga mal estibada", zona: "Autopista Norte Km 26", fecha: "25/08/2026 19:55", tramoId: "norte-0-30", x: 700, y: 212 },
];

export const SEVERIDADES = {
  critica: { label: "Crítica", color: "#EF4444" },
  alta: { label: "Alta", color: "#F59E0B" },
  media: { label: "Media", color: "#FFD700" },
  baja: { label: "Baja", color: "#22C55E" },
};

export const ACTORES = [
  { id: "bicicleta", tipo: "Bicicleta", cantidad: 4, genero: "Masculino (100%)", accidente: "Atropello", ubicacion: "Autopista Norte Km 18", riesgo: 78 },
  { id: "automovil", tipo: "Automóvil", cantidad: 12, genero: "Femenino (58%) · Masculino (42%)", accidente: "Colisión", ubicacion: "Av. Boyacá Km 42", riesgo: 64 },
  { id: "camion", tipo: "Camión / Transporte pesado", cantidad: 3, genero: "Masculino (100%)", accidente: "Volcamiento", ubicacion: "Autopista 30 Km 15", riesgo: 71 },
  { id: "motocicleta", tipo: "Motocicleta", cantidad: 7, genero: "Masculino (85%) · Femenino (15%)", accidente: "Choque múltiple", ubicacion: "Calle 80 Km 5", riesgo: 86 },
  { id: "peaton", tipo: "Peatón", cantidad: 2, genero: "Femenino (100%)", accidente: "Atropello", ubicacion: "Autopista Norte Km 22", riesgo: 92 },
];

export const ALERTAS_SEED = [
  { id: "AL-9821", via: "Autopista Norte", peaje: "Peaje Km 18", evento: "Accidente · Choque", zona: "Km 18-19", estado: "critica", minutos: 5, tramoId: "norte-15-22", x: 305, y: 366 },
  { id: "AL-9817", via: "Av. Boyacá", peaje: "Peaje Km 42", evento: "Bloqueo de carril", zona: "Km 41-43", estado: "advertencia", minutos: 15, tramoId: "boyaca-0-50", x: 228, y: 408 },
  { id: "AL-9809", via: "Autopista 30", peaje: "Peaje Km 15", evento: "Volcamiento", zona: "Km 14-16", estado: "critica", minutos: 62, tramoId: "a30-0-40", x: 520, y: 300 },
  { id: "AL-9804", via: "Calle 80", peaje: "Peaje Km 5", evento: "Congestionamiento severo", zona: "Km 4-6", estado: "activa", minutos: 30, tramoId: "c80-0-60", x: 435, y: 320 },
  { id: "AL-9790", via: "Autopista Norte", peaje: "Peaje Km 25", evento: "Objeto en vía", zona: "Km 24-26", estado: "resuelta", minutos: 125, tramoId: "norte-0-30", x: 690, y: 222 },
];

export const NUEVAS_ALERTAS_POOL = [
  { via: "Autopista Norte", peaje: "Peaje Km 18", evento: "Objeto en vía", zona: "Km 17-18", estado: "advertencia", tramoId: "norte-15-22", x: 280, y: 378 },
  { via: "Av. Boyacá", peaje: "Peaje Km 42", evento: "Accidente · Choque", zona: "Km 40-41", estado: "critica", tramoId: "boyaca-0-50", x: 210, y: 415 },
  { via: "Calle 80", peaje: "Peaje Km 5", evento: "Falla de servicios", zona: "Km 5-6", estado: "activa", tramoId: "c80-0-60", x: 450, y: 314 },
  { via: "Autopista 30", peaje: "Peaje Km 15", evento: "Incendio vehicular", zona: "Km 16-17", estado: "critica", tramoId: "a30-0-40", x: 545, y: 292 },
  { via: "Autopista Norte", peaje: "Peaje Km 25", evento: "Tráfico pesado", zona: "Km 23-25", estado: "activa", tramoId: "norte-0-30", x: 660, y: 235 },
  { via: "Av. Boyacá", peaje: "Peaje Km 42", evento: "Bloqueo de carril", zona: "Km 43-44", estado: "advertencia", tramoId: "boyaca-0-50", x: 250, y: 398 },
];

export const ESTADOS_ALERTA = {
  critica: { label: "Crítica", color: "#EF4444", bg: "rgba(239,68,68,0.12)" },
  advertencia: { label: "Advertencia", color: "#F59E0B", bg: "rgba(245,158,11,0.12)" },
  activa: { label: "Activa", color: "#3B82F6", bg: "rgba(59,130,246,0.12)" },
  resuelta: { label: "Resuelta", color: "#22C55E", bg: "rgba(34,197,94,0.12)" },
};

export const POIS = [
  { id: "peaje-15", capa: "peaje", nombre: "Peaje Km 15", detalle: "6 carriles · Telepeaje activo", x: 170, y: 363 },
  { id: "peaje-22", capa: "peaje", nombre: "Peaje Km 22", detalle: "8 carriles · Flujo normal", x: 620, y: 261 },
  { id: "gas-17", capa: "gas", nombre: "Estación de servicio Km 17", detalle: "Abierta 24h · ACPM y gasolina", x: 245, y: 438 },
  { id: "rest-20", capa: "restaurante", nombre: "Restaurante / Punto SOS Km 20", detalle: "Atención médica básica", x: 520, y: 338 },
  { id: "cam-1", capa: "camara", nombre: "Cámara CCTA 014", detalle: "Operativa · 1080p PTZ", x: 140, y: 350 },
  { id: "cam-2", capa: "camara", nombre: "Cámara CCTA 027", detalle: "Operativa · Visión nocturna", x: 430, y: 320 },
  { id: "cam-3", capa: "camara", nombre: "Cámara CCTA 033", detalle: "Operativa · LPR placas", x: 690, y: 220 },
  { id: "sen-1", capa: "sensor", nombre: "Sensor Bluetooth BS-08", detalle: "Señal fuerte · 98% uptime", x: 330, y: 385 },
  { id: "sen-2", capa: "sensor", nombre: "Sensor Bluetooth BS-15", detalle: "Señal media · 94% uptime", x: 575, y: 282 },
  { id: "sen-3", capa: "sensor", nombre: "Sensor Bluetooth BS-21", detalle: "Señal fuerte · 99% uptime", x: 770, y: 178 },
];

export const EQUIPOS = [
  "Cuadrilla Vial Alfa",
  "Unidad SOS Médica",
  "Grúa Pesada Bravo",
  "Policía de Tránsito — Sector Norte",
];

export const SPARK_SINIESTROS = [
  { d: "L", v: 3 }, { d: "M", v: 5 }, { d: "X", v: 2 }, { d: "J", v: 6 },
  { d: "V", v: 4 }, { d: "S", v: 7 }, { d: "D", v: 3 },
];

export const FLUJO_ACTORES = [
  { tipo: "Automóviles", pct: 58, color: "#2563EB" },
  { tipo: "Motos", pct: 18, color: "#7C3AED" },
  { tipo: "Transporte pesado", pct: 24, color: "#F59E0B" },
  { tipo: "Bicicletas", pct: 3, color: "#22C55E" },
  { tipo: "Peatones", pct: 2, color: "#3B82F6" },
];

export const TICKER_ITEMS = [
  "EN VIVO · RED DE PEAJES COLOMBIA",
  "TPD 12.500 VEHÍCULOS/DÍA",
  "2 PEAJES OPERATIVOS",
  "CÁMARAS CCTA 98% UPTIME",
  "SENSORES BLUETOOTH ACTIVOS",
  "VELOCIDAD MÁX. 80 KM/H",
  "MONITOREAMOS EL RIESGO PARA HACER LAS VÍAS MÁS SEGURAS",
];

export const fmt = (n) => new Intl.NumberFormat("es-CO").format(n);

export const tiempoDesde = (minutos) => {
  if (minutos < 1) return "Ahora mismo";
  if (minutos < 60) return `Hace ${minutos} min`;
  const h = Math.floor(minutos / 60);
  return h === 1 ? "Hace 1 hora" : `Hace ${h} horas`;
};
