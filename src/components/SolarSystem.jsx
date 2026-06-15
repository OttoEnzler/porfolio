import { motion, useTime, useTransform } from "framer-motion";
import { projects } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import Sun from "./Sun";
import Planet from "./Planet";

// Un planeta animado recorriendo su elipse (rx, ry) con velocidad derivada de `duration`.
// Posición: x = cos(θ)·rx, y = sin(θ)·ry, medida desde el centro del sistema.
function OrbitingPlanet({ project, onSelect }) {
  const { rx, ry, duration, phase, size } = project.orbit;
  const time = useTime();
  // θ avanza 2π radianes cada `duration` segundos, partiendo de `phase`.
  const angle = useTransform(time, (t) => phase + (t / 1000) * ((2 * Math.PI) / duration));
  const x = useTransform(angle, (a) => Math.cos(a) * rx);
  const y = useTransform(angle, (a) => Math.sin(a) * ry);

  return (
    <motion.div
      className="pointer-events-auto absolute left-1/2 top-1/2"
      style={{ x, y, marginLeft: -size / 2, marginTop: -size / 2 }}
    >
      <Planet project={project} onSelect={onSelect} />
    </motion.div>
  );
}

// Hero: el sol al centro y cada proyecto orbitando en su elipse.
// Desktop: órbitas animadas reales. Mobile/reduced-motion: planetas estáticos en columna.
export default function SolarSystem({ onSelect }) {
  const reduced = usePrefersReducedMotion();

  return (
    <section
      id="inicio"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24"
    >
      {/* Nebulosa de fondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-[5]"
        style={{
          background:
            "radial-gradient(60% 50% at 20% 30%, rgba(214,64,159,0.18), transparent), radial-gradient(50% 50% at 80% 70%, rgba(124,77,255,0.2), transparent)",
        }}
      />

      {/* Sistema solar animado: visible en md+ y sin reduced-motion */}
      {!reduced && (
        <div className="relative hidden h-[640px] w-full max-w-[1000px] items-center justify-center md:flex">
          {projects.map((p) => (
            <div key={p.id} className="pointer-events-none absolute inset-0 flex items-center justify-center">
              {/* Anillo de órbita (elipse que coincide con la trayectoria del planeta) */}
              <div
                aria-hidden="true"
                className="absolute rounded-[50%] border border-white/10"
                style={{ width: p.orbit.rx * 2, height: p.orbit.ry * 2 }}
              />
              <OrbitingPlanet project={p} onSelect={onSelect} />
            </div>
          ))}
          <Sun />
        </div>
      )}

      {/* Fallback estático: mobile o reduced-motion */}
      <div className={`flex w-full max-w-md flex-col items-center gap-10 ${reduced ? "" : "md:hidden"}`}>
        <Sun />
        <div className="flex flex-wrap items-end justify-center gap-8 pt-4">
          {projects.map((p) => (
            <Planet key={p.id} project={p} onSelect={onSelect} />
          ))}
        </div>
      </div>
    </section>
  );
}
