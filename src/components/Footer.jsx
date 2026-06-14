import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center font-body text-xs text-slate-500">
      © {new Date().getFullYear()} {profile.name}. Hecho con React, Vite y Framer Motion.
    </footer>
  );
}
