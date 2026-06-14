import { motion } from "framer-motion";

// Un planeta clickeable. La órbita la maneja el contenedor; aquí va el cuerpo + interacción.
export default function Planet({ project, onSelect }) {
  const { name, short, color, orbit } = project;
  const size = orbit.size;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(project)}
      whileHover={{ scale: 1.15 }}
      whileFocus={{ scale: 1.15 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      aria-label={`Ver proyecto ${name}`}
      className="group relative flex cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-sun focus-visible:ring-offset-2 focus-visible:ring-offset-space-900"
      style={{ width: size, height: size }}
    >
      <span
        className="block h-full w-full rounded-full shadow-glow-planet"
        style={{
          background: `radial-gradient(circle at 32% 30%, #ffffff55, ${color} 45%, #1b2350 100%)`,
        }}
      />
      <span className="pointer-events-none absolute -bottom-7 whitespace-nowrap rounded-full bg-space-800/90 px-2 py-1 font-display text-[11px] font-medium text-slate-200 opacity-0 backdrop-blur transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
        {short}
      </span>
    </motion.button>
  );
}
