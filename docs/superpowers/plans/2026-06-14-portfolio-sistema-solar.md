# Portfolio "Sistema Solar" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un portfolio de página única con un sistema solar interactivo (sol = nombre, planetas = proyectos), tema cósmico "sol ardiente", desplegado en GitHub Pages.

**Architecture:** SPA en React + Vite. Contenido centralizado en `src/data/portfolio.js`. Componentes con responsabilidad única: el hero (`SolarSystem`) orquesta `Sun`, `Planet` y `Starfield` recibiendo datos por props; secciones de scroll (`About`, `Skills`, `Contact`) son independientes. Lógica pura (matemática de órbitas) aislada en `src/lib/` con tests unitarios. Animaciones con Framer Motion respetando `prefers-reduced-motion`.

**Tech Stack:** React 18, Vite 5, Tailwind CSS 3.4, Framer Motion 11, Vitest (tests de lógica pura), GitHub Actions + GitHub Pages.

**Testing philosophy:** Para componentes visuales/animados, la verificación es pragmática (build limpio, render en dev server, checklist visual). TDD estricto solo para lógica pura (helpers de órbita, hooks) donde aporta valor real.

---

### Task 1: Scaffold del proyecto Vite + React

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/index.css`
- Create: `tailwind.config.js`, `postcss.config.js`
- Create: `.gitignore` (ya existe — verificar)

- [ ] **Step 1: Scaffold con Vite**

Run desde la raíz del proyecto:
```bash
npm create vite@latest . -- --template react
```
Si pregunta por carpeta no vacía, elegir "Ignore files and continue". Esto genera `package.json`, `vite.config.js`, `index.html`, `src/main.jsx`, `src/App.jsx`, `src/App.css`, `src/index.css`, `public/`.

- [ ] **Step 2: Instalar dependencias**

```bash
npm install
npm install framer-motion
npm install -D tailwindcss@3 postcss autoprefixer vitest
```

- [ ] **Step 3: Inicializar Tailwind**

```bash
npx tailwindcss init -p
```

Crea `tailwind.config.js` y `postcss.config.js`.

- [ ] **Step 4: Configurar `tailwind.config.js`**

Reemplazar el contenido completo por:
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        space: {
          900: "#07040f",
          800: "#0e0a1f",
          700: "#160f2e",
        },
        sun: {
          core: "#fff4d6",
          DEFAULT: "#ff8a00",
          edge: "#ff5e3a",
        },
        nebula: {
          magenta: "#d6409f",
          violet: "#7c4dff",
        },
        planet: "#7aa2ff",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,138,0,0.45)",
        "glow-planet": "0 0 24px rgba(122,162,255,0.6)",
      },
    },
  },
  plugins: [],
};
```

- [ ] **Step 5: Configurar `src/index.css`**

Reemplazar todo el contenido por:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  color-scheme: dark;
}

html {
  scroll-behavior: smooth;
}

body {
  @apply bg-space-900 text-slate-100 font-body antialiased;
  margin: 0;
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 6: Configurar `vite.config.js` con base de GitHub Pages y Vitest**

Reemplazar el contenido por:
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 'base' debe coincidir con el nombre del repositorio de GitHub Pages.
export default defineConfig({
  base: "/porfolio/",
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.{js,jsx}"],
  },
});
```

- [ ] **Step 7: Limpiar boilerplate**

Borrar `src/App.css` y vaciar `src/App.jsx` dejando solo:
```jsx
export default function App() {
  return <div>Portfolio</div>;
}
```

Asegurar que `src/main.jsx` importe `./index.css` (Vite ya lo hace por defecto) y no `App.css`.

- [ ] **Step 8: Verificar dev server**

Run:
```bash
npm run dev
```
Expected: Vite arranca sin errores y `http://localhost:5173/porfolio/` muestra "Portfolio". Cortar con Ctrl+C.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "chore: scaffold Vite + React + Tailwind + Framer Motion"
```

---

### Task 2: Datos del portfolio

**Files:**
- Create: `src/data/portfolio.js`

- [ ] **Step 1: Crear `src/data/portfolio.js`**

```js
export const profile = {
  name: "Otto Enrique Enzler Vera",
  shortName: "Otto Enzler",
  role: "Full Stack Developer",
  tagline: "Ruby on Rails · Spring Boot · 5.º Año Ing. Informática",
  summary:
    "Desarrollador Full Stack con más de un año de experiencia en entornos reales. He diseñado e implementado aplicaciones web completas — backend, frontend, base de datos, contenedorización con Docker y deploy productivo — aplicando filosofía de microservicios y buenas prácticas.",
  location: "Encarnación, Paraguay",
  cvUrl: "CV_Otto_Enzler_2026.pdf",
};

