"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Property } from "@/types/property";
import { useLanguage } from "@/context/LanguageContext";
import { formatPrice, formatArea } from "@/lib/utils";
import {
  MapPin,
  Maximize2,
  Droplets,
  Route,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface PropertyCardProps {
  property: Property;
  priorityImage?: boolean;
}

export function PropertyCard({ property, priorityImage = false }: PropertyCardProps) {
  const { language, t } = useLanguage();

  const title =
    language === "ta" && property.title_ta
      ? property.title_ta
      : property.title;

  const coverImage =
    property.media.find((m) => m.is_cover)?.media_url ||
    property.media[0]?.media_url ||
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";

  const categoryLabel =
    t.categories[property.property_type] || property.property_type;

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-ivory-200/90 hover:border-forest-700/30 shadow-subtle hover:shadow-card transition-all duration-300 flex flex-col h-full">
      {/* Property Imagery with Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ivory-100">
        <Image
          src={coverImage}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={priorityImage}
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Gradient Shadow for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-forest-950/80 text-gold-300 backdrop-blur-md border border-gold-500/30">
            {categoryLabel}
          </span>

          <div className="flex items-center gap-1.5">
            {property.is_featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gold-500 text-forest-950 shadow-xs">
                <Sparkles className="w-3 h-3" />
                <span>{t.propertyCard.featured}</span>
              </span>
            )}
          </div>
        </div>

        {/* Bottom Image Overlay: Area & Patta Status */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs z-10">
          <span className="font-semibold px-2.5 py-1 rounded-md bg-forest-950/70 backdrop-blur-md">
            {formatArea(property.land_area, property.land_area_unit, language)}
          </span>

          {property.patta_available && (
            <span className="inline-flex items-center gap-1 text-[11px] text-ivory-100 bg-forest-900/80 px-2 py-0.5 rounded backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>{t.propertyCard.pattaClear}</span>
            </span>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-3">
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-charcoal-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-forest-700 shrink-0" />
            <span className="truncate">
              {property.village}, {property.district}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg font-bold text-forest-950 group-hover:text-forest-700 transition-colors line-clamp-2 leading-snug">
            <Link href={`/properties/${property.slug}`}>
              {title}
            </Link>
          </h3>

          {/* Key Specifications Badges */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-ivory-200/80 text-xs text-charcoal-600">
            <div className="flex items-center gap-1.5 truncate" title={property.road_access}>
              <Route className="w-3.5 h-3.5 text-forest-600 shrink-0" />
              <span className="truncate">
                {language === "ta" && property.road_access_ta
                  ? property.road_access_ta
                  : property.road_access}
              </span>
            </div>

            <div className="flex items-center gap-1.5 truncate" title={property.water_availability}>
              <Droplets className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">
                {language === "ta" && property.water_availability_ta
                  ? property.water_availability_ta
                  : property.water_availability}
              </span>
            </div>
          </div>
        </div>

        {/* Pricing & CTA Footer */}
        <div className="mt-5 pt-3.5 border-t border-ivory-200/90 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-forest-950 tracking-tight">
              {formatPrice(property.total_price, language)}
            </div>
            {property.price_per_cent && (
              <div className="text-[11px] text-charcoal-500">
                {formatPrice(property.price_per_cent, language)} / {t.units.cents}
              </div>
            )}
          </div>

          <Link
            href={`/properties/${property.slug}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-ivory-100 hover:bg-forest-900 text-forest-950 hover:text-ivory-50 text-xs font-semibold transition-all group-hover:bg-forest-900 group-hover:text-ivory-50"
          >
            <span>{t.propertyCard.viewDetails}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
