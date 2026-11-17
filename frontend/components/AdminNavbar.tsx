"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Trees,
  LayoutDashboard,
  Building2,
  Inbox,
  PlusCircle,
  LogOut,
  UserCheck,
  ExternalLink,
} from "lucide-react";

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
    }
    router.push("/admin/login");
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
    { href: "/admin/properties", label: "Properties", icon: <Building2 className="w-4 h-4" /> },
    { href: "/admin/enquiries", label: "Enquiries", icon: <Inbox className="w-4 h-4" /> },
  ];

  return (
    <header className="bg-forest-950 text-ivory-50 border-b border-forest-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Brand / Admin Tag */}
          <div className="flex items-center gap-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest-900 border border-gold-500/30 flex items-center justify-center text-gold-400">
                <Trees className="w-4 h-4" />
              </div>
              <div>
                <span className="font-serif font-bold text-base tracking-tight text-white">
                  Nilam Prime
                </span>
                <span className="ml-2 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-gold-500/20 text-gold-300 border border-gold-400/30">
                  Admin Portal
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 pl-4 border-l border-forest-800">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isActive
                        ? "bg-forest-900 text-gold-300 border border-forest-700"
                        : "text-ivory-200/80 hover:bg-forest-900/60 hover:text-white"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Quick Add + Live Site Link + Logout */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/properties/new"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-forest-950 text-xs font-semibold shadow-xs transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Land</span>
            </Link>

            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-ivory-300 hover:text-white hover:bg-forest-900 transition-colors"
              title="View Public Website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Site</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-rose-300 hover:bg-rose-950/60 hover:text-rose-200 border border-transparent hover:border-rose-900 transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
