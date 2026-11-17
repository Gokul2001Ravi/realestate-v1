"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, ArrowRight } from "lucide-react";

export function LocationsSection() {
  const { language, t } = useLanguage();

  const locations = [
    {
      name: "Coimbatore & Pollachi",
      nameTa: "கோயம்புத்தூர் & பொள்ளாச்சி",
      highlight: "Coconut groves, canal belts, industrial highway corridors",
      highlightTa: "செழிப்பான தென்னந்தோப்புகள், கால்வாய் பாசனம், நெடுஞ்சாலை வணிக நிலங்கள்",
      count: "12+ Lands",
      countTa: "12+ நிலங்கள்",
      district: "Coimbatore",
      bgImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Dindigul & Kodaikanal Foothills",
      nameTa: "திண்டுக்கல் & கொடைக்கானல் அடிவாரம்",
      highlight: "Scenic agro retreats, perennial streams, organic farming",
      highlightTa: "இயற்கை ஓடைகள், மலை அடிவாரப் பண்ணை வீடுகள், ஆர்கானிக் விவசாயம்",
      count: "8+ Lands",
      countTa: "8+ நிலங்கள்",
      district: "Dindigul",
      bgImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Thanjavur & Delta Corridor",
      nameTa: "தஞ்சாவூர் & டெல்டா மண்டலம்",
      highlight: "Fertile Cauvery delta alluvial paddy lands with double crop yield",
      highlightTa: "காவிரி வண்டல் மண், இருபோக நெல் விளையும் நன்செய் நிலங்கள்",
      count: "6+ Lands",
      countTa: "6+ நிலங்கள்",
      district: "Thanjavur",
      bgImage: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=800&q=80",
    },
    {
      name: "Madurai & Southern Hubs",
      nameTa: "மதுரை & தென் மாவட்டங்கள்",
      highlight: "Residential DTCP plots, commercial ring road zones, wind corridors",
      highlightTa: "DTCP குடியிருப்பு மனைகள், பைபாஸ் சாலை வணிக நிலங்கள், காற்றாலை நிலங்கள்",
      count: "10+ Lands",
      countTa: "10+ நிலங்கள்",
      district: "Madurai",
      bgImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950 tracking-tight mb-2">
              {t.locationsSection.title}
            </h2>
            <p className="text-sm sm:text-base text-charcoal-600">
              {t.locationsSection.subtitle}
            </p>
          </div>
          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-forest-800 hover:text-forest-600 transition-colors shrink-0"
          >
            <span>{t.propertyCard.viewDetails}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((loc, i) => (
            <Link
              key={i}
              href={`/properties?district=${encodeURIComponent(loc.district)}`}
              className="group relative h-80 rounded-2xl overflow-hidden shadow-subtle hover:shadow-card transition-all flex flex-col justify-end p-6 border border-ivory-200"
            >
              {/* Background with Dark Gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('${loc.bgImage}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />

              <div className="relative z-10 text-white space-y-2">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-forest-900/80 text-gold-300 border border-gold-400/20 backdrop-blur-md">
                  {language === "ta" ? loc.countTa : loc.count}
                </span>

                <h3 className="font-serif text-lg font-bold group-hover:text-gold-200 transition-colors">
                  {language === "ta" ? loc.nameTa : loc.name}
                </h3>

                <p className="text-xs text-ivory-200/80 line-clamp-2 leading-relaxed">
                  {language === "ta" ? loc.highlightTa : loc.highlight}
                </p>

                <div className="pt-2 flex items-center gap-1 text-xs font-semibold text-gold-300 group-hover:translate-x-1 transition-transform">
                  <span>{language === "ta" ? "நிலங்களைப் பார்க்க" : "View Lands"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
