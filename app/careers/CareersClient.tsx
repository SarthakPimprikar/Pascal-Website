"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Briefcase, FileCheck, CheckCircle, X, Upload, Loader2, AlertCircle, FileText } from "lucide-react";

interface CareersClientProps {
  siteConfigObj?: any;
  productsList?: any[];
  careersList: any[];
}

export default function CareersClient({ siteConfigObj, productsList, careersList }: CareersClientProps) {
  const email = siteConfigObj?.email || "pascalpune@gmail.com";

  // Application Modal state
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  
  // Form input states
  const [name, setName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleApplyClick = (job: any) => {
    setSelectedJob(job);
    setSubmitSuccess(false);
    setSubmitError("");
    setName("");
    setCandidateEmail("");
    setPhone("");
    setMessage("");
    setResume(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setSubmitError("Please upload your CV/Resume file.");
      return;
    }

    setSubmitting(true);
    setSubmitError("");

    const formData = new FormData();
    formData.append("candidateName", name);
    formData.append("candidateEmail", candidateEmail);
    formData.append("candidatePhone", phone);
    formData.append("message", message);
    formData.append("jobId", selectedJob._id || "");
    formData.append("jobTitle", selectedJob.title);
    formData.append("resume", resume);

    try {
      const res = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit your application");

      setSubmitSuccess(true);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to send application. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <div>
        <Navbar config={siteConfigObj} products={productsList} />

        {/* Hero Section */}
        <section className="bg-slate-900 py-16 md:py-24 relative overflow-hidden border-b-4 border-[#0047b3]">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(#ffffff33_1px,transparent_1px),linear-gradient(90deg,#ffffff33_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4" style={{ fontFamily: 'Gotham, sans-serif' }}>
              CAREERS AT PASCAL
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Join a team of experienced industrial engineers developing state-of-the-art automation and workholding solutions since 1994.
            </p>
          </div>
        </section>

        {/* Introduction / Culture Section */}
        <section className="py-20 bg-white border-b border-slate-100">
          <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
              <h2 className="text-3xl font-black text-slate-950">Why Join Us?</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                At Pascal Auto Solutions, we believe in hands-on engineering, mentorship, and building products that solve real-world assembly challenges. With decades of automotive experience, our shop floor is an excellent environment to master hydraulic, pneumatic, and SPM designing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 text-[#0047b3] rounded-xl flex items-center justify-center mb-6">
                  <Briefcase size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-950 mb-2">Practical Exposure</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Work directly on the fabrication, wiring, programming, and testing of complex high-tonnage pressing rigs and custom automation.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 text-[#0047b3] rounded-xl flex items-center justify-center mb-6">
                  <FileCheck size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-950 mb-2">Mentorship</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Learn from senior partners who have over 30 years of design engineering experience at industry giants like Bajaj Auto and Mahindra.
                </p>
              </div>

              <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-blue-100 text-[#0047b3] rounded-xl flex items-center justify-center mb-6">
                  <CheckCircle size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-950 mb-2">Quality Centric</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Contribute to a system built on precision, rigorous safety verification, and a strong policy of zero-leak hydraulics.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Open Job Positions */}
        <section className="py-20 max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24">
          <h2 className="text-3xl font-black text-slate-950 mb-12 text-center">Current Openings</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {careersList.map((pos: any, idx: number) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-bold text-slate-900">{pos.title}</h3>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      {pos.type}
                    </span>
                  </div>
                  <p className="text-sm text-slate-500 font-bold">Experience: {pos.experience}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{pos.description}</p>
                  <p className="text-slate-700 text-xs font-semibold bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <span className="font-bold text-slate-500">Key Skills:</span> {pos.skills}
                  </p>
                </div>
                <button 
                  onClick={() => handleApplyClick(pos)}
                  className="shrink-0 bg-[#0047b3] hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded shadow-md transition-colors flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center"
                >
                  <Mail size={16} />
                  APPLY NOW
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Modal Popup Application Form */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden border border-slate-200 shadow-2xl relative animate-slide-up flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-xs text-blue-400 font-bold tracking-widest uppercase">Apply For Position</span>
                <h3 className="text-xl font-black truncate">{selectedJob.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedJob(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              {submitSuccess ? (
                <div className="text-center py-8 flex flex-col items-center justify-center space-y-4">
                  <CheckCircle size={64} className="text-emerald-500" />
                  <h4 className="text-xl font-bold text-slate-900">Application Submitted!</h4>
                  <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
                    Thank you, {name}. Your application and CV have been saved successfully. Our HR team will contact you soon.
                  </p>
                  <button 
                    onClick={() => setSelectedJob(null)}
                    className="mt-6 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-start gap-2.5">
                      <AlertCircle size={18} className="shrink-0 mt-0.5" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="email@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Contact Number</label>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+91 xxxxx xxxxx"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Brief Cover Note (Optional)</label>
                    <textarea 
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Why do you want to join Pascal?"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Upload CV / Resume (PDF, DOCX)</label>
                    <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors relative group">
                      <input 
                        type="file" 
                        required
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      {resume ? (
                        <div className="flex flex-col items-center space-y-2">
                          <FileText className="text-blue-500" size={36} />
                          <span className="text-sm font-bold text-slate-800 truncate max-w-[200px]">{resume.name}</span>
                          <span className="text-xs text-slate-400">{(resume.size / 1024 / 1024).toFixed(2)} MB | Click to replace</span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-2">
                          <Upload className="text-slate-400 group-hover:text-blue-500 transition-colors" size={32} />
                          <span className="text-sm font-bold text-slate-600">Select PDF or Word File</span>
                          <span className="text-xs text-slate-400">Max size limit 5MB</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                    <button 
                      type="button" 
                      onClick={() => setSelectedJob(null)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-5 py-3 rounded-xl transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      disabled={submitting}
                      className="bg-[#0047b3] hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/10 flex items-center gap-2 cursor-pointer transition-colors disabled:opacity-50"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Submitting CV...
                        </>
                      ) : (
                        "Submit Application"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      <Footer config={siteConfigObj} products={productsList} />
    </main>
  );
}
