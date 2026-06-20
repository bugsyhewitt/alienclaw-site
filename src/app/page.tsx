import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ClientSections from "./components/ClientSections";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ClientSections />
      </main>
      <Footer />
    </>
  );
}
