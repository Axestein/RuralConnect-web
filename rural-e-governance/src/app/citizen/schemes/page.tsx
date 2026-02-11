// src/app/citizen/schemes/page.tsx
'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronRight,
  Target,
  Calendar,
  IndianRupee,
  Briefcase,
  Users,
  Home,
  Heart,
  GraduationCap,
  Leaf,
  Shield,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowRight,
  Download,
  BookOpen,
  HelpCircle,
  Sparkles,
  BarChart3,
  Award,
  Clock,
  MapPin,
  UserCheck,
  Landmark
} from 'lucide-react';
import Link from 'next/link';
import SchemeCard from '@/components/citizen/SchemeCard';
import EligibilityChecker from '@/components/citizen/EligibilityChecker';

export default function SchemesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showEligibilityChecker, setShowEligibilityChecker] = useState(false);

  const categories = [
    { id: 'all', name: 'All Schemes', icon: Target },
    { id: 'agriculture', name: 'Agriculture', icon: Leaf },
    { id: 'health', name: 'Health & Wellness', icon: Heart },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'housing', name: 'Housing', icon: Home },
    { id: 'social', name: 'Social Welfare', icon: Users },
    { id: 'employment', name: 'Employment', icon: Briefcase },
  ];

  const schemes = [
    {
      id: 'pm-kisan',
      name: 'PM-Kisan Samman Nidhi',
      description: 'Income support of ₹6000 per year to farmer families',
      category: 'agriculture',
      ministry: 'Ministry of Agriculture',
      deadline: 'Mar 31, 2024',
      benefit: '₹6,000/year',
      eligibility: [
        'Small and marginal farmer families',
        'Owns cultivable land',
        'Family income below ₹2 lakh',
      ],
      documents: ['Aadhaar', 'Land Records', 'Bank Account'],
      matchScore: 95,
      appliedCount: '12.3L+',
      status: 'active',
    },
    {
      id: 'ayushman-bharat',
      name: 'Ayushman Bharat Yojana',
      description: 'Health coverage up to ₹5 lakh per family per year',
      category: 'health',
      ministry: 'Ministry of Health',
      deadline: 'Ongoing',
      benefit: '₹5,00,000 cover',
      eligibility: [
        'SECC database identified families',
        'Rural and urban poor',
        'No age limit',
      ],
      documents: ['Aadhaar', 'Ration Card', 'Income Certificate'],
      matchScore: 87,
      appliedCount: '8.7L+',
      status: 'active',
    },
    {
      id: 'ujjwala',
      name: 'Ujjwala Yojana',
      description: 'Free LPG connections to women from BPL households',
      category: 'social',
      ministry: 'Ministry of Petroleum',
      deadline: 'Dec 31, 2024',
      benefit: 'Free LPG Connection',
      eligibility: [
        'Women above 18 years',
        'BPL household',
        'No existing LPG connection',
      ],
      documents: ['Aadhaar', 'BPL Certificate', 'Age Proof'],
      matchScore: 76,
      appliedCount: '5.2L+',
      status: 'active',
    },
    {
      id: 'pm-awas',
      name: 'PM Awas Yojana',
      description: 'Housing for All - Financial assistance for house construction',
      category: 'housing',
      ministry: 'Ministry of Housing',
      deadline: 'Jun 30, 2024',
      benefit: '₹1.2L - ₹2.5L',
      eligibility: [
        'Homeless or living in kutcha house',
        'Not owned a pucca house earlier',
        'Annual income criteria',
      ],
      documents: ['Aadhaar', 'Income Certificate', 'Land Document'],
      matchScore: 82,
      appliedCount: '15.4L+',
      status: 'active',
    },
    {
      id: 'pm-kaushal',
      name: 'PM Kaushal Vikas Yojana',
      description: 'Skill training and certification for youth',
      category: 'education',
      ministry: 'Ministry of Skill Development',
      deadline: 'Ongoing',
      benefit: 'Free Skill Training',
      eligibility: [
        'Age 15-45 years',
        'Minimum 8th pass',
        'Unemployed youth',
      ],
      documents: ['Aadhaar', 'Education Certificate', 'Bank Account'],
      matchScore: 68,
      appliedCount: '3.1L+',
      status: 'active',
    },
    {
      id: 'pm-fasal',
      name: 'PM Fasal Bima Yojana',
      description: 'Crop insurance scheme for farmers',
      category: 'agriculture',
      ministry: 'Ministry of Agriculture',
      deadline: 'May 15, 2024',
      benefit: 'Insurance coverage',
      eligibility: [
        'Farmers with cultivable land',
        'Loanee/non-loanee farmers',
        'All crops covered',
      ],
      documents: ['Aadhaar', 'Land Records', 'Bank Passbook'],
      matchScore: 73,
      appliedCount: '6.8L+',
      status: 'active',
    },
  ];

  const featuredSchemes = schemes.filter(s => s.matchScore >= 85).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/citizen/dashboard" className="text-gray-600 hover:text-gray-900">
                <ChevronRight className="h-5 w-5 rotate-180" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Government Schemes</h1>
                <p className="text-gray-600 text-sm">Find and apply for schemes you're eligible for</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowEligibilityChecker(!showEligibilityChecker)}
                className="flex items-center px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg shadow-blue-500/20"
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Check Your Eligibility
              </button>
              <button className="p-2.5 border border-gray-200 rounded-xl hover:bg-gray-50">
                <Download className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Eligibility Checker Modal */}
      {showEligibilityChecker && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <EligibilityChecker onClose={() => setShowEligibilityChecker(false)} />
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* AI Match Score Banner */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <span className="ml-3 text-sm font-medium text-white/80">AI-Powered Recommendations</span>
                </div>
                <h2 className="text-2xl font-bold mb-3">Discover Schemes You're Eligible For</h2>
                <p className="text-white/90 mb-6 max-w-2xl">
                  Our AI analyzes your profile and matches you with government schemes you qualify for. 
                  Get personalized recommendations in seconds.
                </p>
                <button 
                  onClick={() => setShowEligibilityChecker(true)}
                  className="px-6 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors flex items-center"
                >
                  Start Eligibility Check
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center space-x-2">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <BarChart3 className="h-8 w-8" />
                  </div>
                  <div className="text-4xl font-bold">95%</div>
                  <div className="text-sm">Average<br/>Match Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Schemes */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">🎯 Top Matches For You</h2>
              <p className="text-gray-600 text-sm mt-1">Based on your profile and location</p>
            </div>
            <Link href="#" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              View all recommendations
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} featured />
            ))}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes by name, ministry, or benefit..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
              />
            </div>
            <div className="flex items-center space-x-3">
              <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 flex items-center">
                <Filter className="h-5 w-5 mr-2 text-gray-600" />
                <span>Filter</span>
              </button>
              <button className="px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-black">
                Search
              </button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Schemes Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gray-900 rounded-2xl p-8 text-white">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Need Assistance?</h4>
                <p className="text-sm text-gray-400">Visit your nearest CSC center for help with applications</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Application Status</h4>
                <p className="text-sm text-gray-400">Track your submitted applications in real-time</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="p-3 bg-white/10 rounded-xl">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold mb-2">Scheme Guides</h4>
                <p className="text-sm text-gray-400">Download detailed guides in your local language</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}