// src/app/citizen/jobs/page.tsx
'use client';

import { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Filter, 
  Bookmark, 
  Clock,
  TrendingUp,
  MapPin,
  Building2,
  Award,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import JobFilters from '@/components/jobs/JobFilters';
import JobApplicationModal from '@/components/jobs/JobApplicationModal';
import { useJobs } from '@/hooks/useJobs';

export default function JobsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [searchInput, setSearchInput] = useState('');
  
  const {
    jobs,
    loading,
    filters,
    userProfile,
    savedJobs,
    applications,
    isJobSaved,
    hasApplied,
    getApplicationStatus,
    saveJob,
    unsaveJob,
    applyForJob,
    updateFilters,
    clearFilters,
    getUniqueLocations,
    getUniqueDistricts,
    getUniqueCategories
  } = useJobs('user-123');

  const handleSearch = () => {
    updateFilters({ searchQuery: searchInput });
  };

  const handleApply = (job: any) => {
    setSelectedJob(job);
  };

  const handleSubmitApplication = async (applicationData: any) => {
    if (selectedJob) {
      await applyForJob(selectedJob.id, applicationData);
      setSelectedJob(null);
      alert(`Successfully applied for ${selectedJob.title} at ${selectedJob.company}!`);
    }
  };

  // Stats
  const stats = [
    { label: 'Total Jobs', value: jobs.length, icon: Briefcase, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Saved Jobs', value: savedJobs.length, icon: Bookmark, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Applications', value: applications.length, icon: Clock, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Government Jobs', value: jobs.filter(j => j.isGovernment).length, icon: Building2, color: 'text-orange-600', bgColor: 'bg-orange-100' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Job Portal</h1>
        <p className="text-gray-600 mt-1">Find local employment opportunities near you</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-black">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or skills..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-6 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 md:hidden"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={`md:block ${showFilters ? 'block' : 'hidden'} md:w-80`}>
          <JobFilters
            locations={getUniqueLocations()}
            districts={getUniqueDistricts()}
            categories={getUniqueCategories()}
            filters={filters}
            onFilterChange={updateFilters}
            onClear={clearFilters}
            onClose={() => setShowFilters(false)}
          />
        </div>

        {/* Job Listings */}
        <div className="flex-1 space-y-4">
          {/* Results Count */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              Found <span className="font-semibold">{jobs.length}</span> jobs
              {filters.location && filters.location !== 'all' && ` in ${filters.location}`}
              {filters.district && filters.district !== 'all' && `, ${filters.district}`}
            </p>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-500">Sort by:</span>
              <select className="border border-gray-300 rounded-lg px-2 py-1">
                <option>Most Recent</option>
                <option>Salary (High to Low)</option>
                <option>Relevance</option>
              </select>
            </div>
          </div>

          {/* Job Cards */}
          {jobs.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters or search terms
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  isSaved={isJobSaved(job.id)}
                  hasApplied={hasApplied(job.id)}
                  applicationStatus={getApplicationStatus(job.id)}
                  onSave={() => saveJob(job.id)}
                  onUnsave={() => unsaveJob(job.id)}
                  onApply={() => handleApply(job)}
                />
              ))}
            </>
          )}

          {/* Pagination */}
          {jobs.length > 0 && (
            <div className="flex justify-center items-center space-x-2 mt-6">
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">2</button>
              <button className="px-3 py-1 border border-gray-300 rounded-lg hover:bg-gray-50">3</button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Application Modal */}
      {selectedJob && userProfile && (
        <JobApplicationModal
          job={selectedJob}
          userProfile={userProfile}
          onSubmit={handleSubmitApplication}
          onClose={() => setSelectedJob(null)}
        />
      )}

      {/* Quick Apply Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <Award className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
          <div>
            <p className="font-medium text-blue-900">Application Tips</p>
            <p className="text-sm text-blue-800">
              Keep your profile updated with your latest qualifications and experience. 
              You can save jobs and apply later from your saved list.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}