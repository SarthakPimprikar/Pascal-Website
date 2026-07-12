import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t border-slate-900">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          
          {/* Column 1: Logo and MFG text */}
          <div className="flex flex-col items-center text-center space-y-8">
            <Link href="/" className="inline-block hover:opacity-90 transition-opacity duration-300">
              <img 
                src="/fotterlogo.png" 
                alt="Pascal Auto Solutions Logo" 
                className="h-56 md:h-72 w-auto object-contain"
              />
            </Link>
            <p className="text-sm font-semibold tracking-wide text-slate-400 leading-relaxed uppercase">
              MANUFACTURING ASSEMBLY AUTOMATION, LCA, HYDRAULIC/PNEUMATIC PRESSES, HYDRAULIC FIXTURES FOR CNC M/Cs.
            </p>
          </div>

          {/* Columns 2-4: Nested Right Section */}
          <div className="lg:col-span-3 flex flex-col">
            
            {/* Company Name Header spanning across the right side */}
            <div className="mb-8 border-b border-slate-800/80 pb-6 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-wide uppercase" style={{ fontFamily: 'Gotham, sans-serif' }}>
                <span style={{ fontWeight: 550 }}>PASCAL</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-400">AUTO SOLUTIONS</span>
              </h2>
            </div>
            
            {/* The 3 equal columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
              
              {/* Inner Column 1: Quick Links */}
              <div className="space-y-6">
                <h4 className="text-blue-400 font-bold text-lg border-b border-slate-600 pb-4 mb-10">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
                  <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                  <li><Link href="/products" className="hover:text-blue-400 transition-colors">Products</Link></li>
                  <li><Link href="/gallery" className="hover:text-blue-400 transition-colors">Gallery</Link></li>
                  <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              {/* Inner Column 2: Our Products */}
              <div className="space-y-6">
                <h4 className="text-blue-400 font-bold text-lg border-b border-slate-600 pb-4 mb-10">Our Products</h4>
                <ul className="space-y-3 text-sm">
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Multi-spindle Press with Auto Feeder</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Hydraulic C Frame Press</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Machining Fixtures</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Hydraulic Power Packs</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">VIN Number Marking Machines</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Lifters for Assembly Line</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">Load Monitoring Systems</li>
                  <li className="hover:text-blue-400 transition-colors cursor-pointer">On line Automations</li>
                </ul>
              </div>

              {/* Inner Column 3: Contact Details */}
              <div className="space-y-6">
                <h4 className="text-blue-400 font-bold text-lg border-b border-slate-600 pb-4 mb-10">Contact Us</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 group">
                    <MapPin size={20} className="text-blue-500 mt-1 shrink-0 group-hover:text-blue-400 transition-colors" />
                    <p className="text-sm leading-relaxed">
                      Pascal Auto Solutions (Formerly Pascal Auto Systems), Sr. No. 25/2A/2, Nanded, Opp. Savli Dhaba, Sinhagad Road, Pune - 411 041.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <Phone size={20} className="text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                    <a href="tel:+918262013425" className="text-sm hover:text-white transition-colors">
                      +918262013425
                    </a>
                  </div>
                  <div className="flex items-center gap-3 group">
                    <Mail size={20} className="text-blue-500 shrink-0 group-hover:text-blue-400 transition-colors" />
                    <a href="mailto:pascalpune@gmail.com" className="text-sm hover:text-white transition-colors">
                      pascalpune@gmail.com
                    </a>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Pascal Auto Solutions. All rights reserved.</p>
          <p>Designed for Engineering Excellence.</p>
        </div>
      </div>
    </footer>
  );
}
