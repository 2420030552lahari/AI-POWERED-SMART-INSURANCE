import type { Locale } from "./config"

type TranslationKeys = {
  common: {
    welcome: string
    login: string
    logout: string
    signup: string
    submit: string
    cancel: string
    save: string
    delete: string
    edit: string
    search: string
    filter: string
    loading: string
    error: string
    success: string
    viewDetails: string
    downloadPDF: string
    upload: string
    back: string
    next: string
    previous: string
    finish: string
  }
  nav: {
    home: string
    dashboard: string
    policies: string
    claims: string
    payments: string
    profile: string
    support: string
    leads: string
    customers: string
    commission: string
    users: string
    analytics: string
    products: string
    auditLogs: string
  }
  home: {
    heroTitle: string
    heroSubtitle: string
    getStarted: string
    learnMore: string
    featuresTitle: string
    plansTitle: string
  }
  auth: {
    loginTitle: string
    signupTitle: string
    emailPlaceholder: string
    passwordPlaceholder: string
    phonePlaceholder: string
    otpPlaceholder: string
    sendOTP: string
    verifyOTP: string
    selectRole: string
    customer: string
    agent: string
    forgotPassword: string
    rememberMe: string
    dontHaveAccount: string
    alreadyHaveAccount: string
  }
  kyc: {
    title: string
    basicInfo: string
    address: string
    documents: string
    review: string
    fullName: string
    dateOfBirth: string
    gender: string
    panNumber: string
    aadhaarNumber: string
    addressLine1: string
    addressLine2: string
    city: string
    state: string
    pincode: string
    uploadAadhaar: string
    uploadPAN: string
    uploadPhoto: string
    eKYCSuccess: string
    consentMessage: string
    agreeToTerms: string
  }
  policies: {
    myPolicies: string
    policyNumber: string
    policyType: string
    premium: string
    status: string
    renewalDate: string
    active: string
    expired: string
    getPolicies: string
    compareQuotes: string
    buyNow: string
  }
  claims: {
    myClaims: string
    fileNewClaim: string
    claimNumber: string
    claimType: string
    claimAmount: string
    claimStatus: string
    pending: string
    approved: string
    rejected: string
    uploadDocuments: string
    claimTimeline: string
    chatWithAgent: string
  }
}

