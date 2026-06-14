import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

// Modal de detalle. Cierra con Escape, click en backdrop o botón. Bloquea el scroll al abrir.
export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-space-900/80 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.name}
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full max-w-lg rounded-2xl border border-white/10 bg-space-800/90 p-6 shadow-glow backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar"
              className="absolute right-4 top-4 cursor-pointer rounded-full p-1 text-slate-300 transition-colors duration-200 hover:bg-white/10 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>

            <h3 className="font-display text-xl font-bold text-white">{project.name}</h3>
            <p className="mt-1 font-body text-sm text-slate-400">{project.short}</p>
            <p className="mt-4 font-body text-sm leading-relaxed text-slate-200">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-display text-xs text-slate-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer rounded-full bg-sun px-4 py-2 font-display text-sm font-semibold text-space-900 transition-colors duration-200 hover:bg-sun-edge"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
