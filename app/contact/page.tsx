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
        <section className="bg-slate-900 py-16 md:py-24 relative overflow-hidden border-b-4 border-[#0047b3]">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff33_1px,transparent_1px),linear-gradient(90deg,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4" style={{ fontFamily: 'Gotham, sans-serif' }}>
              GET IN TOUCH
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
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
