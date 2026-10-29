import { Background } from "@/components/Background";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { Projects } from "@/components/Projects";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <>
      <Background />
      <Nav />
      <main>
        <Hero />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}
