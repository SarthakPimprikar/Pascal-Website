import mongoose from 'mongoose';

const SiteConfigSchema = new mongoose.Schema({
  key: {
    type: String,
    default: 'main_config',
    unique: true,
  },
  companyName: {
    type: String,
    required: true,
    default: 'Pascal Auto Solutions',
  },
  companySubName: {
    type: String,
    default: 'Formerly Pascal Auto Systems',
  },
  tagline: {
    type: String,
    default: 'MANUFACTURING ASSEMBLY AUTOMATION, LCA, HYDRAULIC/PNEUMATIC PRESSES, HYDRAULIC FIXTURES FOR CNC M/Cs.',
  },
  logo: {
    type: String,
    default: '/pascal-main-logo.png',
  },
  footerLogo: {
    type: String,
    default: '/fotterlogo.png',
  },
  address: {
    type: String,
    default: 'Pascal Auto Solutions (Formerly Pascal Auto Systems), Sr. No. 25/2A/2, Nanded, Opp. Savli Dhaba, Sinhagad Road, Pune - 411 041.',
  },
  phone: {
    type: String,
    default: '+918262013425',
  },
  email: {
    type: String,
    default: 'pascalpune@gmail.com',
  },
  copyrightText: {
    type: String,
    default: 'Pascal Auto Solutions. All rights reserved.',
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.SiteConfig || mongoose.model('SiteConfig', SiteConfigSchema);
