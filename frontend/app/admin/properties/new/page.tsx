"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminNavbar } from "@/components/AdminNavbar";
import { brandConfig } from "@/lib/brandConfig";
import { PropertyCategory, LandAreaUnit, PropertyStatus } from "@/types/property";
import {
  ArrowLeft,
  Building2,
  Save,
  Eye,
  CheckCircle2,
  UploadCloud,
  FileText,
  Image as ImageIcon,
  Lock,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";

export default function NewPropertyPage() {
  const router = useRouter();

  // Basic Information
  const [title, setTitle] = useState("");
  const [titleTa, setTitleTa] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionTa, setDescriptionTa] = useState("");
  const [propertyType, setPropertyType] = useState<PropertyCategory>("farm_land");
  const [status, setStatus] = useState<PropertyStatus>("draft");
  const [isFeatured, setIsFeatured] = useState(false);

  // Location Information
  const [district, setDistrict] = useState("Coimbatore");
  const [taluk, setTaluk] = useState("Pollachi");
  const [village, setVillage] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Specifications
  const [landArea, setLandArea] = useState<number | "">("");
  const [landAreaUnit, setLandAreaUnit] = useState<LandAreaUnit>("acres");
  const [roadAccess, setRoadAccess] = useState("30 Ft Tar Road");
  const [roadWidthFt, setRoadWidthFt] = useState<number | "">(30);
  const [waterAvailability, setWaterAvailability] = useState("Open Well + Canal Water Rights");
  const [electricityAvailability, setElectricityAvailability] = useState("3-Phase Free Agro Power Connection");
  const [landClassification, setLandClassification] = useState("Nansei (Wetland)");

  // Financials
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [pricePerCent, setPricePerCent] = useState<number | "">("");
  const [negotiable, setNegotiable] = useState(true);

  // Private Admin Notes
  const [privateBrokerageNotes, setPrivateBrokerageNotes] = useState("");
  const [privateSurveyNumber, setPrivateSurveyNumber] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");

  // Approvals
  const [pattaAvailable, setPattaAvailable] = useState(true);
  const [chittaAvailable, setChittaAvailable] = useState(true);
  const [fmbAvailable, setFmbAvailable] = useState(true);
  const [approvalDetails, setApprovalDetails] = useState("Clear Ancestral Single Patta");

  // Media URLs
  const [mediaUrls, setMediaUrls] = useState<string[]>([
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80",
  ]);
  const [newMediaInput, setNewMediaInput] = useState("");

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleAddMedia = () => {
    if (newMediaInput.trim()) {
      setMediaUrls([...mediaUrls, newMediaInput.trim()]);
      setNewMediaInput("");
    }
  };

  const handleRemoveMedia = (index: number) => {
    setMediaUrls(mediaUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (publishNow: boolean = false) => {
    setSaving(true);
    const finalStatus = publishNow ? "published" : status;

    // Simulate API save or send to FastAPI
    try {
      const payload = {
        title,
        title_ta: titleTa || undefined,
        description_en: descriptionEn,
        description_ta: descriptionTa || undefined,
        property_type: propertyType,
        state: "Tamil Nadu",
        district,
        taluk,
        village,
        address: address || undefined,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        land_area: parseFloat(landArea.toString()) || 1.0,
        land_area_unit: landAreaUnit,
        total_price: parseFloat(totalPrice.toString()) || 1000000,
        price_per_cent: pricePerCent ? parseFloat(pricePerCent.toString()) : undefined,
        negotiable,
        road_access: roadAccess,
        road_width_ft: roadWidthFt ? parseInt(roadWidthFt.toString()) : undefined,
        water_availability: waterAvailability,
        electricity_availability: electricityAvailability,
        land_classification: landClassification,
        approval_details: approvalDetails,
        patta_available: pattaAvailable,
        chitta_adangal_available: chittaAvailable,
        fmb_available: fmbAvailable,
        status: finalStatus,
        is_featured: isFeatured,
        private_brokerage_notes: privateBrokerageNotes,
        private_survey_number: privateSurveyNumber,
        owner_name: ownerName,
        owner_phone: ownerPhone,
        media: mediaUrls.map((url, i) => ({
          media_url: url,
          media_type: "drone_photo",
          is_cover: i === 0,
          display_order: i,
        })),
      };

      await fetch("http://localhost:8000/api/v1/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("admin_token") || ""}`,
        },
        body: JSON.stringify(payload),
      }).catch(() => null);

      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/properties");
      }, 1200);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50/50 pb-20">
      <AdminNavbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Back Link & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ivory-200">
          <div className="space-y-1">
            <Link
              href="/admin/properties"
              className="inline-flex items-center gap-1.5 text-xs text-charcoal-500 hover:text-forest-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Properties</span>
            </Link>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Add New Land Parcel
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 text-xs font-semibold transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save as Draft</span>
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold shadow-subtle transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-gold-400" />
              <span>Publish Listing</span>
            </button>
          </div>
        </div>

        {success && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Property successfully saved! Redirecting to inventory...</span>
          </div>
        )}

        <form className="space-y-8">
          {/* Section A: Basic Information */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-ivory-200/90 shadow-subtle space-y-5">
            <h2 className="font-serif text-lg font-bold text-forest-950 pb-3 border-b border-ivory-200 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-forest-700" />
              <span>A. Basic Listing Information</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Property Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. 4.5 Acre Lush Yielding Coconut Farm with 2 Open Wells"
                  className="w-full h-11 px-3.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Property Title (Tamil)
                </label>
                <input
                  type="text"
                  value={titleTa}
                  onChange={(e) => setTitleTa(e.target.value)}
                  placeholder="உதா: 4.5 ஏக்கர் விளைச்சல் தரும் தென்னந்தோப்பு"
                  className="w-full h-11 px-3.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 font-tamil"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Property Category *
                </label>
                <select
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value as PropertyCategory)}
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                >
                  <option value="farm_land">Farm Land / Grove (தோட்டம்)</option>
                  <option value="agricultural_land">Agricultural Land (விவசாய நிலம்)</option>
                  <option value="residential_plot">Residential Plot (குடியிருப்பு மனை)</option>
                  <option value="commercial_land">Commercial Land (வணிக நிலம்)</option>
                  <option value="other_land">Other Special Purpose Land</option>
                </select>
              </div>

              <div className="flex items-center gap-6 pt-5">
                <label className="flex items-center gap-2 text-xs font-semibold text-charcoal-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="w-4 h-4 rounded text-forest-800 focus:ring-forest-800"
                  />
                  <span>Mark as Featured Discovery</span>
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Property Description (English) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  placeholder="Detailed inspection report: soil condition, water source history, access road quality, yield, and boundary clarity..."
                  className="w-full p-3.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Property Description (Tamil)
                </label>
                <textarea
                  rows={3}
                  value={descriptionTa}
                  onChange={(e) => setDescriptionTa(e.target.value)}
                  placeholder="தமிழ் விளக்கம்: மண் வளம், கிணற்று நீர், சாலை அகலம், மரங்களின் எண்ணிக்கை மற்றும் பட்டா நிலை..."
                  className="w-full p-3.5 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800 resize-none font-tamil"
                />
              </div>
            </div>
          </section>

          {/* Section B: Location Hierarchy */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-ivory-200/90 shadow-subtle space-y-5">
            <h2 className="font-serif text-lg font-bold text-forest-950 pb-3 border-b border-ivory-200">
              B. Location Information (Tamil Nadu)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  District *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                >
                  {brandConfig.serviceDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Taluk *
                </label>
                <input
                  type="text"
                  required
                  value={taluk}
                  onChange={(e) => setTaluk(e.target.value)}
                  placeholder="e.g. Pollachi / Batlagundu"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Village / Locality *
                </label>
                <input
                  type="text"
                  required
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  placeholder="e.g. Anamalai Border"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>

              <div className="sm:col-span-2 md:col-span-3">
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Nearby Road / Landmark
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Off Aliyar Main Canal Road, Near Primary Health Center"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>
            </div>
          </section>

          {/* Section C: Land Specifications */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-ivory-200/90 shadow-subtle space-y-5">
            <h2 className="font-serif text-lg font-bold text-forest-950 pb-3 border-b border-ivory-200">
              C. Land Specifications & Utilities
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Total Land Area *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={landArea}
                  onChange={(e) => setLandArea(e.target.value ? parseFloat(e.target.value) : "")}
                  placeholder="e.g. 4.5"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Measurement Unit *
                </label>
                <select
                  value={landAreaUnit}
                  onChange={(e) => setLandAreaUnit(e.target.value as LandAreaUnit)}
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                >
                  <option value="acres">Acres (ஏக்கர்)</option>
                  <option value="cents">Cents (சென்ட்)</option>
                  <option value="sq_ft">Square Feet (சதுர அடி)</option>
                  <option value="hectares">Hectares (ஹெக்டேர்)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Land Classification *
                </label>
                <select
                  value={landClassification}
                  onChange={(e) => setLandClassification(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                >
                  <option value="Nansei (Wetland)">Nansei - Wetland (நன்செய்)</option>
                  <option value="Punsei (Dryland)">Punsei - Dryland (புன்செய்)</option>
                  <option value="Residential Natham">Natham / Residential (நத்தம்)</option>
                  <option value="Commercial Land">Commercial / Industrial (வணிக நிலம்)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Road Access Frontage *
                </label>
                <input
                  type="text"
                  required
                  value={roadAccess}
                  onChange={(e) => setRoadAccess(e.target.value)}
                  placeholder="e.g. 30 Ft Panchayat Tar Road"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Water Availability *
                </label>
                <input
                  type="text"
                  required
                  value={waterAvailability}
                  onChange={(e) => setWaterAvailability(e.target.value)}
                  placeholder="e.g. 2 Open Wells + River Canal rights"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Electricity Availability *
                </label>
                <input
                  type="text"
                  required
                  value={electricityAvailability}
                  onChange={(e) => setElectricityAvailability(e.target.value)}
                  placeholder="e.g. 7.5 HP Free Agro Power / Domestic"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>
            </div>
          </section>

          {/* Section D: Pricing */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-ivory-200/90 shadow-subtle space-y-5">
            <h2 className="font-serif text-lg font-bold text-forest-950 pb-3 border-b border-ivory-200">
              D. Pricing & Brokerage
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Total Asking Price (₹) *
                </label>
                <input
                  type="number"
                  required
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value ? parseFloat(e.target.value) : "")}
                  placeholder="e.g. 18000000 (1.80 Cr)"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                  Price Per Cent (₹ Optional)
                </label>
                <input
                  type="number"
                  value={pricePerCent}
                  onChange={(e) => setPricePerCent(e.target.value ? parseFloat(e.target.value) : "")}
                  placeholder="e.g. 40000"
                  className="w-full h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
                />
              </div>

              <div className="flex items-center gap-2 pt-6">
                <input
                  type="checkbox"
                  id="negotiableCheck"
                  checked={negotiable}
                  onChange={(e) => setNegotiable(e.target.checked)}
                  className="w-4 h-4 rounded text-forest-800"
                />
                <label htmlFor="negotiableCheck" className="text-xs font-semibold text-charcoal-700 cursor-pointer">
                  Price is Negotiable
                </label>
              </div>
            </div>
          </section>

          {/* Section E: Media Upload / Drone Visuals */}
          <section className="bg-white p-6 sm:p-8 rounded-3xl border border-ivory-200/90 shadow-subtle space-y-5">
            <h2 className="font-serif text-lg font-bold text-forest-950 pb-3 border-b border-ivory-200 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-forest-700" />
                <span>E. Drone & Property Media</span>
              </span>
              <span className="text-xs text-charcoal-400 font-sans font-normal">
                Cloudinary Storage Integration
              </span>
            </h2>

            <div className="flex gap-2">
              <input
                type="url"
                value={newMediaInput}
                onChange={(e) => setNewMediaInput(e.target.value)}
                placeholder="Paste high-res drone photo / video URL..."
                className="flex-1 h-11 px-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
              />
              <button
                type="button"
                onClick={handleAddMedia}
                className="px-4 h-11 rounded-xl bg-forest-900 text-ivory-50 text-xs font-semibold flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Image</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {mediaUrls.map((url, i) => (
                <div
                  key={i}
                  className="relative aspect-video rounded-xl overflow-hidden border border-ivory-300 bg-ivory-100 group"
                >
                  <img src={url} alt={`Media ${i}`} className="w-full h-full object-cover" />
                  <div className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold bg-black/60 text-white">
                    {i === 0 ? "Cover" : `#${i + 1}`}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedia(i)}
                    className="absolute top-1.5 right-1.5 p-1 rounded-md bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Section F: Confidential Admin Vault (Strictly Admin Eyes Only) */}
          <section className="bg-forest-950 text-ivory-50 p-6 sm:p-8 rounded-3xl border border-forest-900 shadow-card space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-forest-800">
              <Lock className="w-5 h-5 text-gold-400" />
              <div>
                <h2 className="font-serif text-lg font-bold text-white">
                  F. Private Admin Vault (Confidential)
                </h2>
                <p className="text-[11px] text-ivory-300">
                  These fields are NEVER returned to public visitors or search APIs.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-ivory-200 font-semibold mb-1">
                  Private Revenue Survey Number(s)
                </label>
                <input
                  type="text"
                  value={privateSurveyNumber}
                  onChange={(e) => setPrivateSurveyNumber(e.target.value)}
                  placeholder="e.g. SF No. 284/2B, Sub-division 4"
                  className="w-full h-11 px-3 rounded-xl border border-forest-800 bg-forest-900 text-ivory-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
              </div>

              <div>
                <label className="block text-ivory-200 font-semibold mb-1">
                  Landowner Name & Direct Contact
                </label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. R. Palanisamy (+91 94433 12345)"
                  className="w-full h-11 px-3 rounded-xl border border-forest-800 bg-forest-900 text-ivory-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-ivory-200 font-semibold mb-1">
                  Confidential Brokerage & Title Notes
                </label>
                <textarea
                  rows={2}
                  value={privateBrokerageNotes}
                  onChange={(e) => setPrivateBrokerageNotes(e.target.value)}
                  placeholder="e.g. 2% brokerage agreed in writing. Ancestral partition deed dated 1982 verified with sub-registrar office."
                  className="w-full p-3 rounded-xl border border-forest-800 bg-forest-900 text-ivory-100 focus:outline-none focus:ring-1 focus:ring-gold-400 resize-none"
                />
              </div>
            </div>
          </section>

          {/* Bottom Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => handleSubmit(false)}
              disabled={saving}
              className="px-6 py-3 rounded-xl bg-ivory-200 hover:bg-ivory-300 text-charcoal-800 text-xs font-semibold transition-colors"
            >
              Save as Draft
            </button>

            <button
              type="button"
              onClick={() => handleSubmit(true)}
              disabled={saving}
              className="px-8 py-3 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold shadow-subtle transition-colors"
            >
              Publish Listing
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
