import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import ClientLogos from "@/components/ClientLogos";
import VideoSection from "@/components/VideoSection";
import ServicesCarousel from "@/components/ServicesCarousel";
import Sectors from "@/components/Sectors";
import Certifications from "@/components/Certifications";
import ProjectsGallery from "@/components/ProjectsGallery";
import VideoReels from "@/components/VideoReels";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <StatsBar />
        <ClientLogos />
        <ServicesCarousel />
        <VideoSection />
        <Sectors />
        <Certifications />
        <ProjectsGallery />
        <VideoReels />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
