"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PropertyMedia } from "@/types/property";
import { useLanguage } from "@/context/LanguageContext";
import {
  Video,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Camera,
} from "lucide-react";

interface MediaGalleryProps {
  media: PropertyMedia[];
  title: string;
}

export function MediaGallery({ media, title }: MediaGalleryProps) {
  const { t } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!media || media.length === 0) {
    return (
      <div className="aspect-[16/9] w-full rounded-2xl bg-ivory-100 flex items-center justify-center text-charcoal-400">
        <Camera className="w-8 h-8 opacity-40" />
      </div>
    );
  }

  const currentMedia = media[selectedIndex] || media[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === media.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Main Showcase Hero */}
      <div
        onClick={() => setLightboxOpen(true)}
        className="group relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-forest-950 cursor-pointer shadow-card"
      >
        <Image
          src={currentMedia.media_url}
          alt={currentMedia.caption || title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
          className="object-cover transition-transform duration-700 group-hover:scale-102"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Media Type Badge */}
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
          {currentMedia.media_type === "drone_photo" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest-950/80 text-gold-300 backdrop-blur-md border border-gold-500/30">
              <Camera className="w-3.5 h-3.5 text-gold-400" />
              <span>4K Aerial Drone Capture</span>
            </span>
          )}
          {currentMedia.media_type === "drone_video" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/80 text-rose-300 backdrop-blur-md border border-rose-500/30">
              <Video className="w-3.5 h-3.5 text-rose-400" />
              <span>Drone Video Tour</span>
            </span>
          )}
        </div>

        {/* Expand & Counter */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/60 text-white backdrop-blur-md">
            {selectedIndex + 1} / {media.length}
          </span>
          <button
            onClick={() => setLightboxOpen(true)}
            className="p-2 rounded-full bg-black/60 text-white hover:bg-forest-900 transition-colors backdrop-blur-md"
            aria-label="Expand image"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Left/Right Quick Arrows */}
        {media.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-all opacity-80 sm:opacity-0 sm:group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {media.length > 1 && (
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-none">
          {media.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-18 w-24 sm:h-20 sm:w-28 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                idx === selectedIndex
                  ? "border-forest-800 scale-102 ring-2 ring-forest-800/20"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={item.media_url}
                alt={item.caption || `Thumbnail ${idx + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
              {item.media_type === "drone_video" && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center">
            <Image
              src={currentMedia.media_url}
              alt={currentMedia.caption || title}
              fill
              className="object-contain"
            />
          </div>

          {/* Lightbox Navigation */}
          {media.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
              >
                <ChevronLeft className="w-7 h-7" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
              >
                <ChevronRight className="w-7 h-7" />
              </button>
            </>
          )}

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">
            {selectedIndex + 1} / {media.length} — {currentMedia.caption || title}
          </div>
        </div>
      )}
    </div>
  );
}
