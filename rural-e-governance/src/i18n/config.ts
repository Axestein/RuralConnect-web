import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Basic translations to start with
const resources = {
  en: {
    translation: {
      
      // App
      "app.title": "Rural e-Governance",
      "app.description": "Digital governance for rural development",
      "app.loading": "Loading...",
      
      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.complaints": "Complaints",
      "nav.services": "Services",
      "nav.citizens": "Citizens",
      "nav.officers": "Officers",
      "nav.reports": "Reports",
      "nav.settings": "Settings",
      "nav.profile": "Profile",
      "nav.logout": "Logout",
      
      // Complaints Module (for your board)
      "complaints.board": "Complaints Board",
      "complaints.dragDrop": "Drag and drop complaints to update their status",
      "complaints.search": "Search complaints...",
      "complaints.filter": "Filters",
      "complaints.priority": "Priority",
      "complaints.category": "Category",
      "complaints.dateRange": "Date Range",
      "complaints.village": "Village",
      "complaints.status": "Status",
      
      // Status
      "status.pending": "Pending",
      "status.inProgress": "In Progress",
      "status.resolved": "Resolved",
      "status.rejected": "Rejected",
      
      // Priority
      "priority.low": "Low",
      "priority.medium": "Medium",
      "priority.high": "High",
      
      // Categories
      "category.pothole": "Pothole",
      "category.sanitation": "Sanitation",
      "category.water": "Water",
      "category.electricity": "Electricity",
      "category.drainage": "Drainage",
      "category.streetLight": "Street Light",
      "category.other": "Other",
      
      // Buttons
      "button.add": "Add",
      "button.edit": "Edit",
      "button.delete": "Delete",
      "button.save": "Save",
      "button.cancel": "Cancel",
      "button.search": "Search",
      "button.filter": "Filter",
      "button.assign": "Assign",
      "button.message": "Message",
      "button.preview": "Preview",
      "button.download": "Download",
      "button.confirm": "Confirm",
      
      // Filters
      "filter.all": "All",
      "filter.allPriorities": "All Priorities",
      "filter.allCategories": "All Categories",
      "filter.allVillages": "All Villages",
      "filter.today": "Today",
      "filter.week": "This Week",
      "filter.month": "This Month",
      "filter.allTime": "All Time",
      
      // Stats
      "stats.totalComplaints": "Total Complaints",
      
      // Messages
      "message.confirmDelete": "Are you sure you want to delete this complaint?",
      "message.saved": "Saved successfully",
      "message.deleted": "Deleted successfully",
      "message.updated": "Updated successfully",
      "message.moved": "Status updated to {{status}}",
      
      // Empty States
      "empty.noComplaints": "No complaints yet",
      "empty.addSample": "Add Sample Complaint",
      "empty.noData": "No data available",
      
      // Instructions
      "instructions.howToUse": "How to use the Kanban Board",
      "instructions.dragInfo": "Drag & Drop",
      "instructions.dragDescription": "Grab the handle and drag between columns",
      "instructions.messageInfo": "Message Citizen",
      "instructions.messageDescription": "Click message icon to update complainant",
      "instructions.optionsInfo": "More Options",
      "instructions.optionsDescription": "Click three dots for preview, edit, delete",
      
      // Form Labels
      "form.name": "Name",
      "form.phone": "Phone",
      "form.email": "Email",
      "form.address": "Address",
      "form.village": "Village",
      "form.district": "District",
      "form.state": "State",
      "form.pincode": "Pincode",
      
      // Validation
      "validation.required": "This field is required",
      "validation.invalidEmail": "Invalid email address",
      "validation.invalidPhone": "Invalid phone number",
      
      // Error Messages
      "error.network": "Network error. Please try again.",
      "error.server": "Server error. Please try again later.",
      "error.unauthorized": "Unauthorized access.",

      "roles.citizen.title": "Citizen",
  "roles.citizen.description": "File complaints, check schemes, access learning materials",
  "roles.citizen.features.eligibility": "AI Scheme Eligibility Checker",
  "roles.citizen.features.complaints": "Complaint Filing with Photos",
  "roles.citizen.features.learning": "Learning Portal",
  
  "roles.officer.title": "Government Officer",
  "roles.officer.description": "Handle complaints, track progress, manage schemes",
  "roles.officer.features.management": "Complaint Management",
  "roles.officer.features.schemes": "Scheme Administration",
  "roles.officer.features.support": "Citizen Support",
  
  "roles.admin.title": "Administrator",
  "roles.admin.description": "Manage users, monitor system, generate reports",
  "roles.admin.features.users": "User Management",
  "roles.admin.features.monitoring": "System Monitoring",
  "roles.admin.features.analytics": "Analytics & Reports",
  
  "hero.tagline": "Empowering Rural India",
  "hero.title.part1": "Digital Governance",
  "hero.title.part2": "For Every Village",
  "hero.description": "Bridging the digital divide with accessible e-governance solutions. Empowering rural communities through transparent, efficient, and citizen-centric services.",
  
  "features.languages": "12+ Regional Languages",
  "features.offline": "Offline-First Design",
  "features.secure": "Secure & Verified",
  
  "roles.title": "Access Digital Services",
  "roles.subtitle": "Select your role to access personalized governance services designed for rural empowerment",
  
  "stats.villages": "Villages Served",
  "stats.schemes": "Schemes Processed",
  "stats.resolution": "Resolution Rate",
  "stats.service": "Service Available",
  
  "features.title": "Transforming Rural Governance",
  "features.subtitle": "Comprehensive digital solutions designed for rural India's unique needs",
  "features.list.eligibility": "AI Eligibility Checker",
  "features.list.eligibilityDesc": "Instant verification for government schemes",
  "features.list.applications": "Digital Applications",
  "features.list.applicationsDesc": "Paperless applications for all services",
  "features.list.jobs": "Job Portal",
  "features.list.jobsDesc": "Government and local employment opportunities",
  "features.list.tracking": "Progress Tracking",
  "features.list.trackingDesc": "Real-time status updates on all requests",
  
  "services.transparent": "Transparent Process",
  "services.transparentDesc": "End-to-end tracking of all applications",
  "services.secure": "Secure Platform",
  "services.secureDesc": "Aadhaar verified secure transactions",
  "services.literacy": "Digital Literacy",
  "services.literacyDesc": "Training materials in local languages",
  
  "footer.appName": "Grama e-Seva",
  "footer.tagline": "Rural e-Governance Portal",
  "footer.description": "Empowering rural communities through transparent, accessible, and efficient digital governance.",
  "footer.initiative": "Digital India Initiative",
  "footer.ministry": "Ministry of Rural Development",
  "footer.copyright": "Rural e-Governance Portal. All rights reserved.",
  "footer.mission": "A collaborative initiative towards inclusive digital governance for rural India"
    }
  },
  hi: {
    translation: {
      // App
      "app.title": "ग्रामीण ई-गवर्नेंस",
      "app.description": "ग्रामीण विकास के लिए डिजिटल गवर्नेंस",
      "app.loading": "लोड हो रहा है...",
      
      // Navigation
      "nav.dashboard": "डैशबोर्ड",
      "nav.complaints": "शिकायतें",
      "nav.services": "सेवाएं",
      "nav.citizens": "नागरिक",
      "nav.officers": "अधिकारी",
      "nav.reports": "रिपोर्ट्स",
      "nav.settings": "सेटिंग्स",
      "nav.profile": "प्रोफाइल",
      "nav.logout": "लॉगआउट",
      
      // Complaints Module
      "complaints.board": "शिकायत बोर्ड",
      "complaints.dragDrop": "स्थिति अपडेट करने के लिए शिकायतों को खींचें और छोड़ें",
      "complaints.search": "शिकायतें खोजें...",
      "complaints.filter": "फ़िल्टर",
      "complaints.priority": "प्राथमिकता",
      "complaints.category": "श्रेणी",
      "complaints.dateRange": "तिथि सीमा",
      "complaints.village": "गांव",
      "complaints.status": "स्थिति",
      
      // Status
      "status.pending": "लंबित",
      "status.inProgress": "प्रगति में",
      "status.resolved": "हल हो गया",
      "status.rejected": "अस्वीकृत",
      
      // Priority
      "priority.low": "कम",
      "priority.medium": "मध्यम",
      "priority.high": "उच्च",
      
      // Categories
      "category.pothole": "गड्ढा",
      "category.sanitation": "सफाई",
      "category.water": "पानी",
      "category.electricity": "बिजली",
      "category.drainage": "नाली",
      "category.streetLight": "स्ट्रीट लाइट",
      "category.other": "अन्य",
      
      // Buttons
      "button.add": "जोड़ें",
      "button.edit": "संपादित करें",
      "button.delete": "हटाएं",
      "button.save": "सहेजें",
      "button.cancel": "रद्द करें",
      "button.search": "खोजें",
      "button.filter": "फ़िल्टर",
      "button.assign": "असाइन करें",
      "button.message": "संदेश",
      "button.preview": "पूर्वावलोकन",
      "button.download": "डाउनलोड",
      "button.confirm": "पुष्टि करें",
      
      // Filters
      "filter.all": "सभी",
      "filter.allPriorities": "सभी प्राथमिकताएं",
      "filter.allCategories": "सभी श्रेणियां",
      "filter.allVillages": "सभी गांव",
      "filter.today": "आज",
      "filter.week": "इस सप्ताह",
      "filter.month": "इस महीने",
      "filter.allTime": "सभी समय",
      
      // Stats
      "stats.totalComplaints": "कुल शिकायतें",
      
      // Messages
      "message.confirmDelete": "क्या आप वाकई इस शिकायत को हटाना चाहते हैं?",
      "message.saved": "सफलतापूर्वक सहेजा गया",
      "message.deleted": "सफलतापूर्वक हटाया गया",
      "message.updated": "सफलतापूर्वक अपडेट किया गया",
      "message.moved": "स्थिति {{status}} में अपडेट की गई",
      
      // Empty States
      "empty.noComplaints": "अभी तक कोई शिकायत नहीं",
      "empty.addSample": "नमूना शिकायत जोड़ें",
      "empty.noData": "कोई डेटा उपलब्ध नहीं",
      
      // Instructions
      "instructions.howToUse": "कैनबन बोर्ड का उपयोग कैसे करें",
      "instructions.dragInfo": "खींचें और छोड़ें",
      "instructions.dragDescription": "हैंडल को पकड़ें और कॉलम के बीच खींचें",
      "instructions.messageInfo": "नागरिक को संदेश",
      "instructions.messageDescription": "शिकायतकर्ता को अपडेट करने के लिए संदेश आइकन पर क्लिक करें",
      "instructions.optionsInfo": "अधिक विकल्प",
      "instructions.optionsDescription": "पूर्वावलोकन, संपादन, हटाने के लिए तीन बिंदुओं पर क्लिक करें",

    }
  },
  ta: {
    translation: {
      "app.title": "கிராமப்புற மின்-கவர்னன்ஸ்",
      "app.description": "கிராமப்புற வளர்ச்சிக்கான டிஜிட்டல் ஆட்சி",
      "status.pending": "நிலுவையில்",
      "status.inProgress": "நடந்து கொண்டிருக்கிறது",
      "status.resolved": "தீர்க்கப்பட்டது",
      "status.rejected": "நிராகரிக்கப்பட்டது",
    }
  },
  te: {
    translation: {
      "app.title": "గ్రామీణ ఈ-గవర్నెన్స్",
      "app.description": "గ్రామీణ అభివృద్ధి కోసం డిజిటల్ పాలన",
      "status.pending": "పెండింగ్",
      "status.inProgress": "పురోగతిలో ఉంది",
      "status.resolved": "పరిష్కరించబడింది",
      "status.rejected": "తిరస్కరించబడింది",
    }
  },
  bn: {
    translation: {
      "app.title": "গ্রামীণ ই-গভর্নেন্স",
      "app.description": "গ্রামীণ উন্নয়নের জন্য ডিজিটাল গভর্নেন্স",
      "status.pending": "বিচারাধীন",
      "status.inProgress": "চলমান",
      "status.resolved": "সমাধান হয়েছে",
      "status.rejected": "প্রত্যাখ্যাত",
    }
  },
  mr: {
    translation: {
      "app.title": "ग्रामीण ई-गव्हर्नन्स",
      "app.description": "ग्रामीण विकासासाठी डिजिटल गव्हर्नन्स",
      "status.pending": "प्रलंबित",
      "status.inProgress": "चालू आहे",
      "status.resolved": "सोडवले",
      "status.rejected": "नाकारले",
    }
  },
  or: {
    translation: {
      "app.title": "ଗ୍ରାମୀଣ ଇ-ଗଭର୍ଣ୍ଣେସ୍",
      "app.description": "ଗ୍ରାମୀଣ ବିକାଶ ପାଇଁ ଡିଜିଟାଲ୍ ଗଭର୍ଣ୍ଣେସ୍",
      "status.pending": "ବିଚାରାଧୀନ",
      "status.inProgress": "ଚାଲିଛି",
      "status.resolved": "ସମାଧାନ ହୋଇଛି",
      "status.rejected": "ପ୍ରତ୍ୟାଖ୍ୟାନ",
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'hi', 'ta', 'te', 'bn', 'mr', 'or'],
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;