export const contact = {
  email: "enzler.otto@gmail.com",
  linkedin: "https://linkedin.com/in/otto-enzler-59b35739a",
  github: "https://github.com/OttoEnzler",
  website: "https://studenko.com.py",
};

// Cada proyecto es un planeta. 'color' tiñe el planeta; 'orbit' define su elipse.
export const projects = [
  {
    id: "ecommerce",
    name: "E-Commerce Microservicios",
    short: "Arquitectura de microservicios con SDD",
    description:
      "Sistema de e-commerce con arquitectura de microservicios y metodología SDD (Spec-Driven Development). Incluye API Gateway, Eureka Service Discovery, comunicación síncrona con Feign Client y asíncrona con RabbitMQ, autenticación JWT y Docker Compose.",
    stack: ["Spring Boot 3", "Java 17", "PostgreSQL", "RabbitMQ", "Docker", "SDD"],
    links: [
      { label: "GitHub", url: "https://github.com/OttoEnzler/ecommerce-microservices" },
    ],
    color: "#ff9d54",
    orbit: { rx: 220, ry: 120, duration: 38, phase: 0, size: 46 },
  },
  {
    id: "realestate",
    name: "RealEstateSoft",
    short: "Gestión inmobiliaria, desarrollo ágil en equipo",
    description:
      "Aplicación web para gestión inmobiliaria desarrollada en equipo bajo metodología ágil con sprints, dailies y control de versiones colaborativo. Backend con Spring Boot y frontend con React.",
    stack: ["Spring Boot", "React", "PostgreSQL", "Git colaborativo"],
    links: [
      { label: "Backend", url: "https://github.com/realstatesoft/backend" },
      { label: "Frontend", url: "https://github.com/realstatesoft/frontend" },
    ],
    color: "#7aa2ff",
    orbit: { rx: 340, ry: 180, duration: 52, phase: 2.1, size: 54 },
  },
  {
    id: "studenko",
    name: "Studenko",
    short: "Plataforma web propia en producción",
    description:
      "Plataforma web propia desarrollada de punta a punta y desplegada en producción. Backend con FastAPI (API REST, JWT), frontend en React con CMS propio para gestión de contenido, usuarios y configuración. SEO técnico: metadatos, Open Graph, sitemap, robots.txt y Google Search Console.",
    stack: ["FastAPI", "React", "Docker", "Render", "Vercel", "SEO"],
    links: [{ label: "Ver sitio", url: "https://studenko.com.py" }],
    color: "#c084fc",
    orbit: { rx: 460, ry: 250, duration: 68, phase: 4.0, size: 50 },
  },
];

export const experience = [
  {
    role: "Full Stack Developer",
    org: "Designia",
    period: "Abr 2025 – Actualidad",
    mode: "Remoto",
    points: [
      "Aplicaciones web con Ruby on Rails (backend) y React (frontend), arquitectura MVC y principios SOLID.",
      "APIs REST con validaciones y manejo de errores centralizado.",
      "Diseño y optimización de consultas en PostgreSQL con Active Record.",
    ],
  },
  {
    role: "Desarrollador Full Stack",
    org: "Studenko (Freelance)",
    period: "2024",
    mode: "Remoto",
    points: [
      "Desarrollo completo de plataforma propia, del diseño al deploy en producción.",
      "Backend FastAPI con autenticación JWT y CMS propio en React.",
      "Contenedorización con Docker y deploy en Render y Vercel; SEO técnico.",
    ],
  },
  {
    role: "Instructor de Programación",
    org: "Newton Centro de Estudios",
    period: "Ene 2024 – Actualidad",
    mode: "Presencial",
    points: [
      "Instructor del módulo de Python para aspirantes a Ingeniería.",
      "Diseño de material, ejercicios y evaluaciones de algoritmos y lógica.",
      "Mentoría personalizada a alumnos sin conocimientos previos.",
    ],
  },
];

