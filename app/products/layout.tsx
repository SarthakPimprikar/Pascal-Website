"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const staticProductLinks = [
  { name: "Multi-spindle Press with Auto Feeder", href: "/products/multi-spindle-press" },
  { name: "Hydraulic C Frame Press", href: "/products/hydraulic-c-frame-press" },
  { name: "Machining Fixtures", href: "/products/machining-fixtures" },
  { name: "Hydraulic Power Packs", href: "/products/hydraulic-power-packs" },
  { name: "VIN Number Marking Machines", href: "/products/vin-number-marking-machines" },
  { name: "Lifters for Assembly Line", href: "/products/lifters-for-assembly-line" },
  { name: "Load Monitoring Systems", href: "/products/load-monitoring-systems" },
  { name: "On line Automations", href: "/products/on-line-automations" },
];

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [productLinks, setProductLinks] = useState(staticProductLinks);

  useEffect(() => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProductLinks(data.map((p) => ({ name: p.title, href: `/products/${p.slug}` })));
        }
      })
      .catch((err) => console.error("Error fetching dynamic products sidebar links:", err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Products Hero Banner */}
      <div className="relative bg-[#0a192f] py-8 md:py-12 overflow-hidden border-b-[6px] border-[#0047b3]">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff33_1px,transparent_1px),linear-gradient(90deg,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3" style={{ fontFamily: 'Gotham, sans-serif' }}>
              OUR PRODUCTS
            </h1>
            <p className="text-slate-300 text-base md:text-lg">
              Precision engineered solutions for modern manufacturing and automation challenges.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-[340px] shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-32">
              <div className="bg-slate-900 text-white p-6 font-bold uppercase tracking-wider text-sm border-b-4 border-[#0047b3]" style={{ fontFamily: 'Gotham, sans-serif' }}>
                Product Categories
              </div>
              <ul className="divide-y divide-slate-100">
                {productLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`group flex items-center justify-between p-4 transition-all duration-200 ${
                          isActive 
                            ? "bg-blue-50 text-[#0047b3] font-bold border-l-4 border-[#0047b3]" 
                            : "text-slate-600 font-medium hover:bg-slate-50 hover:text-[#0047b3] border-l-4 border-transparent"
                        }`}
                      >
                        <span className="text-sm pr-4 leading-tight">{link.name}</span>
                        <ChevronRight 
                          size={18} 
                          className={`shrink-0 transition-transform duration-200 ${isActive ? "text-[#0047b3]" : "text-slate-300 group-hover:text-[#0047b3] group-hover:translate-x-1"}`} 
                        />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
          
        </div>
      </div>
    </div>
  );
}
