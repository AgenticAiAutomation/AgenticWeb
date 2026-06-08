import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import Services from "@/components/Services";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import BookCTA from "@/components/BookCTA";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function HomePage() {
  return (
    <>
      <div className="noise-overlay" aria-hidden="true" />
      <Nav />
      <main id="main-content">
        <Hero />
        <TrustBar />
        <Services />
        <Process />
        <FAQ />
        <BookCTA />
      </main>
      <Footer />
      <StickyMobileCTA />
      <ChatWidget />
    </>
  );
}
