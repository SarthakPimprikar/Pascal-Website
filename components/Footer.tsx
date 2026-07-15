import Link from "next/link";
import GradientMapPin from "./GradientMapPin";
import GradientPhone from "./GradientPhone";
import GradientMail from "./GradientMail";

interface FooterProps {
  config?: {
    companyName?: string;
    companySubName?: string;
    tagline?: string;
    footerLogo?: string;
    address?: string;
    phone?: string;
    email?: string;
    copyrightText?: string;
  };
  products?: Array<{
    title: string;
    slug: string;
  }>;
}

export default function Footer({ config, products }: FooterProps) {
  const companyName = config?.companyName || "Pascal";
  const companySubName = config?.companySubName || "Auto Solutions";
  const tagline = config?.tagline || "MANUFACTURING ASSEMBLY AUTOMATION, LCA, HYDRAULIC/PNEUMATIC PRESSES, HYDRAULIC FIXTURES FOR CNC M/Cs.";
  const footerLogo = config?.footerLogo || "/fotterlogo.png";
  const address = config?.address || "Pascal Auto Solutions (Formerly Pascal Auto Systems), Sr. No. 25/2A/2, Nanded, Opp. Savli Dhaba, Sinhagad Road, Pune - 411 041.";
  const phone = config?.phone || "+918262013425";
  const email = config?.email || "pascalpune@gmail.com";
  const copyrightText = config?.copyrightText || "Pascal Auto Solutions. All rights reserved.";

  const displayProducts = products && products.length > 0
    ? products.slice(0, 8)
    : [
        { title: "Multi-spindle Press with Auto Feeder", slug: "multi-spindle-press" },
        { title: "Hydraulic C Frame Press", slug: "hydraulic-c-frame-press" },
        { title: "Machining Fixtures", slug: "machining-fixtures" },
        { title: "Hydraulic Power Packs", slug: "hydraulic-power-packs" },
        { title: "VIN Number Marking Machines", slug: "vin-number-marking-machines" },
        { title: "Lifters for Assembly Line", slug: "lifters-for-assembly-line" },
        { title: "Load Monitoring Systems", slug: "load-monitoring-systems" },
        { title: "On line Automations", slug: "on-line-automations" },
      ];

  return (
    <footer className="bg-slate-950 text-slate-300 pt-10 pb-6 border-t border-slate-900">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Column 1: Logo and MFG text */}
          <div className="flex flex-col items-start text-left space-y-6">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity duration-300">
              <img 
                src={footerLogo} 
                alt="Pascal Auto Solutions Logo" 
                className="h-28 md:h-36 w-auto object-contain object-left"
              />
            </Link>
            <p className="text-[13px] font-semibold tracking-wide text-slate-400 leading-relaxed uppercase">
              {tagline}
            </p>
          </div>

          {/* Columns 2-4: Nested Right Section */}
          <div className="lg:col-span-3 flex flex-col">
            
            {/* Company Name Header spanning across the right side */}
            <div className="mb-6 border-b border-slate-800/80 pb-4 text-left">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-wide uppercase" style={{ fontFamily: 'Gotham, sans-serif' }}>
                <span style={{ fontWeight: 550 }}>{companyName}</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">{companySubName}</span>
              </h2>
            </div>
            
            {/* The 3 equal columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Inner Column 1: Quick Links */}
              <div className="space-y-4">
                <h4 className="text-blue-400 font-bold text-base border-b border-slate-600 pb-2 mb-4">Quick Links</h4>
                <ul className="space-y-2 text-[13px]">
                  <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                  <li><Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link></li>
                  <li><Link href="/gallery" className="hover:text-blue-400 transition-colors">Gallery</Link></li>
                  <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              {/* Inner Column 2: Our Products */}
              <div className="space-y-4">
                <h4 className="text-blue-400 font-bold text-base border-b border-slate-600 pb-2 mb-4">Our Products</h4>
                <ul className="space-y-2 text-[13px]">
                  {displayProducts.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/products/${p.slug}`} className="hover:text-blue-400 transition-colors">
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Inner Column 3: Contact Details */}
              <div className="space-y-4">
                <h4 className="text-blue-400 font-bold text-base border-b border-slate-600 pb-2 mb-4">Contact Us</h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 group">
                    <GradientMapPin size={20} className="mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                    <p className="text-[13px] leading-relaxed">
                      {address}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <GradientPhone size={20} className="mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                    <a href={`tel:${phone}`} className="text-[13px] hover:text-white transition-colors">
                      {phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3 group">
                    <GradientMail size={18} className="mt-0.5 shrink-0 transition-transform group-hover:scale-110" />
                    <a href={`mailto:${email}`} className="text-[13px] hover:text-white transition-colors">
                      {email}
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} {copyrightText}</p>
          <p>Designed for Engineering Excellence.</p>
        </div>
      </div>
    </footer>
  );
}

