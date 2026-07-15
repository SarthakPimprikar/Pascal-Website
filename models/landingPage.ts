import mongoose from 'mongoose';

const LandingPageSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'homepage',
    unique: true,
  },
  hero: {
    title: { type: String, default: 'PASCAL AUTO SOLUTIONS' },
    badge: { type: String, default: 'Formerly Pascal Auto Systems' },
    tagline: { type: String, default: 'Specialists in Low-Cost Automation & Assembly SPMs' },
    description: { type: String, default: 'Catering to the automobile sector, we deliver cost-effective solutions with core expertise in Hydraulics and Pneumatics. We design systems with future maintenance and spares availability in mind.' },
    primaryBtnText: { type: String, default: 'KNOW MORE' },
    primaryBtnLink: { type: String, default: '#about' },
    secondaryBtnText: { type: String, default: 'CONTACT US' },
    secondaryBtnLink: { type: String, default: '#contact' },
    image1: { type: String, default: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80' },
    image2: { type: String, default: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80' },
  },
  about: {
    title: { type: String, default: 'Our Story' },
    subtitle: { type: String, default: 'About Pascal Auto Solutions' },
    descriptionParagraphs: { 
      type: [String], 
      default: [
        'We have started operations in the year 1994 as Pascal Auto Systems. We are situated in automation hub at Sinhagad road, Nanded phata, Pune. We are a company working in the field of Low Cost Automation and assembly SPMs and presses catering to automobile sector.',
        'Our expertise is in providing Cost Effective Solutions in engine and vehicle assembly lines, taking due Care of Future Maintenance issues and spares availability. We also manufacture hydraulic power packs, CNC machining fixtures. Our main area of operation is Hydraulics and Pneumatics.'
      ]
    },
    buttonText: { type: String, default: 'LEARN MORE ABOUT US' },
    buttonLink: { type: String, default: '/about' },
    image: { type: String, default: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1000&q=80' },
    imageOverlayText: { type: String, default: 'Situated in the automation hub at Nanded Phata, Pune.' },
    qualityPolicy: { type: String, default: 'We all are committed to manufacture products as per customer requirements in order to enhance customer satisfaction. This we shall achieve through continual improvement in our product quality.' },
    qualityImage: { type: String, default: '/about-quality.png' }
  },
  cta: {
    title: { type: String, default: 'Ready to Automate Your Future?' },
    subtitle: { type: String, default: 'Partner with Pascal Auto Solutions to engineer cost-effective, high-performance machinery tailored precisely to your manufacturing requirements.' },
    buttonText: { type: String, default: 'Get in Touch' },
    buttonLink: { type: String, default: '/contact' }
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.LandingPage || mongoose.model('LandingPage', LandingPageSchema);
