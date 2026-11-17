"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { brandConfig } from "@/lib/brandConfig";
import { PropertyCategory } from "@/types/property";
import { Search, MapPin, Layers, IndianRupee, SlidersHorizontal, RotateCcw } from "lucide-react";

interface SearchFilterBarProps {
  initialDistrict?: string;
  initialType?: string;
  initialBudget?: string;
  initialQuery?: string;
  onFilterChange?: (filters: {
    district: string;
    type: string;
    budget: string;
    query: string;
  }) => void;
  isCompact?: boolean;
}

export function SearchFilterBar({
  initialDistrict = "",
  initialType = "",
  initialBudget = "",
  initialQuery = "",
  onFilterChange,
  isCompact = false,
}: SearchFilterBarProps) {
  const router = useRouter();
  const { language, t } = useLanguage();

  const [district, setDistrict] = useState(initialDistrict);
  const [propertyType, setPropertyType] = useState(initialType);
  const [budget, setBudget] = useState(initialBudget);
  const [query, setQuery] = useState(initialQuery);

  const categories: { key: PropertyCategory | ""; label: string }[] = [
    { key: "", label: t.search.allTypes },
    { key: "agricultural_land", label: t.categories.agricultural_land },
    { key: "farm_land", label: t.categories.farm_land },
    { key: "residential_plot", label: t.categories.residential_plot },
    { key: "commercial_land", label: t.categories.commercial_land },
  ];

  const budgetOptions = [
    { value: "", label: t.search.allBudgets },
    { value: "under25l", label: t.search.under25L },
    { value: "25l-50l", label: t.search.lakhs25To50 },
    { value: "50l-1cr", label: t.search.lakhs50To1Cr },
    { value: "above1cr", label: t.search.above1Cr },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilterChange) {
      onFilterChange({ district, type: propertyType, budget, query });
    } else {
      const params = new URLSearchParams();
      if (district) params.set("district", district);
      if (propertyType) params.set("type", propertyType);
      if (budget) params.set("budget", budget);
      if (query) params.set("q", query);
      router.push(`/properties?${params.toString()}`);
    }
  };

  const handleReset = () => {
    setDistrict("");
    setPropertyType("");
    setBudget("");
    setQuery("");
    if (onFilterChange) {
      onFilterChange({ district: "", type: "", budget: "", query: "" });
    }
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className={`bg-white rounded-2xl shadow-elevated border border-ivory-200/90 p-4 sm:p-5 transition-all ${
        isCompact ? "max-w-6xl mx-auto" : "max-w-5xl mx-auto -mt-10 relative z-20"
      }`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* District Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-forest-700" />
            <span>{t.search.selectDistrict}</span>
          </label>
          <select
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              if (onFilterChange) {
                onFilterChange({ district: e.target.value, type: propertyType, budget, query });
              }
            }}
            className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/60 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 transition-colors"
          >
            <option value="">{t.search.allDistricts}</option>
            {brandConfig.serviceDistricts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-forest-700" />
            <span>{t.search.propertyType}</span>
          </label>
          <select
            value={propertyType}
            onChange={(e) => {
              setPropertyType(e.target.value);
              if (onFilterChange) {
                onFilterChange({ district, type: e.target.value, budget, query });
              }
            }}
            className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/60 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 transition-colors"
          >
            {categories.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        {/* Budget Selector */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-500 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-forest-700" />
            <span>{t.search.budget}</span>
          </label>
          <select
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
              if (onFilterChange) {
                onFilterChange({ district, type: propertyType, budget: e.target.value, query });
              }
            }}
            className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/60 text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 transition-colors"
          >
            {budgetOptions.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search / Submit Button */}
        <div className="flex items-end gap-2">
          <button
            type="submit"
            className="flex-1 h-11 px-4 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-sm font-semibold flex items-center justify-center gap-2 shadow-subtle transition-colors"
          >
            <Search className="w-4 h-4 text-gold-400" />
            <span>{t.search.searchBtn}</span>
          </button>

          {(district || propertyType || budget || query) && (
            <button
              type="button"
              onClick={handleReset}
              title={t.search.resetFilters}
              className="h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-100 hover:bg-ivory-200 text-charcoal-600 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
