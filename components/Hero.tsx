import { Car, Settings, Factory, Hammer, Cpu, Wrench, ChevronLeft, ChevronRight, Star, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-[#fcfcfc] overflow-hidden min-h-[calc(100vh-6rem)] flex flex-col justify-center border-b border-gray-200">
      {/* Creative Engineering Background */}
      <div className="absolute inset-0 z-0 bg-white">
        {/* Angled Background Panel */}
        <div 
          className="absolute inset-y-0 right-0 w-[85%] lg:w-[65%] bg-[#f8fafc]"
          style={{ clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)' }}
        >
          {/* Hexagon Blueprint Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.8]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='49' viewBox='0 0 28 49'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='hexagons' fill='%230047b3' fill-opacity='0.05' fill-rule='nonzero'%3E%3Cpath d='M13.99 9.25l13 7.5v15l-13 7.5L1 31.75v-15l12.99-7.5zM3 17.9v12.7l10.99 6.34 11-6.35V17.9l-11-6.34L3 17.9zM0 15l12.98-7.5V0h-2v6.35L0 12.69v2.3zm0 18.5L12.98 41v8h-2v-6.85L0 35.81v-2.3zM15 0v7.5L27.99 15H28v-2.31h-.01L17 6.35V0h-2zm0 49v-8l12.99-7.5H28v2.31h-.01L17 42.15V49h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
          />
        </div>

        {/* Dynamic Angles / Speed Lines */}
        <div className="absolute top-[-20%] left-[20%] lg:left-[30%] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-[#0047b3]/20 to-transparent rotate-[25deg] opacity-70"></div>
        <div className="absolute top-[-20%] left-[25%] lg:left-[35%] w-[1px] h-[150%] bg-gradient-to-b from-transparent via-[#0047b3]/10 to-transparent rotate-[25deg] opacity-50"></div>
        <div className="absolute top-[-20%] left-[30%] lg:left-[40%] w-[2px] h-[150%] bg-gradient-to-b from-transparent via-[#0047b3]/5 to-transparent rotate-[25deg] opacity-30"></div>
        
        {/* Soft glowing accent to enhance depth */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#0047b3]/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Decorative Floating Tech Accents */}
        <div className="absolute top-[15%] left-[8%] text-[#0047b3]/30 font-mono text-2xl animate-pulse pointer-events-none">+</div>
        <div className="absolute bottom-[20%] right-[15%] text-[#0047b3]/20 font-mono text-4xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}>+</div>
        <div className="absolute top-[40%] right-[45%] text-[#0047b3]/30 font-mono text-xl animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}>+</div>
        <div className="absolute top-[30%] left-[40%] w-2 h-2 rounded-full bg-[#0047b3]/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }}></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 pt-12 pb-16 relative z-10 w-full flex-grow flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center flex-grow">
          {/* Left Content */}
          <div className="space-y-6 relative z-20">

            
            <h1 className="text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-black text-slate-950 leading-[1.1] tracking-tighter relative inline-block drop-shadow-sm">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047b3] to-blue-600">
                PASCAL
              </span> <br /> 
              AUTO SOLUTIONS
              {/* Subtle accent dot on header */}
              <div className="absolute -top-4 -right-6 w-3 h-3 rounded-full bg-blue-500 opacity-60"></div>
            </h1>
            
            <div className="inline-block px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200 shadow-sm mt-2">
              <span className="text-xs sm:text-sm font-bold text-slate-500 tracking-wide uppercase">
                Formerly Pascal Auto Systems
              </span>
            </div>
            
            <p className="text-xl md:text-2xl font-semibold text-slate-700 border-l-4 border-blue-200 pl-4 mt-8">
              Specialists in Low-Cost Automation & Assembly SPMs
            </p>
            
            <p className="text-slate-600 text-lg max-w-lg xl:max-w-xl leading-relaxed mt-4">
              Catering to the automobile sector, we deliver cost-effective solutions with core expertise in Hydraulics and Pneumatics. We design systems with future maintenance and spares availability in mind.
            </p>
            
            <div className="flex flex-wrap gap-5 pt-6">
              <button className="relative overflow-hidden group bg-[#0047b3] text-white px-8 py-3.5 rounded text-sm font-bold shadow-[0_8px_20px_-6px_rgba(0,71,179,0.5)] hover:shadow-[0_12px_25px_-6px_rgba(0,71,179,0.6)] hover:-translate-y-0.5 transition-all duration-300">
                <span className="relative z-10">KNOW MORE</span>
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-[#0047b3] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </button>
              <button className="relative overflow-hidden group bg-white border-2 border-[#0047b3] text-[#0047b3] px-8 py-3.5 rounded text-sm font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <span className="relative z-10 group-hover:text-white transition-colors duration-300">CONTACT US</span>
                <div className="absolute inset-0 h-full w-full bg-[#0047b3] transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-bottom"></div>
              </button>
            </div>
            

          </div>

          {/* Right Content - Modern Stacked Images */}
          <div className="relative h-full min-h-[500px] w-full hidden lg:flex items-center justify-center z-20 pt-10 pl-10">
            <div className="relative w-full max-w-[420px] xl:max-w-[500px] aspect-[4/5]">
              {/* Decorative Background Elements */}
              <div className="absolute -top-5 -right-5 w-full h-full rounded-3xl border-2 border-[#0047b3]/20 z-0"></div>
              <div className="absolute -bottom-5 -left-5 w-full h-full bg-[#0047b3]/5 rounded-3xl z-0"></div>
              
              {/* Main Large Image */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl z-10 group">
                 <img 
                   src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80" 
                   alt="Automation machinery" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#0047b3]/80 via-transparent to-transparent opacity-50 transition-opacity duration-500 group-hover:opacity-70"></div>
              </div>
              
              {/* Floating Overlapping Image */}
              <div className="absolute -bottom-10 -left-16 xl:-left-24 w-[70%] aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border-[6px] border-white z-20 group">
                 <img 
                   src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80" 
                   alt="Industrial assembly" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                 />
                 <div className="absolute inset-0 bg-[#0047b3]/20 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>


            </div>
          </div>          

        </div>

        {/* Trusted By Industry */}
        <div className="mt-auto pt-24 relative z-20">
          <div className="relative border-t-[1.5px] border-gray-200 flex justify-center mb-12">
            <div className="absolute -top-[14px] bg-[#fcfcfc] px-8 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-300"></div>
              <span className="text-[#0047b3] font-bold tracking-[0.2em] text-sm uppercase text-center">
                Trusted By Industry Leaders
              </span>
              <div className="w-2 h-2 rounded-full bg-blue-300"></div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-14 lg:gap-20 max-w-6xl mx-auto opacity-70">
            <ClientLogo name="TATA MOTORS" />
            <ClientLogo name="MAHINDRA" />
            <ClientLogo name="BAJAJ AUTO" />
            <ClientLogo name="FIAT INDIA" />
            <ClientLogo name="GREAVES" />
            <ClientLogo name="JAYAHIND" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ClientLogo({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 cursor-pointer">
      <span className="text-xl md:text-2xl font-black text-slate-500 tracking-widest uppercase text-center font-sans">
        {name}
      </span>
    </div>
  );
}
