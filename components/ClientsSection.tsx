"use client";

import { useState } from "react";
import { Handshake, Globe2, MapPin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const staticClientLogos = [
  { logo: "/clients/BAJAJ.logo.png", name: "Bajaj" },
  { logo: "/clients/greaves.png", name: "Greaves Cotton Limited" },
  { logo: "/clients/FIAT.logo.png", name: "FIAT" },
  { logo: "/clients/tatamotors.logo.png", name: "TATA Motors" },
  { logo: "/clients/mahendra.logo.png", name: "Mahindra" },
  { logo: "/clients/cummins_new.png", name: "Cummins" },
  { logo: "/clients/JAYAHIND.logo.png", name: "Jaya Hind" },
  { logo: "/clients/saj_new.png", name: "SAJ Test Plant" },
  { logo: "/clients/dynomerk.png", name: "Dynomerk Controls" },
  { logo: "/clients/umasons.png", name: "Umasons Auto Compo" },
  { logo: "/clients/carraro.png", name: "Carraro" },
  { logo: "/clients/varroc.png", name: "Varroc Excellence" },
];

const staticInternationalClients = [
  { logo: "/clients/eurotech.png", name: "EuroTech", country: "Malaysia" },
  { logo: "/clients/transasia.png", name: "Trans Asia Group", country: "Bangladesh" }
];

interface ClientsSectionProps {
  clients?: Array<{
    name: string;
    logo: string;
    type: 'domestic' | 'international';
    country?: string;
  }>;
}

const isLogoAvailable = (logo: string) => {
  if (!logo) return false;
  return true;
};

function ClientCard({ client }: { client: any }) {
  const [imageError, setImageError] = useState(false);
  const useTextFallback = !isLogoAvailable(client.logo) || imageError;

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 rounded-xl p-1 flex items-center justify-center aspect-[4/3] overflow-hidden group cursor-pointer">
      {!imageError && client.logo && (
        <img 
          src={`${client.logo}?v=1`} 
          alt={client.name}
          className="w-full h-full object-contain scale-105"
          onError={() => setImageError(true)}
        />
      )}
    </div>
  );
}

function InternationalClientCard({ client }: { client: any }) {
  const [imageError, setImageError] = useState(false);
  const useTextFallback = !isLogoAvailable(client.logo) || imageError;

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-300 rounded-xl p-1 flex items-center justify-center h-[220px] overflow-hidden group cursor-pointer relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-50/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="flex-1 flex items-center justify-center w-full h-full relative z-10">
        {!imageError && client.logo && (
          <img 
            src={`${client.logo}?v=1`} 
            alt={client.name}
            className="w-full h-full object-contain scale-105"
            onError={() => setImageError(true)}
          />
        )}
      </div>
    </div>
  );
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
  const domesticList = clients && clients.length > 0 
    ? clients.filter(c => c.type === 'domestic') 
    : staticClientLogos;

  const internationalList = clients && clients.length > 0
    ? clients.filter(c => c.type === 'international')
    : staticInternationalClients;

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10">
        
        {/* Top Text Content */}
        <ScrollReveal direction="up" delay={50} duration={800} className="max-w-4xl mx-auto text-center mb-16 space-y-6">
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
        </ScrollReveal>

        {/* Client Logos Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-20">
          {domesticList.map((client, index) => {
            const staggerDelay = (index % 5) * 80;
            return (
              <ScrollReveal key={index} direction="up" delay={staggerDelay} duration={700}>
                <ClientCard client={client} />
              </ScrollReveal>
            );
          })}
        </div>

        {/* Global Footprint Section */}
        <ScrollReveal direction="up" delay={100} duration={850} className="relative pt-16 border-t border-gray-150">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-6">
            <img src="/globe.png" alt="Global Presence" className="w-14 h-14 object-contain" />
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
            {internationalList.map((client, index) => (
              <InternationalClientCard key={index} client={client} />
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}



