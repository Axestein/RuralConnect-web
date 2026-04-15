// types/scheme.ts

export interface SchemeEligibility {
  minAge?: number;
  maxAge?: number;
  gender?: 'male' | 'female' | 'all';
  maxIncome?: number;
  minIncome?: number;
  occupations?: string[];
  bplRequired?: boolean;
  landRequired?: boolean;
  maxLandAcres?: number;
  minLandAcres?: number;
  casteCategories?: string[];
  ruralOnly?: boolean;
  isForFarmers?: boolean;
  isForWomen?: boolean;
  isForSeniorCitizen?: boolean;
  isForStudents?: boolean;
  isForUnemployed?: boolean;
  hasGirlChild?: boolean;
  isForWidow?: boolean;
  isForDisabled?: boolean;
  isForPregnant?: boolean;
  isForUnorganizedWorker?: boolean;
  educationRequired?: string[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  category: string;
  ministry: string;
  benefits: string;
  benefitsHi: string;
  eligibility: SchemeEligibility;
  eligibilityText: string[];
  documents: string[];
  applicationUrl: string;
  deadline: string;
  keywords: string[];
  keywordsHi: string[];
  status: 'active' | 'upcoming' | 'closed';
  appliedCount: string;
}

export interface UserProfile {
  age?: number;
  gender?: 'male' | 'female' | 'other';
  income?: number;
  occupation?: string;
  education?: string;
  landAcres?: number;
  bplStatus?: boolean;
  caste?: string;
  maritalStatus?: string;
  familySize?: number;
  hasGirlChild?: boolean;
  isWidow?: boolean;
  isSeniorCitizen?: boolean;
  isDisabled?: boolean;
  isPregnant?: boolean;
  isRural?: boolean;
  state?: string;
}

export interface ScoredScheme {
  scheme: GovernmentScheme;
  score: number;
  matchReasons: string[];
  missingInfo: string[];
}

export type ConversationState = 
  | 'greeting'
  | 'collecting_info'
  | 'showing_results'
  | 'scheme_detail'
  | 'follow_up';

export type Intent = 
  | 'greeting'
  | 'eligibility_check'
  | 'scheme_query'
  | 'category_browse'
  | 'how_to_apply'
  | 'profile_info'
  | 'documents_needed'
  | 'show_all'
  | 'reset'
  | 'thanks'
  | 'unknown';

export interface QuickReply {
  label: string;
  value: string;
  icon?: string;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  schemes?: ScoredScheme[];
  suggestions?: QuickReply[];
  schemeDetail?: GovernmentScheme;
  timestamp: Date;
}

export interface BotResponse {
  text: string;
  schemes?: ScoredScheme[];
  suggestions: QuickReply[];
  schemeDetail?: GovernmentScheme;
  updatedProfile: UserProfile;
  newState: ConversationState;
}
