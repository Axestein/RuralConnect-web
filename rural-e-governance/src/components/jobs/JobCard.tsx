// src/components/jobs/JobCard.tsx
'use client';

import { useState } from 'react';
import { 
  MapPin, 
  Briefcase, 
  Calendar, 
  Bookmark, 
  BookmarkCheck,
  Building2,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Job } from '@/types/jobs';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  hasApplied: boolean;
  applicationStatus?: string | null;
  onSave: () => void;
  onUnsave: () => void;
  onApply: () => void;
}

export default function JobCard({
  job,
  isSaved,
  hasApplied,
  applicationStatus,
  onSave,
  onUnsave,
  onApply
}: JobCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'full-time': return 'bg-green-100 text-green-800';
      case 'part-time': return 'bg-blue-100 text-blue-800';
      case 'contract': return 'bg-orange-100 text-orange-800';
      case 'internship': return 'bg-purple-100 text-purple-800';
      case 'daily-wages': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'selected': return 'bg-green-100 text-green-800';
      case 'shortlisted': return 'bg-blue-100 text-blue-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'reviewed': return 'bg-purple-100 text-purple-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getDaysLeft = (lastDate: string) => {
    const today = new Date();
    const last = new Date(lastDate);
    const diffTime = last.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysLeft(job.lastDate);
  const isUrgent = daysLeft <= 7 && daysLeft > 0;
  const isExpired = daysLeft < 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            {/* Company Logo Placeholder */}
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            
            <div>
              <div className="flex items-center flex-wrap gap-2 mb-1">
                <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                {job.isGovernment && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Government
                  </span>
                )}
                {isUrgent && !isExpired && (
                  <span className="text-xs bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    Urgent • {daysLeft} days left
                  </span>
                )}
                {isExpired && (
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full">
                    Expired
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm">{job.company}</p>
            </div>
          </div>
          
          {/* Save Button */}
          <button
            onClick={isSaved ? onUnsave : onSave}
            className="p-2 hover:bg-gray-100 rounded-full transition"
            disabled={isExpired}
          >
            {isSaved ? (
              <BookmarkCheck className="h-5 w-5 text-blue-600" />
            ) : (
              <Bookmark className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        {/* Job Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Briefcase className="h-4 w-4 mr-1.5 text-gray-400" />
            <span className="capitalize">{job.jobType.replace('-', ' ')}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <DollarSign className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{job.salary}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>Posted: {formatDate(job.postedDate)}</span>
          </div>
        </div>

        {/* Description Preview */}
        <p className="text-gray-600 text-sm mt-4 line-clamp-2">
          {job.description}
        </p>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="mt-4 pt-4 border-t space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Requirements:</h4>
              <ul className="list-disc list-inside space-y-1">
                {job.requirements.map((req, idx) => (
                  <li key={idx} className="text-sm text-gray-600">{req}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Qualifications:</h4>
              <p className="text-sm text-gray-600">{job.qualifications}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Experience Required:</h4>
              <p className="text-sm text-gray-600">{job.experienceRequired}</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-900 text-sm mb-2">Contact Information:</h4>
              <p className="text-sm text-gray-600">Contact Person: {job.contactPerson}</p>
              <p className="text-sm text-gray-600">Phone: {job.contactPhone}</p>
              {job.contactEmail && <p className="text-sm text-gray-600">Email: {job.contactEmail}</p>}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>{job.applyCount || 0} applicants</span>
              </div>
              <div className="flex items-center text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Vacancies: {job.vacancies}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 text-sm font-medium hover:text-blue-800"
          >
            {isExpanded ? 'Show less' : 'View details'}
          </button>
          
          {hasApplied ? (
            <div className="flex items-center space-x-2">
              {applicationStatus && (
                <span className={`text-xs px-3 py-1.5 rounded-full flex items-center ${getStatusColor(applicationStatus)}`}>
                  {applicationStatus === 'selected' && <CheckCircle className="h-3 w-3 mr-1" />}
                  {applicationStatus === 'rejected' && <AlertCircle className="h-3 w-3 mr-1" />}
                  Applied • {applicationStatus}
                </span>
              )}
            </div>
          ) : (
            <button
              onClick={onApply}
              disabled={isExpired}
              className={`px-5 py-2 rounded-lg font-medium transition ${
                isExpired
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Apply Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}