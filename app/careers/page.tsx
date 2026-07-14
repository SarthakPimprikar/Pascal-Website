import connectToDatabase from "@/lib/mongodb";
import SiteConfig from "@/models/siteConfig";
import Product from "@/models/product";
import JobOpening from "@/models/jobOpening";
import CareersClient from "./CareersClient";

export const dynamic = "force-dynamic";

const staticOpenPositions = [
  {
    title: "Hydraulic Design Engineer",
    type: "Full-Time",
    experience: "3 - 5 Years",
    skills: "AutoCAD, SolidWorks, Hydraulic circuit design & component selection.",
    description: "Responsible for designing hydraulic SPM circuits, manifolds, and workholding fixtures for CNC operations."
  },
  {
    title: "Assembly & Assembly Line Fitter",
    type: "Full-Time",
    experience: "1 - 3 Years",
    skills: "Reading assembly drawings, hydraulic/pneumatic plumbing, alignment checks.",
    description: "Hands-on assembly of hydraulic C-frame presses, multi-spindle SPM rams, and pneumatic cylinders."
  },
  {
    title: "CNC VMC/HMC Operator",
    type: "Full-Time",
    experience: "2+ Years",
    skills: "VMC/HMC setting, Fanuc controls, reading machining tolerances.",
    description: "Machining of fixture blocks, manifold blocks, and key structural parts for special purpose machinery."
  }
];

export default async function CareersPage() {
  let siteConfigObj = undefined;
  let productsList = undefined;
  let careersList = [];

  try {
    await connectToDatabase();
    const [config, products, dbCareers] = await Promise.all([
      SiteConfig.findOne({ key: "main_config" }),
      Product.find({}).sort({ order: 1, createdAt: -1 }),
      JobOpening.find({}).sort({ order: 1, createdAt: -1 })
    ]);
    if (config) siteConfigObj = JSON.parse(JSON.stringify(config));
    if (products) productsList = JSON.parse(JSON.stringify(products));
    if (dbCareers && dbCareers.length > 0) {
      careersList = JSON.parse(JSON.stringify(dbCareers));
    } else {
      careersList = staticOpenPositions;
    }
  } catch (error) {
    console.error("Failed to query configs on careers page.", error);
    careersList = staticOpenPositions;
  }

  return (
    <CareersClient 
      siteConfigObj={siteConfigObj} 
      productsList={productsList} 
      careersList={careersList} 
    />
  );
}
