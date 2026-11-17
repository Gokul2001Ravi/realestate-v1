"use client";

import React, { useState } from "react";
import { AdminNavbar } from "@/components/AdminNavbar";
import { brandConfig } from "@/lib/brandConfig";
import {
  Inbox,
  Phone,
  MessageSquare,
  CheckCircle2,
  Clock,
  Archive,
  Search,
  Filter,
} from "lucide-react";

interface EnquiryItem {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  property_title: string;
  message: string;
  status: "new" | "contacted" | "closed";
  internal_notes?: string;
  created_at: string;
}

export default function AdminEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([
    {
      id: "enq-1",
      customer_name: "M. Ramachandran",
      phone: "+91 98421 98765",
      email: "ramachandran@gmail.com",
      property_title: "4.5 Acre Lush Yielding Coconut Farm with 2 Open Wells (Pollachi)",
      message: "Interested in scheduling a site visit this Saturday. Please confirm survey boundaries and well depth.",
      status: "new",
      internal_notes: "Prefers morning 10 AM site visit. Assistant will accompany.",
      created_at: "2026-02-16T10:15:00Z",
    },
    {
      id: "enq-2",
      customer_name: "Dr. K. Ananth",
      phone: "+91 94432 11223",
      email: "dr.ananth@apollo.org",
      property_title: "2.8 Acre Western Ghats Foothill Farm Land (Dindigul)",
      message: "Looking for peaceful avocado farmhouse land. Please share advocate legal opinion summary.",
      status: "new",
      internal_notes: "",
      created_at: "2026-02-16T08:30:00Z",
    },
    {
      id: "enq-3",
      customer_name: "G. Selvam",
      phone: "+91 97890 44556",
      property_title: "48 Cents Prime Residential Plot Enclave (Madurai)",
      message: "Inquired about splitting into 24 cent parcels and DTCP layout approval status.",
      status: "contacted",
      internal_notes: "Spoke on phone for 15 mins. Sent layout boundary sketch via WhatsApp.",
      created_at: "2026-02-15T16:45:00Z",
    },
    {
      id: "enq-4",
      customer_name: "T. Rajesh",
      phone: "+91 98940 33445",
      email: "rajesh.transport@yahoo.com",
      property_title: "1.25 Acre L&T Bypass Industrial & Logistics Land (Coimbatore)",
      message: "Required for container fleet parking. Finalized token advance discussion.",
      status: "closed",
      internal_notes: "Deal advanced to title deed inspection at advocate office.",
      created_at: "2026-02-12T11:20:00Z",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  const handleStatusChange = (id: string, newStatus: "new" | "contacted" | "closed") => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );
  };

  const handleNotesChange = (id: string, notes: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, internal_notes: notes } : e))
    );
  };

  const filtered = enquiries.filter((e) => {
    if (statusFilter !== "all" && e.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        e.customer_name.toLowerCase().includes(q) ||
        e.phone.includes(q) ||
        e.property_title.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-ivory-50/50">
      <AdminNavbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
              Customer Enquiry & Lead Management
            </h1>
            <p className="text-xs sm:text-sm text-charcoal-500 mt-1">
              Direct buyer leads generated from public property listings across Tamil Nadu
            </p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-ivory-200 shadow-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name, phone, property..."
              className="w-full h-10 pl-9 pr-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
            />
            <Search className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-1.5">
            {["all", "new", "contacted", "closed"].map((st) => (
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

        {/* Enquiries Grid */}
        <div className="space-y-4">
          {filtered.map((enq) => {
            const cleanPhone = enq.phone.replace(/[^0-9]/g, "");
            const whatsappText = `Vanakkam ${enq.customer_name}! This is ${brandConfig.brokerName} following up regarding your enquiry for "${enq.property_title}".`;

            return (
              <div
                key={enq.id}
                className="bg-white rounded-3xl p-6 border border-ivory-200 shadow-subtle flex flex-col lg:flex-row items-start justify-between gap-6"
              >
                {/* Customer & Property Details */}
                <div className="space-y-3 flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-serif font-bold text-base text-forest-950">
                      {enq.customer_name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                        enq.status === "new"
                          ? "bg-rose-100 text-rose-800 border border-rose-200"
                          : enq.status === "contacted"
                          ? "bg-amber-100 text-amber-800 border border-amber-200"
                          : "bg-emerald-100 text-emerald-800 border border-emerald-200"
                      }`}
                    >
                      {enq.status}
                    </span>
                    <span className="text-xs text-charcoal-400">
                      {new Date(enq.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-forest-900 bg-ivory-100/70 p-2.5 rounded-xl border border-ivory-200">
                    Interested Property: {enq.property_title}
                  </div>

                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed bg-ivory-50/50 p-3 rounded-xl border border-ivory-100">
                    "{enq.message}"
                  </p>

                  {/* Internal Admin Notes Input */}
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider mb-1">
                      Internal Brokerage Notes (Private)
                    </label>
                    <input
                      type="text"
                      value={enq.internal_notes || ""}
                      onChange={(e) => handleNotesChange(enq.id, e.target.value)}
                      placeholder="Add private note regarding client budget, site visit dates..."
                      className="w-full h-9 px-3 rounded-lg border border-ivory-300 bg-ivory-50/40 text-xs text-charcoal-800 focus:outline-none focus:ring-1 focus:ring-forest-800"
                    />
                  </div>
                </div>

                {/* Status Switcher & Contact Actions */}
                <div className="w-full lg:w-64 space-y-3 shrink-0 pt-2 lg:pt-0 lg:border-l lg:border-ivory-200 lg:pl-6">
                  <div>
                    <label className="block text-[11px] font-semibold text-charcoal-500 uppercase tracking-wider mb-1">
                      Update Lead Status
                    </label>
                    <select
                      value={enq.status}
                      onChange={(e) =>
                        handleStatusChange(enq.id, e.target.value as any)
                      }
                      className="w-full h-9 px-3 rounded-lg border border-ivory-300 bg-white text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-forest-800 font-medium"
                    >
                      <option value="new">New (Needs Action)</option>
                      <option value="contacted">Contacted / In Discussion</option>
                      <option value="closed">Closed / Deal Finalized</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-1">
                    <a
                      href={`tel:${enq.phone}`}
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold shadow-xs transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-gold-400" />
                      <span>Call {enq.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappText)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
