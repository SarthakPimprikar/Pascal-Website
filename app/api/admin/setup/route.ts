import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/admin';
import SiteConfig from '@/models/siteConfig';
import LandingPage from '@/models/landingPage';
import Product from '@/models/product';
import Client from '@/models/client';
import JobOpening from '@/models/jobOpening';
import GalleryItem from '@/models/galleryItem';
import bcrypt from 'bcryptjs';

const defaultGalleryItems = [
  {
    title: "Multi Spindle Assembly SPM",
    description: "Automated multi-point assembly press system operational on high volume assembly line.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    order: 0
  },
  {
    title: "CNC Machining Fixture Setup",
    description: "Hydraulic workpiece workholding block installed on CNC horizontal machining center.",
    imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    order: 1
  },
  {
    title: "Heavy Duty Hydraulic Press",
    description: "C-frame hydraulic pressing station equipped with load monitoring sensor graphs.",
    imageUrl: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=800&q=80",
    order: 2
  },
  {
    title: "Hydraulic Power Unit Fabrication",
    description: "Custom oil reservoir power pack under system pressure testing.",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    order: 3
  }
];


const defaultJobs = [
  {
    title: "Hydraulic Design Engineer",
    type: "Full-Time",
    experience: "3 - 5 Years",
    skills: "AutoCAD, SolidWorks, Hydraulic circuit design & component selection.",
    description: "Responsible for designing hydraulic SPM circuits, manifolds, and workholding fixtures for CNC operations.",
    order: 0
  },
  {
    title: "Assembly & Assembly Line Fitter",
    type: "Full-Time",
    experience: "1 - 3 Years",
    skills: "Reading assembly drawings, hydraulic/pneumatic plumbing, alignment checks.",
    description: "Hands-on assembly of hydraulic C-frame presses, multi-spindle SPM rams, and pneumatic cylinders.",
    order: 1
  },
  {
    title: "CNC VMC/HMC Operator",
    type: "Full-Time",
    experience: "2+ Years",
    skills: "VMC/HMC setting, Fanuc controls, reading machining tolerances.",
    description: "Machining of fixture blocks, manifold blocks, and key structural parts for special purpose machinery.",
    order: 2
  }
];


