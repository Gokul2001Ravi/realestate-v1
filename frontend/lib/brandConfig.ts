export interface BrandConfig {
  nameEn: string;
  nameTa: string;
  taglineEn: string;
  taglineTa: string;
  descriptionEn: string;
  descriptionTa: string;
  brokerName: string;
  brokerRoleEn: string;
  brokerRoleTa: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  email: string;
  address: {
    line1: string;
    city: string;
    state: string;
    pincode: string;
  };
  serviceDistricts: string[];
  socialLinks: {
    youtube?: string;
    instagram?: string;
    facebook?: string;
  };
}

export const brandConfig: BrandConfig = {
  nameEn: process.env.NEXT_PUBLIC_BRAND_NAME || "Nilam Prime",
  nameTa: process.env.NEXT_PUBLIC_BRAND_NAME_TA || "நிலம் பிரைம்",
  taglineEn: "Curated Lands. Verified Titles. Generational Legacy.",
  taglineTa: "தேர்ந்தெடுக்கப்பட்ட நிலங்கள். தெளிவான பட்டா. தலைமுறை சொத்து.",
  descriptionEn:
    "An exclusive, private land brokerage operating across Tamil Nadu. We personally inspect, survey with drones, and verify every acre before presenting it to discerning buyers.",
  descriptionTa:
    "தமிழ்நாடு முழுவதும் செயல்படும் தனித்துவமான நிலத் தரகு சேவை. ஒவ்வொரு நிலத்தையும் நேரில் பார்வையிட்டு, ட்ரோன் மூலம் அளவிட்டு, ஆவணங்களைச் சரிபார்த்த பின்னரே வழங்குகிறோம்.",
  brokerName: "K. Sundaralingam & Associates",
  brokerRoleEn: "Licensed Land Broker & Land Surveyor",
  brokerRoleTa: "அங்கீகரிக்கப்பட்ட நிலத் தரகர் & நில அளவையாளர்",
  phone: "+919842176540",
  displayPhone: "+91 98421 76540",
  whatsappNumber: "919842176540",
  email: "broker@nilamprime.com",
  address: {
    line1: "42, Avinashi Road, Race Course",
    city: "Coimbatore",
    state: "Tamil Nadu",
    pincode: "641018",
  },
  serviceDistricts: [
    "Coimbatore",
    "Tiruppur",
    "Erode",
    "Dindigul",
    "Madurai",
    "Theni",
    "Tirunelveli",
    "Salem",
    "Thanjavur",
    "Trichy",
  ],
  socialLinks: {
    youtube: "https://youtube.com/@nilamprime",
    instagram: "https://instagram.com/nilamprime",
  },
};
