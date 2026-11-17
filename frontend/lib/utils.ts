import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { LandAreaUnit } from "@/types/property";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number, lang: "en" | "ta" = "en"): string {
  if (amount >= 10000000) {
    const crores = (amount / 10000000).toFixed(2).replace(/\.00$/, "");
    return lang === "ta" ? `₹${crores} கோடி` : `₹${crores} Cr`;
  }
  if (amount >= 100000) {
    const lakhs = (amount / 100000).toFixed(2).replace(/\.00$/, "");
    return lang === "ta" ? `₹${lakhs} லட்சம்` : `₹${lakhs} Lakhs`;
  }
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatArea(area: number, unit: LandAreaUnit, lang: "en" | "ta" = "en"): string {
  const unitLabels = {
    en: {
      acres: area === 1 ? "Acre" : "Acres",
      cents: "Cents",
      sq_ft: "Sq. Ft.",
      hectares: "Hectares",
    },
    ta: {
      acres: "ஏக்கர்",
      cents: "சென்ட்",
      sq_ft: "சதுர அடி",
      hectares: "ஹெக்டேர்",
    },
  };
  return `${area} ${unitLabels[lang][unit] || unit}`;
}

export function generateWhatsAppLink(
  phoneNumber: string,
  propertyTitle?: string,
  district?: string,
  propertyUrl?: string,
  lang: "en" | "ta" = "en"
): string {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  let message = "";
  if (propertyTitle) {
    message =
      lang === "ta"
        ? `வணக்கம்! உங்கள் இணையதளத்தில் உள்ள இந்த நிலத்தைப் பற்றி மேலும் அறிய விரும்புகிறேன்:\n\n*${propertyTitle}*\nமாவட்டம்: ${district || "தமிழ்நாடு"}${propertyUrl ? `\nஇணைப்பு: ${propertyUrl}` : ""}\n\nதயவுசெய்து ஆவணங்கள் மற்றும் பார்வைக்கான விபரங்களைத் தெரிவிக்கவும்.`
        : `Vanakkam! I would like to inquire about the following property on your platform:\n\n*${propertyTitle}*\nDistrict: ${district || "Tamil Nadu"}${propertyUrl ? `\nLink: ${propertyUrl}` : ""}\n\nPlease share survey boundary details and site visit availability.`;
  } else {
    message =
      lang === "ta"
        ? `வணக்கம்! தமிழ்நாடு நில முதலீடு மற்றும் நிலத் தேவைகள் தொடர்பாக ஆலோசிக்க விரும்புகிறேன்.`
        : `Vanakkam! I would like to consult with you regarding land discovery and verified plots in Tamil Nadu.`;
  }

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
