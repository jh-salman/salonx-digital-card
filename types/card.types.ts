// Card data types for the Blinq Clone app
export interface CardData {
  id?: string;
  user_id?: string;
  card_title: string;
  card_subtitle?: string;
  card_color: string;
  layout_type: string;
  slug?: string;
  is_active: boolean;
  is_public: boolean;
  
  images: {
    profile_picture: string | null;
    company_logo: string | null;
    cover_photo: string | null;
  };
  
  personal_details: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    prefix?: string;
    suffix?: string;
    pronoun?: string;
    preferred_name?: string;
    maiden_name?: string;
    job_title?: string;
    department?: string;
    company?: string;
    headline?: string;
    bio?: string;
    accreditations?: string[];
  };
  
  contacts: {
    phone?: string;
    email?: string;
    website?: string;
    address?: string;
    city?: string;
    country?: string;
  };
  
  social_links: {
    phone?: string;
    email?: string;
    link?: string;
    address?: string;
    company_website?: string;
    linkedin?: string;
    instagram?: string;
    calendly?: string;
    x?: string;
    facebook?: string;
    threads?: string;
    snapchat?: string;
    tiktok?: string;
    youtube?: string;
    github?: string;
    yelp?: string;
    venmo?: string;
    paypal?: string;
    cashapp?: string;
    discord?: string;
    signal?: string;
    skype?: string;
    telegram?: string;
    twitch?: string;
    whatsapp?: string;
  };
  
  qr_code: {
    url: string;
    add_logo_in_qr: boolean;
    remove_branding: boolean;
    qr_data?: string;
  };
  
  settings: {
    theme_color: string;
    font_family: string;
    show_shadow: boolean;
    show_border: boolean;
    border_radius: number;
    animation: string;
    show_where_we_met: boolean;
    remove_branding: boolean;
  };
  
  created_at?: string;
  updated_at?: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  preview_image?: string;
  description?: string;
  category: string;
  layout_config: {
    banner_position: string;
    logo_position: string;
    theme: string;
    font: string;
    color_scheme: string[];
  };
  is_default: boolean;
  is_premium: boolean;
}

export interface SocialPlatform {
  id: number;
  name: string;
  display_name: string;
  icon_name: string;
  base_url?: string;
  placeholder: string;
  color: string;
  is_active: boolean;
  sort_order: number;
}

export interface CardMedia {
  id: string;
  card_id: string;
  user_id: string;
  type: 'profile_picture' | 'company_logo' | 'cover_photo' | 'gallery';
  file_url: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  created_at: string;
}

export interface CardCreateState {
  cardData: CardData;
  isLoading: boolean;
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  errors: Record<string, string>;
  selectedTemplate?: CardTemplate;
  uploadProgress: Record<string, number>;
}

export interface CardCreateActions {
  updateCardData: (data: Partial<CardData>) => void;
  updatePersonalDetails: (details: Partial<CardData['personal_details']>) => void;
  updateContacts: (contacts: Partial<CardData['contacts']>) => void;
  updateSocialLinks: (links: Partial<CardData['social_links']>) => void;
  updateImages: (images: Partial<CardData['images']>) => void;
  updateSettings: (settings: Partial<CardData['settings']>) => void;
  setCardColor: (color: string) => void;
  setLayoutType: (layout: string) => void;
  setCardTitle: (title: string) => void;
  saveCard: () => Promise<void>;
  resetCard: () => void;
  validateField: (field: string, value: any) => string | null;
  uploadImage: (type: CardMedia['type'], file: any) => Promise<string>;
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
}

export type CardCreateContextType = CardCreateState & CardCreateActions;

// Color palette types
export interface ColorOption {
  id: string;
  name: string;
  value: string;
  isCustom?: boolean;
}

// Layout types
export interface LayoutOption {
  id: string;
  name: string;
  preview: string;
  description: string;
  config: {
    banner_position: 'top' | 'center' | 'bottom';
    logo_position: 'left' | 'center' | 'right';
    profile_position: 'left' | 'center' | 'right';
    text_alignment: 'left' | 'center' | 'right';
  };
}

// Form validation types
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [key: string]: ValidationRule;
}

// Upload types
export interface UploadProgress {
  [key: string]: number;
}

export interface ImageUploadResult {
  url: string;
  file_name: string;
  file_size: number;
  mime_type: string;
}
