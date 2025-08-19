import React, { useEffect, useMemo, useRef, useState, useId } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Github, Mail, Sun, Moon, ArrowRight, ExternalLink, Sparkles, Rocket } from "lucide-react";
import Lenis from "@studio-freight/lenis";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Float, OrbitControls } from "@react-three/drei";
import { image } from "framer-motion/client";
//import useMagnetic from "./eliezer-portfolio/src/hook/useMagnetic";

// ------------------------------------------------------------
// Portfolio Futurista – Prototipo Fullpage (single-file)
// - Tailwind para estilos
// - Framer Motion para animaciones
// - Lenis para scroll suave
// - R3F para una pieza 3D sutil en el hero
// - Modo oscuro/ligero con toggle y preferencia del sistema
// ------------------------------------------------------------

export default function FuturisticPortfolio() {
  // Theme
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem("theme");
    const initialDark = saved ? saved === "dark" : prefersDark;
    setDark(initialDark);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);
  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => cancelAnimationFrame(id);
  }, []);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 20, mass: 0.2 });

  // Custom cursor
  useEffect(() => {
    const el = document.querySelector('#cursor');
    const move = (e) => {
      if (!el) return;
      const x = e.clientX - 12;
      const y = e.clientY - 12;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  const sections = [
  { id: "hero", label: "Inicio" },
  { id: "about", label: "Sobre mí" },
  { id: "projects", label: "Proyectos" },
  { id: "lab", label: "Lab" },
  { id: "contact", label: "Contacto" },
];


  // —— Perfil e información real ——
  const PROFILE = {
    name: "Eliezer Efrain Zuñiga Mancilla",
    role: "Full‑Stack Developer",
    location: "Matamoros, Tamaulipas, México",
    tagline: "Creatividad + optimización. La tecnología debe ser eficaz, atractiva y sencilla.",
    philosophy: "Sin miedo, pero sin confiarse.",
    birthday: "3 de diciembre",
    links: {
      email: "mailto:eliezerzm0312@gmail.com",
      github: "https://github.com/PanchoGoku",
      linkedin: "https://www.linkedin.com/in/eliezer-efrain-zu%C3%B1iga-mancilla-3b4208314/",
      cv: "proyectos/CV.pdf" // coloca tu archivo en /public
    }
  };

  const PROJECTS = [
    {
      title: "Blog Personal (CRUD + usuarios)",
      description: "Plataforma de blogging con autenticación, control de usuarios y experiencia CRUD completa.",
      stack: ["ASP.NET", "C#", "MVC", "PostgreSQL", "Entity Framework"],
      live: "", // opcional: URL si lo vuelves a desplegar
      repo: "", // opcional: URL del repositorio
      status: "semicompletado",
      image: "/proyectos/BlogLiveLogo1.png" // captura de pantalla del proyecto
    },
    {
      title: "Portfolio personal",
      description: "Este sitio: motion, 3D sutil, rendimiento y accesibilidad.",
      stack: ["React", "Tailwind", "Framer Motion", "R3F"],
      live: "#hero",
      repo: "",
      status: "en curso",
      image: "/proyectos/Portfolio.png" // captura de pantalla del proyecto
    },
    {
      title: "WIP · Gestor de tareas en tiempo real",
      description: "App full‑stack para equipos: tareas, etiquetas, actividad en vivo y sync.",
      stack: ["Next.js", "PostgreSQL", "Prisma", "Socket.IO"],
      live: "",
      repo: "",
      status: "en curso",
      image: "/proyectos/Syncboard.png" // captura de pantalla del proyecto
    }
  ];

  return (
    <div className="h-auto bg-gradient-to-b from-white to-slate-100 dark:from-[#0b0b12] dark:to-[#050508] text-slate-900 dark:text-slate-100">
      {/* Progress bar */}
      <motion.div style={{ scaleX: progress }} className="fixed top-0 left-0 right-0 h-1 origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 z-50" />

      {/* Cursor */}
      <div id="cursor" className="pointer-events-none fixed z-[60] h-6 w-6 rounded-full border border-white/30 dark:border-white/10 bg-white/20 dark:bg-white/5 backdrop-blur-sm mix-blend-difference" />

      {/* Navbar */}
      <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-40 backdrop-blur-xl bg-white/50 dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
        <a href="#hero" className="font-semibold tracking-tight px-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
          <span className="inline-flex items-center gap-2"><Rocket className="h-4 w-4" /> eliezer.dev</span>
        </a>
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="text-sm/none px-3 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100">
            {s.label}
          </a>
        ))}
        <button
          onClick={() => setDark((d) => !d)}
          aria-label="Toggle theme"
          className="ml-1 inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <a href="https://github.com/PanchoGoku" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-8 w-8 rounded-full hover:bg-black/5 dark:hover:bg-white/5">
          <Github className="h-4 w-4" />
        </a>
      </nav>

      {/* Fullpage sections */}
          {/* Foto triangular */}
      <main className="snap-y snap-mandatory h-screen overflow-y-scroll scroll-smooth" style={{ scrollbarWidth: 'thin' }}>
        <Section id="hero" className="relative snap-start">
          {/* 3D canvas background */}
          <div className="absolute inset-0 -z-10">
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 3, 2]} intensity={1.2} />
              <Float speed={1.5} rotationIntensity={1} floatIntensity={1.2}>
                <TorusKnot />
              </Float>
              <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl mx-auto px-6 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-slate-600 dark:text-slate-300/70">
              <Sparkles className="h-4 w-4" /> {PROFILE.role} — {PROFILE.location}
            </span>
            <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight [text-wrap:balance]">
              {PROFILE.name}
            </h1>
            <p className="mt-4 text-lg/7 text-slate-600 dark:text-slate-300/80 max-w-2xl mx-auto">
              {PROFILE.tagline} <span className="opacity-80">Filosofía: “{PROFILE.philosophy}”.</span>
            </p>
          </motion.div>

          {/* Subtle gradient orbs */}
          <div className="pointer-events-none absolute inset-0 -z-20">
            <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
            <div className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
          </div>
        </Section>

        <Section id="about" className="snap-start">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-5xl font-bold">Lo que me mueve</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300/80 leading-relaxed">
              Me motivan la <strong>creatividad</strong> y la <strong>optimización</strong>: casi siempre hay una manera de hacer las cosas más eficientes y más atractivas. La tecnología no solo debe ser eficaz; también debe ser <em>bella y sencilla</em>
            </p>

            <ul className="mt-8 grid md:grid-cols-3 gap-4">
              {[
                { title: "Creatividad + diseño", body: "Interfaces atractivas y sencillas de usar." },
                { title: "Optimización obsesiva", body: "Siempre hay un camino más eficiente." },
                { title: "Sin miedo, sin confiarse", body: "Explora lo nuevo sin perder rigor." },
              ].map((c) => (
                <li key={c.title} className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 backdrop-blur">
                  <h3 className="font-semibold">{c.title}</h3>
                  <p className="text-sm mt-2 text-slate-600 dark:text-slate-300/80">{c.body}</p>
                </li>
              ))}
            </ul>

            {/* Timeline */}
            <div className="mt-10 border-l border-black/10 dark:border-white/10 pl-6">
              <div className="relative mb-6">
                <span className="absolute -left-2.5 top-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
                <h3 className="font-semibold">2019 → 2023 · UAT (Matamoros, Tamaulipas)</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300/80">Ingeniería en Sistemas Computacionales (4 años y medio).</p>
              </div>
              <div className="relative mb-6">
                <span className="absolute -left-2.5 top-1 h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
                <h3 className="font-semibold">2024 → presente</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300/80">Inicio profesional en desarrollo web con enfoque full‑stack.</p>
              </div>
              <div className="relative">
                <span className="absolute -left-2.5 top-1 h-2.5 w-2.5 rounded-full bg-amber-400" />
                <h3 className="font-semibold">Cumpleaños</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300/80">{PROFILE.birthday} 🎂</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="projects" className="snap-start">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-3xl md:text-5xl font-bold">Proyectos destacados</h2>
              <a href="#" className="text-sm opacity-70 hover:opacity-100 inline-flex items-center gap-1">Ver todos <ExternalLink className="h-4 w-4" /></a>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {PROJECTS.map((p, i) => (
              <ProjectCard key={p.title} project={p} i={i} />
              ))}
            </div>
          </div>
        </Section>

        <Section id="lab" className="snap-start">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold">Lab / Experimentos</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300/80 max-w-2xl mx-auto">
              Aquí vivo pruebas y curiosidades. Por ahora, sumo el mini proyecto de la uni.
            </p>
            <div className="mt-8 grid md:grid-cols-2 gap-4">
              <a href="#" className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 backdrop-blur text-left hover:-translate-y-1 transition-transform">
                <h3 className="font-semibold">Mini compilador (ES‑Py)</h3>
                <p className="text-sm mt-2 opacity-70">Lenguaje inspirado en Python pero en español. Proyecto exprés para aprobar una materia. (Repo próximamente)</p>
              </a>
            </div>
          </div>
        </Section>

        <Section id="contact" className="snap-start">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-5xl font-bold">¿Creamos algo juntos?</h2>
            <p className="mt-4 text-slate-600 dark:text-slate-300/80">
              Abierto a colaboraciones, freelance y proyectos ambiciosos.
            </p>
            <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
              <a href={PROFILE.links.email} className="px-5 py-3 rounded-2xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold inline-flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow">
                Escríbeme <Mail className="h-4 w-4" />
              </a>
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-md font-semibold inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
                GitHub <Github className="h-4 w-4" />
              </a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="px-5 py-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-md font-semibold inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
                LinkedIn <ExternalLink className="h-4 w-4" />
              </a>
              <a href={PROFILE.links.cv} className="px-5 py-3 rounded-2xl bg-white/70 dark:bg-white/10 border border-black/10 dark:border-white/10 backdrop-blur-md font-semibold inline-flex items-center gap-2 hover:-translate-y-0.5 transition-transform">
