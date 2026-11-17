import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sampleProperties } from "@/lib/sampleData";
import { MediaGallery } from "@/components/MediaGallery";
import { PropertySpecs } from "@/components/PropertySpecs";
import { EnquiryForm } from "@/components/EnquiryForm";
import { PropertyCard } from "@/components/PropertyCard";
import { MobileContactBar } from "@/components/MobileContactBar";
import { formatPrice, formatArea } from "@/lib/utils";
import {
  MapPin,
  ArrowLeft,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Compass,
} from "lucide-react";

// Server component to find property by slug
export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = sampleProperties.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  // Similar properties in same district or category
  const similarProperties = sampleProperties
    .filter(
      (p) =>
        p.id !== property.id &&
        (p.district === property.district || p.property_type === property.property_type)
    )
    .slice(0, 3);

  return (
    <div className="py-8 pb-24 md:pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumb / Back Link */}
      <nav className="flex items-center justify-between text-xs sm:text-sm text-charcoal-500">
        <Link
          href="/properties"
          className="inline-flex items-center gap-1.5 hover:text-forest-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to all properties / அனைத்து நிலங்களுக்கும்</span>
        </Link>
        <span className="text-xs uppercase font-semibold px-2.5 py-1 rounded-md bg-ivory-100 text-forest-900 border border-ivory-300">
          {property.district}
        </span>
      </nav>

      {/* Main Details Grid: Left 2 Cols (Media & Specs) | Right 1 Col (Pricing & Enquiry) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Media Gallery, Descriptions, Specifications */}
        <div className="lg:col-span-2 space-y-8">
          {/* Title & Location Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-charcoal-500">
              <MapPin className="w-4 h-4 text-forest-700" />
              <span>
                {property.village}, {property.taluk} Taluk, {property.district}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-forest-950 leading-tight">
              {property.title}
            </h1>

            {property.title_ta && (
              <h2 className="font-tamil text-lg sm:text-xl font-medium text-forest-800/90 leading-snug">
                {property.title_ta}
              </h2>
            )}
          </div>

          {/* Media Showcase (Photos & Drone footage) */}
          <MediaGallery media={property.media} title={property.title} />

          {/* Detailed Property Description (Bilingual) */}
          <div className="bg-white rounded-2xl p-6 border border-ivory-200/90 shadow-subtle space-y-5">
            <h3 className="font-serif text-lg font-bold text-forest-950 pb-3 border-b border-ivory-200/80">
              Property Overview & Ground Reality
            </h3>

            <div className="space-y-4 text-sm sm:text-base text-charcoal-700 leading-relaxed">
              <p>{property.description_en}</p>

              {property.description_ta && (
                <div className="p-4 rounded-xl bg-ivory-50/80 border border-ivory-200 text-sm text-charcoal-800 leading-relaxed font-tamil">
                  <p>{property.description_ta}</p>
                </div>
              )}
            </div>
          </div>

          {/* Structured Land Specifications & Utilities */}
          <PropertySpecs property={property} />

          {/* Location Approximation & Connectivity Notes */}
          <div className="bg-white rounded-2xl p-6 border border-ivory-200/90 shadow-subtle space-y-4">
            <h3 className="font-serif text-lg font-bold text-forest-950 pb-3 border-b border-ivory-200/80 flex items-center gap-2">
              <Compass className="w-5 h-5 text-forest-700" />
              <span>Location Connectivity & Surroundings</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-ivory-50/70 border border-ivory-200">
                <div className="font-semibold text-charcoal-500 uppercase text-[10px] tracking-wider mb-1">
                  District & State
                </div>
                <div className="font-semibold text-forest-950">
                  {property.district}, {property.state}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-ivory-50/70 border border-ivory-200">
                <div className="font-semibold text-charcoal-500 uppercase text-[10px] tracking-wider mb-1">
                  Revenue Taluk
                </div>
                <div className="font-semibold text-forest-950">
                  {property.taluk} Taluk
                </div>
              </div>

              <div className="p-3 rounded-xl bg-ivory-50/70 border border-ivory-200">
                <div className="font-semibold text-charcoal-500 uppercase text-[10px] tracking-wider mb-1">
                  Nearest Landmark
                </div>
                <div className="font-semibold text-forest-950">
                  {property.address || `${property.village} Main Road`}
                </div>
              </div>
            </div>

            <p className="text-xs text-charcoal-500 italic">
              Exact geo-coordinates and revenue survey numbers are shared upon direct consultation with the broker to protect owner confidentiality.
            </p>
          </div>
        </div>

        {/* Right Column: Pricing Summary Card & Enquiry Form */}
        <div className="space-y-6 lg:sticky lg:top-28">
          {/* Pricing Highlight Card */}
          <div className="bg-forest-950 text-ivory-50 rounded-2xl p-6 border border-forest-800 shadow-elevated space-y-4">
            <div className="flex items-center justify-between text-xs text-gold-300">
              <span className="font-semibold uppercase tracking-wider">
                Asking Price
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-forest-900 border border-forest-800 text-[11px]">
                {property.negotiable ? "Negotiable / பேசித் தீர்மானிக்கலாம்" : "Fixed / நிலையானது"}
              </span>
            </div>

            <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-serif">
              {formatPrice(property.total_price)}
            </div>

            {property.price_per_cent && (
              <div className="text-xs text-ivory-200/80 pt-1 border-t border-forest-900 flex justify-between">
                <span>Price per cent:</span>
                <span className="font-semibold text-gold-300">
                  {formatPrice(property.price_per_cent)} / cent
                </span>
              </div>
            )}

            <div className="pt-2 text-xs text-ivory-300/80 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-gold-400 shrink-0" />
              <span>Direct title pre-vetted by broker</span>
            </div>
          </div>

          {/* Enquiry & Direct WhatsApp Form */}
          <EnquiryForm property={property} />
        </div>
      </div>

      {/* Similar Available Properties */}
      {similarProperties.length > 0 && (
        <section className="pt-16 border-t border-ivory-200 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-forest-950">
            Similar Lands in Tamil Nadu
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {similarProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </section>
      )}

      {/* Sticky Mobile Contact Bar */}
      <MobileContactBar property={property} />
    </div>
  );
}
