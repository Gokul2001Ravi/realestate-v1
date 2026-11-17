"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AdminNavbar } from "@/components/AdminNavbar";
import { sampleProperties } from "@/lib/sampleData";
import { formatPrice } from "@/lib/utils";
import {
  Building2,
  CheckCircle2,
  FileEdit,
  Tag,
  EyeOff,
  Inbox,
  BellRing,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    total: 6,
    published: 5,
    draft: 1,
    sold: 0,
    inactive: 0,
    totalEnquiries: 4,
    newEnquiries: 2,
  });

  const recentEnquiries = [
    {
      id: "enq-1",
      customer_name: "M. Ramachandran",
      phone: "+91 98421 98765",
      property_title: "4.5 Acre Lush Yielding Coconut Farm (Pollachi)",
      status: "new",
      time: "25 mins ago",
      message: "Interested in scheduling a site visit this Saturday. Please confirm survey boundaries.",
    },
    {
      id: "enq-2",
      customer_name: "Dr. K. Ananth",
      phone: "+91 94432 11223",
      property_title: "2.8 Acre Western Ghats Foothill Farm Land (Dindigul)",
      status: "new",
      time: "2 hours ago",
      message: "Requesting legal opinion copy and water perennial stream guarantee.",
    },
    {
      id: "enq-3",
      customer_name: "G. Selvam",
      phone: "+91 97890 44556",
      property_title: "48 Cents Prime Residential Plot (Madurai)",
      status: "contacted",
      time: "Yesterday",
      message: "Discussed DTCP layout boundary and price negotiation.",
    },
  ];

  return (
    <div className="min-h-screen bg-ivory-50/50">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome & Quick Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-ivory-200">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Brokerage Operational Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Active land discovery pipeline & lead management for Tamil Nadu
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold shadow-subtle transition-colors"
            >
              <PlusCircle className="w-4 h-4 text-gold-400" />
              <span>Add New Property</span>
            </Link>
          </div>
        </div>

        {/* Dashboard Statistics KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4">
          {/* Total */}
          <div className="bg-white p-4 rounded-2xl border border-ivory-200 shadow-subtle space-y-1">
            <div className="text-[11px] font-semibold text-charcoal-400 uppercase tracking-wider flex items-center justify-between">
              <span>Total Lands</span>
              <Building2 className="w-3.5 h-3.5 text-forest-700" />
            </div>
            <div className="text-2xl font-bold text-forest-950">{stats.total}</div>
          </div>

          {/* Published */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-100 bg-emerald-50/20 shadow-subtle space-y-1">
            <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider flex items-center justify-between">
              <span>Published</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-emerald-950">{stats.published}</div>
          </div>

          {/* Draft */}
          <div className="bg-white p-4 rounded-2xl border border-ivory-200 shadow-subtle space-y-1">
            <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider flex items-center justify-between">
              <span>Drafts</span>
              <FileEdit className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-amber-950">{stats.draft}</div>
          </div>

          {/* Sold */}
          <div className="bg-white p-4 rounded-2xl border border-ivory-200 shadow-subtle space-y-1">
            <div className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider flex items-center justify-between">
              <span>Sold</span>
              <Tag className="w-3.5 h-3.5 text-charcoal-600" />
            </div>
            <div className="text-2xl font-bold text-charcoal-900">{stats.sold}</div>
          </div>

          {/* Inactive */}
          <div className="bg-white p-4 rounded-2xl border border-ivory-200 shadow-subtle space-y-1">
            <div className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider flex items-center justify-between">
              <span>Inactive</span>
              <EyeOff className="w-3.5 h-3.5 text-charcoal-400" />
            </div>
            <div className="text-2xl font-bold text-charcoal-800">{stats.inactive}</div>
          </div>

          {/* Enquiries */}
          <div className="bg-white p-4 rounded-2xl border border-blue-100 bg-blue-50/20 shadow-subtle space-y-1 col-span-2 sm:col-span-1">
            <div className="text-[11px] font-semibold text-blue-800 uppercase tracking-wider flex items-center justify-between">
              <span>New Leads</span>
              <BellRing className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-950">{stats.newEnquiries}</div>
          </div>

          {/* Total Enquiries */}
          <div className="bg-white p-4 rounded-2xl border border-ivory-200 shadow-subtle space-y-1 col-span-2 sm:col-span-1">
            <div className="text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider flex items-center justify-between">
              <span>Total Leads</span>
              <Inbox className="w-3.5 h-3.5 text-forest-700" />
            </div>
            <div className="text-2xl font-bold text-forest-950">{stats.totalEnquiries}</div>
          </div>
        </div>

        {/* Two-Column Grid: Recent Enquiries Feed & Active Properties Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left 2 Cols: Active Properties Inventory */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-ivory-200/90 shadow-subtle space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
              <h2 className="font-serif text-lg font-bold text-forest-950 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-forest-700" />
                <span>Recent Properties Inventory</span>
              </h2>
              <Link
                href="/admin/properties"
                className="text-xs font-semibold text-forest-800 hover:text-forest-600 inline-flex items-center gap-1"
              >
                <span>Manage All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {sampleProperties.slice(0, 4).map((prop) => (
                <div
                  key={prop.id}
                  className="p-3.5 rounded-2xl bg-ivory-50/60 border border-ivory-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-forest-700/30 transition-colors"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800 uppercase">
                        {prop.status}
                      </span>
                      <span className="text-xs text-charcoal-400">
                        {prop.district}
                      </span>
                    </div>
                    <div className="font-serif font-bold text-sm text-forest-950 truncate">
                      {prop.title}
                    </div>
                    <div className="text-xs text-charcoal-500">
                      {formatPrice(prop.total_price)} • {prop.land_area} {prop.land_area_unit}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <Link
                      href={`/properties/${prop.slug}`}
                      target="_blank"
                      className="px-3 py-1.5 rounded-lg bg-ivory-200 hover:bg-ivory-300 text-charcoal-700 text-xs font-medium transition-colors"
                    >
                      Preview
                    </Link>
                    <Link
                      href={`/admin/properties`}
                      className="px-3 py-1.5 rounded-lg bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-medium transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 1 Col: Recent Customer Enquiries Feed */}
          <div className="bg-white rounded-3xl p-6 border border-ivory-200/90 shadow-subtle space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-ivory-200">
              <h2 className="font-serif text-lg font-bold text-forest-950 flex items-center gap-2">
                <Inbox className="w-4 h-4 text-forest-700" />
                <span>Recent Customer Enquiries</span>
              </h2>
              <Link
                href="/admin/enquiries"
                className="text-xs font-semibold text-forest-800 hover:text-forest-600 inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-4">
              {recentEnquiries.map((enq) => (
                <div
                  key={enq.id}
                  className="p-3.5 rounded-2xl bg-ivory-50/70 border border-ivory-200 space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-forest-950">
                      {enq.customer_name}
                    </span>
                    <span className="text-[10px] text-charcoal-400">
                      {enq.time}
                    </span>
                  </div>

                  <div className="text-xs text-forest-900/80 font-medium line-clamp-1">
                    {enq.property_title}
                  </div>

                  <p className="text-xs text-charcoal-600 line-clamp-2">
                    "{enq.message}"
                  </p>

                  <div className="flex items-center gap-2 pt-1 border-t border-ivory-200/80">
                    <a
                      href={`tel:${enq.phone}`}
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 rounded-lg bg-forest-900 text-ivory-50 text-[11px] font-medium"
                    >
                      <Phone className="w-3 h-3 text-gold-400" />
                      <span>Call Lead</span>
                    </a>
                    <a
                      href={`https://wa.me/${enq.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1 py-1 px-2 rounded-lg bg-emerald-600 text-white text-[11px] font-medium"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
