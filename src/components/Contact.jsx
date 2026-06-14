import { contact, profile } from "../data/portfolio";

const items = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "LinkedIn", value: "otto-enzler", href: contact.linkedin },
  { label: "GitHub", value: "OttoEnzler", href: contact.github },
  { label: "Sitio web", value: "studenko.com.py", href: contact.website },
];

export default function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">Contacto</h2>
      <p className="mt-3 font-body text-slate-400">
        {profile.location} · Disponibilidad inmediata
      </p>

      <div className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
        {items.map((it) => (
          <a
            key={it.label}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel={it.href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur transition-colors duration-200 hover:border-white/25 hover:bg-white/10"
          >
            <span className="font-display text-xs uppercase tracking-wide text-sun">{it.label}</span>
            <p className="mt-1 font-body text-sm text-slate-200">{it.value}</p>
          </a>
        ))}
      </div>

      <a
        href={profile.cvUrl}
        download
        className="mt-10 inline-block cursor-pointer rounded-full bg-sun px-6 py-3 font-display text-sm font-semibold text-space-900 shadow-glow transition-colors duration-200 hover:bg-sun-edge"
      >
        Descargar CV
      </a>
    </section>
  );
}
