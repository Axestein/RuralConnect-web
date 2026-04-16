// src/components/jobs/JobFilters.tsx
'use client';

import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';

interface JobFiltersProps {
  locations: string[];
  districts: string[];
  categories: string[];
  filters: any;
  onFilterChange: (filters: any) => void;
  onClear: () => void;
  onClose?: () => void;
}

export default function JobFilters({
  locations,
  districts,
  categories,
  filters,
  onFilterChange,
  onClear,
  onClose
}: JobFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    location: true,
    district: true,
    jobType: true,
    category: true,
    salary: true
  });

  const jobTypes = [
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'internship', label: 'Internship' },
    { value: 'daily-wages', label: 'Daily Wages' }
  ];

  const salaryRanges = [
    { value: '0-10000', label: 'Up to ₹10,000' },
    { value: '10000-20000', label: '₹10,000 - ₹20,000' },
    { value: '20000-30000', label: '₹20,000 - ₹30,000' },
    { value: '30000-50000', label: '₹30,000 - ₹50,000' },
    { value: '50000-100000', label: '₹50,000+' }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFilterChange = (key: string, value: any) => {
    onFilterChange({ [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-500 mr-2" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onClear}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Clear all
          </button>
          {onClose && (
            <button onClick={onClose} className="md:hidden p-1">
              <X className="h-5 w-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {/* Location Filter */}
        <div>
          <button
            onClick={() => toggleSection('location')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Location</span>
            {expandedSections.location ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {expandedSections.location && (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="location"
                  value="all"
                  checked={!filters.location || filters.location === 'all'}
                  onChange={() => handleFilterChange('location', 'all')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">All Locations</span>
              </label>
              {locations.map(loc => (
                <label key={loc} className="flex items-center">
                  <input
                    type="radio"
                    name="location"
                    value={loc}
                    checked={filters.location === loc}
                    onChange={() => handleFilterChange('location', loc)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{loc}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* District Filter */}
        <div>
          <button
            onClick={() => toggleSection('district')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">District</span>
            {expandedSections.district ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {expandedSections.district && (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="district"
                  value="all"
                  checked={!filters.district || filters.district === 'all'}
                  onChange={() => handleFilterChange('district', 'all')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">All Districts</span>
              </label>
              {districts.map(dist => (
                <label key={dist} className="flex items-center">
                  <input
                    type="radio"
                    name="district"
                    value={dist}
                    checked={filters.district === dist}
                    onChange={() => handleFilterChange('district', dist)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{dist}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Job Type Filter */}
        <div>
          <button
            onClick={() => toggleSection('jobType')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Job Type</span>
            {expandedSections.jobType ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {expandedSections.jobType && (
            <div className="mt-2 space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="jobType"
                  value="all"
                  checked={!filters.jobType || filters.jobType === 'all'}
                  onChange={() => handleFilterChange('jobType', 'all')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">All Types</span>
              </label>
              {jobTypes.map(type => (
                <label key={type.value} className="flex items-center">
                  <input
                    type="radio"
                    name="jobType"
                    value={type.value}
                    checked={filters.jobType === type.value}
                    onChange={() => handleFilterChange('jobType', type.value)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 capitalize">{type.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Category Filter */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-gray-900">Category</span>
            {expandedSections.category ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
          {expandedSections.category && (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value="all"
                  checked={!filters.category || filters.category === 'all'}
                  onChange={() => handleFilterChange('category', 'all')}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700">All Categories</span>
              </label>
              {categories.map(cat => (
                <label key={cat} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={filters.category === cat}
                    onChange={() => handleFilterChange('category', cat)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Government Jobs Toggle */}
        <div>
          <label className="flex items-center justify-between">
            <span className="font-medium text-gray-900">Government Jobs Only</span>
            <input
              type="checkbox"
              checked={filters.isGovernment === true}
              onChange={(e) => handleFilterChange('isGovernment', e.target.checked || undefined)}
              className="toggle-switch"
            />
          </label>
        </div>

        {/* Active Filters Display */}
        {(filters.location || filters.district || filters.jobType || filters.category || filters.isGovernment) && (
          <div className="pt-3 border-t">
            <p className="text-xs text-gray-500 mb-2">Active Filters:</p>
            <div className="flex flex-wrap gap-2">
              {filters.location && filters.location !== 'all' && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Location: {filters.location}
                </span>
              )}
              {filters.district && filters.district !== 'all' && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  District: {filters.district}
                </span>
              )}
              {filters.jobType && filters.jobType !== 'all' && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Type: {filters.jobType}
                </span>
              )}
              {filters.category && filters.category !== 'all' && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Category: {filters.category}
                </span>
              )}
              {filters.isGovernment && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  Government Jobs
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}