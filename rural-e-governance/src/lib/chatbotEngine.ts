// lib/chatbotEngine.ts
import {
  UserProfile,
  GovernmentScheme,
  ScoredScheme,
  ConversationState,
  Intent,
  QuickReply,
  BotResponse,
} from '@/types/scheme';
import { governmentSchemes } from '@/data/governmentSchemes';

// ── Language Detection ──────────────────────────────────────────

export function detectLanguage(message: string): 'en' | 'hi' {
  const devanagariPattern = /[\u0900-\u097F]/;
  return devanagariPattern.test(message) ? 'hi' : 'en';
}

// ── Intent Detection ────────────────────────────────────────────

const intentPatterns: Record<Intent, RegExp[]> = {
  greeting: [
    /^(hi|hello|hey|namaste|namaskar|good\s*(morning|afternoon|evening))/i,
    /^(नमस्ते|नमस्कार|हेलो|हाय)/,
  ],
  eligibility_check: [
    /eligib|am i eligible|can i (get|apply|avail)|check.*eligib|paatr|पात्र/i,
    /which scheme|what scheme|suggest.*scheme|recommend/i,
    /kya.*mil.*sakta|kya.*apply|कौन.*योजना/i,
  ],
  scheme_query: [
    /tell.*about|details.*of|what is|explain|info.*about|जानकारी/i,
  ],
  category_browse: [
    /agriculture|health|education|housing|employment|pension|women|social/i,
    /farming|medical|job|house|school|कृषि|स्वास्थ्य|शिक्षा|रोजगार|आवास/i,
  ],
  how_to_apply: [
    /how.*(apply|register|enroll)|apply.*how|where.*apply|application.*process/i,
    /कैसे.*आवेदन|आवेदन.*कैसे/i,
  ],
  documents_needed: [
    /document|papers|what.*need|required.*doc|kagaz|कागज|दस्तावेज/i,
  ],
  profile_info: [
    /i am|i'm|my (age|income|job|occupation|name)|i (have|own|work|live|earn)/i,
    /मैं|मेरी|मेरा|मेरे/i,
    /\d+\s*(year|sal|वर्ष|साल)/i,
    /farmer|kisan|labour|worker|student|किसान|मजदूर|छात्र/i,
  ],
  show_all: [
    /show.*all|list.*all|all scheme|सभी.*योजना/i,
  ],
  reset: [
    /start.*over|reset|new.*check|clear|restart|फिर.*से/i,
  ],
  thanks: [
    /thank|thanks|dhanyavaad|धन्यवाद|shukriya|शुक्रिया/i,
  ],
  unknown: [],
};

export function detectIntent(message: string): Intent {
  const msg = message.toLowerCase().trim();

  for (const [intent, patterns] of Object.entries(intentPatterns)) {
    if (intent === 'unknown') continue;
    for (const pattern of patterns) {
      if (pattern.test(msg)) {
        return intent as Intent;
      }
    }
  }

  // Check if the message contains profile-like data (numbers, keywords)
  if (/\d/.test(msg) || /farmer|kisan|bpl|rural|woman|female|male|widow/i.test(msg)) {
    return 'profile_info';
  }

  return 'unknown';
}

// ── Profile Extraction ──────────────────────────────────────────

const occupationKeywords: Record<string, string[]> = {
  farmer: ['farmer', 'kisan', 'agriculture', 'farming', 'kheti', 'किसान', 'खेती', 'कृषक'],
  'agricultural labor': ['agri.*lab', 'farm.*work', 'farm.*lab', 'कृषि.*मजदूर', 'खेत.*मजदूर'],
  'daily wage laborer': ['daily.*wage', 'labour', 'labor', 'mazdoor', 'majdoor', 'मजदूर', 'दिहाड़ी'],
  'self employed': ['self.*employ', 'business', 'shop', 'vendor', 'दुकान', 'व्यापार', 'स्वरोजगार'],
  student: ['student', 'study', 'studying', 'college', 'school', 'छात्र', 'पढ़ाई', 'विद्यार्थी'],
  unemployed: ['unemploy', 'no.*job', 'jobless', 'बेरोजगार', 'काम.*नहीं'],
  retired: ['retired', 'pension', 'सेवानिवृत्त'],
  artisan: ['artisan', 'carpenter', 'blacksmith', 'weaver', 'tailor', 'potter', 'कारीगर', 'बढ़ई', 'लोहार', 'बुनकर', 'दर्जी', 'कुम्हार'],
};

