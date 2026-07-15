import connectToDatabase from "@/lib/mongodb";
import SiteConfig from "@/models/siteConfig";
import Product from "@/models/product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  let siteConfigObj = undefined;
  let productsList = undefined;

  try {
    await connectToDatabase();
    const [config, products] = await Promise.all([
      SiteConfig.findOne({ key: "main_config" }),
      Product.find({}).sort({ order: 1, createdAt: -1 })
    ]);
    if (config) siteConfigObj = JSON.parse(JSON.stringify(config));
    if (products) productsList = JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to query configs on contact page.", error);
  }

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar config={siteConfigObj} products={productsList} />

        {/* Hero Section */}
        <section className="relative text-white flex items-center justify-center overflow-hidden min-h-[30vh] md:min-h-[40vh] border-b-[6px] border-[#0047b3]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&w=2000&q=80")' }}
          ></div>
          
          {/* Overlays for faded effect */}
          <div className="absolute inset-0 z-0 bg-slate-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0047b3]/80 to-transparent"></div>
          <div className="absolute inset-0 z-0 bg-[linear-gradient(#ffffff33_1px,transparent_1px),linear-gradient(90deg,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

          <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10 text-center py-16">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg" style={{ fontFamily: 'Gotham, sans-serif' }}>
              GET IN TOUCH
            </h1>
            <p className="text-blue-50 text-lg max-w-2xl mx-auto drop-shadow-md">
              Discuss machine sizing, pricing, or custom assembly line integrations with our chief design partners.
            </p>
          </div>
        </section>

        {/* Contact Form Wrapper */}
        <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
          <ContactForm config={siteConfigObj} />
        </section>

        {/* Map Location Section */}
        <section className="py-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 w-full">
          <div className="bg-white p-4 border border-slate-200 shadow-sm rounded-3xl overflow-hidden w-full h-[450px]">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.871031317079!2d73.7846506!3d18.4442129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc29599580a56e7%3A0xe9634dcf01931566!2sSavli%20Dhaba!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: "1.25rem" }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>
      </div>

      <Footer config={siteConfigObj} products={productsList} />
    </main>
  );
}
