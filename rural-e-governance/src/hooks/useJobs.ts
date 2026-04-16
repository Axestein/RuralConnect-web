// src/hooks/useJobs.ts
'use client';

import { useState, useEffect } from 'react';
import { Job, JobFilter, JobApplication, SavedJob, UserProfile } from '@/types/jobs';
import jobsData from '@/lib/data/jobs.json';

export function useJobs(userId?: string) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<JobFilter>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Load jobs on mount
  useEffect(() => {
    loadJobs();
    loadSavedJobs();
    loadApplications();
    loadUserProfile();
  }, [userId]);

  const loadJobs = () => {
    setJobs(jobsData.jobs);
    setFilteredJobs(jobsData.jobs);
    setLoading(false);
  };

  const loadSavedJobs = () => {
    const saved = localStorage.getItem(`savedJobs_${userId || 'guest'}`);
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  };

  const loadApplications = () => {
    const apps = localStorage.getItem(`applications_${userId || 'guest'}`);
    if (apps) {
      setApplications(JSON.parse(apps));
    }
  };

  const loadUserProfile = () => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    } else {
      // Default profile for demo
      setUserProfile({
        id: userId || 'user-123',
        name: 'Rajesh Kumar',
        email: 'rajesh@example.com',
        phone: '9876543210',
        village: 'Rampur',
        district: 'Chennai',
        education: 'Bachelor of Arts',
        experience: '2 years in customer service',
        skills: ['Computer Basics', 'Communication', 'MS Office'],
        resumeUrl: ''
      });
    }
  };

  // Apply filters
  useEffect(() => {
    let filtered = [...jobs];

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.description.toLowerCase().includes(query)
      );
    }

    if (filters.location && filters.location !== 'all') {
      filtered = filtered.filter(job => job.location === filters.location);
    }

    if (filters.district && filters.district !== 'all') {
      filtered = filtered.filter(job => job.district === filters.district);
    }

    if (filters.jobType && filters.jobType !== 'all') {
      filtered = filtered.filter(job => job.jobType === filters.jobType);
    }

    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    if (filters.isGovernment !== undefined) {
      filtered = filtered.filter(job => job.isGovernment === filters.isGovernment);
    }

    if (filters.salaryRange) {
      const [min, max] = filters.salaryRange.split('-').map(Number);
      filtered = filtered.filter(job => 
        (job.salaryMin && job.salaryMin >= min) && 
        (job.salaryMax && job.salaryMax <= max)
      );
    }

    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const saveJob = (jobId: string) => {
    if (!userId) return;
    
    const newSavedJob: SavedJob = {
      id: Date.now().toString(),
      jobId,
      userId,
      savedDate: new Date().toISOString()
    };
    
    const updated = [...savedJobs, newSavedJob];
    setSavedJobs(updated);
    localStorage.setItem(`savedJobs_${userId}`, JSON.stringify(updated));
  };

  const unsaveJob = (jobId: string) => {
    const updated = savedJobs.filter(sj => sj.jobId !== jobId);
    setSavedJobs(updated);
    localStorage.setItem(`savedJobs_${userId || 'guest'}`, JSON.stringify(updated));
  };

  const isJobSaved = (jobId: string): boolean => {
    return savedJobs.some(sj => sj.jobId === jobId);
  };

  const applyForJob = async (jobId: string, applicationData: Partial<JobApplication>) => {
    if (!userId || !userProfile) {
      throw new Error('Please login to apply');
    }

    const job = jobs.find(j => j.id === jobId);
    if (!job) throw new Error('Job not found');

    const newApplication: JobApplication = {
      id: Date.now().toString(),
      jobId,
      userId,
      userName: userProfile.name,
      userEmail: userProfile.email,
      userPhone: userProfile.phone,
      userVillage: userProfile.village,
      coverLetter: applicationData.coverLetter || '',
      experience: applicationData.experience || userProfile.experience,
      education: applicationData.education || userProfile.education,
      appliedDate: new Date().toISOString(),
      status: 'pending'
    };

    const updated = [...applications, newApplication];
    setApplications(updated);
    localStorage.setItem(`applications_${userId}`, JSON.stringify(updated));
    
    // Update job apply count
    const updatedJobs = jobs.map(j => 
      j.id === jobId ? { ...j, applyCount: (j.applyCount || 0) + 1 } : j
    );
    setJobs(updatedJobs);
    
    return newApplication;
  };

  const hasApplied = (jobId: string): boolean => {
    return applications.some(app => app.jobId === jobId);
  };

  const getApplicationStatus = (jobId: string): string | null => {
    const app = applications.find(app => app.jobId === jobId);
    return app ? app.status : null;
  };

  const updateFilters = (newFilters: Partial<JobFilter>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const getUniqueLocations = (): string[] => {
    return [...new Set(jobs.map(job => job.location))];
  };

  const getUniqueDistricts = (): string[] => {
    return [...new Set(jobs.map(job => job.district))];
  };

  const getUniqueCategories = (): string[] => {
    return [...new Set(jobs.map(job => job.category))];
  };

  return {
    jobs: filteredJobs,
    allJobs: jobs,
    savedJobs,
    applications,
    loading,
    filters,
    userProfile,
    saveJob,
    unsaveJob,
    isJobSaved,
    applyForJob,
    hasApplied,
    getApplicationStatus,
    updateFilters,
    clearFilters,
    getUniqueLocations,
    getUniqueDistricts,
    getUniqueCategories
  };
}