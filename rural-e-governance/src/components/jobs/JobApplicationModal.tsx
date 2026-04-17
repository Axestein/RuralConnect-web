// src/components/jobs/JobApplicationModal.tsx
'use client';

import { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { Job, UserProfile } from '@/types/jobs';

interface JobApplicationModalProps {
  job: Job;
  userProfile: UserProfile;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function JobApplicationModal({
  job,
  userProfile,
  onSubmit,
  onClose
}: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    fullName: userProfile.name,
    email: userProfile.email,
    phone: userProfile.phone,
    village: userProfile.village,
    education: userProfile.education,
    experience: userProfile.experience,
    coverLetter: '',
    agreeTerms: false
  });
  
  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.village) newErrors.village = 'Village is required';
    if (!formData.education) newErrors.education = 'Education details are required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(formData);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Apply for Job</h2>
            <p className="text-sm text-gray-600 mt-1">{job.title} at {job.company}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Personal Information</h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Village / Town *
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({...formData, village: e.target.value})}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    errors.village ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village}</p>}
              </div>
            </div>
          </div>

          {/* Qualification & Experience */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Qualification & Experience</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Education *
              </label>
              <textarea
                rows={2}
                value={formData.education}
                onChange={(e) => setFormData({...formData, education: e.target.value})}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                  errors.education ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., B.Sc Agriculture from Tamil Nadu Agricultural University"
              />
              {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Work Experience
              </label>
              <textarea
                rows={2}
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your previous work experience (if any)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Resume/CV
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
              </div>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Letter (Optional)
            </label>
            <textarea
              rows={4}
              value={formData.coverLetter}
              onChange={(e) => setFormData({...formData, coverLetter: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Why are you interested in this position? What makes you a good fit?"
            />
          </div>

          {/* Terms */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({...formData, agreeTerms: e.target.checked})}
                className="mt-1 mr-3"
              />
              <div>
                <p className="text-sm text-yellow-800">
                  I confirm that all information provided is accurate to the best of my knowledge.
                  I understand that providing false information may lead to rejection of my application.
                </p>
                {errors.agreeTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeTerms}</p>}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}