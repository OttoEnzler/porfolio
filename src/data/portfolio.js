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
    short: "Plataforma web para un cliente, en producción",
    description:
      "Plataforma web desarrollada de punta a punta para un cliente y desplegada en producción; actualmente a cargo de su mantenimiento. Backend con FastAPI (API REST, JWT), frontend en React con CMS a medida para gestión de contenido, usuarios y configuración. SEO técnico: metadatos, Open Graph, sitemap, robots.txt y Google Search Console.",
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
    role: "Desarrollador Full Stack (Freelance)",
    org: "Studenko · proyecto de cliente",
    period: "2024 – Actualidad",
    mode: "Remoto",
    points: [
      "Desarrollo completo de la plataforma web de un cliente, del diseño al deploy en producción.",
      "Backend FastAPI con autenticación JWT y CMS a medida en React.",
      "Contenedorización con Docker y deploy en Render y Vercel; SEO técnico y mantenimiento en curso.",
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
