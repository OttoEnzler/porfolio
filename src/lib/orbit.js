// Devuelve la posición {x, y} sobre una elipse de semiejes rx, ry para un ángulo en radianes.
export function orbitPosition(angleRad, rx, ry) {
  return {
    x: Math.cos(angleRad) * rx,
    y: Math.sin(angleRad) * ry,
  };
}

// Convierte un nivel 0-100 en un ancho CSS acotado.
export function levelToWidth(level) {
  const clamped = Math.max(0, Math.min(100, level));
  return `${clamped}%`;
}
