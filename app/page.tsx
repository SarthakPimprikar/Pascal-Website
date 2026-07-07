import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import CTASection from "@/components/CTASection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <AboutSection />
      <ProductsSection />
      <CTASection />
      <ClientsSection />
      <Footer />
    </main>
  );
}