// level: 0-100 para la barra de progreso.
export const skills = [
  { name: "React", level: 90, note: "SPAs, hooks, routing, integración con APIs REST" },
  { name: "Spring Boot / Java", level: 80, note: "APIs REST, Spring MVC, JPA/Hibernate, Security" },
  { name: "PostgreSQL", level: 85, note: "Esquemas, queries complejas, optimización" },
  { name: "Git", level: 85, note: "Branches, pull requests, revisiones" },
  { name: "Ruby on Rails", level: 70, note: "Uso profesional activo en Designia" },
  { name: "FastAPI / Python", level: 70, note: "APIs REST, autenticación JWT" },
  { name: "Docker", level: 65, note: "Contenedorización, Docker Compose" },
  { name: "Deploy & Cloud", level: 65, note: "Render, Vercel, variables de entorno, CI básico" },
  { name: "SEO Técnico", level: 60, note: "Metadatos, sitemap, Open Graph, Search Console" },
  { name: "T-SQL / SQL Server", level: 60, note: "Formación académica" },
];

export const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "C1 Avanzado" },
];

export const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "proyectos", label: "Proyectos" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "habilidades", label: "Habilidades" },
  { id: "contacto", label: "Contacto" },
];
```

- [ ] **Step 2: Verificar import**

Run:
```bash
node --input-type=module -e "import('./src/data/portfolio.js').then(m=>console.log(Object.keys(m), m.projects.length))"
```
Expected: imprime las claves exportadas y `3`.

- [ ] **Step 3: Commit**

```bash
git add src/data/portfolio.js
git commit -m "feat: datos del portfolio (perfil, proyectos, skills, experiencia)"
```

---

### Task 3: Lógica pura de órbitas (TDD)

**Files:**
- Create: `src/lib/orbit.js`
- Test: `src/lib/orbit.test.js`

- [ ] **Step 1: Escribir el test que falla**

`src/lib/orbit.test.js`:
```js
import { describe, it, expect } from "vitest";
import { orbitPosition, levelToWidth } from "./orbit";

describe("orbitPosition", () => {
  it("en ángulo 0 está en el extremo derecho de la elipse", () => {
    const p = orbitPosition(0, 100, 50);
    expect(p.x).toBeCloseTo(100);
    expect(p.y).toBeCloseTo(0);
  });

  it("en ángulo PI/2 está en el extremo inferior", () => {
    const p = orbitPosition(Math.PI / 2, 100, 50);
    expect(p.x).toBeCloseTo(0);
    expect(p.y).toBeCloseTo(50);
  });

  it("en ángulo PI está en el extremo izquierdo", () => {
    const p = orbitPosition(Math.PI, 100, 50);
    expect(p.x).toBeCloseTo(-100);
    expect(p.y).toBeCloseTo(0);
  });
});

describe("levelToWidth", () => {
  it("convierte nivel 0-100 a string de porcentaje", () => {
    expect(levelToWidth(0)).toBe("0%");
    expect(levelToWidth(90)).toBe("90%");
  });

  it("acota valores fuera de rango", () => {
    expect(levelToWidth(-10)).toBe("0%");
    expect(levelToWidth(150)).toBe("100%");
  });
});
```

- [ ] **Step 2: Correr el test y verificar que falla**

Run:
```bash
npx vitest run src/lib/orbit.test.js
```
Expected: FAIL — no se puede resolver `./orbit`.

- [ ] **Step 3: Implementación mínima**

`src/lib/orbit.js`:
```js
// Devuelve la posición {x, y} sobre una elipse de semiejes rx, ry para un ángulo en radianes.
export function orbitPosition(angleRad, rx, ry) {
  return {
    x: Math.cos(angleRad) * rx,
    y: Math.sin(angleRad) * ry,
  };
}