export const translations: Record<Locale, TranslationKeys> = {
  en: {
    common: {
      welcome: "Welcome",
      login: "Login",
      logout: "Logout",
      signup: "Sign Up",
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      search: "Search",
      filter: "Filter",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      viewDetails: "View Details",
      downloadPDF: "Download PDF",
      upload: "Upload",
      back: "Back",
      next: "Next",
      previous: "Previous",
      finish: "Finish",
    },
    nav: {
      home: "Home",
      dashboard: "Dashboard",
      policies: "Policies",
      claims: "Claims",
      payments: "Payments",
      profile: "Profile",
      support: "Support",
      leads: "Leads",
      customers: "Customers",
      commission: "Commission",
      users: "Users",
      analytics: "Analytics",
      products: "Products",
      auditLogs: "Audit Logs",
    },
    home: {
      heroTitle: "Smart Insurance for Modern India",
      heroSubtitle: "Protect what matters most with AI-powered insurance solutions",
      getStarted: "Get Started",
      learnMore: "Learn More",
      featuresTitle: "Why Choose Us",
      plansTitle: "Our Plans",
    },
    auth: {
      loginTitle: "Welcome Back",
      signupTitle: "Create Account",
      emailPlaceholder: "Email Address",
      passwordPlaceholder: "Password",
      phonePlaceholder: "Mobile Number",
      otpPlaceholder: "Enter OTP",
      sendOTP: "Send OTP",
      verifyOTP: "Verify OTP",
      selectRole: "Select Your Role",
      customer: "Customer",
      agent: "Agent",
      forgotPassword: "Forgot Password?",
      rememberMe: "Remember me",
      dontHaveAccount: "Don't have an account?",
      alreadyHaveAccount: "Already have an account?",
    },
    kyc: {
      title: "Complete Your KYC",
      basicInfo: "Basic Information",
      address: "Address Details",
      documents: "Document Upload",
      review: "Review & Submit",
      fullName: "Full Name",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      panNumber: "PAN Number",
      aadhaarNumber: "Aadhaar Number",
      addressLine1: "Address Line 1",
      addressLine2: "Address Line 2",
      city: "City",
      state: "State",
      pincode: "Pincode",
      uploadAadhaar: "Upload Aadhaar Card",
      uploadPAN: "Upload PAN Card",
      uploadPhoto: "Upload Photo",
      eKYCSuccess: "e-KYC Verification Successful",
      consentMessage: "I consent to share my information for KYC verification",
      agreeToTerms: "I agree to the Terms & Conditions",
    },
    policies: {
      myPolicies: "My Policies",
      policyNumber: "Policy Number",
      policyType: "Policy Type",
      premium: "Premium",
      status: "Status",
      renewalDate: "Renewal Date",
      active: "Active",
      expired: "Expired",
      getPolicies: "Get Insurance",
      compareQuotes: "Compare Quotes",
      buyNow: "Buy Now",
    },
    claims: {
      myClaims: "My Claims",
      fileNewClaim: "File New Claim",
      claimNumber: "Claim Number",
      claimType: "Claim Type",
      claimAmount: "Claim Amount",
      claimStatus: "Status",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      uploadDocuments: "Upload Documents",
      claimTimeline: "Claim Timeline",
      chatWithAgent: "Chat with Agent",
    },
  },
  hi: {
    common: {
      welcome: "स्वागत है",
      login: "लॉगिन",
      logout: "लॉगआउट",
      signup: "साइन अप करें",
      submit: "जमा करें",
      cancel: "रद्द करें",
      save: "सहेजें",
      delete: "हटाएं",
      edit: "संपादित करें",
      search: "खोजें",
      filter: "फ़िल्टर",
      loading: "लोड हो रहा है...",
      error: "त्रुटि",
      success: "सफलता",
      viewDetails: "विवरण देखें",
      downloadPDF: "पीडीएफ डाउनलोड करें",
      upload: "अपलोड करें",
      back: "पीछे",
      next: "आगे",
      previous: "पिछला",
      finish: "समाप्त",
    },
    nav: {
      home: "होम",
      dashboard: "डैशबोर्ड",
      policies: "पॉलिसियां",
      claims: "दावे",
      payments: "भुगतान",
      profile: "प्रोफ़ाइल",
      support: "सहायता",
      leads: "लीड्स",
      customers: "ग्राहक",
      commission: "कमीशन",
      users: "उपयोगकर्ता",
      analytics: "एनालिटिक्स",
      products: "उत्पाद",
      auditLogs: "ऑडिट लॉग",
    },
    home: {
      heroTitle: "आधुनिक भारत के लिए स्मार्ट बीमा",
      heroSubtitle: "एआई-संचालित बीमा समाधानों के साथ अपनी सबसे महत्वपूर्ण चीजों की रक्षा करें",
      getStarted: "शुरू करें",
      learnMore: "और जानें",
      featuresTitle: "हमें क्यों चुनें",
      plansTitle: "हमारी योजनाएं",
    },
    auth: {
      loginTitle: "वापसी पर स्वागत है",
      signupTitle: "खाता बनाएं",
      emailPlaceholder: "ईमेल पता",
      passwordPlaceholder: "पासवर्ड",
      phonePlaceholder: "मोबाइल नंबर",
      otpPlaceholder: "ओटीपी दर्ज करें",
      sendOTP: "ओटीपी भेजें",
      verifyOTP: "ओटीपी सत्यापित करें",
      selectRole: "अपनी भूमिका चुनें",
      customer: "ग्राहक",
      agent: "एजेंट",
      forgotPassword: "पासवर्ड भूल गए?",
      rememberMe: "मुझे याद रखें",
      dontHaveAccount: "खाता नहीं है?",
      alreadyHaveAccount: "पहले से खाता है?",
    },
    kyc: {
      title: "अपना केवाईसी पूरा करें",
      basicInfo: "बुनियादी जानकारी",
      address: "पता विवरण",
      documents: "दस्तावेज़ अपलोड",
      review: "समीक्षा और जमा करें",
      fullName: "पूरा नाम",
      dateOfBirth: "जन्म तिथि",
      gender: "लिंग",
      panNumber: "पैन नंबर",
      aadhaarNumber: "आधार नंबर",
      addressLine1: "पता पंक्ति 1",
      addressLine2: "पता पंक्ति 2",
      city: "शहर",
      state: "राज्य",
      pincode: "पिनकोड",
      uploadAadhaar: "आधार कार्ड अपलोड करें",
      uploadPAN: "पैन कार्ड अपलोड करें",
      uploadPhoto: "फोटो अपलोड करें",
      eKYCSuccess: "ई-केवाईसी सत्यापन सफल",
      consentMessage: "मैं केवाईसी सत्यापन के लिए अपनी जानकारी साझा करने के लिए सहमत हूं",
      agreeToTerms: "मैं नियम और शर्तों से सहमत हूं",
    },
    policies: {
      myPolicies: "मेरी पॉलिसियां",
      policyNumber: "पॉलिसी नंबर",
      policyType: "पॉलिसी प्रकार",
      premium: "प्रीमियम",
      status: "स्थिति",
      renewalDate: "नवीनीकरण तिथि",
      active: "सक्रिय",
      expired: "समाप्त",
      getPolicies: "बीमा प्राप्त करें",
      compareQuotes: "कोट्स की तुलना करें",
      buyNow: "अभी खरीदें",
    },
    claims: {
      myClaims: "मेरे दावे",
      fileNewClaim: "नया दावा दर्ज करें",
      claimNumber: "दावा नंबर",
      claimType: "दावा प्रकार",
      claimAmount: "दावा राशि",
      claimStatus: "स्थिति",
      pending: "लंबित",
      approved: "स्वीकृत",
      rejected: "अस्वीकृत",
      uploadDocuments: "दस्तावेज़ अपलोड करें",
      claimTimeline: "दावा समयरेखा",
      chatWithAgent: "एजेंट से चैट करें",
    },
  },
}
