
// Job Portal Page
// src/app/citizen/jobs/page.tsx
'use client';

import { useState } from 'react';
import JobCard from '@/components/jobs/JobCard';
import { Search, Filter } from 'lucide-react';

export default function JobsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const jobs = [
    {
      id: 1,
      title: 'Gram Panchayat Secretary',
      company: 'Rural Development Department',
      location: 'Village Panchayat Office',
      salary: '₹18,000 - ₹25,000/month',
      type: 'Full-time',
      posted: '2 days ago',
      description: 'Looking for educated youth to manage panchayat records and assist in administration.',
      isGovernment: true
    },
    {
      id: 2,
      title: 'Agriculture Extension Officer',
      company: 'Agriculture Department',
      location: 'Block Level',
      salary: '₹20,000 - ₹30,000/month',
      type: 'Contract',
      posted: '1 week ago',
      description: 'Guide farmers on modern farming techniques and government schemes.',
      isGovernment: true
    },
    {
      id: 3,
      title: 'MNREGA Supervisor',
      company: 'Employment Guarantee Scheme',
      location: 'Multiple Villages',
      salary: '₹15,000 - ₹20,000/month',
      type: 'Temporary',
      posted: '3 days ago',
      description: 'Monitor and supervise rural employment guarantee scheme works.',
      isGovernment: true
    },
    {
      id: 4,
      title: 'Digital Sakhi',
      company: 'Women Self Help Group',
      location: 'Local SHG Office',
      salary: '₹10,000 - ₹15,000/month',
      type: 'Part-time',
      posted: '5 days ago',
      description: 'Help women in SHGs with digital banking and government applications.',
      isGovernment: false
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase()) ||
                         job.company.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'government' && job.isGovernment) ||
                         (filter === 'private' && !job.isGovernment);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Portal</h1>
        <p className="text-gray-600">Find government and local employment opportunities</p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search jobs by title, company, or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Jobs</option>
              <option value="government">Government Jobs</option>
              <option value="private">Private Jobs</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
        
        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
            <button
              onClick={() => { setSearch(''); setFilter('all'); }}
              className="mt-4 text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}