export function extractUserProfile(message: string, existing: UserProfile): UserProfile {
  const profile = { ...existing };
  const msg = message.toLowerCase();

  // Extract age
  const ageMatch = msg.match(/(\d{1,3})\s*(years?\s*old|yrs?\s*old|age|sal|साल|वर्ष)/i)
    || msg.match(/age\s*(?:is)?\s*(\d{1,3})/i)
    || msg.match(/i\s*am\s*(\d{1,3})\s/i)
    || msg.match(/मैं\s*(\d{1,3})\s/i);
  if (ageMatch) {
    const age = parseInt(ageMatch[1]);
    if (age > 0 && age < 120) profile.age = age;
  }

  // Extract gender
  if (/\b(female|woman|women|lady|mahila|महिला|औरत|स्त्री)\b/i.test(msg)) {
    profile.gender = 'female';
  } else if (/\b(male|man|men|purush|पुरुष|आदमी)\b/i.test(msg)) {
    profile.gender = 'male';
  }

  // Extract income
  const lakhMatch = msg.match(/(\d+\.?\d*)\s*(lakh|lac|l)\b/i);
  const thousandMatch = msg.match(/(\d+)\s*(thousand|k|हजार)\b/i);
  const directIncomeMatch = msg.match(/income\s*(?:is)?\s*(?:₹|rs\.?)?\s*(\d+)/i)
    || msg.match(/(?:₹|rs\.?)\s*(\d+)/i)
    || msg.match(/आय\s*(\d+)/i);

  if (lakhMatch) {
    profile.income = parseFloat(lakhMatch[1]) * 100000;
  } else if (thousandMatch) {
    profile.income = parseInt(thousandMatch[1]) * 1000;
  } else if (directIncomeMatch) {
    const val = parseInt(directIncomeMatch[1]);
    profile.income = val < 1000 ? val * 1000 : val;
  }

  // Extract land ownership
  const landMatch = msg.match(/(\d+\.?\d*)\s*(acre|acres|hectare|hectares|bigha|एकड़|बीघा)/i);
  if (landMatch) {
    let acres = parseFloat(landMatch[1]);
    if (/hectare/i.test(landMatch[2])) acres *= 2.47;
    if (/bigha|बीघा/i.test(landMatch[2])) acres *= 0.62;
    profile.landAcres = acres;
  }
  if (/no.*land|landless|don'?t.*own.*land|भूमिहीन|जमीन.*नहीं/i.test(msg)) {
    profile.landAcres = 0;
  }
  if (/own.*land|have.*land|has.*land|जमीन.*है/i.test(msg) && !profile.landAcres) {
    profile.landAcres = 1;
  }

  // Extract BPL status
  if (/\b(bpl|below.*poverty|गरीबी.*रेखा|बीपीएल)\b/i.test(msg)) {
    profile.bplStatus = true;
  }
  if (/\b(apl|above.*poverty)\b/i.test(msg)) {
    profile.bplStatus = false;
  }

  // Extract caste
  if (/\b(sc|scheduled.*caste|अनुसूचित.*जाति|dalit|दलित)\b/i.test(msg)) {
    profile.caste = 'sc';
  } else if (/\b(st|scheduled.*tribe|अनुसूचित.*जनजाति|adivasi|आदिवासी)\b/i.test(msg)) {
    profile.caste = 'st';
  } else if (/\b(obc|other.*backward|अन्य.*पिछड़ा)\b/i.test(msg)) {
    profile.caste = 'obc';
  } else if (/\b(general|सामान्य)\b/i.test(msg)) {
    profile.caste = 'general';
  }

  // Extract occupation
  for (const [occupation, keywords] of Object.entries(occupationKeywords)) {
    for (const keyword of keywords) {
      if (new RegExp(`\\b${keyword}\\b`, 'i').test(msg)) {
        profile.occupation = occupation;
        break;
      }
    }
  }

  // Extract special conditions
  if (/\b(widow|vidhwa|विधवा)\b/i.test(msg)) {
    profile.isWidow = true;
    profile.gender = 'female';
  }
  if (/\b(pregnant|garbhvati|गर्भवती|expecting)\b/i.test(msg)) {
    profile.isPregnant = true;
    profile.gender = 'female';
  }
  if (/\b(disabled?|handicap|divyang|दिव्यांग|विकलांग)\b/i.test(msg)) {
    profile.isDisabled = true;
  }
  if (/\b(daughter|girl.*child|beti|बेटी|बालिका)\b/i.test(msg)) {
    profile.hasGirlChild = true;
  }
  if (/\b(rural|village|gaon|gram|गांव|ग्रामीण)\b/i.test(msg)) {
    profile.isRural = true;
  }
  if (/\b(urban|city|shahar|शहर|शहरी)\b/i.test(msg)) {
    profile.isRural = false;
  }
  if (/\b(senior.*citizen|old|elderly|बुजुर्ग|वरिष्ठ)\b/i.test(msg)) {
    profile.isSeniorCitizen = true;
    if (!profile.age) profile.age = 65;
  }

  // Extract family size
  const familyMatch = msg.match(/(\d+)\s*(family.*member|member|people.*family|लोग.*परिवार|सदस्य)/i);
  if (familyMatch) {
    profile.familySize = parseInt(familyMatch[1]);
  }

  // Education
  if (/\b(illiterate|no.*education|अशिक्षित|पढ़ाई.*नहीं)\b/i.test(msg)) {
    profile.education = 'none';
  } else if (/\b(8th|8.*pass|eighth|आठवीं)\b/i.test(msg)) {
    profile.education = '8th pass';
  } else if (/\b(10th|10.*pass|matric|दसवीं|मैट्रिक)\b/i.test(msg)) {
    profile.education = '10th pass';
  } else if (/\b(12th|12.*pass|inter|intermediate|बारहवीं)\b/i.test(msg)) {
    profile.education = '12th pass';
  } else if (/\b(graduate|degree|स्नातक|ग्रेजुएट)\b/i.test(msg)) {
    profile.education = 'graduate';
  } else if (/\b(post.*graduate|masters|pg|स्नातकोत्तर)\b/i.test(msg)) {
    profile.education = 'post graduate';
  }

  // Derive senior citizen from age
  if (profile.age && profile.age >= 60) {
    profile.isSeniorCitizen = true;
  }

  return profile;
}

