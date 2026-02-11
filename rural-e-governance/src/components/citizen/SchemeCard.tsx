// src/components/citizen/SchemeCard.tsx
'use client';

import { 
  Calendar, 
  IndianRupee, 
  Users,
  CheckCircle,
  ArrowRight,
  Award,
  Clock,
  Shield
} from 'lucide-react';
import Link from 'next/link';

interface SchemeCardProps {
  scheme: any;
  featured?: boolean;
}

export default function SchemeCard({ scheme, featured = false }: SchemeCardProps) {
  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    if (score >= 50) return 'text-amber-600 bg-amber-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <div className={`bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300 ${
      featured ? 'shadow-lg hover:shadow-xl' : 'shadow-sm hover:shadow-md'
    }`}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-900">{scheme.name}</h3>
              {scheme.matchScore && (
                <span className={`ml-3 px-3 py-1 text-xs font-medium rounded-full ${getMatchColor(scheme.matchScore)}`}>
                  {scheme.matchScore}% Match
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">{scheme.description}</p>
          </div>
          {featured && (
            <div className="p-2 bg-amber-100 rounded-lg">
              <Award className="h-5 w-5 text-amber-600" />
            </div>
          )}
        </div>

        {/* Ministry */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <Shield className="h-4 w-4 mr-1.5" />
          <span>{scheme.ministry}</span>
        </div>

        {/* Benefits */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center text-sm">
            <IndianRupee className="h-4 w-4 text-gray-400 mr-1.5" />
            <span className="text-gray-900 font-medium">{scheme.benefit}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 text-gray-400 mr-1.5" />
            <span className="text-gray-600">Deadline: {scheme.deadline}</span>
          </div>
        </div>

        {/* Eligibility Preview */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Quick eligibility check:</p>
          <div className="space-y-1.5">
            {scheme.eligibility.slice(0, 2).map((item: string, index: number) => (
              <div key={index} className="flex items-start text-xs text-gray-600">
                <CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{item}</span>
              </div>
            ))}
            {scheme.eligibility.length > 2 && (
              <p className="text-xs text-gray-400 ml-4">+{scheme.eligibility.length - 2} more criteria</p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1.5" />
            <span>{scheme.appliedCount} applied</span>
          </div>
          <Link
            href={`/citizen/schemes/${scheme.id}`}
            className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}