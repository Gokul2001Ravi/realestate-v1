"use client";

import React from "react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SearchFilterBar } from "@/components/SearchFilterBar";
import { PropertyCard } from "@/components/PropertyCard";
import { WhyUs } from "@/components/WhyUs";
import { LocationsSection } from "@/components/LocationsSection";
import { ProcessSection } from "@/components/ProcessSection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { sampleProperties } from "@/lib/sampleData";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Sparkles, Compass } from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();

  const featuredProperties = sampleProperties.filter((p) => p.is_featured);
  const latestProperties = sampleProperties.slice(0, 4);

  return (
    <div className="space-y-0">
      {/* Cinematic Hero */}
      <Hero />

      {/* Quick Search & Filter Bar (Overlapping Hero) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SearchFilterBar />
      </div>

      {/* Featured Curated Properties Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gold-600 mb-2">
              <Sparkles className="w-4 h-4 text-gold-500" />
              <span>
                {language === "ta" ? "நேரடி கள ஆய்வு" : "Personally Inspected"}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950 tracking-tight">
              {language === "ta"
                ? "சிறப்பு நிலப் பார்வைகள்"
                : "Featured Land Discoveries"}
            </h2>
            <p className="text-sm text-charcoal-600 mt-1 max-w-xl">
              {language === "ta"
                ? "தெளிவான ஆவணங்கள் மற்றும் இயற்கை வளம் கொண்ட தேர்ந்தெடுக்கப்பட்ட பிரதான நிலங்கள்."
                : "Hand-picked agricultural parcels, farm retreats, and plotted growth corridors across Tamil Nadu."}
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-subtle"
          >
            <Compass className="w-4 h-4 text-gold-400" />
            <span>{t.hero.ctaExplore}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProperties.map((property, idx) => (
            <PropertyCard
              key={property.id}
              property={property}
              priorityImage={idx === 0}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyUs />

      {/* Featured Locations Across Tamil Nadu */}
      <LocationsSection />

      {/* How We Help You Find Land */}
      <ProcessSection />

      {/* Latest Listings Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950 tracking-tight">
              {language === "ta"
                ? "சமீபத்திய நிலப் பதிவுகள்"
                : "Latest Property Listings"}
            </h2>
            <p className="text-sm text-charcoal-600 mt-1">
              {language === "ta"
                ? "நேற்று வரை கள ஆய்வு செய்து சரிபார்க்கப்பட்ட நிலங்கள்."
                : "Freshly surveyed lands ready for immediate boundary visit and title check."}
            </p>
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-800 hover:text-forest-600 transition-colors"
          >
            <span>
              {language === "ta"
                ? "அனைத்து நிலங்களையும் பார்க்க"
                : "View All Properties"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {latestProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* Contact and WhatsApp CTA Banner */}
      <WhatsAppCTA />
    </div>
  );
}
