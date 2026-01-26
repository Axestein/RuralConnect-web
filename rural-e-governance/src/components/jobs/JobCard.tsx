// src/components/jobs/JobCard.tsx
import { MapPin, Briefcase, Clock } from 'lucide-react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  posted: string;
  description: string;
  isGovernment: boolean;
}

export default function JobCard({
  title,
  company,
  location,
  salary,
  type,
  posted,
  description,
  isGovernment
}: JobCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-gray-900">{title}</h3>
          <p className="text-gray-700">{company}</p>
        </div>
        {isGovernment && (
          <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
            Government
          </span>
        )}
      </div>

      <p className="text-gray-600 mb-4">{description}</p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-2" />
          <span className="text-sm">{location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Rupee className="h-4 w-4 mr-2" />
          <span className="text-sm">{salary}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Briefcase className="h-4 w-4 mr-2" />
          <span className="text-sm">{type}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-2" />
          <span className="text-sm">{posted}</span>
        </div>
      </div>

      <div className="flex space-x-3">
        <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Apply Now
        </button>
        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          Save
        </button>
      </div>
    </div>
  );
}