const defaultProducts = [
  {
    title: 'Hydraulic C Frame Press',
    slug: 'hydraulic-c-frame-press',
    category: 'Press Machines',
    shortDescription: 'C-frame presses are provided for applications requiring better access and side movement.',
    fullDescription: 'C-frame presses are provided for applications requiring better access and side movement. They can be reused for different components by simply changing the tooling fixtures, making them a highly versatile asset for manufacturing shops.',
    image: '/products/Hydraulic-C-Frame-Press.image.png',
    iconName: 'Hammer',
    features: [
      'Can be used to press two or more components at a time (e.g. Bearing + Circlip; Bearing + Oil-seal).',
      'Load and Position Monitoring with Graph generation and Data Logging.',
      'Load capacity up to 30 tons.',
      'General purpose design, easily reconfigurable for new components.'
    ],
    order: 0,
  },
  {
    title: 'Load Monitoring Systems',
    slug: 'load-monitoring-systems',
    category: 'Monitoring Systems',
    shortDescription: 'Pressing Process Load monitoring for various components such as Bearing, Bush, Dowel, etc.',
    fullDescription: 'Pressing Process Load monitoring systems ensure high-quality assembly operations. Real-time graphing and data capture of load vs. displacement helps in detecting defects, wrong part insertion, and dimensional deviations instantly.',
    image: '/products/Load-Monitoring-Systems.image.png',
    iconName: 'Gauge',
    features: [
      'Real-time signature load-displacement profile analysis.',
      'Configurable tolerance limits (OK/NOK zones).',
      'Data logging for compliance and parts traceability.',
      'Compatible with pneumatic, hydraulic, and hydropneumatic cylinders.'
    ],
    order: 1,
  },
  {
    title: 'Hydraulic Power Packs',
    slug: 'hydraulic-power-packs',
    category: 'Hydraulics',
    shortDescription: 'Hydraulic Power packs are provided for various industrial applications as per customer\'s requirement.',
    fullDescription: 'We design and manufacture customized hydraulic power packs tailored to specific industrial workflows. These units range from compact setups to heavy-duty industrial systems, built with globally available spares to ensure minimal downtime.',
    image: '/products/Hydraulic-Power-Packs.image.png',
    iconName: 'Zap',
    features: [
      'Custom reservoirs designed to fit constrained layouts.',
      'High-quality pumps, manifolds, and valves from reputed brands.',
      'Efficient thermal management (air/water coolers).',
      'Integrated pressure and level sensors with electrical interlocks.'
    ],
    order: 2,
  },
  {
    title: 'Multi-spindle Press with Auto Feeder',
    slug: 'multi-spindle-press',
    category: 'Special Purpose Machines',
    shortDescription: 'In Multi-spindle press, 5 or more child parts can be pressed in single pressing cycle in less than 20secs.',
    fullDescription: 'This high-throughput assembly SPM allows the simultaneous pressing of five or more component inserts within a single automated run. Designed for high-volume automotive production, it achieves cycle times under 20 seconds.',
    image: '/products/Multi-spindle-Press.image.png',
    iconName: 'Layers',
    features: [
      'Simultaneous pressing of multiple pins, bushings, or studs.',
      'Automated part feeding system for high production speeds.',
      'Individual spindle load monitoring to ensure uniform pressing.',
      'Poka-Yoke sensors to prevent incorrect component loading.'
    ],
    order: 3,
  },
  {
    title: 'On line Automations',
    slug: 'on-line-automations',
    category: 'Assembly Lines',
    shortDescription: 'Oil Pumping Station, Oil Filling, Steering Bearing Race Fitment, Chassis Number Marking, Oil Seal Fitment, Nut Crimping, etc.',
    fullDescription: 'Custom automated stations integrated directly into conveyor assemblies. These include bearing race insertion, fluid filling systems, mechanical crimping, and computerized marking, optimized for high efficiency.',
    image: '/products/On-line-Automations.image.png',
    iconName: 'Cpu',
    features: [
      'Seamless conveyor integration (pallet-based or slide line).',
      'Automated fluid dispensing (precise volumetric control).',
      'Nut crimping, bearing race pressing, and torque-controlled tightening.',
      'PLC-controlled sequencing with user-friendly HMI interfaces.'
    ],
    order: 4,
  },
  {
    title: 'Lifters for Assembly Line',
    slug: 'lifters-for-assembly-line',
    category: 'Material Handling',
    shortDescription: 'Various types of Lifters are provided as per Customer requirements such as Tank lifter, Bearing Lifter, Trailing Arm Lifter, etc.',
    fullDescription: 'Ergonomically designed material handling equipment to lift and position heavy components on the line. Reduces worker fatigue, enhances safety, and increases process speed.',
    image: '/products/Lifters-for-Assembly-Line.image.png',
    iconName: 'ArrowUpSquare',
    features: [
      'Pneumatically operated or electric-assisted lifters.',
      'Custom end-effectors for tanks, trailing arms, and steering columns.',
      'Safety interlocks to prevent load drop in case of power/pressure loss.',
      'Rotary or sliding options for ergonomic alignment.'
    ],
    order: 5,
  },
  {
    title: 'VIN Number Marking Machines',
    slug: 'vin-number-marking-machines',
    category: 'Special Purpose Machines',
    shortDescription: 'VIN number marking machines with repeat number check functionality for various auto components.',
    fullDescription: 'Robust pneumatic/hydraulic marking systems to imprint Chassis numbers, VIN numbers, or engine numbers. Features an intelligent system to prevent accidental duplicate markings on the assembly line.',
    image: '/products/VIN-Number-Marking-Machines.image.png',
    iconName: 'ScanBarcode',
    features: [
      'Dot peen or scribe marking technologies.',
      'Database connection to verify sequential and unique serial numbers.',
      'Heavy-duty clamping fixtures to ensure crisp character indentation.',
      'Applicable on Engine crankcases, chassis frames, and columns.'
    ],
    order: 6,
  },
  {
    title: 'Machining Fixtures',
    slug: 'machining-fixtures',
    category: 'Tooling',
    shortDescription: 'Hydraulic Machining fixtures are used to accurately locate and securely clamp & support the job on CNC HMC/ VMC machines.',
    fullDescription: 'Precision hydraulic workholding solutions for CNC Vertical and Horizontal Machining Centers. Enables high-speed machining by providing rigid, repeatable, and automated workpiece clamping.',
    image: '/products/Machining-Fixtures.image.png',
    iconName: 'Settings2',
    features: [
      'Hydraulically operated swing clamps, work supports, and pull cylinders.',
      'Custom block design for HMC tombstones and VMC beds.',
      'Rotary joint interfaces for 4th and 5th axis indexers.',
      'Built-in seat check sensors to verify parts are resting correctly.'
    ],
    order: 7,
  }
];

