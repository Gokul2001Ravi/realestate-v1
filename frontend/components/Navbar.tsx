"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import { brandConfig } from "@/lib/brandConfig";
import {
  Compass,
  Phone,
  Globe,
  Menu,
  X,
  ShieldCheck,
  Trees,
} from "lucide-react";

export function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const brandName = language === "ta" ? brandConfig.nameTa : brandConfig.nameEn;

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/properties", label: t.nav.explore },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-ivory-200/80 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label={brandName}
          >
            <div className="w-11 h-11 rounded-xl bg-forest-900 flex items-center justify-center text-gold-400 shadow-subtle group-hover:bg-forest-800 transition-colors">
              <Trees className="w-6 h-6 stroke-[1.75]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-forest-950 group-hover:text-forest-800 transition-colors">
                {brandName}
              </span>
              <span className="text-[10px] sm:text-xs font-medium uppercase tracking-wider text-charcoal-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-gold-600 inline" />
                {language === "ta" ? "சரிபார்க்கப்பட்ட நிலத் தரகு" : "Verified Land Brokerage"}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-forest-700 py-1 border-b-2 ${
                    isActive
                      ? "text-forest-900 border-forest-800 font-semibold"
                      : "text-charcoal-700 border-transparent hover:border-ivory-300"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions: Language Switcher & Call Button */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-ivory-100 hover:bg-ivory-200 text-forest-900 border border-ivory-300 transition-colors shadow-xs"
              title={language === "en" ? "தமிழில் பார்க்க" : "Switch to English"}
            >
              <Globe className="w-3.5 h-3.5 text-gold-600" />
              <span>{language === "en" ? "தமிழ்" : "English"}</span>
            </button>

            {/* Direct Phone Call CTA */}
            <a
              href={`tel:${brandConfig.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-forest-900 text-ivory-50 hover:bg-forest-800 transition-colors shadow-subtle"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>{brandConfig.displayPhone}</span>
            </a>
          </div>

          {/* Mobile Right Controls: Language toggle + Hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleLanguage}
              className="px-2.5 py-1 rounded-full text-xs font-semibold bg-ivory-100 text-forest-900 border border-ivory-300"
            >
              {language === "en" ? "தமிழ்" : "EN"}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-700 hover:text-forest-900 hover:bg-ivory-100 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-ivory-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-elevated animate-in fade-in slide-in-from-top-2">
          <div className="space-y-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                    isActive
                      ? "bg-forest-50 text-forest-900 font-semibold"
                      : "text-charcoal-800 hover:bg-ivory-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-ivory-200 flex flex-col gap-2.5">
            <a
              href={`tel:${brandConfig.phone}`}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-forest-900 text-ivory-50 text-sm font-medium"
            >
              <Phone className="w-4 h-4 text-gold-400" />
              <span>
                {t.nav.callUs}: {brandConfig.displayPhone}
              </span>
            </a>
            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center text-xs text-charcoal-400 hover:text-charcoal-700 py-1"
            >
              {t.nav.adminPortal}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
