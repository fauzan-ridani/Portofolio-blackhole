import BlackHole from "../components/BlackHole";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Work from "../components/Work";
import About from "../components/About";
import Contact from "../components/Contact";

export default function Page() {
  return (
    <>
      <BlackHole />

      <div className="page">
        <Navbar />
        <main>
          <Hero />
          <Work />
          <About />
        </main>
        <Contact />
      </div>
    </>
  );
}
