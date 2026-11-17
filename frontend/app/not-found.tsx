import React from "react";
import Link from "next/link";
import { Compass, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center py-20 px-4 text-center">
      <div className="max-w-md space-y-5">
        <div className="w-16 h-16 rounded-3xl bg-forest-900 text-gold-400 flex items-center justify-center mx-auto shadow-elevated">
          <Compass className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-forest-950">
          Land Parcel Not Found
        </h1>
        <p className="text-sm text-charcoal-600 leading-relaxed">
          The property listing or page you are searching for might have been sold, archived, or moved.
        </p>
        <div className="pt-2">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-forest-900 hover:bg-forest-800 text-ivory-50 text-xs font-semibold shadow-subtle transition-colors"
          >
            <Home className="w-4 h-4 text-gold-400" />
            <span>Explore Available Lands</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
