"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Footprints,
  FileCheck2,
  Handshake,
  Video,
  ShieldAlert,
} from "lucide-react";

export function WhyUs() {
  const { t } = useLanguage();

  const points = [
    {
      icon: <Footprints className="w-6 h-6 text-forest-800" />,
      title: t.whyUs.point1Title,
      desc: t.whyUs.point1Desc,
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-forest-800" />,
      title: t.whyUs.point2Title,
      desc: t.whyUs.point2Desc,
    },
    {
      icon: <Handshake className="w-6 h-6 text-forest-800" />,
      title: t.whyUs.point3Title,
      desc: t.whyUs.point3Desc,
    },
    {
      icon: <Video className="w-6 h-6 text-forest-800" />,
      title: t.whyUs.point4Title,
      desc: t.whyUs.point4Desc,
    },
  ];

  return (
    <section className="py-20 bg-ivory-100/60 border-y border-ivory-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950 tracking-tight mb-3">
            {t.whyUs.title}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            {t.whyUs.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((pt, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 border border-ivory-200 shadow-subtle hover:shadow-card transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center mb-5">
                  {pt.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-forest-950 mb-2">
                  {pt.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