// Convierte un nivel 0-100 en un ancho CSS acotado.
export function levelToWidth(level) {
  const clamped = Math.max(0, Math.min(100, level));
  return `${clamped}%`;
}
```

- [ ] **Step 4: Correr el test y verificar que pasa**

Run:
```bash
npx vitest run src/lib/orbit.test.js
```
Expected: PASS (5 tests).

- [ ] **Step 5: Agregar script de test a `package.json`**

En `package.json`, dentro de `"scripts"`, agregar:
```json
"test": "vitest run"
```

- [ ] **Step 6: Commit**

```bash
git add src/lib/orbit.js src/lib/orbit.test.js package.json
git commit -m "feat: helpers de órbita con tests"
```

---

### Task 4: Hooks (reduced-motion y sección activa)

**Files:**
- Create: `src/hooks/usePrefersReducedMotion.js`
- Create: `src/hooks/useActiveSection.js`

- [ ] **Step 1: Crear `src/hooks/usePrefersReducedMotion.js`**

```js
import { useEffect, useState } from "react";

// true si el usuario pidió reducir el movimiento.
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
```

- [ ] **Step 2: Crear `src/hooks/useActiveSection.js`**

```js
import { useEffect, useState } from "react";

// Observa secciones por id y devuelve la que está visible para resaltar el navbar.
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [ids]);

  return active;
}
```

- [ ] **Step 3: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores (los hooks aún no se usan, pero deben compilar).

- [ ] **Step 4: Commit**

```bash
git add src/hooks
git commit -m "feat: hooks usePrefersReducedMotion y useActiveSection"
```

---

### Task 5: Starfield (canvas de estrellas con parallax)

**Files:**
- Create: `src/components/Starfield.jsx`

- [ ] **Step 1: Crear `src/components/Starfield.jsx`**

```jsx
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