// ── Scheme Matching ─────────────────────────────────────────────

export function matchSchemes(profile: UserProfile, schemes?: GovernmentScheme[]): ScoredScheme[] {
  const allSchemes = schemes || governmentSchemes;
  const results: ScoredScheme[] = [];

  for (const scheme of allSchemes) {
    const { score, matchReasons, missingInfo } = calculateSchemeScore(profile, scheme);
    if (score > 0) {
      results.push({ scheme, score, matchReasons, missingInfo });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

function calculateSchemeScore(
  profile: UserProfile,
  scheme: GovernmentScheme
): { score: number; matchReasons: string[]; missingInfo: string[] } {
  const elig = scheme.eligibility;
  const matchReasons: string[] = [];
  const missingInfo: string[] = [];
  let totalWeight = 0;
  let earnedWeight = 0;

  // Age check (weight: 15)
  if (elig.minAge !== undefined || elig.maxAge !== undefined) {
    totalWeight += 15;
    if (profile.age !== undefined) {
      const minOk = elig.minAge === undefined || profile.age >= elig.minAge;
      const maxOk = elig.maxAge === undefined || profile.age <= elig.maxAge;
      if (minOk && maxOk) {
        earnedWeight += 15;
        matchReasons.push(`Age ${profile.age} meets criteria`);
      } else {
        return { score: 0, matchReasons: [], missingInfo: [] }; // Hard disqualifier
      }
    } else {
      missingInfo.push('age');
    }
  }

  // Gender check (weight: 10)
  if (elig.gender && elig.gender !== 'all') {
    totalWeight += 10;
    if (profile.gender) {
      if (profile.gender === elig.gender) {
        earnedWeight += 10;
        matchReasons.push(`Gender requirement met`);
      } else {
        return { score: 0, matchReasons: [], missingInfo: [] }; // Hard disqualifier
      }
    } else {
      missingInfo.push('gender');
    }
  }

  // Income check (weight: 20)
  if (elig.maxIncome !== undefined) {
    totalWeight += 20;
    if (profile.income !== undefined) {
      if (profile.income <= elig.maxIncome) {
        earnedWeight += 20;
        matchReasons.push(`Income within eligible range`);
      } else {
        earnedWeight += 0; // Soft penalty, don't fully disqualify
      }
    } else {
      missingInfo.push('income');
      earnedWeight += 5; // Partial credit when unknown
    }
  }

  // BPL check (weight: 15)
  if (elig.bplRequired) {
    totalWeight += 15;
    if (profile.bplStatus !== undefined) {
      if (profile.bplStatus) {
        earnedWeight += 15;
        matchReasons.push(`BPL status confirmed`);
      } else {
        earnedWeight += 0;
      }
    } else {
      missingInfo.push('BPL status');
      earnedWeight += 3;
    }
  }

  // Farmer check (weight: 20)
  if (elig.isForFarmers) {
    totalWeight += 20;
    if (profile.occupation) {
      if (['farmer', 'agricultural labor'].includes(profile.occupation)) {
        earnedWeight += 20;
        matchReasons.push(`Occupation: farmer/agriculture ✓`);
      } else {
        earnedWeight += 0;
      }
    } else {
      missingInfo.push('occupation');
      earnedWeight += 3;
    }
  }

  // Land check (weight: 10)
  if (elig.landRequired) {
    totalWeight += 10;
    if (profile.landAcres !== undefined) {
      const minOk = elig.minLandAcres === undefined || profile.landAcres >= elig.minLandAcres;
      if (profile.landAcres > 0 && minOk) {
        earnedWeight += 10;
        matchReasons.push(`Land ownership confirmed (${profile.landAcres} acres)`);
      } else {
        earnedWeight += 0;
      }
    } else {
      missingInfo.push('land ownership');
      earnedWeight += 2;
    }
  }

  // Women-specific schemes (weight: 15)
  if (elig.isForWomen) {
    totalWeight += 15;
    if (profile.gender) {
      if (profile.gender === 'female') {
        earnedWeight += 15;
        matchReasons.push(`Women-focused scheme ✓`);
      } else {
        // For Stand Up India, men from SC/ST can also apply
        if (elig.casteCategories && profile.caste && elig.casteCategories.includes(profile.caste)) {
          earnedWeight += 15;
          matchReasons.push(`SC/ST category eligible ✓`);
        } else {
          return { score: 0, matchReasons: [], missingInfo: [] };
        }
      }
    } else {
      missingInfo.push('gender');
      earnedWeight += 3;
    }
  }

  // Senior citizen check (weight: 15)
  if (elig.isForSeniorCitizen) {
    totalWeight += 15;
    if (profile.isSeniorCitizen !== undefined || profile.age !== undefined) {
      if (profile.isSeniorCitizen || (profile.age && profile.age >= 60)) {
        earnedWeight += 15;
        matchReasons.push(`Senior citizen eligible ✓`);
      } else {
        return { score: 0, matchReasons: [], missingInfo: [] };
      }
    } else {
      missingInfo.push('age');
    }
  }

  // Student check (weight: 10)
  if (elig.isForStudents) {
    totalWeight += 10;
    if (profile.occupation) {
      if (profile.occupation === 'student') {
        earnedWeight += 10;
        matchReasons.push(`Student status confirmed ✓`);
      } else {
        earnedWeight += 3; // Many schemes don't strictly require student status
      }
    } else {
      missingInfo.push('occupation');
      earnedWeight += 3;
    }
  }

  // Unemployed check (weight: 10)
  if (elig.isForUnemployed) {
    totalWeight += 10;
    if (profile.occupation) {
      if (['unemployed', 'student'].includes(profile.occupation)) {
        earnedWeight += 10;
        matchReasons.push(`Employment status matches ✓`);
      } else {
        earnedWeight += 5; // Many can still apply
      }
    } else {
      missingInfo.push('occupation');
      earnedWeight += 3;
    }
  }

  // Girl child check (weight: 15)
  if (elig.hasGirlChild) {
    totalWeight += 15;
    if (profile.hasGirlChild !== undefined) {
      if (profile.hasGirlChild) {
        earnedWeight += 15;
        matchReasons.push(`Girl child in family ✓`);
      } else {
        return { score: 0, matchReasons: [], missingInfo: [] };
      }
    } else {
      missingInfo.push('whether you have a girl child');
      earnedWeight += 2;
    }
  }

  // Widow check (weight: 15)
  if (elig.isForWidow) {
    totalWeight += 15;
    if (profile.isWidow !== undefined) {
      if (profile.isWidow) {
        earnedWeight += 15;
        matchReasons.push(`Widow status confirmed ✓`);
      } else {
        return { score: 0, matchReasons: [], missingInfo: [] };
      }
    } else {
      missingInfo.push('marital status');
    }
  }

  // Disabled check (weight: 15)
  if (elig.isForDisabled) {
    totalWeight += 15;
    if (profile.isDisabled !== undefined) {
      if (profile.isDisabled) {
        earnedWeight += 15;
        matchReasons.push(`Disability status confirmed ✓`);
      } else {
        return { score: 0, matchReasons: [], missingInfo: [] };
      }
    } else {
      missingInfo.push('disability status');
    }
  }

  // Pregnant check (weight: 15)
  if (elig.isForPregnant) {
    totalWeight += 15;
    if (profile.isPregnant !== undefined) {
      if (profile.isPregnant) {
        earnedWeight += 15;
        matchReasons.push(`Pregnancy status confirmed ✓`);
      } else {
        return { score: 0, matchReasons: [], missingInfo: [] };
      }
    } else {
      missingInfo.push('pregnancy status');
    }
  }

  // Rural check (weight: 10)
  if (elig.ruralOnly) {
    totalWeight += 10;
    if (profile.isRural !== undefined) {
      if (profile.isRural) {
        earnedWeight += 10;
        matchReasons.push(`Rural area resident ✓`);
      } else {
        earnedWeight += 2; // Some urban people can still apply
      }
    } else {
      missingInfo.push('location (rural/urban)');
      earnedWeight += 5; // Assume rural for rural-focused app
    }
  }

  // Occupation-specific check (weight: 15)
  if (elig.occupations && elig.occupations.length > 0) {
    totalWeight += 15;
    if (profile.occupation) {
      if (elig.occupations.some(o => profile.occupation!.toLowerCase().includes(o))) {
        earnedWeight += 15;
        matchReasons.push(`Occupation matches ✓`);
      } else {
        return { score: 0, matchReasons: [], missingInfo: [] };
      }
    } else {
      missingInfo.push('occupation');
      earnedWeight += 2;
    }
  }

  // Calculate final score
  if (totalWeight === 0) {
    // Universal scheme with no specific criteria
    return { score: 60, matchReasons: ['Generally available to all citizens'], missingInfo };
  }

  const score = Math.round((earnedWeight / totalWeight) * 100);
  return { score: Math.min(score, 98), matchReasons, missingInfo };
}

// ── Scheme Search by Keywords ───────────────────────────────────

export function searchSchemeByName(query: string): GovernmentScheme | null {
  const q = query.toLowerCase();
  for (const scheme of governmentSchemes) {
    const nameMatch = scheme.name.toLowerCase().includes(q) ||
      scheme.nameHi.includes(q) ||
      scheme.id.includes(q);
    if (nameMatch) return scheme;

    // Check keywords
    for (const keyword of [...scheme.keywords, ...scheme.keywordsHi]) {
      if (q.includes(keyword) && keyword.length > 3) return scheme;
    }
  }
  return null;
}

export function searchSchemesByCategory(category: string): GovernmentScheme[] {
  const cat = category.toLowerCase();
  const categoryMap: Record<string, string> = {
    agriculture: 'agriculture', farming: 'agriculture', kisan: 'agriculture', खेती: 'agriculture', कृषि: 'agriculture',
    health: 'health', medical: 'health', hospital: 'health', स्वास्थ्य: 'health',
    education: 'education', school: 'education', study: 'education', शिक्षा: 'education',
    housing: 'housing', house: 'housing', home: 'housing', awas: 'housing', आवास: 'housing',
    employment: 'employment', job: 'employment', work: 'employment', rozgar: 'employment', रोजगार: 'employment',
    pension: 'pension', retirement: 'pension', old: 'pension', पेंशन: 'pension',
    women: 'women', woman: 'women', mahila: 'women', महिला: 'women',
    social: 'social', welfare: 'social', samajik: 'social', सामाजिक: 'social',
  };

  const mappedCategory = categoryMap[cat];
  if (mappedCategory) {
    return governmentSchemes.filter(s => s.category === mappedCategory);
  }
  return [];
}

// ── Response Generation ─────────────────────────────────────────

function getProfileSummary(profile: UserProfile): string {
  const parts: string[] = [];
  if (profile.age) parts.push(`Age: ${profile.age}`);
  if (profile.gender) parts.push(`Gender: ${profile.gender}`);
  if (profile.occupation) parts.push(`Occupation: ${profile.occupation}`);
  if (profile.income) parts.push(`Income: ₹${(profile.income / 100000).toFixed(1)}L/year`);
  if (profile.landAcres !== undefined) parts.push(`Land: ${profile.landAcres} acres`);
  if (profile.bplStatus !== undefined) parts.push(`BPL: ${profile.bplStatus ? 'Yes' : 'No'}`);
  if (profile.caste) parts.push(`Category: ${profile.caste.toUpperCase()}`);
  if (profile.isRural !== undefined) parts.push(`Area: ${profile.isRural ? 'Rural' : 'Urban'}`);
  if (profile.hasGirlChild) parts.push('Has girl child');
  if (profile.isWidow) parts.push('Widow');
  if (profile.isDisabled) parts.push('Disabled');
  if (profile.isPregnant) parts.push('Pregnant');
  return parts.length > 0 ? parts.join(' | ') : '';
}

function getFilledFieldCount(profile: UserProfile): number {
  let count = 0;
  if (profile.age) count++;
  if (profile.gender) count++;
  if (profile.occupation) count++;
  if (profile.income) count++;
  if (profile.landAcres !== undefined) count++;
  if (profile.bplStatus !== undefined) count++;
  if (profile.caste) count++;
  if (profile.isRural !== undefined) count++;
  return count;
}

function getMissingFieldSuggestions(profile: UserProfile): QuickReply[] {
  const suggestions: QuickReply[] = [];
  if (!profile.age) suggestions.push({ label: '👤 Share my age', value: 'I am 35 years old', icon: '👤' });
  if (!profile.gender) suggestions.push({ label: '🚻 I am female', value: 'I am a woman', icon: '🚻' });
  if (!profile.occupation) suggestions.push({ label: '🌾 I am a farmer', value: 'I am a farmer', icon: '🌾' });
  if (!profile.income) suggestions.push({ label: '💰 Income < ₹2L', value: 'My income is below 2 lakh per year', icon: '💰' });
  if (profile.bplStatus === undefined) suggestions.push({ label: '📋 BPL card holder', value: 'I am a BPL card holder', icon: '📋' });
  if (profile.isRural === undefined) suggestions.push({ label: '🏘️ I live in village', value: 'I live in a rural village', icon: '🏘️' });
  return suggestions.slice(0, 4);
}

export function generateBotResponse(
  message: string,
  profile: UserProfile,
  state: ConversationState
): BotResponse {
  const intent = detectIntent(message);
  const lang = detectLanguage(message);
  let updatedProfile = extractUserProfile(message, profile);
  let newState: ConversationState = state;
  let text = '';
  let schemes: ScoredScheme[] | undefined;
  let suggestions: QuickReply[] = [];
  let schemeDetail: GovernmentScheme | undefined;

  switch (intent) {
    case 'greeting': {
      newState = 'greeting';
      text = lang === 'hi'
        ? '🙏 नमस्ते! मैं आपका सरकारी योजना सहायक हूं। मैं आपको सरकारी योजनाओं की पात्रता जांचने में मदद कर सकता हूं।\n\nआप मुझसे पूछ सकते हैं:\n• किसी योजना के बारे में जानकारी\n• अपनी पात्रता की जांच\n• श्रेणी के अनुसार योजनाएं खोजें\n\nअपने बारे में बताएं ताकि मैं आपके लिए सही योजनाएं सुझा सकूं!'
        : '🙏 Namaste! I\'m your Government Scheme Assistant. I can help you check your eligibility for various government welfare schemes.\n\nYou can ask me about:\n• Any specific government scheme\n• Check your eligibility based on your profile\n• Browse schemes by category\n\nTell me about yourself so I can suggest the best schemes for you!';
      suggestions = [
        { label: '🌾 Agriculture Schemes', value: 'Show me agriculture schemes', icon: '🌾' },
        { label: '🏥 Health Schemes', value: 'Show me health schemes', icon: '🏥' },
        { label: '🏠 Housing Schemes', value: 'Show me housing schemes', icon: '🏠' },
        { label: '📋 Check My Eligibility', value: 'I want to check my eligibility for government schemes', icon: '📋' },
      ];
      break;
    }

    case 'category_browse': {
      newState = 'showing_results';
      // Try to detect the category from the message
      const catWords = ['agriculture', 'farming', 'health', 'medical', 'education', 'school', 'housing', 'house', 'employment', 'job', 'pension', 'women', 'social', 'welfare'];
      let detectedCat = '';
      for (const word of catWords) {
        if (message.toLowerCase().includes(word)) {
          detectedCat = word;
          break;
        }
      }

      const categorySchemes = searchSchemesByCategory(detectedCat);
      if (categorySchemes.length > 0) {
        schemes = categorySchemes.map(s => ({
          scheme: s,
          score: 70,
          matchReasons: [`Available in ${detectedCat} category`],
          missingInfo: [],
        }));
        text = `📂 Here are **${categorySchemes.length} schemes** in the **${detectedCat}** category:\n\nShare your details (age, occupation, income) for personalized eligibility scores!`;
      } else {
        text = `I couldn't find schemes for that category. Try: Agriculture, Health, Education, Housing, Employment, Pension, Women, or Social Welfare.`;
      }
      suggestions = [
        { label: '📋 Check Eligibility', value: 'Check my eligibility', icon: '📋' },
        { label: '📂 All Schemes', value: 'Show all schemes', icon: '📂' },
        { label: '🔙 Start Over', value: 'Start over', icon: '🔙' },
      ];
      break;
    }

    case 'scheme_query': {
      newState = 'scheme_detail';
      const foundScheme = searchSchemeByName(message);
      if (foundScheme) {
        schemeDetail = foundScheme;
        text = `📋 **${foundScheme.name}**\n${foundScheme.nameHi}\n\n${foundScheme.description}\n\n💰 **Benefits:** ${foundScheme.benefits}\n🏢 **Ministry:** ${foundScheme.ministry}\n📅 **Deadline:** ${foundScheme.deadline}\n\n**Eligibility:**\n${foundScheme.eligibilityText.map(e => `• ${e}`).join('\n')}\n\n**Documents Required:**\n${foundScheme.documents.map(d => `• ${d}`).join('\n')}\n\n🔗 Apply: ${foundScheme.applicationUrl}`;
        suggestions = [
          { label: '✅ Am I eligible?', value: `Am I eligible for ${foundScheme.name}?`, icon: '✅' },
          { label: '📂 More Schemes', value: 'Show all schemes', icon: '📂' },
          { label: '🔙 Start Over', value: 'Start over', icon: '🔙' },
        ];
      } else {
        text = 'I couldn\'t find that specific scheme. Could you try the full name? Or browse by category.\n\nPopular schemes: PM-Kisan, Ayushman Bharat, MGNREGA, PM Awas Yojana, Ujjwala Yojana';
        suggestions = [
          { label: '🌾 PM-Kisan', value: 'Tell me about PM-Kisan', icon: '🌾' },
          { label: '🏥 Ayushman Bharat', value: 'Tell me about Ayushman Bharat', icon: '🏥' },
          { label: '💼 MGNREGA', value: 'Tell me about MGNREGA', icon: '💼' },
          { label: '📂 All Categories', value: 'Show me all scheme categories', icon: '📂' },
        ];
      }
      break;
    }

    case 'eligibility_check':
    case 'profile_info': {
      const filledCount = getFilledFieldCount(updatedProfile);
      const profileSummary = getProfileSummary(updatedProfile);

      // Check for specific scheme eligibility query
      const specificScheme = searchSchemeByName(message);
      if (specificScheme) {
        const result = matchSchemes(updatedProfile, [specificScheme]);
        if (result.length > 0) {
          schemes = result;
          const s = result[0];
          newState = 'showing_results';
          if (s.score >= 60) {
            text = `✅ Based on your profile, you appear to be **${s.score}% eligible** for **${specificScheme.name}**!\n\n${s.matchReasons.map(r => `✓ ${r}`).join('\n')}`;
          } else {
            text = `⚠️ Based on your current profile, your eligibility for **${specificScheme.name}** is **${s.score}%**.\n\n${s.missingInfo.length > 0 ? `Provide more details to get a better match: ${s.missingInfo.join(', ')}` : 'You may not meet all the criteria.'}`;
          }
        } else {
          text = `❌ Based on your profile, you don't appear to be eligible for **${specificScheme.name}**. But don't worry, let me find other schemes for you!`;
          const allMatches = matchSchemes(updatedProfile);
          schemes = allMatches.slice(0, 5);
        }
        suggestions = getMissingFieldSuggestions(updatedProfile);
        if (suggestions.length === 0) {
          suggestions = [
            { label: '📂 More Schemes', value: 'Show more eligible schemes', icon: '📂' },
            { label: '🔙 Start Over', value: 'Start over', icon: '🔙' },
          ];
        }
        break;
      }

      // General eligibility check
      if (filledCount >= 2) {
        newState = 'showing_results';
        const matchedSchemes = matchSchemes(updatedProfile);
        const topSchemes = matchedSchemes.filter(s => s.score >= 30).slice(0, 8);
        schemes = topSchemes;

        if (topSchemes.length > 0) {
          text = `📊 **Your Profile:** ${profileSummary}\n\n🎯 Based on your details, I found **${topSchemes.length} schemes** you may be eligible for!`;
          if (topSchemes[0].missingInfo.length > 0) {
            text += `\n\n💡 **Tip:** Share more details for better matching: ${[...new Set(topSchemes.flatMap(s => s.missingInfo))].slice(0, 3).join(', ')}`;
          }
        } else {
          text = `📊 **Your Profile:** ${profileSummary}\n\nI need a bit more information to find the best matches. Please share more about yourself.`;
        }

        suggestions = getMissingFieldSuggestions(updatedProfile);
        if (suggestions.length < 2) {
          suggestions = [
            { label: '📂 Show All', value: 'Show all schemes', icon: '📂' },
            { label: '🔙 Start Over', value: 'Start over', icon: '🔙' },
          ];
        }
      } else {
        newState = 'collecting_info';
        text = profileSummary
          ? `👍 Got it! I've noted: **${profileSummary}**\n\nI need a few more details to find the best schemes for you. Please share more about yourself.`
          : 'To find the best schemes for you, please tell me about yourself. For example:\n\n"I am a 35-year-old farmer from a rural village with 2 acres of land and income below ₹2 lakh"\n\nOr you can share one detail at a time!';

        suggestions = getMissingFieldSuggestions(updatedProfile);
      }
      break;
    }

    case 'how_to_apply': {
      const applyScheme = searchSchemeByName(message);
      if (applyScheme) {
        text = `📝 **How to Apply for ${applyScheme.name}:**\n\n**Step 1:** Visit ${applyScheme.applicationUrl}\n**Step 2:** Register with your Aadhaar number\n**Step 3:** Fill in the application form\n**Step 4:** Upload required documents:\n${applyScheme.documents.map(d => `  • ${d}`).join('\n')}\n**Step 5:** Submit and note your application ID\n\n📞 You can also visit your nearest CSC (Common Service Centre) for assistance.`;
      } else {
        text = 'To help you with the application process, please tell me which scheme you\'re interested in. You can also visit your nearest CSC (Common Service Centre) for in-person help.';
      }
      suggestions = [
        { label: '📋 Check Eligibility', value: 'Check my eligibility for schemes', icon: '📋' },
        { label: '📂 Browse Schemes', value: 'Show agriculture schemes', icon: '📂' },
      ];
      newState = 'follow_up';
      break;
    }

    case 'documents_needed': {
      const docScheme = searchSchemeByName(message);
      if (docScheme) {
        text = `📄 **Documents needed for ${docScheme.name}:**\n\n${docScheme.documents.map((d, i) => `${i + 1}. ${d}`).join('\n')}\n\n💡 Tip: Keep digital copies of all documents. You can also get them verified at your CSC.`;
      } else {
        text = '📄 **Common Documents for Government Schemes:**\n\n1. Aadhaar Card\n2. Bank Account / Passbook\n3. Income Certificate\n4. Caste Certificate (if applicable)\n5. Ration Card / BPL Card\n6. Land Records (for agriculture schemes)\n7. Passport-size Photos\n\nTell me the scheme name for specific document requirements.';
      }
      suggestions = [
        { label: '📋 Check Eligibility', value: 'Check my eligibility', icon: '📋' },
        { label: '📂 Browse Schemes', value: 'Show all schemes', icon: '📂' },
      ];
      newState = 'follow_up';
      break;
    }

    case 'show_all': {
      newState = 'showing_results';
      schemes = governmentSchemes.map(s => ({
        scheme: s,
        score: 50,
        matchReasons: ['Listed scheme'],
        missingInfo: [],
      }));
      text = `📂 Here are all **${governmentSchemes.length} government schemes** in our database. Share your details for personalized eligibility scores!`;
      suggestions = [
        { label: '📋 Check Eligibility', value: 'Check my eligibility for government schemes', icon: '📋' },
        { label: '🌾 Agriculture', value: 'Show agriculture schemes', icon: '🌾' },
        { label: '🏥 Health', value: 'Show health schemes', icon: '🏥' },
      ];
      break;
    }

    case 'reset': {
      updatedProfile = {};
      newState = 'greeting';
      text = '🔄 Profile cleared! Let\'s start fresh.\n\nTell me about yourself and I\'ll find the best government schemes for you.';
      suggestions = [
        { label: '🌾 Agriculture Schemes', value: 'Show me agriculture schemes', icon: '🌾' },
        { label: '🏥 Health Schemes', value: 'Show me health schemes', icon: '🏥' },
        { label: '📋 Check Eligibility', value: 'I want to check my eligibility', icon: '📋' },
      ];
      break;
    }

    case 'thanks': {
      text = lang === 'hi'
        ? '🙏 धन्यवाद! अगर आपको और कोई जानकारी चाहिए तो बेझिझक पूछें। आप अपने नजदीकी CSC केंद्र पर भी जा सकते हैं।'
        : '🙏 You\'re welcome! If you need any more help, feel free to ask. You can also visit your nearest CSC center for in-person assistance.';
      suggestions = [
        { label: '📋 Check Another', value: 'Check eligibility for another scheme', icon: '📋' },
        { label: '📂 Browse Schemes', value: 'Show all schemes', icon: '📂' },
        { label: '🔙 Start Over', value: 'Start over', icon: '🔙' },
      ];
      newState = 'follow_up';
      break;
    }

    default: {
      // Try to extract any profile info anyway
      const newFilledCount = getFilledFieldCount(updatedProfile);
      if (newFilledCount > getFilledFieldCount(profile)) {
        // We extracted new info, redirect to profile_info handling
        return generateBotResponse(message, updatedProfile, state);
      }

      text = 'I\'m not sure I understood that. I can help you with:\n\n• **Check eligibility** - Tell me your age, occupation, income, etc.\n• **Browse schemes** - Ask about agriculture, health, housing, etc.\n• **Scheme details** - Ask about any specific scheme\n\nTry typing: "I am a 30 year old farmer with BPL card"';
      suggestions = [
        { label: '📋 Check Eligibility', value: 'I want to check my eligibility', icon: '📋' },
        { label: '📂 All Schemes', value: 'Show all schemes', icon: '📂' },
        { label: '❓ How to apply?', value: 'How to apply for schemes', icon: '❓' },
      ];
      newState = 'follow_up';
      break;
    }
  }

  return {
    text,
    schemes,
    suggestions,
    schemeDetail,
    updatedProfile,
    newState,
  };
}
