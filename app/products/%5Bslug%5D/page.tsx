import { notFound } from "next/navigation";
import connectToDatabase from "@/lib/mongodb";
import Product from "@/models/product";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Static fallbacks in case database connection fails or hasn't been seeded yet
const staticProductsData: Record<string, any> = {
  "hydraulic-c-frame-press": {
    title: "Hydraulic C Frame Press",
    category: "Press Machines",
    image: "/products/Hydraulic-C-Frame-Press.image.png",
    fullDescription: "C-frame presses are provided for applications requiring better access and side movement. They are highly efficient for bearing fitting, bending, and assembly processes.",
    features: [
      "Can be used to press two or more components at a time. eg. Bearing + Circlip; Bearing + Oil-seal, etc.",
      "Load And Position Monitoring with Graph generation And Data Logging.",
      "Load capacity up to 30 tons.",
      "General purpose, could be reused for different component by changing fixture."
    ]
  },
  "hydraulic-power-packs": {
    title: "Hydraulic Power Packs",
    category: "Hydraulics",
    image: "/products/Hydraulic-Power-Packs-2.image.png",
    fullDescription: "Hydraulic Power packs are designed and manufactured for various industrial automation processes custom-made to customer requirements.",
    features: [
      "Custom tank sizes and configurations.",
      "High performance valves and pumps.",
      "Ensures reliable high-pressure output.",
      "Configured for easy maintenance and filter access."
    ]
  },
  "machining-fixtures": {
    title: "Machining Fixtures",
    category: "Tooling",
    image: "/products/Machining-Fixtures.image.png",
    fullDescription: "Hydraulic Machining fixtures are used to accurately locate and securely clamp & support workpieces on VMC/HMC machines.",
    features: [
      "Hydraulic swing clamps and support plungers.",
      "Ensures zero vibration during high-speed milling and drilling.",
      "Reduces part loading and unloading cycle times.",
      "Extremely robust for mass production runs."
    ]
  },
  "vin-number-marking-machines": {
    title: "VIN Number Marking Machines",
    category: "Special Purpose Machines",
    image: "/products/VIN-Number-Marking-Machines.image.png",
    fullDescription: "Automatic pneumatic scribe and dot peen marking systems to stamp chassis and engine identification numbers.",
    features: [
      "Built-in duplicate marking prevention logic.",
      "Interfaced with factory ERP systems for part tracking.",
      "Heavy-duty stamp force ensures clear indentation.",
      "Custom clamping adapters for different columns and frames."
    ]
  },
  "lifters-for-assembly-line": {
    title: "Lifters for Assembly Line",
    category: "Material Handling",
    image: "/products/Lifters-for-Assembly-Line.image.png",
    fullDescription: "Ergonomic lift assistance modules engineered to lift and fit heavy parts (fuel tanks, steering columns, engines) safely.",
    features: [
      "Reduces manual operator strain to near zero.",
      "Pneumatically operated with precise safety lock valves.",
      "Custom end-effectors with rotational capability.",
      "Increases assembly speed and operator safety."
    ]
  },
  "load-monitoring-systems": {
    title: "Load Monitoring Systems",
    category: "Monitoring Systems",
    image: "/products/Load-Monitoring-Systems.image.png",
    fullDescription: "Real-time process control systems mapping load vs displacement signatures to verify assembly quality.",
    features: [
      "Catches wrong component, empty component or misaligned parts instantly.",
      "Generates pass/fail signal interlocked with next stations.",
      "Stores graphs and reports for compliance audits.",
      "Works with load cell and high precision linear scales."
    ]
  },
  "on-line-automations": {
    title: "On line Automations",
    category: "Assembly Lines",
    image: "/products/On-line-Automations.image.png",
    fullDescription: "Fully integrated conveyor automation stations performing filling, pressing, checking, and serial marking.",
    features: [
      "Conveyor side-transfer or pallet positioning systems.",
      "Dispensing modules (grease, oil) with visual check cameras.",
      "PLC-sequenced mechanical grippers and pressing cylinders.",
      "High reliability with minimal manual intervention."
    ]
  },
  "multi-spindle-press": {
    title: "Multi-spindle Press with Auto Feeder",
    category: "Special Purpose Machines",
    image: "/products/Multi-spindle-Press.image.png",
    fullDescription: "High-throughput production machine capable of pressing multiple studs, bushes, or dowels simultaneously.",
    features: [
      "Performs pressing of 5 or more inserts in a single cycle.",
      "Cycle time achieved is less than 20 seconds.",
      "Automatic vibratory bowl or slider part feeding systems.",
      "Individual load cells monitor each spindle's quality signature."
    ]
  }
};

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  let product = null;

  try {
    await connectToDatabase();
    const dbProduct = await Product.findOne({ slug });
    if (dbProduct) {
      product = JSON.parse(JSON.stringify(dbProduct));
    }
  } catch (error) {
    console.error("Failed to query product from MongoDB. Using static fallback.", error);
  }

  // Fallback to static data if database is empty/offline for this slug
  if (!product && staticProductsData[slug]) {
    product = staticProductsData[slug];
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-fade-in">
      {/* Product Title Section */}
      <div className="p-8 md:p-10 pb-6 bg-slate-50 border-b border-slate-100">
        <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase rounded-full mb-4 shadow-sm">
          {product.category || "Industrial Automation"}
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tighter" style={{ fontFamily: 'Gotham, sans-serif' }}>
          {product.title}
        </h2>
      </div>

      {/* Product Header / Hero Image */}
      <div className="relative h-80 md:h-[32rem] w-full bg-white overflow-hidden p-2 md:p-4 border-b border-slate-100 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Product Content */}
      <div className="p-8 md:p-12">
        <div className="mb-12">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
            {product.fullDescription}
          </p>
        </div>

        {product.features && product.features.length > 0 && (
          <div>
            <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
              <div className="w-1.5 h-8 bg-[#0047b3] rounded-full"></div>
              Key Features & Benefits
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-4">
              {product.features.map((feature: string, idx: number) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="shrink-0 mt-0.5">
                    <CheckCircle2 className="text-[#0047b3] group-hover:scale-110 transition-transform" size={22} />
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Contact CTA for Product */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-[#002f7a] rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-900/10">
          <div>
            <h4 className="text-2xl font-black tracking-tight mb-2">Interested in this machine?</h4>
            <p className="text-slate-300 text-sm md:text-base">Contact our engineering team to discuss specifications and customization for your assembly line.</p>
          </div>
          <Link 
            href="/contact" 
            className="shrink-0 bg-white text-[#0047b3] hover:bg-blue-50 px-8 py-3.5 rounded font-bold text-sm shadow-md transition-colors"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </div>
    </div>
  );
}