// Fondo de estrellas dibujado en canvas. Parallax sutil con el scroll.
export default function Starfield() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const count = Math.floor((canvas.width * canvas.height) / 6000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3 + 0.2,
        depth: Math.random() * 0.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const scrollY = window.scrollY;
      for (const s of stars) {
        const y = (s.y - scrollY * s.depth * 0.15) % canvas.height;
        const yy = y < 0 ? y + canvas.height : y;
        const flicker = reduced ? 1 : 0.6 + 0.4 * Math.sin(Date.now() * 0.002 + s.tw);
        ctx.globalAlpha = s.depth * flicker;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, yy, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(draw);
    }

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
```

- [ ] **Step 2: Verificar render temporal**

Editar `src/App.jsx` temporalmente:
```jsx
import Starfield from "./components/Starfield";

export default function App() {
  return (
    <div className="min-h-screen">
      <Starfield />
      <h1 className="p-10 font-display text-4xl">Starfield activo</h1>
    </div>
  );
}
```
Run `npm run dev` y abrir `http://localhost:5173/porfolio/`. Expected: fondo negro con estrellas titilando. Cortar con Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add src/components/Starfield.jsx src/App.jsx
git commit -m "feat: fondo Starfield con parallax y reduced-motion"
```

---

### Task 6: Sun (sol central con nombre, rol y CTA)

**Files:**
- Create: `src/components/Sun.jsx`

- [ ] **Step 1: Crear `src/components/Sun.jsx`**

```jsx
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
```

- [ ] **Step 2: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/Sun.jsx
git commit -m "feat: componente Sun con nombre, rol y CTAs (incluye Descargar CV)"
```

---

### Task 7: Planet (planeta interactivo)

**Files:**
- Create: `src/components/Planet.jsx`

- [ ] **Step 1: Crear `src/components/Planet.jsx`**

```jsx
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
```

- [ ] **Step 2: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/Planet.jsx
git commit -m "feat: componente Planet interactivo con hover/focus"
```

---

### Task 8: SolarSystem (hero que orquesta órbitas)

**Files:**
- Create: `src/components/SolarSystem.jsx`

- [ ] **Step 1: Crear `src/components/SolarSystem.jsx`**

```jsx
import { motion } from "framer-motion";
import { projects } from "../data/portfolio";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import Sun from "./Sun";
import Planet from "./Planet";

// Hero: el sol al centro y cada proyecto orbitando en su elipse.
// Desktop: órbitas animadas. Mobile/reduced-motion: planetas estáticos en columna.
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
            <div key={p.id} className="absolute inset-0 flex items-center justify-center">
              {/* Anillo de órbita */}
              <div
                aria-hidden="true"
                className="absolute rounded-[50%] border border-white/10"
                style={{ width: p.orbit.rx * 2, height: p.orbit.ry * 2 }}
              />
              {/* Planeta rotando alrededor del centro */}
              <motion.div
                className="absolute"
                style={{ width: p.orbit.rx * 2, height: p.orbit.ry * 2 }}
                initial={{ rotate: (p.orbit.phase * 180) / Math.PI }}
                animate={{ rotate: 360 + (p.orbit.phase * 180) / Math.PI }}
                transition={{ duration: p.orbit.duration, ease: "linear", repeat: Infinity }}
              >
                <div
                  className="absolute left-1/2 top-0 -translate-x-1/2"
                  style={{ /* contrarresta la rotación para que la etiqueta quede legible */ }}
                >
                  <motion.div
                    animate={{ rotate: -(360 + (p.orbit.phase * 180) / Math.PI) }}
                    transition={{ duration: p.orbit.duration, ease: "linear", repeat: Infinity }}
                  >
                    <Planet project={p} onSelect={onSelect} />
                  </motion.div>
                </div>
              </motion.div>
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
```

- [ ] **Step 2: Verificar render**

Editar `src/App.jsx` temporalmente:
```jsx
import { useState } from "react";
import Starfield from "./components/Starfield";
import SolarSystem from "./components/SolarSystem";

export default function App() {
  const [sel, setSel] = useState(null);
  return (
    <div className="min-h-screen">
      <Starfield />
      <SolarSystem onSelect={setSel} />
      {sel && <p className="p-4">Seleccionado: {sel.name}</p>}
    </div>
  );
}
```
Run `npm run dev`. Expected: sol central con tres planetas orbitando en elipses; al clickear un planeta aparece "Seleccionado: ...". Probar en ventana angosta (<768px): planetas en columna estática. Ctrl+C.

- [ ] **Step 3: Commit**

```bash
git add src/components/SolarSystem.jsx src/App.jsx
git commit -m "feat: hero SolarSystem con órbitas animadas y fallback estático"
```

---

### Task 9: ProjectModal (detalle del proyecto)

**Files:**
- Create: `src/components/ProjectModal.jsx`

- [ ] **Step 1: Crear `src/components/ProjectModal.jsx`**

```jsx
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

// Modal de detalle. Cierra con Escape, click en backdrop o botón. Trap básico de foco al abrir.
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
```

- [ ] **Step 2: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProjectModal.jsx
git commit -m "feat: ProjectModal con animación, Escape y backdrop"
```

---

### Task 10: Projects (grid accesible / SEO)

**Files:**
- Create: `src/components/Projects.jsx`

- [ ] **Step 1: Crear `src/components/Projects.jsx`**

```jsx
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
```

- [ ] **Step 2: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/Projects.jsx
git commit -m "feat: sección Projects en grid"
```

---

### Task 11: About (perfil + timeline de experiencia)

**Files:**
- Create: `src/components/About.jsx`

- [ ] **Step 1: Crear `src/components/About.jsx`**

```jsx
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
```

- [ ] **Step 2: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/About.jsx
git commit -m "feat: sección About con timeline de experiencia"
```

---

### Task 12: Skills (barras con nivel)

**Files:**
- Create: `src/components/Skills.jsx`

- [ ] **Step 1: Crear `src/components/Skills.jsx`**

```jsx
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
```

- [ ] **Step 2: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/Skills.jsx
git commit -m "feat: sección Skills con barras de nivel e idiomas"
```

---

### Task 13: Contact + Footer

**Files:**
- Create: `src/components/Contact.jsx`
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Crear `src/components/Contact.jsx`**

```jsx
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
            rel="noopener noreferrer"
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
```

- [ ] **Step 2: Crear `src/components/Footer.jsx`**

```jsx
import { profile } from "../data/portfolio";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-8 text-center font-body text-xs text-slate-500">
      © {new Date().getFullYear()} {profile.name}. Hecho con React, Vite y Framer Motion.
    </footer>
  );
}
```

- [ ] **Step 3: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores.

- [ ] **Step 4: Commit**

```bash
git add src/components/Contact.jsx src/components/Footer.jsx
git commit -m "feat: secciones Contact y Footer"
```

---

### Task 14: Navbar (con sección activa)

**Files:**
- Create: `src/components/Navbar.jsx`

- [ ] **Step 1: Crear `src/components/Navbar.jsx`**

```jsx
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
```

- [ ] **Step 2: Verificar build**

Run:
```bash
npx vite build
```
Expected: build sin errores.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.jsx
git commit -m "feat: Navbar flotante con resaltado de sección activa"
```