const defaultClients = [
  { name: 'BAJAJ AUTO', logo: '/clients/BAJAJ.logo.png', type: 'domestic', order: 0 },
  { name: 'TATA MOTORS', logo: '/clients/tatamotors.logo.png', type: 'domestic', order: 1 },
  { name: 'MAHINDRA', logo: '/clients/mahendra.logo.png', type: 'domestic', order: 2 },
  { name: 'FIAT INDIA', logo: '/clients/FIAT.logo.png', type: 'domestic', order: 3 },
  { name: 'JAYAHIND', logo: '/clients/JAYAHIND.logo.png', type: 'domestic', order: 4 },
  { name: 'Greaves Cotton', logo: '/clients/greaves.png', type: 'domestic', order: 5 },
  { name: 'Cummins', logo: '/clients/cummins-blue.png', type: 'domestic', order: 6 },
  { name: 'SAJ Test Plant', logo: '/clients/saj.png', type: 'domestic', order: 7 },
  { name: 'Dynomerk Controls', logo: '/clients/dynomerk.png', type: 'domestic', order: 8 },
  { name: 'Varroc', logo: '/clients/varroc.png', type: 'domestic', order: 9 },
  { name: 'EuroTech', logo: '/clients/eurotech.png', type: 'international', country: 'Malaysia', order: 0 },
  { name: 'Trans Asia Group', logo: '/clients/transasia.png', type: 'international', country: 'Bangladesh', order: 1 },
];

export async function GET() {
  try {
    await connectToDatabase();

    // 1. Create Admin if not exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      const hashedPassword = await bcrypt.hash('pascal2026', 10);
      const admin = new Admin({
        username: 'admin',
        password: hashedPassword,
      });
      await admin.save();
    }

    // 2. Create Site Config if not exists
    const hasConfig = await SiteConfig.findOne({ key: 'main_config' });
    if (!hasConfig) {
      const config = new SiteConfig();
      await config.save();
    }

    // 3. Create Landing Page if not exists
    const hasLanding = await LandingPage.findOne({ key: 'homepage' });
    if (!hasLanding) {
      const landing = new LandingPage();
      await landing.save();
    }

    // 4. Create Default Products
    await Product.deleteMany({});
    await Product.insertMany(defaultProducts);

    // 5. Create Default Clients
    await Client.deleteMany({});
    await Client.insertMany(defaultClients);

    // 6. Create Default Job Openings
    await JobOpening.deleteMany({});
    await JobOpening.insertMany(defaultJobs);

    // 7. Create Default Gallery Items
    await GalleryItem.deleteMany({});
    await GalleryItem.insertMany(defaultGalleryItems);

    return NextResponse.json({
      message: 'Setup completed successfully!',
      credentials: {
        username: 'admin',
        password: 'pascal2026'
      },
      seeded: {
        products: defaultProducts.length,
        clients: defaultClients.length,
        careers: defaultJobs.length,
        gallery: defaultGalleryItems.length,
      }
    });

  } catch (error: any) {
    console.error('Setup failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
