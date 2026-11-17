"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { brandConfig } from "@/lib/brandConfig";
import {
  Compass,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Video,
  FileCheck,
  MapPin,
} from "lucide-react";

export function Hero() {
  const { language, t } = useLanguage();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-forest-950 text-white">
      {/* Cinematic Aerial Imagery Background */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center scale-105 transform motion-safe:transition-transform motion-safe:duration-1000"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2000&q=85')`,
        }}
      >
        {/* Multi-layered Forest Green & Charcoal Gradient for high contrast & luxury feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/80 to-forest-950/40" />
        <div className="absolute inset-0 bg-forest-950/40 backdrop-brightness-90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Curated Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/80 border border-gold-500/40 text-gold-300 text-xs sm:text-sm font-medium tracking-wide mb-6 backdrop-blur-md shadow-subtle">
          <ShieldCheck className="w-4 h-4 text-gold-400" />
          <span>{t.hero.badge}</span>
        </div>

        {/* Primary Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-ivory-50 max-w-4xl leading-[1.15] mb-6">
          <span className="block">{t.hero.titleLine1}</span>
          <span className="block text-gold-300/90 italic font-normal">
            {t.hero.titleLine2}
          </span>
        </h1>

        {/* Supporting Narrative */}
        <p className="text-base sm:text-lg md:text-xl text-ivory-200/90 max-w-2xl font-light leading-relaxed mb-10">
          {t.hero.subtitle}
        </p>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-16">
          <Link
            href="/properties"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-base shadow-elevated transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Compass className="w-5 h-5 text-forest-950" />
            <span>{t.hero.ctaExplore}</span>
          </Link>

          <a
            href={`tel:${brandConfig.phone}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-ivory-100 border border-white/20 font-medium text-base backdrop-blur-md transition-colors"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>{t.hero.ctaContact}</span>
          </a>
        </div>

        {/* Trust Badges Bar */}
        <div className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-forest-900/60 border border-forest-800/80 backdrop-blur-md text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800/90 flex items-center justify-center text-gold-400 shrink-0">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-ivory-50">1,400+</div>
              <div className="text-xs text-ivory-300/80">{t.hero.statLands}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800/90 flex items-center justify-center text-gold-400 shrink-0">
              <FileCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-ivory-50">100%</div>
              <div className="text-xs text-ivory-300/80">{t.hero.statVerified}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800/90 flex items-center justify-center text-gold-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-ivory-50">10+</div>
              <div className="text-xs text-ivory-300/80">{t.hero.statDistricts}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest-800/90 flex items-center justify-center text-gold-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-bold text-ivory-50">Direct</div>
              <div className="text-xs text-ivory-300/80">{t.hero.statCommission}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