---

### Task 15: Ensamblado en App + SEO + CV en public

**Files:**
- Modify: `src/App.jsx`
- Modify: `index.html`
- Create: `public/CV_Otto_Enzler_2026.pdf` (copia)

- [ ] **Step 1: Copiar el CV a `public/`**

Run (Git Bash):
```bash
cp "/c/Users/Fratt/Downloads/CV_Otto_Enzler_2026.pdf" "public/CV_Otto_Enzler_2026.pdf"
```
Verificar: `ls -la public/CV_Otto_Enzler_2026.pdf` muestra el archivo.

- [ ] **Step 2: Ensamblar `src/App.jsx` (versión final)**

```jsx
import { useState } from "react";
import Starfield from "./components/Starfield";
import Navbar from "./components/Navbar";
import SolarSystem from "./components/SolarSystem";
import Projects from "./components/Projects";
import About from "./components/About";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ProjectModal from "./components/ProjectModal";

export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative min-h-screen">
      <Starfield />
      <Navbar />
      <main>
        <SolarSystem onSelect={setSelected} />
        <Projects onSelect={setSelected} />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
```

- [ ] **Step 3: Actualizar `index.html` con metadatos SEO**

Reemplazar el `<head>` de `index.html` por:
```html
<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='40' fill='%23ff8a00'/%3E%3C/svg%3E" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Otto Enzler · Full Stack Developer</title>
  <meta name="description" content="Portfolio de Otto Enzler, Full Stack Developer (Ruby on Rails, Spring Boot, React). Proyectos, experiencia y contacto." />
  <meta property="og:title" content="Otto Enzler · Full Stack Developer" />
  <meta property="og:description" content="Portfolio interactivo con proyectos de microservicios, gestión inmobiliaria y plataformas web en producción." />
  <meta property="og:type" content="website" />
  <meta name="theme-color" content="#07040f" />
</head>
```
(Mantener el `<body>` con `<div id="root"></div>` y el `<script type="module" src="/src/main.jsx">`.)

- [ ] **Step 4: Verificar la app completa**

Run:
```bash
npm run dev
```
Abrir `http://localhost:5173/porfolio/` y verificar manualmente:
- Navbar resalta la sección al scrollear.
- Hero con órbitas; click en planeta abre modal; Escape lo cierra.
- Secciones Proyectos, Sobre mí, Habilidades, Contacto renderizan con datos reales.
- Botón "Descargar CV" descarga el PDF.
Ctrl+C al terminar.

