import connectToDatabase from "@/lib/mongodb";
import GalleryItem from "@/models/galleryItem";
import SiteConfig from "@/models/siteConfig";
import Product from "@/models/product";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

// Standard fallback images for gallery in case DB is empty
const defaultGalleryItems = [
  {
    title: "Multi Spindle Assembly SPM",
    description: "Automated multi-point assembly press system operational on high volume assembly line.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "CNC Machining Fixture Setup",
    description: "Hydraulic workpiece workholding block installed on CNC horizontal machining center.",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Heavy Duty Hydraulic Press",
    description: "C-frame hydraulic pressing station equipped with load monitoring sensor graphs.",
    imageUrl: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Hydraulic Power Unit Fabrication",
    description: "Custom oil reservoir power pack under system pressure testing.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
  }
];

export default async function GalleryPage() {
  let galleryList = [];
  let siteConfigObj = undefined;
  let productsList = undefined;

  try {
    await connectToDatabase();
    
    const [dbItems, config, products] = await Promise.all([
      GalleryItem.find({}).sort({ order: 1, createdAt: -1 }),
      SiteConfig.findOne({ key: "main_config" }),
      Product.find({}).sort({ order: 1, createdAt: -1 })
    ]);

    if (dbItems && dbItems.length > 0) {
      galleryList = JSON.parse(JSON.stringify(dbItems));
    } else {
      galleryList = defaultGalleryItems;
    }

    if (config) siteConfigObj = JSON.parse(JSON.stringify(config));
    if (products) productsList = JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to query gallery items. Using fallback images.", error);
    galleryList = defaultGalleryItems;
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
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=2000&q=80")' }}
          ></div>
          
          {/* Overlays for faded effect */}
          <div className="absolute inset-0 z-0 bg-slate-950/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0047b3]/80 to-transparent"></div>
          <div className="absolute inset-0 z-0 bg-[linear-gradient(#ffffff33_1px,transparent_1px),linear-gradient(90deg,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

          <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10 text-center py-16">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg" style={{ fontFamily: 'Gotham, sans-serif' }}>
              OUR GALLERY
            </h1>
            <p className="text-blue-50 text-lg max-w-2xl mx-auto drop-shadow-md">
              Visual showcase of our custom machine developments, hydraulic fixtures, and operational shop floors.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {galleryList.map((item: any, idx: number) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden group transition-all duration-300 flex flex-col"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2 group-hover:text-[#0047b3] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer config={siteConfigObj} products={productsList} />
    </main>
  );
}
