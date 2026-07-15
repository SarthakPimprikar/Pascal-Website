"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ChevronDown, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavbarProps {
  config?: {
    phone?: string;
    logo?: string;
  };
  products?: Array<{
    title: string;
    slug: string;
  }>;
}

export default function Navbar({ config, products }: NavbarProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Map products list to subLinks
  const dynamicSubLinks = products && products.length > 0
    ? products.map(p => ({ name: p.title, href: `/products/${p.slug}` }))
    : [
        { name: "Multi-spindle Press with Auto Feeder", href: "/products/multi-spindle-press" },
        { name: "Hydraulic C Frame Press", href: "/products/hydraulic-c-frame-press" },
        { name: "Machining Fixtures", href: "/products/machining-fixtures" },
        { name: "Hydraulic Power Packs", href: "/products/hydraulic-power-packs" },
        { name: "VIN Number Marking Machines", href: "/products/vin-number-marking-machines" },
        { name: "Lifters for Assembly Line", href: "/products/lifters-for-assembly-line" },
        { name: "Load Monitoring Systems", href: "/products/load-monitoring-systems" },
        { name: "On line Automations", href: "/products/on-line-automations" },
      ];

  const navLinks = [
    { name: "HOME", href: "/", id: "home" },
    { name: "ABOUT US", href: "/about", id: "about" },
    { 
      name: "PRODUCTS", 
      href: "/products",
      id: "products",
      subLinks: dynamicSubLinks
    },
    { name: "GALLERY", href: "/gallery", id: "gallery" },
    { name: "CAREERS", href: "/careers", id: "careers" },
    { name: "CONTACT US", href: "/contact", id: "contact" },
  ];

  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id)).filter(Boolean) as HTMLElement[];
      let current = "";

      for (const section of sections) {
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 150) {
            current = section.getAttribute('id') || "";
          }
        }
      }

      setActiveSection(current || "home"); // default to home if at very top
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, products]);

  const siteLogo = config?.logo || "/pascal-main-logo.png";
  const sitePhone = config?.phone || "+918262013425";

  return (
    <>
      <div className="h-16 w-full shrink-0"></div>
      <nav className="w-full bg-white shadow-sm border-b border-gray-100 fixed top-0 left-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center -ml-4 lg:-ml-8">
              <img 
                src={siteLogo} 
                alt="Pascal Auto Solutions Logo" 
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex gap-8 h-full items-center">
              {navLinks.map((link) => {
                const isActive = (pathname === "/" && activeSection === link.id) || 
                                 (pathname !== "/" && (pathname === link.href || (link.subLinks && pathname.startsWith(link.href))));

                if (link.subLinks) {
                  return (
                    <div key={link.name} className="relative group h-full flex items-center">
                      <div
                        className={`flex items-center gap-1 text-[13px] font-semibold transition-colors cursor-pointer relative h-full group/navitem ${
                          isActive
                            ? "text-[#0047b3]"
                            : "text-gray-600 hover:text-[#0047b3]"
                        }`}
                      >
                        {link.name}
                        <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" />
                        
                        {/* Animated Underline */}
                        <div className={`absolute bottom-0 left-0 h-[3px] bg-[#0047b3] transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover/navitem:w-full'}`}></div>
                      </div>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                        <div className="bg-white border border-gray-200 shadow-xl min-w-[280px] max-h-[400px] overflow-y-auto">
                          {link.subLinks.map((subLink, index) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              className={`block px-5 py-3 text-[13px] font-medium text-gray-500 hover:text-[#0047b3] hover:bg-gray-50 transition-colors ${
                                index !== link.subLinks.length - 1 ? "border-b border-gray-100" : ""
                              }`}
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[13px] font-semibold transition-colors flex items-center h-full group/navitem ${
                      isActive
                        ? "text-[#0047b3]" 
                        : "text-gray-600 hover:text-[#0047b3]"
                    }`}
                  >
                    {link.name}
                    {/* Animated Underline */}
                    <div className={`absolute bottom-0 left-0 h-[3px] bg-[#0047b3] transition-all duration-300 ease-out ${isActive ? 'w-full' : 'w-0 group-hover/navitem:w-full'}`}></div>
                  </Link>
                );
              })}
            </div>

            {/* Desktop CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href={`tel:${sitePhone}`}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-[#0047b3] hover:from-blue-400 hover:to-blue-800 text-white px-6 py-3 rounded text-sm font-bold transition-all shadow-md hover:shadow-lg"
              >
                <Phone size={18} />
                CALL US
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-[#0047b3] focus:outline-none p-2"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Panel */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 shadow-lg animate-fade-in absolute w-full left-0 z-40">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {link.subLinks ? (
                    <>
                      <span className="text-[14px] font-bold text-gray-800 mb-2">{link.name}</span>
                      <div className="pl-4 border-l-2 border-gray-100 flex flex-col gap-2.5">
                        {link.subLinks.map((subLink) => (
                          <Link
                            key={subLink.name}
                            href={subLink.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[13px] font-medium text-gray-500 hover:text-[#0047b3]"
                          >
                            {subLink.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[14px] font-bold text-gray-600 hover:text-[#0047b3]"
                    >
                      {link.name}
                    </Link>
                  )}
                </div>
              ))}
              <a 
                href={`tel:${sitePhone}`}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-[#0047b3] hover:from-blue-400 hover:to-blue-800 text-white py-3 rounded font-bold text-sm transition-all shadow-md"
              >
                <Phone size={16} />
                CALL US ({sitePhone})
              </a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

