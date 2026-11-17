export type PropertyCategory =
  | "agricultural_land"
  | "residential_plot"
  | "commercial_land"
  | "farm_land"
  | "other_land";

export type LandAreaUnit = "acres" | "cents" | "sq_ft" | "hectares";

export type PropertyStatus = "draft" | "published" | "sold" | "inactive";

export type MediaType = "image" | "drone_photo" | "drone_video" | "walkthrough_video";

export interface PropertyMedia {
  id: string;
  property_id: string;
  media_url: string;
  media_type: MediaType;
  is_cover: boolean;
  display_order: number;
  caption?: string;
}

export interface PropertyDocument {
  id: string;
  property_id: string;
  document_name: string;
  storage_path: string;
  created_at: string;
}

export interface Property {
  id: string;
  title: string;
  title_ta?: string;
  slug: string;
  description_en: string;
  description_ta: string;
  property_type: PropertyCategory;
  state: string;
  district: string;
  taluk: string;
  village: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  land_area: number;
  land_area_unit: LandAreaUnit;
  total_price: number;
  price_per_cent?: number;
  negotiable: boolean;
  road_access: string;
  road_access_ta?: string;
  road_width_ft?: number;
  water_availability: string;
  water_availability_ta?: string;
  electricity_availability: string;
  electricity_availability_ta?: string;
  land_classification: string;
  land_classification_ta?: string;
  approval_details?: string;
  approval_details_ta?: string;
  patta_available: boolean;
  chitta_adangal_available?: boolean;
  fmb_available?: boolean;
  status: PropertyStatus;
  is_featured: boolean;
  media: PropertyMedia[];
  created_at: string;
  updated_at: string;
  // Private admin-only fields:
  private_brokerage_notes?: string;
  private_survey_number?: string;
  owner_name?: string;
  owner_phone?: string;
}

export interface Enquiry {
  id: string;
  property_id?: string;
  property_title?: string;
  customer_name: string;
  phone: string;
  email?: string;
  message: string;
  status: "new" | "contacted" | "closed";
  internal_notes?: string;
  created_at: string;
}

export interface PropertyFilterParams {
  query?: string;
  district?: string;
  property_type?: PropertyCategory | "all";
  min_price?: number;
  max_price?: number;
  min_area?: number;
  max_area?: number;
  sort_by?: "latest" | "price_asc" | "price_desc" | "area_desc";
}
