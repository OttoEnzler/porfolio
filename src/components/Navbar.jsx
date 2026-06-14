import { nav, profile } from "../data/portfolio";
import { useActiveSection } from "../hooks/useActiveSection";

const ids = nav.map((n) => n.id);

export default function Navbar() {
  const active = useActiveSection(ids);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-4">
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-space-800/70 px-2 py-1.5 backdrop-blur-xl">
        <span className="px-3 font-display text-sm font-bold text-white">
          {profile.shortName}
        </span>
        {nav.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`cursor-pointer rounded-full px-3 py-1.5 font-display text-xs font-medium transition-colors duration-200 ${
              active === n.id
                ? "bg-sun text-space-900"
                : "text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
