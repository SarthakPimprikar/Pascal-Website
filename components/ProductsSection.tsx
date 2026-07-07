import { 
  ArrowRight, 
  Layers, 
  Hammer, 
  Settings2, 
  Zap, 
  ScanBarcode, 
  ArrowUpSquare, 
  Gauge, 
  Cpu 
} from "lucide-react";

const products = [
  // --- ROW 1: Shorter Descriptions ---
  {
    title: "Hydraulic C Frame Press",
    desc: "C-frame presses are provided for applications requiring better access and side movement.",
    icon: Hammer,
  },
  {
    title: "Load Monitoring Systems",
    desc: "Pressing Process Load monitoring for various components such as Bearing, Bush, Dowel, etc.",
    icon: Gauge,
  },
  {
    title: "Hydraulic Power Pack",
    desc: "Hydraulic Power packs are provided for various industrial applications as per customer's requirement.",
    icon: Zap,
  },
  {
    title: "Multi-spindle Press with Auto Feeder",
    desc: "In Multi-spindle press, 5 or more child parts can be pressed in single pressing cycle in less than 20secs.",
    icon: Layers,
  },
  // --- ROW 2: Longer Descriptions ---
  {
    title: "On line Automations",
    desc: "Oil Pumping Station, Oil Filling, Steering Bearing Race Fitment, Chassis Number Marking, Oil Seal Fitment, Nut Crimping, Nut Tightening, etc.",
    icon: Cpu,
  },
  {
    title: "Lifters for Assembly Line",
    desc: "Various types of Lifters are provided as per Customer requirements such as Tank lifter, Bearing Lifter, Trailing Arm Lifter, Pot/ Reactor Lifter, etc.",
    icon: ArrowUpSquare,
  },
  {
    title: "VIN Number Marking Machines",
    desc: "VIN number marking machines with repeat number check functionality for various auto components such as- Engine crankcase, Chassis, 3w Dash-board, Steering Column, etc.",
    icon: ScanBarcode,
  },
  {
    title: "Machining Fixtures",
    desc: "Hydraulic Machining fixtures are used to accurately locate and securely clamp & support the job on CNC HMC/ VMC machines for Milling, Drilling and Boring operations.",
    icon: Settings2,
  }
];

export default function ProductsSection() {
  return (
    <section className="py-28 bg-[#f8fafc] relative overflow-hidden border-b border-gray-100">
      {/* Background Decorative Grid */}
      <div 
        className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #0047b3 1px, transparent 1px), linear-gradient(to bottom, #0047b3 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-[#0047b3]"></div>
            <h3 className="text-[#0047b3] font-bold text-sm tracking-[0.2em] uppercase">
              Our Products
            </h3>
            <div className="w-8 h-[2px] bg-[#0047b3]"></div>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tighter mb-6">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0047b3] to-blue-600">Excellence</span>
          </h2>
          
          <p className="text-lg text-slate-600 leading-relaxed font-medium">
            We are committed to manufacturing products as per customer requirements in order to enhance customer satisfaction. This we achieve through continual improvement in our product quality.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
          {products.map((product, index) => (
            <div 
              key={index}
              className="group relative bg-white p-8 rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer hover:-translate-y-1.5"
            >
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon Box */}
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-[#0047b3] group-hover:scale-110 group-hover:bg-[#0047b3] group-hover:text-white transition-all duration-500 mb-6 shadow-sm border border-blue-100/50">
                  <product.icon size={26} strokeWidth={2} />
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight group-hover:text-[#0047b3] transition-colors duration-300">
                  {product.title}
                </h3>
                
                {/* Description */}
                <p className="text-slate-500 leading-relaxed text-sm flex-grow font-medium">
                  {product.desc}
                </p>

                {/* Animated Link */}
                <div className="mt-6 flex items-center gap-2 text-[#0047b3] font-bold text-sm opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
                  <span>Explore Details</span>
                  <ArrowRight size={16} />
                </div>
              </div>
              
              {/* Decorative ambient corner glow */}
              <div className="absolute -bottom-16 -right-16 w-32 h-32 bg-[#0047b3]/5 rounded-full blur-2xl group-hover:bg-[#0047b3]/20 transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}
