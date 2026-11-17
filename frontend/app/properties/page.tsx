"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sampleProperties } from "@/lib/sampleData";
import { PropertyCard } from "@/components/PropertyCard";
import { SearchFilterBar } from "@/components/SearchFilterBar";
import { useLanguage } from "@/context/LanguageContext";
import { PropertyCategory } from "@/types/property";
import {
  Compass,
  ArrowUpDown,
  SlidersHorizontal,
  RotateCcw,
  Trees,
} from "lucide-react";

function PropertiesList() {
  const searchParams = useSearchParams();
  const { language, t } = useLanguage();

  const [district, setDistrict] = useState(searchParams.get("district") || "");
  const [propertyType, setPropertyType] = useState(searchParams.get("type") || "");
  const [budget, setBudget] = useState(searchParams.get("budget") || "");
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<"latest" | "price_asc" | "price_desc" | "area_desc">("latest");

  // Filtering Logic
  const filteredProperties = useMemo(() => {
    return sampleProperties.filter((property) => {
      // District filter
      if (district && property.district.toLowerCase() !== district.toLowerCase()) {
        return false;
      }

      // Property type filter
      if (propertyType && property.property_type !== propertyType) {
        return false;
      }

      // Budget filter
      if (budget === "under25l" && property.total_price > 2500000) return false;
      if (budget === "25l-50l" && (property.total_price < 2500000 || property.total_price > 5000000)) return false;
      if (budget === "50l-1cr" && (property.total_price < 5000000 || property.total_price > 10000000)) return false;
      if (budget === "above1cr" && property.total_price < 10000000) return false;

      // Text query
      if (query.trim()) {
        const q = query.toLowerCase();
        const matchTitle = property.title.toLowerCase().includes(q);
        const matchTitleTa = property.title_ta?.toLowerCase().includes(q);
        const matchVillage = property.village.toLowerCase().includes(q);
        const matchTaluk = property.taluk.toLowerCase().includes(q);
        const matchDistrict = property.district.toLowerCase().includes(q);
        if (!matchTitle && !matchTitleTa && !matchVillage && !matchTaluk && !matchDistrict) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price_asc") return a.total_price - b.total_price;
      if (sortBy === "price_desc") return b.total_price - a.total_price;
      if (sortBy === "area_desc") return b.land_area - a.land_area;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [district, propertyType, budget, query, sortBy]);

  const handleFilterUpdate = (newFilters: {
    district: string;
    type: string;
    budget: string;
    query: string;
  }) => {
    setDistrict(newFilters.district);
    setPropertyType(newFilters.type);
    setBudget(newFilters.budget);
    setQuery(newFilters.query);
  };

  const handleClearFilters = () => {
    setDistrict("");
    setPropertyType("");
    setBudget("");
    setQuery("");
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Page Title & Subtitle */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-600">
          <Compass className="w-4 h-4 text-gold-500" />
          <span>{language === "ta" ? "நிலப் பட்டியல்" : "Exclusive Inventory"}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest-950 tracking-tight">
          {language === "ta" ? "கிடைக்கும் நிலங்கள் & மனைகள்" : "Available Lands & Plots"}
        </h1>
        <p className="text-sm sm:text-base text-charcoal-600 max-w-2xl">
          {language === "ta"
            ? "தமிழ்நாடு முழுவதும் எங்கள் குழுவால் நேரில் ஆய்வு செய்யப்பட்டு தெளிவான பட்டா ஆவணங்கள் சரிபார்க்கப்பட்ட நிலங்கள்."
            : "Drone-surveyed agricultural acreage, plantation estates, and plotted parcels represented with single clear title deeds."}
        </p>
      </div>

      {/* Filter Bar Component */}
      <SearchFilterBar
        initialDistrict={district}
        initialType={propertyType}
        initialBudget={budget}
        initialQuery={query}
        onFilterChange={handleFilterUpdate}
        isCompact={true}
      />

      {/* Results Header: Count & Sorting */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-ivory-200">
        <div className="text-sm font-medium text-charcoal-700">
          {t.search.showingResults.replace("{count}", filteredProperties.length.toString())}
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-charcoal-500 flex items-center gap-1.5 shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-forest-700" />
            <span>{t.search.sortBy}:</span>
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 px-3 rounded-lg border border-ivory-300 bg-white text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-forest-800"
          >
            <option value="latest">{t.search.sortLatest}</option>
            <option value="price_asc">{t.search.sortPriceLowHigh}</option>
            <option value="price_desc">{t.search.sortPriceHighLow}</option>
            <option value="area_desc">{t.search.sortAreaHighLow}</option>
          </select>
        </div>
      </div>

      {/* Property Cards Grid or Empty State */}
      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="py-20 bg-white rounded-2xl border border-ivory-200 text-center p-8 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-ivory-100 flex items-center justify-center text-charcoal-400 mx-auto">
            <Trees className="w-7 h-7 text-forest-700" />
          </div>
          <h3 className="font-serif text-xl font-bold text-forest-950">
            {language === "ta"
              ? "தேர்ந்தெடுத்த வடிகட்டிகளுக்குரிய நிலங்கள் இல்லை"
              : "No Properties Match Your Current Filters"}
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-500 max-w-md mx-auto">
            {language === "ta"
              ? "வடிகட்டிகளை மாற்றவும் அல்லது புதிய நிலப் பதிவுகளுக்கு நிலத் தரகரை நேரடியாகத் தொடர்பு கொள்ளவும்."
              : "Try widening your budget range, clearing district restrictions, or reach out to the broker directly for upcoming unlisted parcels."}
          </p>
          <button
            onClick={handleClearFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.search.resetFilters}</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-20 text-center text-charcoal-400 text-sm">
          Loading properties...
        </div>
      }
    >
      <PropertiesList />
    </Suspense>
  );
}
