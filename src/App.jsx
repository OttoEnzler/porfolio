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
