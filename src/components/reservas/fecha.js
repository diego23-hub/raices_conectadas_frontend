export const calcularFechaFinal = (inicio, dias) => {
  if (!inicio) return '';
  const [a, m, d] = inicio.split('-').map(Number);
  const f = new Date(a, m - 1, d + dias - 1);
  return `${f.getFullYear()}-${String(f.getMonth() + 1).padStart(2, '0')}-${String(f.getDate()).padStart(2, '0')}`;
};

// NUEVO: cuenta los días entre dos fechas (inclusive). 10 al 12 => 3 días
export const calcularDias = (inicio, fin) => {
  if (!inicio || !fin) return 0;
  const [a1, m1, d1] = inicio.split('-').map(Number);
  const [a2, m2, d2] = fin.split('-').map(Number);
  const ms = new Date(a2, m2 - 1, d2) - new Date(a1, m1 - 1, d1);
  return Math.round(ms / 86400000) + 1;
};