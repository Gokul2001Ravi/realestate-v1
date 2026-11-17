"use client";

import React from "react";
import { Property } from "@/types/property";
import { useLanguage } from "@/context/LanguageContext";
import { brandConfig } from "@/lib/brandConfig";
import { generateWhatsAppLink, formatPrice } from "@/lib/utils";
import { Phone, MessageSquare } from "lucide-react";

interface MobileContactBarProps {
  property: Property;
}

export function MobileContactBar({ property }: MobileContactBarProps) {
  const { language, t } = useLanguage();

  const title =
    language === "ta" && property.title_ta
      ? property.title_ta
      : property.title;

  const whatsappUrl = generateWhatsAppLink(
    brandConfig.whatsappNumber,
    title,
    property.district,
    typeof window !== "undefined" ? window.location.href : undefined,
    language
  );

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-ivory-300 p-3 px-4 shadow-elevated">
      <div className="flex items-center justify-between gap-3">
        {/* Price Summary */}
        <div className="min-w-0">
          <div className="text-xs text-charcoal-500 font-medium">
            {t.propertyDetails.labels.askingPrice}
          </div>
          <div className="text-base font-bold text-forest-950 truncate">
            {formatPrice(property.total_price, language)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white text-xs font-semibold shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>WhatsApp</span>
          </a>

          <a
            href={`tel:${brandConfig.phone}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-forest-900 active:bg-forest-800 text-ivory-50 text-xs font-semibold shadow-xs"
          >
            <Phone className="w-4 h-4 text-gold-400" />
            <span>{language === "ta" ? "அழைக்க" : "Call"}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
