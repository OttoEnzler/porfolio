import { motion } from "framer-motion";
import { profile, experience } from "../data/portfolio";

export default function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-4xl px-4 py-24">
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Sobre mí</h2>
      <p className="mt-4 max-w-2xl font-body leading-relaxed text-slate-300">
        {profile.summary}
      </p>

      <ol className="mt-12 space-y-8 border-l border-white/15 pl-6">
        {experience.map((job, i) => (
          <motion.li
            key={`${job.org}-${i}`}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative"
          >
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-sun shadow-glow" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display text-lg font-semibold text-white">
                {job.role} · <span className="text-sun">{job.org}</span>
              </h3>
              <span className="font-body text-xs text-slate-400">
                {job.period} · {job.mode}
              </span>
            </div>
            <ul className="mt-2 list-disc space-y-1 pl-5 font-body text-sm text-slate-300">
              {job.points.map((pt, j) => (
                <li key={j}>{pt}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
