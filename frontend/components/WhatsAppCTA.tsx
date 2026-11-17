"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { brandConfig } from "@/lib/brandConfig";
import { generateWhatsAppLink } from "@/lib/utils";
import { MessageSquare, Phone, ShieldCheck, ArrowRight } from "lucide-react";

export function WhatsAppCTA() {
  const { language } = useLanguage();

  const whatsappUrl = generateWhatsAppLink(
    brandConfig.whatsappNumber,
    undefined,
    undefined,
    undefined,
    language
  );

  return (
    <section className="py-16 bg-forest-900 text-ivory-50 relative overflow-hidden">
      {/* Decorative subtle pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4be98_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-950/70 text-gold-300 text-xs font-medium mb-5 border border-forest-800">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>
            {language === "ta"
              ? "நேரடி ஆலோசனை & ஆவண வழிகாட்டல்"
              : "Direct Consultation & Title Guidance"}
          </span>
        </div>

        <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-ivory-50 max-w-2xl mb-4">
          {language === "ta"
            ? "நிலம் வாங்கும் முடிவில் இருக்கிறீர்களா? எங்களோடு நேரடியாகப் பேசுங்கள்."
            : "Planning to Acquire Land in Tamil Nadu? Speak Directly with the Broker."}
        </h2>

        <p className="text-sm sm:text-base text-ivory-200/90 max-w-xl mb-8 leading-relaxed">
          {language === "ta"
            ? "எந்தவொரு நிலத்தைப் பற்றிய சந்தேகம், பட்டா ஆவண சரிபார்ப்பு அல்லது தளப் பார்வைக்கு வாட்ஸ்அப் அல்லது அலைபேசியில் உடனடியாகத் தொடர்பு கொள்ளலாம்."
            : "Get realistic ground insights, water history, and parent-document checks directly from an experienced land surveyor and broker."}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-card transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>
              {language === "ta" ? "வாட்ஸ்அப்பில் உரையாட" : "Chat on WhatsApp"}
            </span>
          </a>

          <a
            href={`tel:${brandConfig.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-ivory-100 border border-white/20 font-semibold text-sm backdrop-blur-md transition-colors"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>{brandConfig.displayPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