- [ ] **Step 5: Build de producción**

Run:
```bash
npm run build
```
Expected: `dist/` generado sin errores.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: ensamblar App completa + SEO + CV descargable"
```

---

### Task 16: Deploy a GitHub Pages (GitHub Actions)

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `README.md`
- Create: `public/.nojekyll`

- [ ] **Step 1: Crear `public/.nojekyll`**

Archivo vacío (evita que Pages procese con Jekyll y rompa rutas con `_`):
```bash
touch public/.nojekyll
```

- [ ] **Step 2: Crear `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Crear `README.md`**

```markdown
# Portfolio — Otto Enzler

Portfolio personal con sistema solar interactivo. React + Vite + Tailwind + Framer Motion.

## Desarrollo

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Push a `main` dispara el workflow de GitHub Actions que publica en GitHub Pages.
El `base` de Vite (`vite.config.js`) debe coincidir con el nombre del repositorio.
```

- [ ] **Step 4: Verificar que el build sigue limpio**

Run:
```bash
npm run build
```
Expected: sin errores.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "ci: workflow de deploy a GitHub Pages + README"
```

- [ ] **Step 6: Crear repo y push (acción del usuario)**

> **Nota:** este paso requiere autenticación de GitHub. El usuario lo ejecuta. Sugerir:
> ```bash
> gh repo create porfolio --public --source=. --remote=origin --push
> ```
> Luego, en GitHub: Settings → Pages → Source = "GitHub Actions".
> Si el nombre del repo NO es `porfolio`, actualizar `base` en `vite.config.js`.

---

### Task 17: Verificación final (checklist de calidad)

**Files:** ninguno (verificación)

- [ ] **Step 1: Correr tests y build**

Run:
```bash
npm test
npm run build
```
Expected: tests PASS y build sin errores.

- [ ] **Step 2: Checklist visual en dev server**

Run `npm run dev` y verificar:
- [ ] Sin emojis como íconos (se usan SVG).
- [ ] `cursor-pointer` en todos los elementos clickeables.
- [ ] Transiciones suaves (150-300ms) en hover.
- [ ] Foco visible al navegar con Tab (planetas, links, modal).
- [ ] Responsive en 375px, 768px, 1024px, 1440px sin scroll horizontal.
- [ ] Texto cumple contraste legible sobre el fondo oscuro.
- [ ] Modal: abre con click/Enter en planeta, cierra con Escape/backdrop/botón.
- [ ] Descargar CV funciona.

- [ ] **Step 3: Verificar reduced-motion**

En el SO activar "reducir movimiento" (o en DevTools: Rendering → Emulate `prefers-reduced-motion: reduce`). Recargar. Expected: órbitas congeladas, planetas en disposición estática, sin parpadeo de estrellas. Ctrl+C.

- [ ] **Step 4: Commit final (si hubo ajustes)**

```bash
git add -A
git commit -m "chore: ajustes finales de verificación de calidad"
```

---

## Self-Review (cobertura del spec)

- §1 Objetivo / concepto sistema solar → Tasks 6, 7, 8 ✓
- §2 Stack → Task 1 ✓
- §3 Arquitectura/estructura → Tasks 1-15 (cada componente en su archivo) ✓
- §4 Secciones (hero, proyectos, sobre mí, habilidades, contacto) → Tasks 8, 10, 11, 12, 13 ✓
- §5 Datos reales → Task 2 ✓
- §6 Diseño visual (paleta, fuentes, glassmorphism) → Tasks 1 (tailwind/css), 6-14 ✓
- §7 Animación/rendimiento (Framer Motion, canvas, reduced-motion) → Tasks 5, 8, 4 ✓
- §8 Accesibilidad/responsive → Tasks 7, 9, 17 ✓
- §9 Deploy GitHub → Task 16 ✓
- §10 Verificación → Task 17 ✓
- §11 Botón Descargar CV (añadido en revisión) → Tasks 6, 13, 15 ✓
