export const imageLayoutOptions = [
    {
      id: 1,
      key: "ONLY_PROFILE_TOP_HALF",
      title: "Only Profile (Top Half)",
      description: "উপরের অর্ধেক অংশে শুধু প্রোফাইল ইমেজ, নিচের অংশ ফাঁকা।",
      profile: {
        visible: true,
        position: "top-center",
        heightRatio: 0.5,
        shape: "circle",
        isBackground: false,
      },
      logo: {
        visible: false,
      },
      banner: {
        visible: false,
      },
    },
  
    {
      id: 2,
      key: "ONLY_LOGO_2_5",
      title: "Only Logo (2/5 Height)",
      description: "উপরের ২/৫ অংশে শুধু logo, বাকিটা ফাঁকা।",
      profile: {
        visible: false,
      },
      logo: {
        visible: true,
        position: "top-center",
        heightRatio: 0.4, // 2/5 ≈ 0.4
        shape: "rect",
        isBackground: false,
      },
      banner: {
        visible: false,
      },
    },
  
    {
      id: 3,
      key: "ONLY_BANNER_2_5",
      title: "Only Banner (2/5 Height)",
      description: "উপরের ২/৫ অংশে শুধু banner image, নিচের অংশ ফাঁকা।",
      profile: {
        visible: false,
      },
      logo: {
        visible: false,
      },
      banner: {
        visible: true,
        position: "top",
        heightRatio: 0.4,
        shape: "rect",
        isBackground: false,
      },
    },
  
    {
      id: 4,
      key: "HALF_PROFILE_BOTTOM_LOGO",
      title: "Half Profile + Bottom Left Logo",
      description: "উপরের অর্ধেক প্রোফাইল ইমেজ, নিচের বাম পাশে ছোট logo।",
      profile: {
        visible: true,
        position: "top-center",
        heightRatio: 0.5,
        shape: "circle",
        isBackground: false,
      },
      logo: {
        visible: true,
        position: "bottom-left",
        heightRatio: 0.2,
        shape: "rect",
        isBackground: false,
      },
      banner: {
        visible: false,
      },
    },
  
    {
      id: 5,
      key: "HALF_BG_LOGO_BOTTOM_PROFILE",
      title: "Half BG Logo + Bottom Left Profile",
      description:
        "উপরের অর্ধেক ব্যাকগ্রাউন্ডে বড় logo, নিচের বাম পাশে গোল প্রোফাইল।",
      profile: {
        visible: true,
        position: "bottom-left",
        heightRatio: 0.2,
        shape: "circle",
        isBackground: false,
      },
      logo: {
        visible: true,
        position: "top-center",
        heightRatio: 0.5,
        shape: "rect",
        isBackground: true, // bg logo
      },
      banner: {
        visible: false,
      },
    },
  
    {
      id: 6,
      key: "HALF_BANNER_BOTTOM_PROFILE",
      title: "Half Banner + Bottom Left Profile",
      description:
        "উপরের অর্ধেক banner image, নিচের বাম পাশে গোল প্রোফাইল ইমেজ।",
      profile: {
        visible: true,
        position: "bottom-left",
        heightRatio: 0.2,
        shape: "circle",
        isBackground: false,
      },
      logo: {
        visible: false,
      },
      banner: {
        visible: true,
        position: "top",
        heightRatio: 0.5,
        shape: "rect",
        isBackground: true,
      },
    },
  
    {
      id: 7,
      key: "HALF_BG_BANNER_BOTTOM_LOGO",
      title: "Half BG Banner + Bottom Left Logo",
      description:
        "উপরের অর্ধেক ব্যাকগ্রাউন্ড banner, নিচের বাম পাশে rectangle logo।",
      profile: {
        visible: false,
      },
      logo: {
        visible: true,
        position: "bottom-left",
        heightRatio: 0.2,
        shape: "rect",
        isBackground: false,
      },
      banner: {
        visible: true,
        position: "top",
        heightRatio: 0.5,
        shape: "rect",
        isBackground: true,
      },
    },
  
    {
      id: 8,
      key: "BG_BANNER_BOTTOM_PROFILE_AND_LOGO",
      title: "BG Banner + Bottom Profile & Logo",
      description:
        "পুরো ব্যাকগ্রাউন্ডে banner, নিচের বাম পাশে গোল প্রোফাইল, ডান পাশে rectangle logo।",
      profile: {
        visible: true,
        position: "bottom-left",
        heightRatio: 0.2,
        shape: "circle",
        isBackground: false,
      },
      logo: {
        visible: true,
        position: "bottom-right",
        heightRatio: 0.2,
        shape: "rect",
        isBackground: false,
      },
      banner: {
        visible: true,
        position: "background",
        heightRatio: 1,
        shape: "rect",
        isBackground: true,
      },
    },
  ];


  export const imagePickOptions = [
    { id: "profile", label: "Profile", type: "profile" },
    { id: "logo", label: "Company Logo", type: "logo" },
    { id: "banner", label: "Banner Image", type: "banner" },
  ];