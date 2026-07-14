import { CheckCircle2, MapPin, Calendar, Wrench } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

interface AboutSectionProps {
  content?: {
    title: string;
    subtitle: string;
    descriptionParagraphs: string[];
    buttonText: string;
    buttonLink: string;
    image: string;
    imageOverlayText: string;
  };
}

export default function AboutSection({ content }: AboutSectionProps) {
  const title = content?.title || "Our Story";
  const subtitle = content?.subtitle || "About Pascal Auto Solutions";
  const paragraph1 = content?.descriptionParagraphs?.[0] || "We have started operations in the year 1994 as Pascal Auto Systems. We are situated in automation hub at Sinhagad road, Nanded phata, Pune. We are a company working in the field of Low Cost Automation and assembly SPMs and presses catering to automobile sector.";
  const paragraph2 = content?.descriptionParagraphs?.[1] || "Our expertise is in providing Cost Effective Solutions in engine and vehicle assembly lines, taking due Care of Future Maintenance issues and spares availability. We also manufacture hydraulic power packs, CNC machining fixtures. Our main area of operation is Hydraulics and Pneumatics.";
  const buttonText = content?.buttonText || "LEARN MORE ABOUT US";
  const buttonLink = content?.buttonLink || "/about";
  const image = content?.image || "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1000&q=80";
  const imageOverlayText = content?.imageOverlayText || "Situated in the automation hub at Nanded Phata, Pune.";

  const subtitleWords = subtitle.split(" ");
  const firstWord = subtitleWords[0] || "";
  const remainingSubtitle = subtitleWords.slice(1).join(" ") || "";

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden border-b border-gray-100">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8fafc] -skew-x-12 translate-x-20 z-0"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0047b3]/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Content - Text */}
          <ScrollReveal direction="up" delay={100} duration={800} className="space-y-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-[2.5px] bg-gradient-to-r from-[#0047b3] to-blue-400"></div>
                <h3 className="text-[#0047b3] font-bold text-sm tracking-[0.2em] uppercase">
                  {title}
                </h3>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter" style={{ fontFamily: 'Gotham, sans-serif' }}>
                {firstWord} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047b3] to-blue-600" style={{ fontWeight: 550 }}>
                  {remainingSubtitle}
                </span>
              </h2>
            </div>

            <div className="space-y-6 text-lg text-slate-600/80 leading-relaxed font-medium max-w-prose">
              <p>{paragraph1}</p>
              <p>{paragraph2}</p>
            </div>
            
            <a href={buttonLink} className="inline-block mt-6 px-8 py-4 bg-white border-2 border-slate-200 text-slate-800 rounded text-sm font-bold tracking-wide hover:border-[#0047b3] hover:text-[#0047b3] transition-all duration-300 shadow-sm hover:shadow-md">
              {buttonText}
            </a>
          </ScrollReveal>

          {/* Right Content - Images / Visuals */}
          <ScrollReveal direction="right" delay={250} duration={900} className="relative mt-10 lg:mt-0">
            {/* Background frame */}
            <div className="absolute top-4 -right-4 lg:top-8 lg:-right-8 w-full h-full border-[3px] border-[#0047b3]/20 rounded-3xl z-0"></div>
            
            {/* Main Image */}
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl group">
              <img 
                src={image} 
                alt="CNC Machining Facility" 
                className="w-full aspect-[4/3] object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
              
              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white font-medium text-lg lg:text-xl drop-shadow-md leading-relaxed border-l-4 border-[#0047b3] pl-4">
                  {imageOverlayText}
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

