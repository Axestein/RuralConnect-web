// src/types/jobs.ts

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  district: string;
  village?: string;
  salary: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType: 'full-time' | 'part-time' | 'contract' | 'internship' | 'daily-wages';
  category: string;
  description: string;
  requirements: string[];
  qualifications: string[];
  experienceRequired: string;
  postedDate: string;
  lastDate: string;
  vacancies: number;
  contactPerson: string;
  contactPhone: string;
  contactEmail?: string;
  isGovernment: boolean;
  isActive: boolean;
  applyCount?: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  userVillage: string;
  coverLetter?: string;
  experience?: string;
  education?: string;
  appliedDate: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'selected';
  resumeUrl?: string;
}

export interface SavedJob {
  id: string;
  jobId: string;
  userId: string;
  savedDate: string;
}

export interface JobFilter {
  location?: string;
  district?: string;
  jobType?: string;
  category?: string;
  salaryRange?: string;
  isGovernment?: boolean;
  searchQuery?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  village: string;
  district: string;
  education: string;
  experience: string;
  skills: string[];
  resumeUrl?: string;
}