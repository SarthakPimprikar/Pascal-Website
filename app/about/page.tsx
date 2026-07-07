import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Handshake, ShieldCheck, Leaf, TrendingUp, Quote, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  const founders = [
    {
      name: "Mr. Chandrashekar V",
      title: "Founder & Partner",
      desc: "Having rich experience of 35 years in hydraulic machine designing, manufacturing and commissioning. Significant contribution in generating Pascal Auto brand as hydraulic machine designers and manufacturer. He is also a marathon runner and trekker.",
    },
    {
      name: "Mr. Sreekumaran Thampi",
      title: "Partner",
      desc: "31 Years experience in machine tool design and development area at Bajaj Auto Ltd. Expert in various hydraulic, pneumatic & robotic machine design.",
    },
    {
      name: "Mr. Sudhir Naik",
      title: "Partner",
      desc: "30 Years experience in machine tool design and development area at Bajaj Auto Ltd, Mahindra & Mahindra etc. Expert in various hydraulic, pneumatic & robotic machine design.",
    },
    {
      name: "Mr. Ravindra Shinganapurkar",
      title: "Partner",
      desc: "32 Years experience in manufacturing, system development, human resource management & product design area at Bajaj Auto Ltd.",
    }
  ];

  const testimonials = [
    {
      quote: "I used Industrial Automation for many projects over the years, Pascal Auto Solutions have the knowledge base and expertise to take your automaton concepts from idea to full implementation. No matter how small or large. They can do it all.",
      client: "Client Since 2013"
    },
    {
      quote: "Pascal Auto Solutions has designed an effective real-time process monitoring system which provides instant feedback and controls at our fingertips.",
      client: "Client Since 1999"
    },
    {
      quote: "Commercially quick response to quotes and queries, impressive technical knowledge of the employees. The project was led well by the project leader and issues were quickly rectified during acceptance tests.",
      client: "Client Since 2011"
    }
  ];

  const mottos = [
    { title: "TEAMWORK", icon: Users, color: "text-blue-600" },
    { title: "RESPECT", icon: Handshake, color: "text-blue-500" },
    { title: "INTEGRITY", icon: ShieldCheck, color: "text-cyan-500" },
    { title: "SIMPLICITY", icon: Leaf, color: "text-emerald-500" },
    { title: "CONTINUAL IMPROVEMENT", icon: TrendingUp, color: "text-orange-500" },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Header */}
      <section className="relative text-white flex items-center justify-center overflow-hidden min-h-[40vh] md:min-h-[50vh]">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/about-hero-bg.png")' }}
        ></div>
        
        {/* Overlays for faded effect */}
        <div className="absolute inset-0 z-0 bg-slate-950/70 mix-blend-multiply"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#0047b3]/90 to-transparent"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-slate-50 to-transparent opacity-20"></div>

        <div className="max-w-[1440px] w-full mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10 text-center py-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">
            About Us
          </h1>
          <p className="text-xl md:text-2xl text-blue-50 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            Pioneering Low Cost Automation, SPM, and Hydraulic presses since 1994.
          </p>
        </div>
      </section>

      {/* History & Quality Policy Section */}
      <section className="py-20 lg:py-28 relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f8fafc] -skew-x-12 translate-x-20 z-0"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0047b3]/5 rounded-full blur-[80px] pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10">
          <div className="text-center flex flex-col items-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="w-8 h-[2.5px] bg-gradient-to-r from-transparent to-[#0047b3]"></div>
              <h2 className="text-[#0047b3] font-bold text-sm tracking-[0.2em] uppercase">Our History</h2>
              <div className="w-8 h-[2.5px] bg-gradient-to-l from-transparent to-[#0047b3]"></div>
            </div>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter max-w-3xl">
              Decades of Excellence in <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047b3] to-blue-600">
                Automation & Engineering
              </span>
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
            <div className="flex flex-col space-y-6 justify-between">
              <p className="text-slate-600 text-lg leading-relaxed">
                We started our operations in the year 1994 as <strong>Pascal Auto Systems</strong> (now Pascal Auto Solutions). Situated in the automation hub at Sinhagad road, Nanded phata, Pune, we specialize in Low Cost Automation, assembly SPMs, and presses catering to the automobile sector.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                Our expertise lies in providing cost-effective solutions in engine and vehicle assembly lines, taking due care of future maintenance issues and spares availability. We also manufacture hydraulic power packs and CNC machining fixtures, with our main area of operation being Hydraulics and Pneumatics.
              </p>
              <div className="mt-8 p-6 bg-blue-50 border-l-4 border-[#0047b3] rounded-r-xl">
                <p className="text-sm font-bold text-[#0047b3] uppercase tracking-wider mb-2">Core Manufacturing</p>
                <p className="text-slate-800 font-semibold leading-relaxed">
                  ASSEMBLY AUTOMATION, LCA, HYDRAULIC/PNEUMATIC PRESSES, HYDRAULIC FIXTURES FOR CNC MACHINES.
                </p>
              </div>
            </div>
          
          <div className="flex flex-col gap-8 h-full">
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-md border border-slate-100 relative shrink-0">
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#0047b3]/10 rounded-full blur-2xl"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-12 h-12 bg-[#0047b3] text-white rounded-xl flex items-center justify-center shadow-lg shrink-0 mt-1">
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 mb-2">Quality Policy</h3>
                  <p className="text-slate-600 text-base leading-relaxed font-medium italic">
                    "We all are committed to manufacture products as per customer requirements in order to enhance customer satisfaction. This we shall achieve through continual improvement in our product quality."
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex-grow relative min-h-[250px] lg:min-h-0">
              <img src="/about-quality.png" alt="Precision Engineering Quality Control" className="absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Our Motto Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0"></div>
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[2.5px] bg-gradient-to-r from-transparent to-[#0047b3]"></div>
            <h2 className="text-[#0047b3] font-bold text-sm tracking-[0.2em] uppercase">Our Core Values</h2>
            <div className="w-8 h-[2.5px] bg-gradient-to-l from-transparent to-[#0047b3]"></div>
          </div>
          <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-16">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047b3] to-blue-600">Motto</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {mottos.map((motto, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className={`w-24 h-24 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 shadow-sm border border-slate-100 group-hover:-translate-y-2 group-hover:shadow-md transition-all duration-300 ${motto.color}`}>
                  <motto.icon size={48} strokeWidth={1.5} />
                </div>
                <h4 className="text-sm md:text-base font-bold text-slate-700 tracking-wider text-center uppercase">
                  {motto.title}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-slate-50 skew-x-12 -translate-x-20 z-0"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2.5px] bg-gradient-to-r from-transparent to-[#0047b3]"></div>
              <h2 className="text-[#0047b3] font-bold text-sm tracking-[0.2em] uppercase">Leadership</h2>
              <div className="w-8 h-[2.5px] bg-gradient-to-l from-transparent to-[#0047b3]"></div>
            </div>
            <h3 className="text-4xl lg:text-5xl font-black text-slate-900 leading-[1.1] tracking-tighter">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047b3] to-blue-600">Founders</span>
            </h3>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {founders.map((founder, index) => (
            <div key={index} className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 group">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <h4 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-[#0047b3] transition-colors">{founder.name}</h4>
                  <p className="text-[#0047b3] font-bold text-sm tracking-widest uppercase">{founder.title}</p>
                </div>
                <div className="w-12 h-1 bg-slate-100 mb-6 group-hover:bg-[#0047b3] transition-colors"></div>
                <p className="text-slate-600 text-base leading-relaxed flex-grow">
                  {founder.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-[#0047b3] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10">
          <div className="text-center mb-16 flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2.5px] bg-gradient-to-r from-transparent to-blue-300"></div>
              <h2 className="text-blue-300 font-bold text-sm tracking-[0.2em] uppercase">Testimonials</h2>
              <div className="w-8 h-[2.5px] bg-gradient-to-l from-transparent to-blue-300"></div>
            </div>
            <h3 className="text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter drop-shadow-md">
              What Our Clients Say
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testi, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/20 hover:bg-white/15 transition-colors">
                <Quote size={40} className="text-blue-300/50 mb-6" />
                <p className="text-blue-50 text-lg leading-relaxed mb-8 italic">
                  "{testi.quote}"
                </p>
                <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center font-bold text-sm">
                    {testi.client.replace(/[^0-9]/g, '').slice(-2)}
                  </div>
                  <p className="font-bold text-blue-200 uppercase tracking-widest text-xs">
                    {testi.client}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
