"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "ABOUT US", href: "/about" },
    { name: "PRODUCTS", href: "/products" },
    { name: "GALLERY", href: "/gallery" },
    { name: "CAREERS", href: "/careers" },
    { name: "CONTACT US", href: "/contact" },
  ];

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <div className="relative bg-white rounded-xl border border-blue-100 shadow-[0_4px_20px_-4px_rgba(0,71,179,0.1)] group-hover:border-blue-300 transition-all duration-300 overflow-hidden">
              {/* Creative Blue Accents */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0047b3] to-blue-400"></div>
              <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#0047b3] to-blue-400"></div>
              
              <img 
                src="/pascal_logo.png" 
                alt="Pascal Auto Solutions Logo" 
                className="h-16 md:h-20 w-auto object-contain [clip-path:inset(3px)] px-4 py-1"
              />
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden lg:flex space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-bold tracking-wide transition-colors ${
                      isActive
                        ? "text-[#0047b3] border-b-2 border-[#0047b3] pb-1"
                        : "text-gray-600 hover:text-[#0047b3]"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}</div>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <a 
              href="tel:+918262013425"
              className="flex items-center gap-2 bg-[#0047b3] hover:bg-blue-800 text-white px-6 py-3 rounded text-sm font-bold transition-all shadow-md hover:shadow-lg"
            >
              <Phone size={18} />
              CALL US
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
