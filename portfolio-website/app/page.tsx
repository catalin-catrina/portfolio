import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Portfolio } from "@/components/Portfolio";
import { Education } from "@/components/Education";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Portfolio />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}
