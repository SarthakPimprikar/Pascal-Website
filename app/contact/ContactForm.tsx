"use client";

import { useState } from "react";
import { Send, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import GradientMapPin from "@/components/GradientMapPin";
import GradientPhone from "@/components/GradientPhone";
import GradientMail from "@/components/GradientMail";

interface ContactFormProps {
  config?: {
    address?: string;
    phone?: string;
    email?: string;
  };
}

export default function ContactForm({ config }: ContactFormProps) {
  const address = config?.address || "Pascal Auto Solutions (Formerly Pascal Auto Systems), Sr. No. 25/2A/2, Nanded, Opp. Savli Dhaba, Sinhagad Road, Pune - 411 041.";
  const phone = config?.phone || "+918262013425";
  const email = config?.email || "pascalpune@gmail.com";

  // Form states
  const [name, setName] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: emailInput,
          phone: phoneInput,
          subject: subject || "General Inquiry",
          message
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

      setSuccess(true);
      setName("");
      setEmailInput("");
      setPhoneInput("");
      setSubject("");
      setMessage("");
    } catch (err: any) {
      setError(err.message || "Failed to submit enquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
      
      {/* Contact Details Card */}
      <div className="lg:col-span-5 bg-gradient-to-br from-[#003994] to-[#001f5c] text-white p-8 md:p-10 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
        {/* Background glow overlay */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="space-y-8 relative z-10">
          <div>
            <h2 className="text-3xl font-black mb-2 tracking-tight">Contact Information</h2>
            <p className="text-blue-100/70 text-sm leading-relaxed">Reach out to us directly or fill out the enquiry form. Our engineering team will respond within 24 hours.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <GradientMapPin size={28} />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block mb-1">Our Location</span>
                <p className="text-sm leading-relaxed">{address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <GradientPhone size={28} />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block mb-1">Call Us</span>
                <a href={`tel:${phone}`} className="text-sm hover:underline font-bold">{phone}</a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                <GradientMail size={26} />
              </div>
              <div>
                <span className="text-xs font-bold text-blue-300 uppercase tracking-wider block mb-1">Email Us</span>
                <a href={`mailto:${email}`} className="text-sm hover:underline font-medium">{email}</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-blue-200/50 relative z-10">
          Pascal Auto Solutions — Pune, Maharashtra.
        </div>
      </div>

      {/* Contact Form Panel */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm relative">
        {success && (
          <div className="absolute inset-0 bg-white rounded-3xl z-20 flex flex-col items-center justify-center text-center p-8 animate-fade-in">
            <CheckCircle2 size={64} className="text-emerald-500 mb-4" />
            <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent Successfully!</h3>
            <p className="text-slate-500 text-sm max-w-sm leading-relaxed mb-6">
              Thank you for getting in touch. We have logged your enquiry, and our design team will contact you shortly.
            </p>
            <button 
              onClick={() => setSuccess(false)}
              className="bg-[#0047b3] hover:bg-blue-800 text-white font-bold text-sm px-6 py-3 rounded-lg shadow transition-colors cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl flex items-start gap-3">
            <AlertCircle size={20} className="shrink-0 mt-0.5 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Phone Number</label>
              <input
                type="tel"
                required
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Email Address</label>
            <input
              type="email"
              required
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Subject / Machine Interest</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g. Hydraulic C-frame press quote"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">Detailed Specifications / Message</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Write specifications, required tonnage, components, etc..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-[#0047b3] hover:from-blue-400 hover:to-blue-800 text-white font-bold text-sm px-6.5 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/10 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={16} />
                  SUBMIT ENQUIRY
                </>
              )}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}
