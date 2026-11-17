"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { brandConfig } from "@/lib/brandConfig";
import {
  Compass,
  ShieldCheck,
  CheckCircle2,
  Video,
  FileCheck,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function AboutPage() {
  const { language, t } = useLanguage();
  const brandName = language === "ta" ? brandConfig.nameTa : brandConfig.nameEn;

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Header Narrative */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 text-forest-900 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-forest-700" />
          <span>
            {language === "ta"
              ? "எங்கள் தனித்துவமான அணுகுமுறை"
              : "Personalized Land Brokerage"}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 tracking-tight">
          {language === "ta"
            ? "மண்ணின் மதிப்பறிந்து செயல்படும் தனித்துவ நிலத் தரகு"
            : "Honoring the Earth. Serving with Unflinching Transparency."}
        </h1>
        <p className="text-base sm:text-lg text-charcoal-600 leading-relaxed">
          {language === "ta"
            ? brandConfig.descriptionTa
            : brandConfig.descriptionEn}
        </p>
      </div>

      {/* The Story & Ground Approach */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card border border-ivory-200">
          <Image
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
            alt="Surveying Tamil Nadu Lands"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest-950/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white text-xs sm:text-sm">
            <span className="font-serif text-lg font-bold block mb-1">
              {brandConfig.brokerName}
            </span>
            <span className="text-ivory-200">
              {language === "ta"
                ? brandConfig.brokerRoleTa
                : brandConfig.brokerRoleEn}
            </span>
          </div>
        </div>

        <div className="space-y-6 text-charcoal-700 leading-relaxed text-sm sm:text-base">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            {language === "ta"
              ? "நாங்கள் பெருநிறுவனம் அல்ல; உங்கள் குடும்பத்தின் நில ஆலோசகர்"
              : "We Are Not a Faceless Portal. We Are Your Boots on the Ground."}
          </h2>

          <p>
            {language === "ta"
              ? "பொதுவான ரியல் எஸ்டேட் இணையதளங்களில் போலியான விலைகள், பினாமிகள் மற்றும் சட்டச் சிக்கல் கொண்ட நிலங்கள் நிரம்பி வழிகின்றன. நாங்கள் அந்த வழக்கமான மாதிரியிலிருந்து முற்றிலும் மாறுபட்டவர்கள்."
              : "Conventional real-estate portals are cluttered with unverified open listings, inflated commission middlemen, and ambiguous legal documentation. We built this platform on an entirely opposite philosophy."}
          </p>

          <p>
            {language === "ta"
              ? "நாங்கள் மட்டுமே தேர்ந்தெடுத்த நிலங்களை நேரில் சென்று ஆய்வு செய்து, உரிமையாளரின் அசல் பட்டா, சிட்டா, அடங்கல் மற்றும் வில்லங்கச் சான்றிதழ்களை வழக்கறிஞர் கொண்டு சரிபார்க்கிறோம். ட்ரோன் மூலம் எல்லைகளை முழுமையாகப் படம் பிடித்த பிறகே பதிவேற்றம் செய்கிறோம்."
              : "Every acre listed here is personally inspected by our two-member administrative team. We deploy our own 4K commercial drones to map boundaries, verify irrigation sources, inspect road frontage, and cross-reference Patta-Chitta revenue records before any property goes public."}
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-semibold text-forest-900">
            <div className="p-3.5 rounded-xl bg-ivory-100 border border-ivory-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0" />
              <span>
                {language === "ta" ? "நேரடி நில உரிமையாளர்கள்" : "Direct Landowners"}
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-ivory-100 border border-ivory-200 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-forest-700 shrink-0" />
              <span>
                {language === "ta" ? "முழு சட்ட சரிபார்ப்பு" : "Pre-Vetted Titles"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Service Coverage Corridors */}
      <div className="bg-forest-950 text-ivory-50 rounded-3xl p-8 sm:p-12 border border-forest-900 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-50">
            {language === "ta"
              ? "தமிழ்நாடு சேவை மாவட்டங்கள்"
              : "Our Focus Corridors Across Tamil Nadu"}
          </h3>
          <p className="text-xs sm:text-sm text-ivory-200/80">
            {language === "ta"
              ? "நாங்கள் முதன்மையாகச் செயல்படும் விவசாய மற்றும் தொழில் வளர்ச்சி மண்டலங்கள்."
              : "Active presence and deep localized revenue knowledge in premier land regions."}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
          {brandConfig.serviceDistricts.map((district) => (
            <div
              key={district}
              className="p-3 rounded-xl bg-forest-900/60 border border-forest-800 text-xs font-medium text-gold-300"
            >
              {district}
            </div>
          ))}
        </div>
      </div>

      {/* Contact Broker Callout */}
      <div className="text-center space-y-6 pt-4">
        <h3 className="font-serif text-2xl font-bold text-forest-950">
          {language === "ta"
            ? "நிலத் தேவைகளுக்கு எங்களை நேரடியாகத் தொடர்பு கொள்ளுங்கள்"
            : "Have a Specific Acreage or Location Requirement?"}
        </h3>
        <p className="text-sm text-charcoal-600 max-w-lg mx-auto">
          {language === "ta"
            ? "விவசாய நிலம், தோட்டம் அல்லது முதலீட்டு நிலங்களை வாங்க அல்லது விற்க எங்களை அழைக்கவும்."
            : "Whether looking to invest in a coconut grove, build a hill retreat, or acquire plotted growth parcels, we are happy to assist."}
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-sm font-semibold transition-colors shadow-subtle"
          >
            <span>{t.nav.contact}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
