import { motion } from "framer-motion";
import { profile, contact } from "../data/portfolio";

// Sol central: nombre + rol + CTAs. El glow pulsa salvo reduced-motion (manejado por CSS global).
export default function Sun() {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex h-56 w-56 items-center justify-center rounded-full sm:h-72 sm:w-72"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, #fff4d6 0%, #ff8a00 38%, #ff5e3a 70%, rgba(255,94,58,0) 100%)",
          boxShadow: "0 0 80px 20px rgba(255,138,0,0.45)",
        }}
      >
        <div className="px-6">
          <h1 className="font-display text-2xl font-bold leading-tight text-space-900 drop-shadow sm:text-3xl">
            {profile.name}
          </h1>
          <p className="mt-1 font-display text-sm font-semibold text-space-900/80">
            {profile.role}
          </p>
        </div>
      </motion.div>

      <p className="mt-6 max-w-md font-body text-sm text-slate-300">
        {profile.tagline}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#proyectos"
          className="cursor-pointer rounded-full bg-sun px-5 py-2.5 font-display text-sm font-semibold text-space-900 shadow-glow transition-colors duration-200 hover:bg-sun-edge"
        >
          Ver proyectos
        </a>
        <a
          href={profile.cvUrl}
          download
          className="cursor-pointer rounded-full border border-white/20 bg-white/5 px-5 py-2.5 font-display text-sm font-semibold text-slate-100 backdrop-blur transition-colors duration-200 hover:bg-white/10"
        >
          Descargar CV
        </a>
      </div>
    </div>
  );
}
