"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Mail, MessageSquare, AlertTriangle, PhoneCall, CheckCircle2 } from "lucide-react";

type SupportTab = "email" | "feedback" | "report" | "contact";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<SupportTab>("email");
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    type: "general",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Your submission logic would go here
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "", type: "general" });
    }, 3000);
  };

  const tabs = [
    { id: "email" as SupportTab, label: "Email Support", icon: Mail, desc: "Get direct support from our team via email response." },
    { id: "feedback" as SupportTab, label: "Feedback", icon: MessageSquare, desc: "Share your thoughts on how we can improve your experience." },
    { id: "report" as SupportTab, label: "Report Issue", icon: AlertTriangle, desc: "Let us know if something isn't working correctly." },
    { id: "contact" as SupportTab, label: "Contact Us", icon: PhoneCall, desc: "Find general institutional contact channels." },
  ];

  return (
    <div className="min-h-screen bg-[#FBF9F6] flex flex-col">
      <Navbar showBackButton={true} />

      <main className="flex-1 flex flex-col items-center px-4 py-10 md:py-16 max-w-4xl w-full mx-auto">
        {/* Header Text */}
        <div className="text-center mb-10 w-full max-w-xl">
          <h1 className="text-3xl md:text-4xl font-serif text-[#333333] mb-3">
            Support Center
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            We are here to assist you. Choose a channel below to send your query or share reflections.
          </p>
        </div>

        {/* Tab Selection Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setFormData((prev) => ({ ...prev, type: tab.id }));
                }}
                className="flex flex-col items-center justify-center p-4 rounded-2xl border transition-all cursor-pointer text-center group"
                style={{
                  background: isSelected ? "#FFF7ED" : "#fff",
                  borderColor: isSelected ? "#EDC791" : "#E5E7EB",
                  borderWidth: isSelected ? "2px" : "1px",
                }}
              >
                <Icon 
                  className={`w-5 h-5 mb-2 transition-transform group-hover:scale-110`} 
                  style={{ color: isSelected ? "#C58A2E" : "#6B7280" }}
                />
                <span 
                  className="text-xs md:text-sm font-semibold tracking-wide"
                  style={{ color: isSelected ? "#C58A2E" : "#4A4A4A" }}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Form Container */}
        <div className="w-full max-w-xl bg-white rounded-[30px] p-6 md:p-8 shadow-sm border border-gray-100 relative overflow-hidden">
          {submitted ? (
            <div className="py-12 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in-95 duration-300">
              <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Thank you!</h3>
              <p className="text-sm text-gray-500">Your message has been received. Our team will look into it shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-2">
                  {tabs.find(t => t.id === activeTab)?.label}
                </p>
                <p className="text-xs text-gray-500 italic mb-4">
                  {tabs.find(t => t.id === activeTab)?.desc}
                </p>
                <hr className="border-gray-100" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#EDC791] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="johndoe@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#EDC791] transition-colors"
                  />
                </div>
              </div>

              {activeTab === "report" && (
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Issue Category</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#EDC791] bg-white transition-colors"
                  >
                    <option value="ui">Interface Bug / Layout issue</option>
                    <option value="chat">AI Chat behavior</option>
                    <option value="account">Account / Login problem</option>
                    <option value="other">Other functional issue</option>
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Summarize your request..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#EDC791] transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Provide details about your query..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#EDC791] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#4A4A4A] text-white py-3.5 rounded-2xl font-semibold text-sm hover:bg-black transition-all shadow-md active:scale-[0.98] cursor-pointer"
                >
                  Submit Form
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}