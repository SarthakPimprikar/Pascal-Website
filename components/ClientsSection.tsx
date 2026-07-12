"use client";

import { Handshake, Globe2, MapPin } from "lucide-react";

const clientLogos = [
  { src: "/clients/BAJAJ.logo.png", alt: "Bajaj" },
  { src: "/clients/greaves.png", alt: "Greaves Cotton Limited" },
  { src: "/clients/FIAT.logo.png", alt: "FIAT" },
  { src: "/clients/tatamotors.logo.png", alt: "TATA Motors" },
  { src: "/clients/mahendra.logo.png", alt: "Mahindra" },
  { src: "/clients/cummins-blue.png", alt: "Cummins" },
  { src: "/clients/JAYAHIND.logo.png", alt: "Jaya Hind" },
  { src: "/clients/saj.png", alt: "SAJ Test Plant" },
  { src: "/clients/dynomerk.png", alt: "Dynomerk Controls" },
  { src: "/clients/umasons.png", alt: "Umasons Auto Compo" },
  { src: "/clients/carraro.png", alt: "Carraro" },
  { src: "/clients/varroc.png", alt: "Varroc Excellence" },
  { src: "/clients/xytel.png", alt: "Xytel" },
  { src: "/clients/cummins-blue-2.png", alt: "Cummins" },
  { src: "/clients/cummins-red.png", alt: "Cummins Red" },
  { src: "/clients/g-gear.png", alt: "G Gear" },
  { src: "/clients/jagadamba.png", alt: "Jagadamba Auto-components" },
  { src: "/clients/aurangabad.png", alt: "Aurangabad Auto Engineering" },
  { src: "/clients/shakti.png", alt: "Shakti Component Ventures" },
  { src: "/clients/pragati.png", alt: "Pragati Engineering" },
  { src: "/clients/swagati.png", alt: "Swagati Engineering" },
];

const internationalClients = [
  { src: "/clients/eurotech.png", alt: "EuroTech", country: "Malaysia" },
  { src: "/clients/transasia.png", alt: "Trans Asia Group", country: "Bangladesh" }
];

export default function ClientsSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10">
        
        {/* Top Text Content */}
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-[2.5px] bg-gradient-to-r from-[#0047b3] to-blue-400"></div>
            <h3 className="text-[#0047b3] font-bold text-sm tracking-[0.2em] uppercase">
              Our Clients
            </h3>
            <div className="w-12 h-[2.5px] bg-gradient-to-r from-[#0047b3] to-blue-400"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
            Partnerships Built On <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047b3] to-blue-600">
              Trust & Respect
            </span>
          </h2>
          
          <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-medium pt-4">
            <p>
              A true partnership is a two-way street — ideas and information flow openly and regularly, based on a foundation of mutual trust and respect for one another's expertise — and our clients embrace this philosophy.
            </p>
            <p>
              Our client list speaks for itself. Since our earliest days, we've represented everything from start-ups to Fortune 500 companies with that same partnership approach and dedication at the core of every engagement.
            </p>
          </div>
        </div>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-20">
          {clientLogos.map((client, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 rounded-xl p-6 flex items-center justify-center aspect-[4/3] overflow-hidden group cursor-pointer"
            >
              <img 
                src={client.src} 
                alt={client.alt}
                className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100 group-hover:scale-105"
                onError={(e) => {
                   e.currentTarget.style.display = 'none';
                   if (e.currentTarget.parentElement) {
                     e.currentTarget.parentElement.innerHTML = `<span class="text-sm font-bold text-slate-400 text-center uppercase tracking-wider group-hover:text-[#0047b3] transition-colors">${client.alt}</span>`;
                   }
                }}
              />
            </div>
          ))}
        </div>

        {/* Global Footprint Section */}
        <div className="relative pt-16 border-t border-gray-100">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full flex items-center justify-center text-orange-500 shadow-sm border border-orange-100">
              <Globe2 size={28} strokeWidth={2} />
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Our Global Presence
            </h3>
            <p className="text-slate-500 font-medium mt-2">
              Expanding our robust engineering solutions across borders.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {internationalClients.map((client, index) => (
              <div 
                key={index}
                className="w-full sm:w-80 bg-white border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-2 hover:border-orange-200 transition-all duration-500 rounded-2xl p-8 flex flex-col items-center justify-between aspect-[4/3] group cursor-pointer relative overflow-hidden"
              >
                {/* Subtle map glow background */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex-1 flex items-center justify-center w-full relative z-10">
                  <img 
                    src={client.src} 
                    alt={client.alt}
                    className="max-w-full max-h-32 object-contain transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                       e.currentTarget.style.display = 'none';
                       if (e.currentTarget.parentElement) {
                         e.currentTarget.parentElement.innerHTML = `<span class="text-xl font-black text-slate-700 text-center uppercase tracking-wider">${client.alt}</span>`;
                       }
                    }}
                  />
                </div>
                
                <div className="w-full pt-6 mt-4 border-t border-gray-100 flex items-center justify-between relative z-10">
                   <span className="font-bold text-slate-800">{client.alt}</span>
                   <div className="flex items-center gap-1.5 text-orange-500 font-bold bg-orange-50 px-3 py-1 rounded-full">
                     <MapPin size={14} strokeWidth={2.5} />
                     <span className="text-sm tracking-wide">{client.country}</span>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
