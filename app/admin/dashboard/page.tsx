"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  Settings, Layout, HardHat, Users, Image as ImageIcon, Mail, LogOut, 
  Plus, Edit2, Trash2, Save, Upload, PlusCircle, MinusCircle, Check, Loader2,
  FileText, Globe2, Briefcase
} from "lucide-react";

const isLogoAvailable = (logo: string) => {
  if (!logo) return false;
  if (logo.startsWith('http://') || logo.startsWith('https://')) return true;
  const availableLogos = [
    '/clients/BAJAJ.logo.png',
    '/clients/tatamotors.logo.png',
    '/clients/mahendra.logo.png',
    '/clients/FIAT.logo.png',
    '/clients/JAYAHIND.logo.png'
  ];
  return availableLogos.includes(logo);
};

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("general");
  const [loadingSession, setLoadingSession] = useState(true);
  const [user, setUser] = useState<any>(null);
  
  // Loading states
  const [loadingData, setLoadingData] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // Data states
  const [siteConfig, setSiteConfig] = useState<any>(null);
  const [landingPage, setLandingPage] = useState<any>(null);
  
  // Products states
  const [products, setProducts] = useState<any[]>([]);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [newProductMode, setNewProductMode] = useState(false);

  // Clients states
  const [clients, setClients] = useState<any[]>([]);
  const [editingClient, setEditingClient] = useState<any>(null);
  const [newClientMode, setNewClientMode] = useState(false);

  // Gallery states
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [editingGallery, setEditingGallery] = useState<any>(null);
  const [newGalleryMode, setNewGalleryMode] = useState(false);

  // Careers states
  const [careers, setCareers] = useState<any[]>([]);
  const [editingCareer, setEditingCareer] = useState<any>(null);
  const [newCareerMode, setNewCareerMode] = useState(false);

  // Applications state
  const [applications, setApplications] = useState<any[]>([]);

  // Enquiries state
  const [enquiries, setEnquiries] = useState<any[]>([]);

  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Authenticate
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.replace("/admin");
        } else {
          setUser(data.user);
          setLoadingSession(false);
          loadAllData();
        }
      })
      .catch(() => {
        router.replace("/admin");
      });
  }, [router]);

  const loadAllData = async () => {
    setLoadingData(true);
    try {
      // 1. Fetch site config
      const resConfig = await fetch("/api/admin/site-config");
      const configData = await resConfig.json();
      setSiteConfig(configData);

      // 2. Fetch landing page data
      const resLanding = await fetch("/api/admin/landing");
      const landingData = await resLanding.json();
      setLandingPage(landingData);

      // 3. Fetch products
      const resProducts = await fetch("/api/admin/products");
      const productsData = await resProducts.json();
      setProducts(productsData);

      // 4. Fetch clients
      const resClients = await fetch("/api/admin/clients");
      const clientsData = await resClients.json();
      setClients(clientsData);

      // 5. Fetch gallery
      const resGallery = await fetch("/api/admin/gallery");
      const galleryData = await resGallery.json();
      setGalleryItems(galleryData);

      // 6. Fetch enquiries
      const resEnquiries = await fetch("/api/admin/enquiries");
      const enquiriesData = await resEnquiries.json();
      setEnquiries(enquiriesData);

      // 7. Fetch careers
      const resCareers = await fetch("/api/admin/careers");
      const careersData = await resCareers.json();
      setCareers(careersData);

      // 8. Fetch applications
      const resApps = await fetch("/api/admin/applications");
      const appsData = await resApps.json();
      setApplications(appsData);
    } catch (err) {
      showMsg("error", "Failed to fetch site data");
    } finally {
      setLoadingData(false);
    }
  };

  const showMsg = (type: string, text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: "", text: "" }), 5000);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin");
  };

  // Image Upload helper
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      callback(data.url);
      showMsg("success", "Image uploaded successfully!");
    } catch (err: any) {
      showMsg("error", err.message || "Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // GENERAL CONFIG SAVE
  const saveGeneralConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/site-config", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteConfig),
      });
      if (!res.ok) throw new Error("Failed to save site configuration");
      showMsg("success", "Global site settings saved successfully!");
    } catch (err: any) {
      showMsg("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  // HERO/ABOUT SAVE
  const saveLandingConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/landing", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(landingPage),
      });
      if (!res.ok) throw new Error("Failed to save homepage layouts");
      showMsg("success", "Homepage sections updated successfully!");
    } catch (err: any) {
      showMsg("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  // PRODUCT CRUD
  const saveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = newProductMode;
      const url = "/api/admin/products";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProduct),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save product");

      showMsg("success", `Product ${isNew ? 'created' : 'updated'} successfully!`);
      setNewProductMode(false);
      setEditingProduct(null);
      // Reload products
      const pRes = await fetch("/api/admin/products");
      setProducts(await pRes.json());
    } catch (err: any) {
      showMsg("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/admin/products?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      showMsg("success", "Product deleted successfully!");
      setProducts(products.filter(p => p._id !== id));
    } catch (err: any) {
      showMsg("error", err.message);
    }
  };

  // CLIENT CRUD
  const saveClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = newClientMode;
      const url = "/api/admin/clients";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingClient),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save client");

      showMsg("success", `Client logo ${isNew ? 'added' : 'updated'} successfully!`);
      setNewClientMode(false);
      setEditingClient(null);
      // Reload clients
      const cRes = await fetch("/api/admin/clients");
      setClients(await cRes.json());
    } catch (err: any) {
      showMsg("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteClient = async (id: string) => {
    if (!confirm("Are you sure you want to remove this client?")) return;
    try {
      const res = await fetch(`/api/admin/clients?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove client");
      showMsg("success", "Client logo removed successfully!");
      setClients(clients.filter(c => c._id !== id));
    } catch (err: any) {
      showMsg("error", err.message);
    }
  };

  // GALLERY CRUD
  const saveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const isNew = newGalleryMode;
      const url = "/api/admin/gallery";
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingGallery),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save gallery item");

      showMsg("success", `Gallery item ${isNew ? 'uploaded' : 'updated'} successfully!`);
      setNewGalleryMode(false);
      setEditingGallery(null);
      // Reload gallery
      const gRes = await fetch("/api/admin/gallery");
      setGalleryItems(await gRes.json());
    } catch (err: any) {
      showMsg("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteGalleryItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this gallery photo?")) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete gallery item");
      showMsg("success", "Gallery item removed successfully!");
      setGalleryItems(galleryItems.filter(g => g._id !== id));
    } catch (err: any) {
      showMsg("error", err.message);
    }
  };

  const saveCareer = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const method = newCareerMode ? "POST" : "PUT";
      const res = await fetch("/api/admin/careers", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCareer),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save job opening");

      showMsg("success", newCareerMode ? "Job position added!" : "Job position updated!");
      
      // Refresh list
      const resCareers = await fetch("/api/admin/careers");
      const careersData = await resCareers.json();
      setCareers(careersData);

      setEditingCareer(null);
      setNewCareerMode(false);
    } catch (err: any) {
      showMsg("error", err.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteCareer = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job opening?")) return;
    try {
      const res = await fetch(`/api/admin/careers?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete job opening");
      showMsg("success", "Job opening removed successfully!");
      setCareers(careers.filter(c => c._id !== id));
    } catch (err: any) {
      showMsg("error", err.message);
    }
  };

  const deleteApplication = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job application?")) return;
    try {
      const res = await fetch(`/api/admin/applications?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete application");
      showMsg("success", "Application deleted successfully!");
      setApplications(applications.filter(a => a._id !== id));
    } catch (err: any) {
      showMsg("error", err.message);
    }
  };

  if (loadingSession) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="animate-spin text-blue-500 mb-4">
          <Loader2 size={40} />
        </div>
        <p className="text-slate-400 font-medium tracking-wide">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-slate-50 text-slate-850 flex flex-col font-sans">
      
      {/* CMS Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center shadow-lg shrink-0">
        <div className="flex items-center gap-3">
          <Settings className="text-blue-500 animate-pulse" size={26} />
          <h1 className="text-xl font-black tracking-wider text-white" style={{ fontFamily: 'Gotham, sans-serif' }}>
            PASCAL AUTOMATION CMS
          </h1>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-sm font-bold text-slate-400 bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700/50">
            Admin: {user?.username}
          </span>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 hover:bg-red-900/20 text-red-400 hover:text-red-300 font-bold text-sm px-4 py-2 rounded-xl transition-all border border-red-500/20 cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </header>

      {/* Main CMS Layout */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Sidebar Nav */}
        <aside className="w-64 bg-slate-900/60 border-r border-slate-800 p-4 flex flex-col gap-1.5 shrink-0">
          <div className="sidebar-section-header">
            Site Management
          </div>

          <button
            onClick={() => { setActiveTab("general"); setEditingProduct(null); setEditingClient(null); setEditingGallery(null); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${activeTab === "general" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
          >
            <Settings size={18} />
            General Settings
          </button>

          <button
            onClick={() => { setActiveTab("heroAbout"); setEditingProduct(null); setEditingClient(null); setEditingGallery(null); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${activeTab === "heroAbout" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
          >
            <Layout size={18} />
            Homepage Sections
          </button>

          <button
            onClick={() => { setActiveTab("products"); setEditingProduct(null); setNewProductMode(false); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${activeTab === "products" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
          >
            <HardHat size={18} />
            Manage Products
          </button>

          <button
            onClick={() => { setActiveTab("clients"); setEditingClient(null); setNewClientMode(false); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${activeTab === "clients" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
          >
            <Users size={18} />
            Manage Clients
          </button>

          <button
            onClick={() => { setActiveTab("gallery"); setEditingGallery(null); setNewGalleryMode(false); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${activeTab === "gallery" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
          >
            <ImageIcon size={18} />
            Manage Gallery
          </button>

          <button
            onClick={() => { setActiveTab("careers"); setEditingProduct(null); setEditingClient(null); setEditingGallery(null); setEditingCareer(null); setNewCareerMode(false); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${activeTab === "careers" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
          >
            <Briefcase size={18} />
            Manage Careers
          </button>

          <div className="sidebar-section-header">
            Inbox & Leads
          </div>

          <button
            onClick={() => { setActiveTab("applications"); setEditingProduct(null); setEditingClient(null); setEditingGallery(null); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left relative ${activeTab === "applications" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
          >
            <FileText size={18} />
            Job Applications
            {applications.length > 0 && (
              <span className="absolute right-4 bg-red-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                {applications.length}
              </span>
            )}
          </button>

          <button
            onClick={() => { setActiveTab("enquiries"); setEditingProduct(null); setEditingClient(null); setEditingGallery(null); }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left relative ${activeTab === "enquiries" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:bg-slate-800"}`}
          >
            <Mail size={18} />
            Contact Enquiries
            {enquiries.length > 0 && (
              <span className="absolute right-4 bg-red-500 text-white text-[10px] font-black h-5 w-5 rounded-full flex items-center justify-center animate-pulse">
                {enquiries.length}
              </span>
            )}
          </button>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-950/40 relative">
          
          {/* Notification Overlay */}
          {message.text && (
            <div className={`fixed bottom-8 right-8 z-50 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-slide-in border ${message.type === "success" ? "bg-emerald-950/90 text-emerald-200 border-emerald-500/40" : "bg-red-950/90 text-red-200 border-red-500/40"}`}>
              <Check size={20} className={message.type === "success" ? "text-emerald-400" : "text-red-400"} />
              <span className="text-sm font-semibold">{message.text}</span>
            </div>
          )}

          {/* Loading Data Loader */}
          {loadingData && (
            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-30 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 text-blue-500 font-bold">
                <Loader2 className="animate-spin" size={32} />
                <span>Fetching site content...</span>
              </div>
            </div>
          )}

          {/* TAB 1: GENERAL SETTINGS */}
          {activeTab === "general" && siteConfig && (
            <form onSubmit={saveGeneralConfig} className="max-w-4xl space-y-8 bg-slate-900/40 p-8 border border-slate-800 rounded-3xl">
              <div>
                <h2 className="text-2xl font-black text-white">General Config</h2>
                <p className="text-slate-400 text-sm mt-1">Manage core contact data and logos shown on headers and footers.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Company Name</label>
                  <input
                    type="text"
                    value={siteConfig.companyName}
                    onChange={(e) => setSiteConfig({ ...siteConfig, companyName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Company Subtitle</label>
                  <input
                    type="text"
                    value={siteConfig.companySubName}
                    onChange={(e) => setSiteConfig({ ...siteConfig, companySubName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Global Tagline (Mfg Text)</label>
                  <input
                    type="text"
                    value={siteConfig.tagline}
                    onChange={(e) => setSiteConfig({ ...siteConfig, tagline: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Phone Contact</label>
                  <input
                    type="text"
                    value={siteConfig.phone}
                    onChange={(e) => setSiteConfig({ ...siteConfig, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Email Contact</label>
                  <input
                    type="email"
                    value={siteConfig.email}
                    onChange={(e) => setSiteConfig({ ...siteConfig, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Factory Address</label>
                  <textarea
                    rows={3}
                    value={siteConfig.address}
                    onChange={(e) => setSiteConfig({ ...siteConfig, address: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Copyright Bar Info</label>
                  <input
                    type="text"
                    value={siteConfig.copyrightText}
                    onChange={(e) => setSiteConfig({ ...siteConfig, copyrightText: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  {/* Logos - Header & Footer */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Header Logo</label>
                      <div className="flex items-center gap-3">
                        <img src={siteConfig.logo} alt="Header Logo" className="h-10 w-auto bg-slate-950 p-1 border border-slate-800 rounded-lg object-contain" />
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                          <Upload size={12} />
                          Replace
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setSiteConfig({ ...siteConfig, logo: url }))} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Footer Logo</label>
                      <div className="flex items-center gap-3">
                        <img src={siteConfig.footerLogo} alt="Footer Logo" className="h-10 w-auto bg-slate-950 p-1 border border-slate-800 rounded-lg object-contain" />
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                          <Upload size={12} />
                          Replace
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setSiteConfig({ ...siteConfig, footerLogo: url }))} />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 flex justify-end">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-600/10 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? "Saving Changes..." : "Save Settings"}
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: HOMEPAGE SECTIONS */}
          {activeTab === "heroAbout" && landingPage && (
            <form onSubmit={saveLandingConfig} className="max-w-4xl space-y-12">
              
              {/* HERO SECTION */}
              <div className="bg-slate-900/40 p-8 border border-slate-800 rounded-3xl space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Hero Section Config</h2>
                  <p className="text-slate-400 text-xs mt-1">Configure texts, buttons and mockup images displayed in the first fold of the site.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Main Heading</label>
                    <input
                      type="text"
                      value={landingPage.hero.title}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        hero: { ...landingPage.hero, title: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Badge Headline</label>
                    <input
                      type="text"
                      value={landingPage.hero.badge}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        hero: { ...landingPage.hero, badge: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Punchy Subtitle</label>
                    <input
                      type="text"
                      value={landingPage.hero.tagline}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        hero: { ...landingPage.hero, tagline: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Description Paragraph</label>
                    <textarea
                      rows={3}
                      value={landingPage.hero.description}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        hero: { ...landingPage.hero, description: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Primary Button Text</label>
                    <input
                      type="text"
                      value={landingPage.hero.primaryBtnText}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        hero: { ...landingPage.hero, primaryBtnText: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Secondary Button Text</label>
                    <input
                      type="text"
                      value={landingPage.hero.secondaryBtnText}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        hero: { ...landingPage.hero, secondaryBtnText: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Main Image (Image 1)</label>
                    <div className="flex gap-4 items-center">
                      <img src={landingPage.hero.image1} alt="Hero 1" className="h-16 w-20 bg-slate-950 rounded-xl object-cover border border-slate-800" />
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                        <Upload size={12} />
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setLandingPage({
                          ...landingPage,
                          hero: { ...landingPage.hero, image1: url }
                        }))} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Overlapping Floating Image (Image 2)</label>
                    <div className="flex gap-4 items-center">
                      <img src={landingPage.hero.image2} alt="Hero 2" className="h-16 w-20 bg-slate-950 rounded-xl object-cover border border-slate-800" />
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                        <Upload size={12} />
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setLandingPage({
                          ...landingPage,
                          hero: { ...landingPage.hero, image2: url }
                        }))} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* ABOUT US SECTION */}
              <div className="bg-slate-900/40 p-8 border border-slate-800 rounded-3xl space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">About Us Section Config</h2>
                  <p className="text-slate-400 text-xs mt-1">Configure company story paragraphs, images and Quality Policy statements.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Small Title (e.g. "Our Story")</label>
                    <input
                      type="text"
                      value={landingPage.about.title}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        about: { ...landingPage.about, title: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Subtitle (e.g. "About Pascal Auto Solutions")</label>
                    <input
                      type="text"
                      value={landingPage.about.subtitle}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        about: { ...landingPage.about, subtitle: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Description Paragraph 1</label>
                    <textarea
                      rows={3}
                      value={landingPage.about.descriptionParagraphs[0]}
                      onChange={(e) => {
                        const newParagraphs = [...landingPage.about.descriptionParagraphs];
                        newParagraphs[0] = e.target.value;
                        setLandingPage({
                          ...landingPage,
                          about: { ...landingPage.about, descriptionParagraphs: newParagraphs }
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Description Paragraph 2</label>
                    <textarea
                      rows={3}
                      value={landingPage.about.descriptionParagraphs[1]}
                      onChange={(e) => {
                        const newParagraphs = [...landingPage.about.descriptionParagraphs];
                        newParagraphs[1] = e.target.value;
                        setLandingPage({
                          ...landingPage,
                          about: { ...landingPage.about, descriptionParagraphs: newParagraphs }
                        });
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Main About Image</label>
                    <div className="flex gap-4 items-center">
                      <img src={landingPage.about.image} alt="About" className="h-16 w-20 bg-slate-950 rounded-xl object-cover border border-slate-800" />
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                        <Upload size={12} />
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setLandingPage({
                          ...landingPage,
                          about: { ...landingPage.about, image: url }
                        }))} />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Image Overlay Text Tag</label>
                    <input
                      type="text"
                      value={landingPage.about.imageOverlayText}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        about: { ...landingPage.about, imageOverlayText: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Quality Policy Statement</label>
                    <textarea
                      rows={2}
                      value={landingPage.about.qualityPolicy}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        about: { ...landingPage.about, qualityPolicy: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Quality Policy Image</label>
                    <div className="flex gap-4 items-center">
                      <img src={landingPage.about.qualityImage} alt="Quality Policy" className="h-16 w-20 bg-slate-950 rounded-xl object-cover border border-slate-800" />
                      <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                        <Upload size={12} />
                        Upload
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setLandingPage({
                          ...landingPage,
                          about: { ...landingPage.about, qualityImage: url }
                        }))} />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA BLUE SECTION */}
              <div className="bg-slate-900/40 p-8 border border-slate-800 rounded-3xl space-y-6">
                <div>
                  <h2 className="text-xl font-black text-white">Call to Action Config (CTA)</h2>
                  <p className="text-slate-400 text-xs mt-1">Configure footer promotion layout panel contents.</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">CTA Headline</label>
                    <input
                      type="text"
                      value={landingPage.cta.title}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        cta: { ...landingPage.cta, title: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">CTA Description</label>
                    <textarea
                      rows={3}
                      value={landingPage.cta.subtitle}
                      onChange={(e) => setLandingPage({
                        ...landingPage,
                        cta: { ...landingPage.cta, subtitle: e.target.value }
                      })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Button Link Text</label>
                      <input
                        type="text"
                        value={landingPage.cta.buttonText}
                        onChange={(e) => setLandingPage({
                          ...landingPage,
                          cta: { ...landingPage.cta, buttonText: e.target.value }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Button Target URL</label>
                      <input
                        type="text"
                        value={landingPage.cta.buttonLink || '/contact'}
                        onChange={(e) => setLandingPage({
                          ...landingPage,
                          cta: { ...landingPage.cta, buttonLink: e.target.value }
                        })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-600/10 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                >
                  <Save size={16} />
                  {saving ? "Saving Changes..." : "Save Homepage Sections"}
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: PRODUCTS MANAGEMENT */}
          {activeTab === "products" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-slate-900/40 p-6 border border-slate-800 rounded-3xl">
                <div>
                  <h2 className="text-2xl font-black text-white">Manage Products</h2>
                  <p className="text-slate-400 text-sm mt-1">Add, update or remove items in the product catalog and categories.</p>
                </div>
                {!editingProduct && !newProductMode && (
                  <button
                    onClick={() => {
                      setNewProductMode(true);
                      setEditingProduct({
                        title: "",
                        slug: "",
                        category: "Press Machines",
                        shortDescription: "",
                        fullDescription: "",
                        image: "",
                        iconName: "Settings",
                        features: [""],
                        order: products.length
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4.5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-blue-600/15 cursor-pointer"
                  >
                    <Plus size={16} />
                    Add Product
                  </button>
                )}
              </div>

              {/* Products CRUD Forms */}
              {(editingProduct || newProductMode) && (
                <form onSubmit={saveProduct} className="bg-slate-900/40 p-8 border border-slate-800 rounded-3xl space-y-6 max-w-4xl animate-fade-in">
                  <h3 className="text-lg font-black text-white pb-3 border-b border-slate-800 flex justify-between items-center">
                    <span>{newProductMode ? "New Product Specifications" : "Edit Product Specifications"}</span>
                    <button 
                      type="button" 
                      onClick={() => { setEditingProduct(null); setNewProductMode(false); }}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Product Name/Title</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.title}
                        onChange={(e) => {
                          const val = e.target.value;
                          const slugified = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
                          setEditingProduct({ ...editingProduct, title: val, slug: slugified });
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Multi-spindle Press"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">URL Slug (Dynamic Page Target)</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.slug}
                        onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. multi-spindle-press"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Product Category</label>
                      <select
                        value={editingProduct.category}
                        onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Press Machines">Press Machines</option>
                        <option value="Monitoring Systems">Monitoring Systems</option>
                        <option value="Hydraulics">Hydraulics</option>
                        <option value="Special Purpose Machines">Special Purpose Machines</option>
                        <option value="Assembly Lines">Assembly Lines</option>
                        <option value="Material Handling">Material Handling</option>
                        <option value="Tooling">Tooling</option>
                        <option value="Industrial Automation">Industrial Automation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Lucide Grid Icon Type</label>
                      <select
                        value={editingProduct.iconName}
                        onChange={(e) => setEditingProduct({ ...editingProduct, iconName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Hammer">Hammer (Presses)</option>
                        <option value="Gauge">Gauge (Monitoring)</option>
                        <option value="Zap">Zap (Power Packs)</option>
                        <option value="Layers">Layers (Multi Spindle)</option>
                        <option value="Cpu">Cpu (Automations)</option>
                        <option value="ArrowUpSquare">ArrowUpSquare (Lifters)</option>
                        <option value="ScanBarcode">ScanBarcode (VIN Marking)</option>
                        <option value="Settings2">Settings2 (Fixtures)</option>
                        <option value="Settings">Settings (Default Gear)</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Short Description (for Home Card)</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.shortDescription}
                        onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief summary shown on homepage grids..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Full Description (for Detail Page)</label>
                      <textarea
                        rows={4}
                        required
                        value={editingProduct.fullDescription}
                        onChange={(e) => setEditingProduct({ ...editingProduct, fullDescription: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Detailed write-up shown on product subpages..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Product Image (Machine Snapshot)</label>
                      <div className="flex gap-4 items-center">
                        {editingProduct.image ? (
                          <img src={editingProduct.image} alt="Preview" className="h-16 w-20 bg-slate-950 border border-slate-800 rounded-xl object-contain" />
                        ) : (
                          <div className="h-16 w-20 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-600">No Image</div>
                        )}
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                          <Upload size={12} />
                          Upload Photo
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setEditingProduct({ ...editingProduct, image: url }))} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Layout Sorting Order</label>
                      <input
                        type="number"
                        value={editingProduct.order}
                        onChange={(e) => setEditingProduct({ ...editingProduct, order: parseInt(e.target.value) })}
                        className="w-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    {/* Features list builder */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Features & Specifications List</label>
                      <div className="space-y-3">
                        {editingProduct.features.map((feat: string, index: number) => (
                          <div key={index} className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={feat}
                              onChange={(e) => {
                                const newFeatures = [...editingProduct.features];
                                newFeatures[index] = e.target.value;
                                setEditingProduct({ ...editingProduct, features: newFeatures });
                              }}
                              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder={`Feature #${index + 1}`}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct({
                                  ...editingProduct,
                                  features: editingProduct.features.filter((_: any, i: number) => i !== index)
                                });
                              }}
                              className="text-red-500 hover:text-red-400 cursor-pointer"
                            >
                              <MinusCircle size={20} />
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingProduct({
                              ...editingProduct,
                              features: [...editingProduct.features, ""]
                            });
                          }}
                          className="text-xs bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 font-bold px-3.5 py-2 rounded-xl flex items-center gap-1 cursor-pointer border border-slate-700"
                        >
                          <PlusCircle size={14} />
                          Add Bullet Point
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setEditingProduct(null); setNewProductMode(false); }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm px-5 py-3 rounded-xl border border-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving || uploading}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-600/10 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Save size={16} />
                      {saving ? "Saving Spec..." : "Save Product Details"}
                    </button>
                  </div>
                </form>
              )}

              {/* Grid Product List Display */}
              {!editingProduct && !newProductMode && (
                <div className="bg-slate-900/40 p-6 border border-slate-800 rounded-3xl">
                  {products.length === 0 ? (
                    <p className="text-slate-500 text-center py-12">No products added. Click Add Product to initialize catalog.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-300">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
                          <tr>
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product Name</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Slug Path</th>
                            <th className="px-6 py-4">Order</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {products.map((p) => (
                            <tr key={p._id} className="hover:bg-slate-900/30">
                              <td className="px-6 py-4">
                                <img src={p.image} alt={p.title} className="h-10 w-12 bg-white p-1 rounded border border-slate-800 object-contain" />
                              </td>
                              <td className="px-6 py-4 font-bold text-white">{p.title}</td>
                              <td className="px-6 py-4 text-slate-400">{p.category}</td>
                              <td className="px-6 py-4 text-xs text-blue-400 font-mono">/products/{p.slug}</td>
                              <td className="px-6 py-4">{p.order}</td>
                              <td className="px-6 py-4 text-right flex justify-end gap-3.5">
                                <button
                                  onClick={() => setEditingProduct(p)}
                                  className="text-blue-500 hover:text-blue-400 cursor-pointer flex items-center gap-1 text-xs font-bold"
                                >
                                  <Edit2 size={12} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteProduct(p._id)}
                                  className="text-red-500 hover:text-red-400 cursor-pointer flex items-center gap-1 text-xs font-bold"
                                >
                                  <Trash2 size={12} />
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CLIENT LOGOS */}
          {activeTab === "clients" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-slate-900/40 p-6 border border-slate-800 rounded-3xl">
                <div>
                  <h2 className="text-2xl font-black text-white">Manage Clients</h2>
                  <p className="text-slate-400 text-sm mt-1">Upload partner logos for the scrolling banner and the global footprints grids.</p>
                </div>
                {!editingClient && !newClientMode && (
                  <button
                    onClick={() => {
                      setNewClientMode(true);
                      setEditingClient({
                        name: "",
                        logo: "",
                        type: "domestic",
                        country: "",
                        order: clients.length
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4.5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-blue-600/15 cursor-pointer"
                  >
                    <Plus size={16} />
                    Add Client Logo
                  </button>
                )}
              </div>

              {/* Clients CRUD Forms */}
              {(editingClient || newClientMode) && (
                <form onSubmit={saveClient} className="bg-slate-900/40 p-8 border border-slate-800 rounded-3xl space-y-6 max-w-2xl animate-fade-in">
                  <h3 className="text-lg font-black text-white pb-3 border-b border-slate-800 flex justify-between items-center">
                    <span>{newClientMode ? "Add New Client Logo" : "Edit Client Logo"}</span>
                    <button 
                      type="button" 
                      onClick={() => { setEditingClient(null); setNewClientMode(false); }}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Company / Client Name</label>
                      <input
                        type="text"
                        required
                        value={editingClient.name}
                        onChange={(e) => setEditingClient({ ...editingClient, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. TATA MOTORS"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Client Footprint Area</label>
                      <select
                        value={editingClient.type}
                        onChange={(e) => setEditingClient({ ...editingClient, type: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="domestic">Domestic Client (Pune/India)</option>
                        <option value="international">International Client (Export)</option>
                      </select>
                    </div>

                    {editingClient.type === "international" && (
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Client Country</label>
                        <input
                          type="text"
                          required
                          value={editingClient.country}
                          onChange={(e) => setEditingClient({ ...editingClient, country: e.target.value })}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="e.g. Malaysia, Bangladesh"
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Client Logo image</label>
                      <div className="flex gap-4 items-center">
                        {editingClient.logo ? (
                          <img src={editingClient.logo} alt="Preview" className="h-16 w-20 bg-white border border-slate-800 rounded-xl object-contain p-1" />
                        ) : (
                          <div className="h-16 w-20 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-600">No Logo</div>
                        )}
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                          <Upload size={12} />
                          Upload Logo
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setEditingClient({ ...editingClient, logo: url }))} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Sorting Order</label>
                      <input
                        type="number"
                        value={editingClient.order}
                        onChange={(e) => setEditingClient({ ...editingClient, order: parseInt(e.target.value) })}
                        className="w-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setEditingClient(null); setNewClientMode(false); }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm px-5 py-3 rounded-xl border border-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving || uploading}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-600/10 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Save size={16} />
                      {saving ? "Saving..." : "Save Partner Logo"}
                    </button>
                  </div>
                </form>
              )}

              {/* Client List */}
              {!editingClient && !newClientMode && (
                <div className="bg-slate-900/40 p-6 border border-slate-800 rounded-3xl">
                  {clients.length === 0 ? (
                    <p className="text-slate-500 text-center py-12">No client logos added.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm text-slate-300">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-950/60 border-b border-slate-800">
                          <tr>
                            <th className="px-6 py-4">Logo Image</th>
                            <th className="px-6 py-4">Client Name</th>
                            <th className="px-6 py-4">Footprint Group</th>
                            <th className="px-6 py-4">Country Info</th>
                            <th className="px-6 py-4">Order</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60">
                          {clients.map((c) => (
                            <tr key={c._id} className="hover:bg-slate-900/30">
                              <td className="px-6 py-4">
                                {isLogoAvailable(c.logo) ? (
                                  <img src={c.logo} alt={c.name} className="h-10 w-24 bg-white p-1 rounded border border-slate-200 object-contain" />
                                ) : (
                                  <div className="h-10 w-24 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 text-center uppercase tracking-wider px-1">
                                    {c.name}
                                  </div>
                                )}
                              </td>
                              <td className="px-6 py-4 font-bold text-white">{c.name}</td>
                              <td className="px-6 py-4 text-slate-400 capitalize flex items-center gap-1.5 mt-2.5">
                                {c.type === "international" ? (
                                  <span className="flex items-center gap-1 text-orange-400 bg-orange-950/20 px-2.5 py-0.5 rounded-full text-xs font-bold border border-orange-500/10">
                                    <Globe2 size={12} />
                                    International
                                  </span>
                                ) : (
                                  <span className="text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full text-xs font-bold">
                                    Domestic
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4 text-slate-400">{c.country || "-"}</td>
                              <td className="px-6 py-4">{c.order}</td>
                              <td className="px-6 py-4 text-right flex justify-end gap-3.5 mt-2.5">
                                <button
                                  onClick={() => setEditingClient(c)}
                                  className="text-blue-500 hover:text-blue-400 cursor-pointer flex items-center gap-1 text-xs font-bold"
                                >
                                  <Edit2 size={12} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteClient(c._id)}
                                  className="text-red-500 hover:text-red-400 cursor-pointer flex items-center gap-1 text-xs font-bold"
                                >
                                  <Trash2 size={12} />
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: GALLERY */}
          {activeTab === "gallery" && (
            <div className="space-y-8">
              <div className="flex justify-between items-center bg-slate-900/40 p-6 border border-slate-800 rounded-3xl">
                <div>
                  <h2 className="text-2xl font-black text-white">Manage Gallery</h2>
                  <p className="text-slate-400 text-sm mt-1">Upload and describe pictures showing site operations and machine tooling.</p>
                </div>
                {!editingGallery && !newGalleryMode && (
                  <button
                    onClick={() => {
                      setNewGalleryMode(true);
                      setEditingGallery({
                        title: "",
                        imageUrl: "",
                        description: "",
                        order: galleryItems.length
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4.5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-blue-600/15 cursor-pointer"
                  >
                    <Plus size={16} />
                    Add Photo Item
                  </button>
                )}
              </div>

              {/* Gallery Item Form */}
              {(editingGallery || newGalleryMode) && (
                <form onSubmit={saveGalleryItem} className="bg-slate-900/40 p-8 border border-slate-800 rounded-3xl space-y-6 max-w-2xl animate-fade-in">
                  <h3 className="text-lg font-black text-white pb-3 border-b border-slate-800 flex justify-between items-center">
                    <span>{newGalleryMode ? "Add Photo Item" : "Edit Photo Item"}</span>
                    <button 
                      type="button" 
                      onClick={() => { setEditingGallery(null); setNewGalleryMode(false); }}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Photo Heading / Title</label>
                      <input
                        type="text"
                        required
                        value={editingGallery.title}
                        onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Hydropneumatic Press Assembly"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Brief Description (Optional)</label>
                      <input
                        type="text"
                        value={editingGallery.description}
                        onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Brief summary showing what machinery/tooling is in focus..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Upload Image File</label>
                      <div className="flex gap-4 items-center">
                        {editingGallery.imageUrl ? (
                          <img src={editingGallery.imageUrl} alt="Preview" className="h-16 w-20 bg-slate-950 border border-slate-800 rounded-xl object-cover" />
                        ) : (
                          <div className="h-16 w-20 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-center text-xs text-slate-600">No Image</div>
                        )}
                        <label className="cursor-pointer bg-slate-800 hover:bg-slate-700 text-xs font-bold px-3 py-2 rounded-lg border border-slate-700 text-slate-300 flex items-center gap-1">
                          <Upload size={12} />
                          Upload Photo
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUploadImage(e, (url) => setEditingGallery({ ...editingGallery, imageUrl: url }))} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Layout Sorting Order</label>
                      <input
                        type="number"
                        value={editingGallery.order}
                        onChange={(e) => setEditingGallery({ ...editingGallery, order: parseInt(e.target.value) })}
                        className="w-24 bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setEditingGallery(null); setNewGalleryMode(false); }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm px-5 py-3 rounded-xl border border-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving || uploading}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-600/10 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Save size={16} />
                      {saving ? "Saving..." : "Save Gallery Item"}
                    </button>
                  </div>
                </form>
              )}

              {/* Gallery Grid List */}
              {!editingGallery && !newGalleryMode && (
                <div className="bg-slate-900/40 p-6 border border-slate-800 rounded-3xl">
                  {galleryItems.length === 0 ? (
                    <p className="text-slate-500 text-center py-12">No images uploaded to gallery.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {galleryItems.map((item) => (
                        <div key={item._id} className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-md flex flex-col group relative">
                          <div className="aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-slate-850 relative">
                            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                            <span className="absolute bottom-2 right-2 text-[10px] bg-slate-900/90 text-slate-400 px-2 py-0.5 border border-slate-800 rounded-md font-bold">
                              Order: {item.order}
                            </span>
                          </div>
                          <div className="p-4 flex-1 flex flex-col justify-between">
                            <div>
                              <h4 className="font-bold text-white tracking-tight truncate">{item.title}</h4>
                              <p className="text-xs text-slate-500 truncate mt-1">{item.description || "No description provided."}</p>
                            </div>
                            <div className="flex justify-between items-center border-t border-slate-900 pt-3 mt-4">
                              <button
                                onClick={() => setEditingGallery(item)}
                                className="text-blue-500 hover:text-blue-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit2 size={11} />
                                Edit
                              </button>
                              <button
                                onClick={() => deleteGalleryItem(item._id)}
                                className="text-red-500 hover:text-red-400 text-xs font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 size={11} />
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5.5: CAREERS */}
          {activeTab === "careers" && (
            <div className="space-y-8 animate-fade-in">
              <div className="flex justify-between items-center bg-slate-900/40 p-6 border border-slate-800 rounded-3xl">
                <div>
                  <h2 className="text-2xl font-black text-white">Manage Careers</h2>
                  <p className="text-slate-400 text-sm mt-1">Add, update, or remove current job openings posted on the careers page.</p>
                </div>
                {!editingCareer && !newCareerMode && (
                  <button
                    onClick={() => {
                      setNewCareerMode(true);
                      setEditingCareer({
                        title: "",
                        type: "Full-Time",
                        experience: "",
                        skills: "",
                        description: "",
                        order: careers.length
                      });
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4.5 py-3 rounded-xl flex items-center gap-2 shadow-lg hover:shadow-blue-600/15 cursor-pointer"
                  >
                    <Plus size={16} />
                    Add Position
                  </button>
                )}
              </div>

              {/* Career Form */}
              {(editingCareer || newCareerMode) && (
                <form onSubmit={saveCareer} className="bg-slate-900/40 p-8 border border-slate-800 rounded-3xl space-y-6 max-w-2xl animate-fade-in">
                  <h3 className="text-lg font-black text-white pb-3 border-b border-slate-800 flex justify-between items-center">
                    <span>{newCareerMode ? "Add Career Position" : "Edit Career Position"}</span>
                    <button 
                      type="button" 
                      onClick={() => { setEditingCareer(null); setNewCareerMode(false); }}
                      className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-400 px-3 py-1.5 rounded-lg border border-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Job Title</label>
                      <input
                        type="text"
                        required
                        value={editingCareer.title}
                        onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. Hydraulic Design Engineer"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Job Type</label>
                      <select
                        value={editingCareer.type}
                        onChange={(e) => setEditingCareer({ ...editingCareer, type: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 animate-fade-in"
                      >
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Experience Required</label>
                      <input
                        type="text"
                        required
                        value={editingCareer.experience}
                        onChange={(e) => setEditingCareer({ ...editingCareer, experience: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 2 - 4 Years"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Layout Sorting Order</label>
                      <input
                        type="number"
                        value={editingCareer.order}
                        onChange={(e) => setEditingCareer({ ...editingCareer, order: parseInt(e.target.value) || 0 })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Key Skills Required</label>
                      <input
                        type="text"
                        required
                        value={editingCareer.skills}
                        onChange={(e) => setEditingCareer({ ...editingCareer, skills: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. AutoCAD, circuit design, SolidWorks"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-2">Detailed Job Description</label>
                      <textarea
                        rows={4}
                        required
                        value={editingCareer.description}
                        onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe key responsibilities, shift details, etc..."
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => { setEditingCareer(null); setNewCareerMode(false); }}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-sm px-5 py-3 rounded-xl border border-slate-700 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-600/10 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
                    >
                      <Save size={16} />
                      {saving ? "Saving..." : "Save Position"}
                    </button>
                  </div>
                </form>
              )}

              {/* Positions List Table */}
              {!editingCareer && !newCareerMode && (
                <div className="bg-slate-900/40 border border-slate-800 rounded-3xl overflow-hidden">
                  {careers.length === 0 ? (
                    <p className="text-slate-500 text-center py-12">No careers positions posted yet.</p>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400 text-xs font-bold uppercase tracking-wider bg-slate-900/60">
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Experience</th>
                            <th className="px-6 py-4">Order</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 text-sm text-slate-300">
                          {careers.map((c) => (
                            <tr key={c._id} className="hover:bg-slate-900/30">
                              <td className="px-6 py-4 font-bold text-white">{c.title}</td>
                              <td className="px-6 py-4">
                                <span className="text-blue-400 bg-blue-950/20 px-2.5 py-0.5 rounded-full text-xs font-bold border border-blue-500/10">
                                  {c.type}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-slate-400">{c.experience}</td>
                              <td className="px-6 py-4">{c.order}</td>
                              <td className="px-6 py-4 text-right flex justify-end gap-3.5 mt-2.5">
                                <button
                                  onClick={() => setEditingCareer(c)}
                                  className="text-blue-500 hover:text-blue-400 cursor-pointer flex items-center gap-1 text-xs font-bold"
                                >
                                  <Edit2 size={12} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => deleteCareer(c._id)}
                                  className="text-red-500 hover:text-red-400 cursor-pointer flex items-center gap-1 text-xs font-bold"
                                >
                                  <Trash2 size={12} />
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 5.7: JOB APPLICATIONS */}
          {activeTab === "applications" && (
            <div className="space-y-8 bg-slate-900/40 p-8 border border-slate-800 rounded-3xl animate-fade-in">
              <div>
                <h2 className="text-2xl font-black text-white">Job Applications</h2>
                <p className="text-slate-400 text-sm mt-1">Review candidate profile details, cover letters, and download CV files.</p>
              </div>

              {applications.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center gap-3 text-slate-600">
                  <FileText size={48} strokeWidth={1} />
                  <p className="text-sm font-semibold uppercase tracking-wider">No Applications Found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app._id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-all flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-900 pb-4">
                        <div>
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-950/40 border border-blue-900/30 px-2.5 py-1 rounded-full mb-2 inline-block">
                            {app.jobTitle}
                          </span>
                          <h3 className="text-lg font-black text-white">{app.candidateName}</h3>
                          <p className="text-xs text-slate-400 mt-1">
                            Email: <span className="text-slate-200 font-medium">{app.candidateEmail}</span> | Tel: <span className="text-slate-200 font-medium">{app.candidatePhone}</span>
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-xs text-slate-500 font-medium bg-slate-900 px-3 py-1 rounded-lg border border-slate-800/80">
                            {new Date(app.createdAt).toLocaleString()}
                          </span>
                          
                          <a 
                            href={app.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow transition-colors cursor-pointer"
                          >
                            <Upload size={12} className="rotate-180" />
                            Open Resume/CV
                          </a>

                          <button
                            onClick={() => deleteApplication(app._id)}
                            className="text-red-500 hover:text-red-400 hover:bg-red-950/20 px-3 py-2 rounded-xl border border-red-500/20 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          >
                            <Trash2 size={12} />
                            Delete
                          </button>
                        </div>
                      </div>
                      
                      {app.message && (
                        <div>
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Applicant Message / Cover Note</span>
                          <p className="text-sm text-slate-400 whitespace-pre-line leading-relaxed bg-slate-900/20 p-4 rounded-xl border border-slate-900">{app.message}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: CONTACT ENQUIRIES */}
          {activeTab === "enquiries" && (
            <div className="space-y-8 bg-slate-900/40 p-8 border border-slate-800 rounded-3xl">
              <div>
                <h2 className="text-2xl font-black text-white">Contact Enquiries</h2>
                <p className="text-slate-400 text-sm mt-1">Review contact form submissions submitted by visitors online.</p>
              </div>

              {enquiries.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center gap-3 text-slate-600">
                  <FileText size={48} strokeWidth={1} />
                  <p className="text-sm font-semibold uppercase tracking-wider">No Enquiries Found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {enquiries.map((enq) => (
                    <div key={enq._id} className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-md hover:border-slate-700 transition-all flex flex-col gap-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b border-slate-900 pb-3">
                        <div>
                          <h3 className="text-base font-black text-white">{enq.name}</h3>
                          <p className="text-xs text-blue-400 font-medium">{enq.email} | Tel: {enq.phone}</p>
                        </div>
                        <span className="text-xs text-slate-500 font-bold bg-slate-900 px-3 py-1 rounded-lg border border-slate-800/80">
                          {new Date(enq.createdAt).toLocaleString()}
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Subject</span>
                        <p className="text-sm font-bold text-slate-200">{enq.subject || "General Inquiry"}</p>
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">Message Content</span>
                        <p className="text-sm text-slate-400 whitespace-pre-line leading-relaxed">{enq.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </main>
      </div>

      {/* Dynamic Keyframe Animations inside tag */}
      <style jsx global>{`
        @keyframes slideIn {
          from { transform: translateY(1rem); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.4s ease-out forwards;
        }

         /* LIGHT THEME OVERRIDES TO MATCH PUBLIC WEBSITE BRANDING */
        body, .min-h-screen, .bg-slate-950 {
          background-color: #f8fafc !important; /* slate-50 */
          color: #334155 !important; /* slate-700 */
        }
        
        /* CMS Header Overrides */
        header.bg-slate-900 {
          background-color: #ffffff !important;
          border-color: #e2e8f0 !important; /* slate-200 */
          color: #0f172a !important; /* slate-900 */
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05) !important;
        }
        header.bg-slate-900 h1 {
          color: #0f172a !important;
          font-weight: 900 !important;
          letter-spacing: 0.05em !important;
        }
        header.bg-slate-900 span {
          background-color: #f1f5f9 !important;
          border-color: #e2e8f0 !important;
          color: #475569 !important;
        }
        header.bg-slate-900 button {
          border-color: #fca5a5 !important;
          color: #dc2626 !important;
        }
        header.bg-slate-900 button:hover {
          background-color: #fef2f2 !important;
          color: #991b1b !important;
        }

        /* Sidebar Nav Overrides */
        aside.bg-slate-900\/60 {
          background-color: #ffffff !important;
          border-color: #e2e8f0 !important;
        }
        aside.bg-slate-900\/60 .sidebar-section-header {
          color: #94a3b8 !important;
          font-weight: 800 !important;
          font-size: 10px !important;
          text-transform: uppercase !important;
          letter-spacing: 0.1em !important;
          margin-top: 1.25rem !important;
          margin-bottom: 0.35rem !important;
          padding-left: 1rem !important;
        }
        aside.bg-slate-900\/60 .sidebar-section-header:first-of-type {
          margin-top: 0.5rem !important;
        }
        aside.bg-slate-900\/60 button {
          color: #475569 !important;
          border-left: 3px solid transparent !important;
          border-radius: 0.75rem !important;
          transition: all 0.2s ease-in-out !important;
        }
        aside.bg-slate-900\/60 button:hover {
          background-color: #f1f5f9 !important;
          color: #0f172a !important;
          border-left-color: #cbd5e1 !important;
        }
        aside.bg-slate-900\/60 button.bg-blue-600 {
          background-color: #0047b3 !important;
          color: #ffffff !important;
          border-left-color: #0047b3 !important;
          box-shadow: 0 4px 12px rgba(0, 71, 179, 0.1) !important;
        }

        /* Main Workspace & Card Overrides */
        main.flex-1 {
          background-color: #f8fafc !important;
        }
        .bg-slate-900\/40, .bg-slate-900 {
          background-color: #ffffff !important;
          border: 1px solid #f1f5f9 !important;
          border-radius: 1.5rem !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02), 0 8px 10px -6px rgba(0, 0, 0, 0.02) !important;
          padding: 2rem !important;
        }
        .border-slate-800, .border-slate-850 {
          border-color: #e2e8f0 !important;
        }
        .text-white {
          color: #0f172a !important;
        }
        .text-slate-100 {
          color: #1e293b !important;
        }
        .text-slate-350, .text-slate-300, .text-slate-400, .text-slate-450 {
          color: #475569 !important;
        }
        .bg-slate-950\/60 {
          background-color: #ffffff !important;
          border-color: #e2e8f0 !important;
        }

        /* Forms, inputs, and selections */
        input, select, textarea, .bg-slate-950, .bg-slate-950\/20 {
          background-color: #ffffff !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 0.75rem !important;
          color: #1e293b !important;
          padding: 0.75rem 1rem !important;
          font-size: 0.875rem !important;
          transition: all 0.2s ease-in-out !important;
        }
        input:focus, select:focus, textarea:focus {
          background-color: #ffffff !important;
          border-color: #0047b3 !important;
          box-shadow: 0 0 0 4px rgba(0, 71, 179, 0.08) !important;
          outline: none !important;
        }
        label.block {
          color: #475569 !important;
          font-weight: 700 !important;
          font-size: 0.75rem !important;
          letter-spacing: 0.05em !important;
          margin-bottom: 0.5rem !important;
        }
        .bg-blue-600, button.bg-blue-600 {
          background-color: #0047b3 !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          border-radius: 0.75rem !important;
          padding: 0.75rem 1.25rem !important;
          transition: all 0.2s ease-in-out !important;
          box-shadow: 0 4px 14px rgba(0, 71, 179, 0.15) !important;
          border: none !important;
        }
        .bg-blue-600:hover, button.bg-blue-600:hover {
          background-color: #003994 !important;
          transform: translateY(-1px) !important;
          box-shadow: 0 6px 20px rgba(0, 71, 179, 0.25) !important;
        }
        .bg-slate-800, button.bg-slate-800, label.bg-slate-800 {
          background-color: #f1f5f9 !important;
          color: #334155 !important;
          font-weight: 700 !important;
          border-radius: 0.75rem !important;
          padding: 0.75rem 1.25rem !important;
          border: 1px solid #cbd5e1 !important;
          transition: all 0.2s ease-in-out !important;
          box-shadow: none !important;
        }
        .bg-slate-800:hover, button.bg-slate-800:hover, label.bg-slate-800:hover {
          background-color: #e2e8f0 !important;
          color: #0f172a !important;
        }
        /* Replace/Upload label cursor buttons overrides */
        label.cursor-pointer.bg-slate-800, label.cursor-pointer.bg-slate-950 {
          background-color: #f1f5f9 !important;
          color: #334155 !important;
          border-color: #cbd5e1 !important;
        }
        label.cursor-pointer.bg-slate-800:hover, label.cursor-pointer.bg-slate-950:hover {
          background-color: #e2e8f0 !important;
        }

        /* Table overrides */
        table {
          width: 100% !important;
          border-collapse: separate !important;
          border-spacing: 0 !important;
          background-color: #ffffff !important;
        }
        thead tr {
          background-color: #f8fafc !important;
          border-color: #e2e8f0 !important;
        }
        thead th {
          font-weight: 700 !important;
          font-size: 0.75rem !important;
          text-transform: uppercase !important;
          letter-spacing: 0.05em !important;
          color: #475569 !important;
          background-color: #f8fafc !important;
          border-bottom: 2px solid #f1f5f9 !important;
          padding: 1rem 1.5rem !important;
        }
        tbody tr:hover {
          background-color: rgba(248, 250, 252, 0.5) !important;
        }
        tbody tr {
          border-color: #e2e8f0 !important;
          transition: background-color 0.2s ease !important;
        }
        tbody td {
          padding: 1.25rem 1.5rem !important;
          border-bottom: 1px solid #f1f5f9 !important;
          font-size: 0.875rem !important;
          color: #334155 !important;
        }

        /* Badges */
        .text-blue-400 {
          color: #0047b3 !important;
        }
        .bg-blue-950\/20, .bg-blue-950\/40 {
          background-color: #eff6ff !important;
          border-color: #bfdbfe !important;
          color: #0047b3 !important;
        }
        .text-emerald-400 {
          color: #059669 !important;
        }
        .bg-emerald-950\/20 {
          background-color: #ecfdf5 !important;
          border-color: #a7f3d0 !important;
          color: #059669 !important;
        }
        .text-orange-400 {
          color: #d97706 !important; /* orange-600 */
        }
        .bg-orange-950\/20 {
          background-color: #fffbeb !important;
          border-color: #fde68a !important;
          color: #d97706 !important;
        }
        
        /* Enquiries cards */
        .bg-slate-950 {
          background-color: #ffffff !important;
          border: 1px solid #f1f5f9 !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.02) !important;
          border-radius: 1.25rem !important;
        }
        .bg-slate-950 h3 {
          color: #0f172a !important;
        }
        .bg-slate-950 p.text-slate-450 {
          color: #64748b !important;
        }
        .bg-slate-950 p.text-slate-200 {
          color: #1e293b !important;
        }
      `}</style>


    </div>
  );
}
