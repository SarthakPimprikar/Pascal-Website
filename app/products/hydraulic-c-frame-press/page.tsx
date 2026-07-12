import { CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hydraulic C Frame Press | Pascal Auto Solutions",
  description: "C-frame presses are provided for applications requiring better access and side movement.",
};

export default function HydraulicCFramePressPage() {
  const features = [
    "Can be used to press two or more components at a time. eg. Bearing + Circlip; Bearing + Oil-seal, etc.",
    "Load And Position Monitoring with Graph generation And Data Logging.",
    "Load capacity up to 30 tons.",
    "General purpose, could be reused for different component by changing fixture."
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Product Title Section */}
      <div className="p-8 md:p-10 pb-6 bg-slate-50 border-b border-slate-100">
        <div className="inline-block px-4 py-1.5 bg-blue-600 text-white text-xs font-bold tracking-widest uppercase rounded-full mb-4 shadow-sm">
          Press Machines
        </div>
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tighter" style={{ fontFamily: 'Gotham, sans-serif' }}>
          Hydraulic C Frame Press
        </h2>
      </div>

      {/* Product Header / Hero Image */}
      <div className="relative h-80 md:h-[32rem] w-full bg-white overflow-hidden p-2 md:p-4 border-b border-slate-100">
        <img 
          src="/products/Hydraulic-C-Frame-Press.image.png" 
          alt="Hydraulic C Frame Press Machine" 
          className="w-full h-full object-contain mix-blend-multiply"
        />
      </div>

      {/* Product Content */}
      <div className="p-8 md:p-12">
        <div className="mb-12">
          <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
            <span className="font-bold text-slate-900">C-frame presses</span> are provided for applications requiring <span className="font-black text-[#0047b3] tracking-tight">better access and side movement</span>.
          </p>
        </div>

        <div>
          <h3 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3 tracking-tight">
            <div className="w-1.5 h-8 bg-[#0047b3] rounded-full"></div>
            Key Features & Benefits
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex gap-4 items-start group">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle2 className="text-[#0047b3] group-hover:scale-110 transition-transform" size={22} />
                </div>
                <p className="text-slate-700 text-lg leading-relaxed">{feature}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact CTA for Product */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 to-[#002f7a] rounded-2xl p-8 md:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-900/10">
          <div>
            <h4 className="text-2xl font-black tracking-tight mb-2">Interested in this machine?</h4>
            <p className="text-slate-300 text-sm md:text-base">Contact our engineering team to discuss specifications and customization for your assembly line.</p>
          </div>
          <a 
            href="/contact" 
            className="shrink-0 bg-white text-[#0047b3] hover:bg-blue-50 px-8 py-3.5 rounded font-bold text-sm shadow-md transition-colors"
          >
            REQUEST A QUOTE
          </a>
        </div>
      </div>
    </div>
  );
}