<TriPhoto
  src="/me.jfif"
  alt="Eliezer Zuñiga"
  //quiero que la fot  se vea justo arriba del hero pero en el centro
  className="inline-flex items-center justify-center gap-2 pointer-events-none"
/>
                Descargar CV <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Dato dulce: Cumpleaños {PROFILE.birthday} 🎂</p>
          </div>
        </Section>

        <footer className="py-10 text-center opacity-70">
          <p className="text-sm">© {new Date().getFullYear()} Eliezer Zuñiga — Hecho con React, Tailwind, R3F y mucho ❤️</p>
        </footer>
      </main>
    </div>
  );
}

function Section({ id, className = "", children }) {
  return (
    <section
      id={id}
      className={`relative min-h-screen flex items-center ${className}`}
    >
      <div className="absolute inset-0 [mask-image:radial-gradient(80%_80%_at_50%_50%,black,transparent)] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.3),transparent_60%),radial-gradient(40%_40%_at_80%_80%,rgba(255,255,255,0.08),transparent_50%)] dark:bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(40%_40%_at_80%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
      <div className="relative w-full">
        {children}
      </div>
    </section>
  );
}

function ProjectCard({ project, i }) {
  const href = project.live || project.repo || "#";
  return (
    <motion.a
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.5, delay: i * 0.06 }}
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="group block rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 backdrop-blur-xl hover:-translate-y-1 transition-transform"
    >
      <div className="aspect-[16/10] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-900 dark:to-slate-800 relative">
        {/* Status chip */}
        <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wider px-2 py-1 rounded-full bg-black/70 text-white/90 dark:bg-white/10 border border-white/10">
          {project.status}
        </span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <ProjectImage src={project.image} alt={project.title} />
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">{project.title}</h3>
          <ArrowRight className="h-4 w-4 opacity-60 group-hover:translate-x-1 transition-transform" />
        </div>
        <p className="text-sm mt-1 opacity-70">{project.description}</p>
        {project.stack?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="text-[10px] px-2 py-1 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
                {s}
              </span>
            ))}
          </div>
        ) : null}
      </div>
    </motion.a>
  );
}

