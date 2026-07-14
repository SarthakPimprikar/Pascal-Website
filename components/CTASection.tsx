import { ArrowRight } from "lucide-react";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface CTASectionProps {
  content?: {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonLink: string;
  };
}

export default function CTASection({ content }: CTASectionProps) {
  const title = content?.title || "Ready to Automate Your Future?";
  const subtitle = content?.subtitle || "Partner with Pascal Auto Solutions to engineer cost-effective, high-performance machinery tailored precisely to your manufacturing requirements.";
  const buttonText = content?.buttonText || "Get in Touch";
  const buttonLink = content?.buttonLink || "/contact";

  return (
    <section id="contact" className="relative py-24 bg-[#0047b3] overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
      
      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <ScrollReveal direction="up" delay={50} duration={800} className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-6 drop-shadow-sm" style={{ fontFamily: 'Gotham, sans-serif' }}>
          {title}
        </h2>
        
        <p className="text-lg md:text-xl text-blue-100/80 font-medium leading-relaxed max-w-2xl mx-auto mb-10">
          {subtitle}
        </p>
        
        <Link 
          href={buttonLink} 
          className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#0047b3] font-bold text-lg rounded shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.25)] hover:-translate-y-1 hover:bg-blue-50 transition-all duration-300 group"
        >
          <span>{buttonText}</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </ScrollReveal>
    </section>
  );
}

