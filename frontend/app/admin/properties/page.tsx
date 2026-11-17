"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AdminNavbar } from "@/components/AdminNavbar";
import { sampleProperties } from "@/lib/sampleData";
import { Property, PropertyStatus } from "@/types/property";
import { formatPrice, formatArea } from "@/lib/utils";
import {
  Building2,
  PlusCircle,
  Search,
  CheckCircle2,
  FileEdit,
  Tag,
  EyeOff,
  Trash2,
  ExternalLink,
  Edit3,
  SlidersHorizontal,
} from "lucide-react";

export default function AdminPropertiesListPage() {
  const [properties, setProperties] = useState<Property[]>(sampleProperties);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleStatusChange = (propertyId: string, newStatus: PropertyStatus) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status: newStatus } : p))
    );
  };

  const handleDelete = (propertyId: string) => {
    if (confirm("Are you sure you want to permanently delete this property parcel?")) {
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    }
  };

  const filtered = properties.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.village.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-ivory-50/50">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Land & Plot Inventory
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Curate, edit, and publish verified properties across Tamil Nadu
            </p>
          </div>

          <Link
            href="/admin/properties/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold shadow-subtle transition-colors shrink-0"
          >
            <PlusCircle className="w-4 h-4 text-gold-400" />
            <span>Add New Land</span>
          </Link>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-2xl border border-ivory-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, village, district..."
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
            />
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["all", "published", "draft", "sold", "inactive"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  statusFilter === st
                    ? "bg-forest-900 text-ivory-50"
                    : "bg-ivory-100 text-charcoal-600 hover:bg-ivory-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Properties Table / List */}
        <div className="bg-white rounded-3xl border border-ivory-200 shadow-subtle overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-ivory-100/70 border-b border-ivory-200 text-charcoal-500 uppercase tracking-wider font-semibold">
                  <th className="py-3.5 px-4 sm:px-6">Property</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Area & Price</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-100">
                {filtered.map((prop) => (
                  <tr key={prop.id} className="hover:bg-ivory-50/60 transition-colors">
                    {/* Title & Cover */}
                    <td className="py-4 px-4 sm:px-6 max-w-xs sm:max-w-sm">
                      <div className="font-serif font-bold text-forest-950 line-clamp-1 text-sm">
                        {prop.title}
                      </div>
                      <div className="text-[11px] text-charcoal-400 mt-0.5">
                        Slug: {prop.slug}
                      </div>
                    </td>

                    {/* Location */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-charcoal-900">
                        {prop.village}
                      </div>
                      <div className="text-[11px] text-charcoal-500">
                        {prop.taluk}, {prop.district}
                      </div>
                    </td>

                    {/* Area & Price */}
                    <td className="py-4 px-4">
                      <div className="font-bold text-forest-950 text-sm">
                        {formatPrice(prop.total_price)}
                      </div>
                      <div className="text-[11px] text-charcoal-500">
                        {prop.land_area} {prop.land_area_unit}
                      </div>
                    </td>

                    {/* Status with Quick Toggle */}
                    <td className="py-4 px-4">
                      <select
                        value={prop.status}
                        onChange={(e) =>
                          handleStatusChange(prop.id, e.target.value as PropertyStatus)
                        }
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border focus:outline-none ${
                          prop.status === "published"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                            : prop.status === "draft"
                            ? "bg-amber-50 text-amber-800 border-amber-300"
                            : prop.status === "sold"
                            ? "bg-blue-50 text-blue-800 border-blue-300"
                            : "bg-gray-100 text-gray-700 border-gray-300"
                        }`}
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                        <option value="sold">Sold</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right space-x-1.5 whitespace-nowrap">
                      {prop.status === "published" && (
                        <Link
                          href={`/properties/${prop.slug}`}
                          target="_blank"
                          className="p-1.5 rounded-lg text-charcoal-500 hover:text-forest-800 hover:bg-ivory-100 inline-block transition-colors"
                          title="View on public site"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                      )}

                      <Link
                        href={`/admin/properties/new?id=${prop.id}`}
                        className="p-1.5 rounded-lg text-charcoal-500 hover:text-forest-800 hover:bg-ivory-100 inline-block transition-colors"
                        title="Edit property details"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Link>

                      <button
                        onClick={() => handleDelete(prop.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 inline-block transition-colors"
                        title="Delete property"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
