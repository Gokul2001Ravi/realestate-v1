"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { brandConfig } from "@/lib/brandConfig";
import { EnquiryForm } from "@/components/EnquiryForm";
import { generateWhatsAppLink } from "@/lib/utils";
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Compass,
} from "lucide-react";

export default function ContactPage() {
  const { language, t } = useLanguage();
  const brandName = language === "ta" ? brandConfig.nameTa : brandConfig.nameEn;

  const whatsappUrl = generateWhatsAppLink(
    brandConfig.whatsappNumber,
    undefined,
    undefined,
    undefined,
    language
  );

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Page Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-600">
          <Phone className="w-4 h-4 text-gold-500" />
          <span>{language === "ta" ? "நேரடித் தொடர்பு" : "Direct Consultation"}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 tracking-tight">
          {language === "ta" ? "நிலத் தரகரைத் தொடர்பு கொள்ள" : "Connect with the Broker"}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600">
          {language === "ta"
            ? "நில ஆய்வுகள், ஆவண சரிபார்ப்பு மற்றும் தளப் பார்வைகளுக்கு எங்களை நேரடியாகத் தொடர்பு கொள்ளவும்."
            : "Direct access to our principal broker for site visit appointments, parent-deed inspection, and title verification."}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Contact Info & Office Card */}
        <div className="space-y-6">
          <div className="bg-forest-950 text-ivory-50 rounded-3xl p-8 border border-forest-900 shadow-card space-y-6">
            <h2 className="font-serif text-2xl font-bold text-white">
              {brandName} — {language === "ta" ? "அலுவலகம்" : "Broker Office"}
            </h2>

            <div className="space-y-4 text-sm text-ivory-200">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">
                    {brandConfig.brokerName}
                  </div>
                  <div>{brandConfig.address.line1}</div>
                  <div>
                    {brandConfig.address.city}, {brandConfig.address.state} - {brandConfig.address.pincode}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gold-400 shrink-0" />
                <a
                  href={`tel:${brandConfig.phone}`}
                  className="hover:text-gold-300 transition-colors font-medium text-white"
                >
                  {brandConfig.displayPhone}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gold-400 shrink-0" />
                <a
                  href={`mailto:${brandConfig.email}`}
                  className="hover:text-gold-300 transition-colors"
                >
                  {brandConfig.email}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gold-400 shrink-0" />
                <span>Monday – Saturday: 9:00 AM – 7:00 PM IST</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{language === "ta" ? "வாட்ஸ்அப்" : "WhatsApp"}</span>
              </a>

              <a
                href={`tel:${brandConfig.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-forest-800 hover:bg-forest-700 text-ivory-50 text-xs font-semibold shadow-xs transition-colors"
              >
                <Phone className="w-4 h-4 text-gold-400" />
                <span>{language === "ta" ? "அழைக்க" : "Call Now"}</span>
              </a>
            </div>
          </div>

          {/* Service Districts Tag Cloud */}
          <div className="bg-white rounded-2xl p-6 border border-ivory-200/90 shadow-subtle space-y-3">
            <h3 className="font-serif text-base font-bold text-forest-950 flex items-center gap-2">
              <Compass className="w-4 h-4 text-forest-700" />
              <span>
                {language === "ta"
                  ? "கள ஆய்வு செய்யப்படும் மாவட்டங்கள்"
                  : "On-Ground Coverage Districts"}
              </span>
            </h3>
            <div className="flex flex-wrap gap-2 text-xs">
              {brandConfig.serviceDistricts.map((d) => (
                <span
                  key={d}
                  className="px-3 py-1 rounded-lg bg-ivory-100 text-forest-950 border border-ivory-300 font-medium"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form Container */}
        <div>
          <EnquiryForm />
        </div>
      </div>
    </div>
  );
}
