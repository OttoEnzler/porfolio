import { motion } from "framer-motion";
import { projects } from "../data/portfolio";

// Grid de tarjetas. Garantiza acceso al contenido sin depender de la animación del hero.
export default function Projects({ onSelect }) {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-4 py-24">
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Proyectos</h2>
      <p className="mt-2 max-w-xl font-body text-slate-400">
        Cada planeta del sistema es uno de estos proyectos. Tocá una tarjeta para ver el detalle.
      </p>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <motion.button
            key={p.id}
            type="button"
            onClick={() => onSelect(p)}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-6 text-left backdrop-blur transition-colors duration-200 hover:border-white/25 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun"
          >
            <span
              className="mb-4 block h-10 w-10 rounded-full shadow-glow-planet"
              style={{
                background: `radial-gradient(circle at 32% 30%, #ffffff55, ${p.color} 45%, #1b2350 100%)`,
              }}
            />
            <h3 className="font-display text-lg font-semibold text-white">{p.name}</h3>
            <p className="mt-1 font-body text-sm text-slate-400">{p.short}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {p.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-space-900/60 px-2.5 py-0.5 font-display text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </section>
  );
}
