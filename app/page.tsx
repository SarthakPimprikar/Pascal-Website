import connectToDatabase from "@/lib/mongodb";
import SiteConfig from "@/models/siteConfig";
import LandingPage from "@/models/landingPage";
import Product from "@/models/product";
import Client from "@/models/client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import ProductsSection from "@/components/ProductsSection";
import CTASection from "@/components/CTASection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";

// Force dynamic rendering to fetch fresh database content on every request
export const dynamic = "force-dynamic";

export default async function Home() {
  let siteConfigObj = undefined;
  let landingPageObj = undefined;
  let productsList = undefined;
  let clientsList = undefined;

  try {
    await connectToDatabase();
    
    // Fetch DB documents in parallel
    const [config, landing, products, clients] = await Promise.all([
      SiteConfig.findOne({ key: "main_config" }),
      LandingPage.findOne({ key: "homepage" }),
      Product.find({}).sort({ order: 1, createdAt: -1 }),
      Client.find({}).sort({ order: 1, name: 1 })
    ]);

    if (config) siteConfigObj = JSON.parse(JSON.stringify(config));
    if (landing) landingPageObj = JSON.parse(JSON.stringify(landing));
    if (products) productsList = JSON.parse(JSON.stringify(products));
    if (clients) clientsList = JSON.parse(JSON.stringify(clients));
  } catch (error) {
    console.error("Database connection or fetch failed on homepage. Falling back to defaults.", error);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar config={siteConfigObj} products={productsList} />
      <Hero content={landingPageObj?.hero} clients={clientsList} />
      <AboutSection content={landingPageObj?.about} />
      <ProductsSection products={productsList} />
      <CTASection content={landingPageObj?.cta} />
      <ClientsSection clients={clientsList} />
      <Footer config={siteConfigObj} products={productsList} />
    </main>
  );
}

