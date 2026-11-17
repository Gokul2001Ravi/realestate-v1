"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Search, MessagesSquare, Footprints, FileCheck } from "lucide-react";

export function ProcessSection() {
  const { t } = useLanguage();

  const steps = [
    {
      num: "01",
      icon: <Search className="w-5 h-5 text-forest-800" />,
      title: t.processSection.step1Title,
      desc: t.processSection.step1Desc,
    },
    {
      num: "02",
      icon: <MessagesSquare className="w-5 h-5 text-forest-800" />,
      title: t.processSection.step2Title,
      desc: t.processSection.step2Desc,
    },
    {
      num: "03",
      icon: <Footprints className="w-5 h-5 text-forest-800" />,
      title: t.processSection.step3Title,
      desc: t.processSection.step3Desc,
    },
    {
      num: "04",
      icon: <FileCheck className="w-5 h-5 text-forest-800" />,
      title: t.processSection.step4Title,
      desc: t.processSection.step4Desc,
    },
  ];

  return (
    <section className="py-20 bg-ivory-50 border-t border-ivory-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950 tracking-tight mb-3">
            {t.processSection.title}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed">
            {t.processSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-ivory-200 shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-forest-50 border border-forest-100 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="font-serif text-2xl font-bold text-gold-500/70">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-forest-950 mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
