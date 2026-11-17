"use client";

import React from "react";
import { Property } from "@/types/property";
import { useLanguage } from "@/context/LanguageContext";
import { formatArea, formatPrice } from "@/lib/utils";
import {
  FileCheck,
  ShieldCheck,
  Droplets,
  Zap,
  Route,
  Layers,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Lock,
} from "lucide-react";

interface PropertySpecsProps {
  property: Property;
}

export function PropertySpecs({ property }: PropertySpecsProps) {
  const { language, t } = useLanguage();

  const labels = t.propertyDetails.labels;

  const specItems = [
    {
      icon: <Layers className="w-4 h-4 text-forest-700" />,
      label: labels.totalArea,
      value: formatArea(property.land_area, property.land_area_unit, language),
      highlight: true,
    },
    {
      icon: <Layers className="w-4 h-4 text-forest-700" />,
      label: labels.landClassification,
      value:
        language === "ta" && property.land_classification_ta
          ? property.land_classification_ta
          : property.land_classification,
    },
    {
      icon: <Route className="w-4 h-4 text-forest-700" />,
      label: labels.roadAccess,
      value:
        language === "ta" && property.road_access_ta
          ? property.road_access_ta
          : property.road_access,
      subValue: property.road_width_ft
        ? `${property.road_width_ft} ${language === "ta" ? "அடி அகலம்" : "ft wide"}`
        : undefined,
    },
    {
      icon: <Droplets className="w-4 h-4 text-blue-600" />,
      label: labels.waterAvailability,
      value:
        language === "ta" && property.water_availability_ta
          ? property.water_availability_ta
          : property.water_availability,
    },
    {
      icon: <Zap className="w-4 h-4 text-amber-600" />,
      label: labels.electricity,
      value:
        language === "ta" && property.electricity_availability_ta
          ? property.electricity_availability_ta
          : property.electricity_availability,
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      label: labels.pattaStatus,
      value: property.patta_available
        ? language === "ta"
          ? "தனி நபர் கணினி பட்டா தயார்"
          : "Clean Single Computerized Patta"
        : language === "ta"
        ? "சரிபார்க்கப்படுகிறது"
        : "Under Verification",
      badge: property.patta_available ? "verified" : "pending",
    },
    {
      icon: <FileCheck className="w-4 h-4 text-emerald-600" />,
      label: labels.chittaAdangal,
      value: property.chitta_adangal_available
        ? language === "ta"
          ? "சிட்டா / அடங்கல் சரிபார்க்கப்பட்டது"
          : "Updated Chitta & Adangal Verified"
        : language === "ta"
        ? "சரிபார்க்கப்படுகிறது"
        : "Pending",
    },
    {
      icon: <CheckCircle2 className="w-4 h-4 text-gold-600" />,
      label: labels.approvalDetails,
      value:
        (language === "ta" && property.approval_details_ta
          ? property.approval_details_ta
          : property.approval_details) ||
        (language === "ta"
          ? "நேரடி உரிமை ஆவண சரிபார்ப்பு"
          : "Direct Ancestral Title Deed"),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Specifications Grid */}
      <div className="bg-white rounded-2xl p-6 border border-ivory-200/90 shadow-subtle">
        <h3 className="font-serif text-lg font-bold text-forest-950 mb-5 pb-3 border-b border-ivory-200/80">
          {t.propertyDetails.specifications}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specItems.map((spec, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl bg-ivory-50/70 border border-ivory-200/60 flex items-start gap-3"
            >
              <div className="p-2 rounded-lg bg-white border border-ivory-300 shadow-xs shrink-0 mt-0.5">
                {spec.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500">
                  {spec.label}
                </div>
                <div className="text-sm font-semibold text-forest-950 mt-0.5 break-words">
                  {spec.value}
                </div>
                {spec.subValue && (
                  <div className="text-xs text-charcoal-500 mt-0.5">
                    {spec.subValue}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Confidentiality & Legal Transparency Notice */}
      <div className="rounded-2xl p-4 sm:p-5 bg-forest-50/80 border border-forest-200/80 flex items-start gap-3.5 text-xs text-forest-950 leading-relaxed">
        <Lock className="w-5 h-5 text-forest-800 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block mb-1">
            {language === "ta"
              ? "தனியுரிமை & ஆவணப் பாதுகாப்பு நெறிமுறை"
              : "Confidentiality & Title Verification Protocol"}
          </span>
          <p className="text-forest-900/80">{t.propertyDetails.legalNotice}</p>
        </div>
      </div>
    </div>
  );
}
