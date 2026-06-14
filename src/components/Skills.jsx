import { motion } from "framer-motion";
import { skills, languages } from "../data/portfolio";
import { levelToWidth } from "../lib/orbit";

export default function Skills() {
  return (
    <section id="habilidades" className="mx-auto max-w-4xl px-4 py-24">
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Habilidades</h2>

      <div className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
        {skills.map((s, i) => (
          <div key={s.name}>
            <div className="flex items-baseline justify-between">
              <span className="font-display text-sm font-semibold text-white">{s.name}</span>
              <span className="font-body text-xs text-slate-400">{s.level}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #ff8a00, #ff5e3a)",
                }}
                initial={{ width: 0 }}
                whileInView={{ width: levelToWidth(s.level) }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
              />
            </div>
            <p className="mt-1 font-body text-xs text-slate-500">{s.note}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        {languages.map((l) => (
          <span
            key={l.name}
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 font-display text-sm text-slate-200"
          >
            {l.name} · <span className="text-sun">{l.level}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
