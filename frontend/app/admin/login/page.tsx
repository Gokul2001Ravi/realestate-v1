"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Trees, Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Fast-track validation for authorized administrators
    if (
      (email === "broker@nilamprime.com" && password === "BrokerPrime@2026") ||
      (email === "gokulravi.hhc@gmail.com" && password === "Gokul@123")
    ) {
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_token", "mock_jwt_authorized_token_2026");
        localStorage.setItem(
          "admin_user",
          JSON.stringify({
            email,
            name: email.includes("broker")
              ? "K. Sundaralingam (Principal Broker)"
              : "S. Vignesh (Brokerage Assistant)",
            role: email.includes("broker") ? "super_admin" : "admin",
          })
        );
      }
      router.push("/admin/dashboard");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || "Invalid administrator credentials");
      }

      const tokenData = await res.json();
      if (typeof window !== "undefined") {
        localStorage.setItem("admin_token", tokenData.access_token);
        localStorage.setItem("admin_user", JSON.stringify(tokenData));
      }
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please verify your authorized administrator email.");
    } finally {
      setLoading(false);
    }
  };

  const setTestAccount = (testEmail: string, testPass: string) => {
    setEmail(testEmail);
    setPassword(testPass);
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-ivory-200/90 shadow-elevated">
        <div className="text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-forest-950 flex items-center justify-center text-gold-400 mx-auto shadow-subtle">
            <Trees className="w-7 h-7" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest-950">
            Administrator Portal
          </h2>
          <p className="text-xs text-charcoal-500">
            Authorized Land Broker & Assistant Access Only
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">
              Administrator Email
            </label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="broker@nilamprime.com"
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
              />
              <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal-700 mb-1">
              Secure Password
            </label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-11 pl-10 pr-3 rounded-xl border border-ivory-300 bg-ivory-50/50 text-xs text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-forest-800/20 focus:border-forest-800"
              />
              <Lock className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-forest-900 hover:bg-forest-800 disabled:opacity-60 text-ivory-50 text-sm font-semibold flex items-center justify-center gap-2 shadow-subtle transition-colors"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-gold-400" />
                <span>Sign In to Admin Portal</span>
              </>
            )}
          </button>
        </form>

        {/* Quick Credentials Helper for the 2 Authorized Users */}
        <div className="pt-4 border-t border-ivory-200 space-y-2.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-charcoal-400 block text-center">
            Authorized Accounts (Two Admins)
          </span>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => setTestAccount("broker@nilamprime.com", "BrokerPrime@2026")}
              className="p-2 rounded-lg bg-ivory-100 hover:bg-ivory-200 text-forest-900 text-left border border-ivory-300 transition-colors"
            >
              <div className="font-bold">Admin 1: Broker</div>
              <div className="text-[10px] text-charcoal-500">broker@nilamprime.com</div>
            </button>
            <button
              type="button"
              onClick={() => setTestAccount("gokulravi.hhc@gmail.com", "Gokul@123")}
              className="p-2 rounded-lg bg-ivory-100 hover:bg-ivory-200 text-forest-900 text-left border border-ivory-300 transition-colors"
            >
              <div className="font-bold">Admin 2: Assistant</div>
              <div className="text-[10px] text-charcoal-500">gokulravi.hhc@gmail.com</div>
            </button>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/"
            className="text-xs text-charcoal-500 hover:text-forest-800 transition-colors inline-flex items-center gap-1"
          >
            <span>← Return to public website</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
