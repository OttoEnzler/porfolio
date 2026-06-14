# Portfolio "Sistema Solar" — Documento de Diseño

**Fecha:** 2026-06-14
**Autor del portfolio:** Otto Enrique Enzler Vera
**Concepto:** Portfolio personal de página única con un sistema solar interactivo como
metáfora central, fiel a las imágenes de referencia provistas.

---

## 1. Objetivo

Construir un portfolio personal de alta calidad, "smooth" y visualmente impactante, donde:

- El nombre del autor es el **sol central ardiente**.
- Cada proyecto es un **planeta orbitando** en su propia elipse, animado de forma continua.
- El fondo es una **nebulosa con estrellas y parallax**.
- Hover sobre un planeta lo resalta (glow + escala); click abre el **detalle del proyecto**.

El sitio se despliega gratuitamente con **GitHub Pages** vía **GitHub Actions**.

## 2. Stack técnico

- **React + Vite** — base del proyecto y build.
- **Tailwind CSS** — estilos utilitarios.
- **Framer Motion** — animaciones de órbitas, transiciones y modales.
- **GitHub Pages + GitHub Actions** — deploy automático en cada push a `main`.

Decisión: el autor tiene React avanzado; Framer Motion da animaciones suaves con poco
código; Tailwind acelera el diseño; el conjunto despliega bien a Pages.

## 3. Arquitectura y estructura de carpetas

El contenido se separa de la presentación. Para actualizar el portfolio se edita un solo
archivo de datos.

```
src/
  data/
    portfolio.js        # nombre, rol, proyectos, skills, experiencia, contacto
  components/
    Navbar.jsx          # INICIO · PROYECTOS · SOBRE MÍ · HABILIDADES · CONTACTO + scroll suave
    Starfield.jsx       # canvas de estrellas con parallax
    SolarSystem.jsx     # hero: orquesta sol + planetas (recibe datos por props)
    Sun.jsx             # sol central con nombre + rol + botón "Descargar CV"
    Planet.jsx          # planeta orbitando (hover/click)
    ProjectModal.jsx    # detalle del proyecto (nombre, descripción, stack, links)
    Projects.jsx        # grid de proyectos (accesibilidad/SEO, fallback a las órbitas)
    About.jsx           # perfil profesional + timeline de experiencia
    Skills.jsx          # skills con nivel
    Contact.jsx         # email, LinkedIn, GitHub, web, ubicación, descargar CV
    Footer.jsx
  hooks/
    usePrefersReducedMotion.js
    useActiveSection.js
  App.jsx
  main.jsx
  index.css
public/
  CV_Otto_Enzler_2026.pdf   # copiado desde el CV original, para descarga directa
```

Principio de aislamiento: `SolarSystem` no conoce el contenido; lo recibe por props desde
`portfolio.js`. Cada componente tiene una responsabilidad clara.

## 4. Secciones (orden de scroll)

1. **Hero / Sistema Solar** — sol con nombre + rol + botón "Descargar CV"; planetas
   orbitando = proyectos; starfield con parallax.
2. **Proyectos** — click en planeta abre `ProjectModal` (nombre, descripción, stack como
   chips, links a GitHub/demo). Debajo, vista en grid para accesibilidad y SEO.
3. **Sobre mí** — perfil profesional + experiencia (Designia, Studenko, Newton) en timeline.
4. **Habilidades** — skills con nivel.
5. **Contacto** — email, LinkedIn, GitHub, web (studenko.com.py), ubicación + descargar CV.

## 5. Datos reales (de `portfolio.js`)

**Identidad**
- Nombre: Otto Enrique Enzler Vera
- Rol: Full Stack Developer · Ruby on Rails · Spring Boot · 5.º Año Ing. Informática
- Ubicación: Encarnación, Paraguay

**Contacto**
- Email: enzler.otto@gmail.com
- LinkedIn: linkedin.com/in/otto-enzler-59b35739a
- GitHub: github.com/OttoEnzler
- Web: studenko.com.py

**Proyectos (planetas)**
1. **E-Commerce Microservicios** — Sistema e-commerce con arquitectura de microservicios y
   metodología SDD. API Gateway, Eureka, Feign, RabbitMQ, JWT, Docker Compose.
   Stack: Spring Boot 3 · Java 17 · PostgreSQL · RabbitMQ · Docker.
   Repo: github.com/OttoEnzler/ecommerce-microservices
2. **RealEstateSoft** — App web de gestión inmobiliaria, desarrollo ágil en equipo.
   Stack: Spring Boot · React · PostgreSQL.
   Repos: github.com/realstatesoft/backend · github.com/realstatesoft/frontend
3. **Studenko** — Plataforma web propia en producción, con CMS propio y SEO técnico.
   Stack: FastAPI · React · Docker · Render · Vercel.
   Demo: studenko.com.py

**Experiencia (timeline en Sobre mí)**
- Full Stack Developer — Designia (Abr 2025 – Actualidad, Remoto)
- Desarrollador Full Stack — Studenko, Freelance (2024, Remoto)
- Instructor de Programación (Python) — Newton Centro de Estudios (Ene 2024 – Actualidad)

**Habilidades (con nivel)**
Spring Boot/Java (Inter-Avanzado), React (Avanzado), Ruby on Rails (Intermedio),
PostgreSQL (Avanzado), FastAPI/Python (Intermedio), Docker (Intermedio),
Deploy & Cloud (Intermedio), SEO Técnico (Intermedio), Git (Avanzado), T-SQL (Intermedio).

**Idiomas:** Español (nativo) · Inglés C1.

## 6. Diseño visual

- **Paleta "sol ardiente":** fondo `#07040f` / `#0e0a1f`; sol naranja-ámbar
  (`#ff8a00` → `#ff5e3a`); nebulosa magenta-violeta; planetas azules; texto blanco/gris;
  acentos con glow.
- **Tipografía:** Space Grotesk (títulos) + Inter (texto).
- **Estilo:** glassmorphism en tarjetas/modales, glows suaves, gradientes.
- La skill **ui-ux-pro-max** se aplica en la implementación para paleta exacta, spacing,
  jerarquía tipográfica y accesibilidad.

## 7. Animación y rendimiento

- Órbitas con Framer Motion / CSS transforms (animar `transform`, evitar layout thrash).
- Estrellas en `<canvas>` (no saturar el DOM).
- **`prefers-reduced-motion`**: congela órbitas y reduce parallax.
- Lazy-load de imágenes; build optimizado por Vite.

## 8. Accesibilidad y responsive

- Navegación por teclado, foco visible, roles/aria en planetas y modal, contraste AA.
- **Mobile:** el sistema solar se simplifica (planetas en disposición vertical/estática
  tappable, sin órbitas); todo el contenido accesible vía grid.

## 9. Deploy (GitHub)

- Repositorio en GitHub.
- **GitHub Actions**: build con Vite y publish en **GitHub Pages** en cada push a `main`.
- `vite.config.js` con `base` apuntando al nombre del repo (Pages de proyecto).
- `.gitignore`: `node_modules`, `dist`, `.superpowers/`.

## 10. Verificación

- Build limpio (`vite build`) y lint sin errores.
- Checklist manual: órbitas suaves, modal abre/cierra, responsive en mobile,
  `prefers-reduced-motion`, descarga de CV funcional, deploy live verificado.

## 11. Fuera de alcance (YAGNI)

- Backend / CMS / formulario de contacto con envío de servidor (el contacto son enlaces
  directos: mailto, LinkedIn, GitHub).
- i18n / multi-idioma (sitio en español).
- Blog o sistema de contenido dinámico.
