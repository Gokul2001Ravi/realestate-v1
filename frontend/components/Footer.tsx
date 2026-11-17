"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { brandConfig } from "@/lib/brandConfig";
import {
  Trees,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  ArrowUpRight,
  Lock,
} from "lucide-react";

export function Footer() {
  const { language, t } = useLanguage();
  const brandName = language === "ta" ? brandConfig.nameTa : brandConfig.nameEn;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest-950 text-ivory-100 border-t border-forest-900/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-forest-900/80">
          {/* Col 1 & 2: Brand & Narrative */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-forest-900 flex items-center justify-center text-gold-400 border border-forest-800">
                <Trees className="w-5 h-5 stroke-[1.75]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-ivory-50">
                {brandName}
              </span>
            </div>
            <p className="text-sm text-ivory-200/80 leading-relaxed max-w-sm">
              {language === "ta"
                ? brandConfig.descriptionTa
                : brandConfig.descriptionEn}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-900/60 border border-forest-800/80 text-xs text-gold-300">
              <ShieldCheck className="w-4 h-4 text-gold-400" />
              <span>
                {language === "ta"
                  ? "தனிநபர் சரிபார்க்கப்பட்ட நிலத் தரகு"
                  : "Private Verified Land Brokerage"}
              </span>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold-400 font-sans">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2.5 text-sm text-ivory-200/80">
              <li>
                <Link
                  href="/"
                  className="hover:text-gold-300 transition-colors inline-flex items-center gap-1"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="hover:text-gold-300 transition-colors inline-flex items-center gap-1"
                >
                  {t.nav.explore}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-gold-300 transition-colors inline-flex items-center gap-1"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-gold-300 transition-colors inline-flex items-center gap-1"
                >
                  {t.nav.contact}
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin/login"
                  className="text-xs text-forest-400 hover:text-gold-300 transition-colors inline-flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3" />
                  {t.nav.adminPortal}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Service Districts in Tamil Nadu */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold-400 font-sans">
              {t.footer.serviceAreas}
            </h4>
            <div className="flex flex-wrap gap-1.5 text-xs text-ivory-200/80">
              {brandConfig.serviceDistricts.map((district) => (
                <span
                  key={district}
                  className="px-2.5 py-1 rounded bg-forest-900/50 border border-forest-800/40"
                >
                  {district}
                </span>
              ))}
            </div>
          </div>

          {/* Col 5: Broker Contact Card */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider uppercase text-gold-400 font-sans">
              {t.footer.contactInfo}
            </h4>
            <div className="space-y-3 text-sm text-ivory-200/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                <span className="text-xs leading-relaxed">
                  {brandConfig.address.line1}, {brandConfig.address.city},{" "}
                  {brandConfig.address.state} - {brandConfig.address.pincode}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`tel:${brandConfig.phone}`}
                  className="text-xs hover:text-gold-300 transition-colors"
                >
                  {brandConfig.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a
                  href={`mailto:${brandConfig.email}`}
                  className="text-xs hover:text-gold-300 transition-colors"
                >
                  {brandConfig.email}
                </a>
              </div>
            </div>

            <a
              href={`https://wa.me/${brandConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors shadow-sm"
            >
              <span>{t.nav.whatsapp}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-forest-400">
          <p className="max-w-2xl text-center md:text-left leading-relaxed">
            {t.footer.disclaimer}
          </p>
          <p className="shrink-0 text-center md:text-right">
            © {currentYear} {brandName}. {t.footer.allRights}
          </p>
        </div>
      </div>
    </footer>
  );
}
