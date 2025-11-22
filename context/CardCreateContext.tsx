import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { useTheme } from "./ThemeContext";

/** -------- Types -------- */

export type SocialKey =
  | "phone" | "email" | "link" | "address" | "website"
  | "linkedin" | "instagram" | "calendly" | "x" | "facebook"
  | "threads" | "snapchat" | "tiktok" | "youtube" | "github"
  | "yelp" | "venmo" | "paypal" | "cashapp" | "discord"
  | "signal" | "skype" | "telegram" | "twitch" | "whatsapp";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  middleName?: string;
  prefix?: string;
  suffix?: string;
  pronoun?: string;
  preferredName?: string;
  maidenName?: string;

  jobTitle: string;
  department: string;
  company: string;
  headline: string;

  accreditations: string[];
}

export interface CardData {
  selectedColor: string;
  selectedLayoutId: number;
  selectedProfileImage: string;
  selectedCompanyLogo: string;
  selectedBannerImage: string;

  personal: PersonalInfo;
  socials: Partial<Record<SocialKey, string>>;

  whereWeMetEnabled: boolean;
  whereWeMetText: string;
  removeBrandingEnabled: boolean;

  cardId?: string;
}

/** -------- Context Type -------- */

interface CardCreateContextType {
  // ✅ UI-friendly individual states (like you want)
  selectedColor: string;
  setSelectedColor: Dispatch<SetStateAction<string>>;
  selectedLayoutId: number;
  setSelectedLayoutId: Dispatch<SetStateAction<number>>;
  selectedProfileImage: string;
  setSelectedProfileImage: Dispatch<SetStateAction<string>>;
  selectedCompanyLogo: string;
  setSelectedCompanyLogo: Dispatch<SetStateAction<string>>;
  selectedBannerImage: string;
  setSelectedBannerImage: Dispatch<SetStateAction<string>>;

  // ✅ full card object
  cardData: CardData;
  setCardData: Dispatch<SetStateAction<CardData>>;

  // helpers
  updatePersonal: <K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) => void;
  setSocial: (key: SocialKey, value: string) => void;
  removeSocial: (key: SocialKey) => void;
  addAccreditation: (text: string) => void;
  removeAccreditation: (index: number) => void;
}

export const CardCreateContext = createContext<CardCreateContextType | undefined>(undefined);

/** -------- Provider -------- */

const CardCreateProvider = ({ children }: { children: React.ReactNode }) => {
  const { colors } = useTheme();

  // ✅ 1) Individual states for instant UI preview
  const [selectedColor, setSelectedColor] = useState<string>(colors.background);
  const [selectedLayoutId, setSelectedLayoutId] = useState<number>(0);
  const [selectedProfileImage, setSelectedProfileImage] = useState<string>("");
  const [selectedCompanyLogo, setSelectedCompanyLogo] = useState<string>("");
  const [selectedBannerImage, setSelectedBannerImage] = useState<string>("");

  // ✅ 2) Full card data object (everything together)
  const [cardData, setCardData] = useState<CardData>({
    selectedColor: colors.background,
    selectedLayoutId: 0,
    selectedProfileImage: "",
    selectedCompanyLogo: "",
    selectedBannerImage: "",

    personal: {
      firstName: "",
      lastName: "",
      middleName: "",
      prefix: "",
      suffix: "",
      pronoun: "",
      preferredName: "",
      maidenName: "",
      jobTitle: "",
      department: "",
      company: "",
      headline: "",
      accreditations: [],
    },

    socials: {},
    whereWeMetEnabled: false,
    whereWeMetText: "",
    removeBrandingEnabled: false,
  });

  // ✅ 3) Sync individual states -> cardData
  useEffect(() => {
    setCardData(prev => ({
      ...prev,
      selectedColor,
      selectedLayoutId,
      selectedProfileImage,
      selectedCompanyLogo,
      selectedBannerImage,
    }));
  }, [
    selectedColor,
    selectedLayoutId,
    selectedProfileImage,
    selectedCompanyLogo,
    selectedBannerImage,
  ]);

  // ✅ helpers for nested updates
  const updatePersonal = <K extends keyof PersonalInfo>(key: K, value: PersonalInfo[K]) => {
    setCardData(prev => ({
      ...prev,
      personal: { ...prev.personal, [key]: value },
    }));
  };

  const setSocial = (key: SocialKey, value: string) => {
    setCardData(prev => ({
      ...prev,
      socials: { ...prev.socials, [key]: value },
    }));
  };

  const removeSocial = (key: SocialKey) => {
    setCardData(prev => {
      const next = { ...(prev.socials || {}) };
      delete next[key];
      return { ...prev, socials: next };
    });
  };

  const addAccreditation = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setCardData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        accreditations: [...prev.personal.accreditations, trimmed],
      },
    }));
  };

  const removeAccreditation = (index: number) => {
    setCardData(prev => ({
      ...prev,
      personal: {
        ...prev.personal,
        accreditations: prev.personal.accreditations.filter((_, i) => i !== index),
      },
    }));
  };

  const value = useMemo(
    () => ({
      // individual states
      selectedColor,
      setSelectedColor,
      selectedLayoutId,
      setSelectedLayoutId,
      selectedProfileImage,
      setSelectedProfileImage,
      selectedCompanyLogo,
      setSelectedCompanyLogo,
      selectedBannerImage,
      setSelectedBannerImage,

      // full data
      cardData,
      setCardData,

      // helpers
      updatePersonal,
      setSocial,
      removeSocial,
      addAccreditation,
      removeAccreditation,
    }),
    [
      selectedColor,
      selectedLayoutId,
      selectedProfileImage,
      selectedCompanyLogo,
      selectedBannerImage,
      cardData,
    ]
  );

  return (
    <CardCreateContext.Provider value={value}>
      {children}
    </CardCreateContext.Provider>
  );
};

/** -------- Hook -------- */

export const useCardCreate = (): CardCreateContextType => {
  const context = useContext(CardCreateContext);
  if (!context) {
    throw new Error("useCardCreate must be used within a CardCreateProvider");
  }
  return context;
};

export default CardCreateProvider;