function ProjectImage({ src, alt }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <img
        src={src}
        alt={alt}
        className="object-cover w-full h-full rounded-xl"
      />
    </div>
  );
}


function LabCard({ title }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-black/10 dark:border-white/10 p-5 bg-white/60 dark:bg-white/5 backdrop-blur hover:-translate-y-1 transition-transform"
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm mt-2 opacity-70">Experimento interactivo preparado para producción.</p>
    </motion.div>
  );
}

// --- 3D bits ---
function TorusKnot() {
  const colorA = useMemo(() => new THREE.Color('#22d3ee'), []); // cyan-400
  const colorB = useMemo(() => new THREE.Color('#f472b6'), []); // pink-400
  const matRef = useRef();
  useEffect(() => {
    if (!matRef.current) return;
    const mat = matRef.current;
    let t = 0;
    let rafId;
    const tick = () => {
      t += 0.01;
      if (mat.color) {
        mat.color.lerpColors(colorA, colorB, (Math.sin(t) + 1) / 2);
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [colorA, colorB]);

  return (
    <mesh rotation={[0.2, 0.6, 0]}>
      <torusKnotGeometry args={[1, 0.35, 220, 30]} />
      <meshStandardMaterial ref={matRef} metalness={0.35} roughness={0.2} />
    </mesh>
  );
}

function AnimatedMeshPreview() {
  return (
    <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 2]} intensity={0.8} />
      <Float speed={2} floatIntensity={1.6}>
        <mesh>
          <icosahedronGeometry args={[0.9, 1]} />
          <meshStandardMaterial metalness={0.4} roughness={0.15} />
        </mesh>
      </Float>
      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}

// --- Foto triangular (SVG clipPath) ---
function TriPhoto({ src, alt, className = "" }) {
  const id = useId(); // id único para el clipPath
  return (
    <motion.div
      className={"text-slate-900/40 dark:text-white/40 " + className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      aria-hidden
    >
      <svg viewBox="0 0 100 115" className="w-full h-auto drop-shadow-xl select-none">
        <defs>
          <clipPath id={id}>
            {/* Triángulo equilátero aproximado dentro del viewBox 100x115 */}
            <polygon points="50,4 4,96 96,96" />
          </clipPath>
        </defs>

        {/* Imagen recortada al triángulo */}
        <image
          href={src}
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid slice"
          clipPath={`url(#${id})`}
          aria-label={alt}
        />

        {/* Marco triangular (solo trazo) */}
        <polygon
          points="50,4 4,96 96,96"
          fill="none"
          className="stroke-current"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}