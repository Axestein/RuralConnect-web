// src/app/citizen/dashboard/page.tsx
'use client';

import { 
  Camera, 
  MessageSquare, 
  BookOpen, 
  Briefcase,
  FileText,
  CheckCircle,
  Bell,
  User,
  TrendingUp,
  Clock,
  AlertTriangle,
  ChevronRight,
  Download,
  Eye,
  MapPin,
  Calendar,
  BarChart3,
  Search,
  Filter,
  ArrowUpRight,
  MoreVertical,
  Shield,
  Award,
  Target,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import DashboardCard from '@/components/common/DashboardCard';

export default function CitizenDashboard() {
  const stats = [
    { 
      label: 'Active Cases', 
      value: '3', 
      change: '+1 this week',
      icon: AlertTriangle, 
      color: 'text-amber-600', 
      bgColor: 'bg-amber-50',
      trend: 'up'
    },
    { 
      label: 'Resolved Issues', 
      value: '12', 
      change: '+3 this month',
      icon: CheckCircle, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50',
      trend: 'up'
    },
    { 
      label: 'Applications', 
      value: '4', 
      change: 'In review',
      icon: FileText, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      trend: 'neutral'
    },
    { 
      label: 'Learning Progress', 
      value: '75%', 
      change: '+5% this week',
      icon: TrendingUp, 
      color: 'text-indigo-600', 
      bgColor: 'bg-indigo-50',
      trend: 'up'
    },
  ];

  const quickActions = [
    {
      title: 'File Complaint',
      description: 'Report civic issues with photo evidence',
      icon: Camera,
      href: '/citizen/complaints/new',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Scheme Eligibility',
      description: 'AI-powered government scheme matching',
      icon: MessageSquare,
      href: '/citizen/schemes',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Learning Hub',
      description: 'Digital literacy & skill development',
      icon: BookOpen,
      href: '/citizen/learning',
      gradient: 'from-purple-500 to-violet-500'
    },
    {
      title: 'Job Portal',
      description: 'Government & local employment opportunities',
      icon: Briefcase,
      href: '/citizen/jobs',
      gradient: 'from-amber-500 to-orange-500'
    },
    {
    title: 'Scheme Eligibility',
    description: 'AI-powered government scheme matching',
    icon: Sparkles,
    href: '/citizen/schemes',
    gradient: 'from-purple-500 to-pink-500'
    },
  ];

  const recentComplaints = [
    { 
      id: 'CMP001', 
      title: 'Pothole Repair - Main Road', 
      status: 'In Progress', 
      date: 'Jan 15, 2024', 
      category: 'Infrastructure',
      priority: 'High',
      officer: 'Officer Sharma',
      location: 'Sector 12'
    },
    { 
      id: 'CMP002', 
      title: 'Water Supply Restoration', 
      status: 'Resolved', 
      date: 'Jan 10, 2024', 
      category: 'Utilities',
      priority: 'Medium',
      officer: 'Officer Patel',
      location: 'Ward 5'
    },
    { 
      id: 'CMP003', 
      title: 'Street Light Maintenance', 
      status: 'Pending', 
      date: 'Jan 18, 2024', 
      category: 'Public Works',
      priority: 'Low',
      officer: 'Pending Assignment',
      location: 'Market Area'
    },
  ];

  const schemeSuggestions = [
    { 
      name: 'PM-Kisan Samman Nidhi', 
      match: '95%',
      deadline: 'Mar 31, 2024',
      description: 'Income support for farmers',
      status: 'Highly Eligible'
    },
    { 
      name: 'Ayushman Bharat Yojana', 
      match: '87%',
      deadline: 'Ongoing',
      description: 'Healthcare coverage scheme',
      status: 'Eligible'
    },
    { 
      name: 'Ujjwala Yojana', 
      match: '76%',
      deadline: 'Dec 31, 2024',
      description: 'LPG connection subsidy',
      status: 'Moderately Eligible'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      

      <main className="container mx-auto px-6 py-8">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor} shadow-sm`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div className="text-right">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' :
                    stat.trend === 'down' ? 'bg-rose-50 text-rose-700' :
                    'bg-gray-50 text-gray-700'
                  }`}>
                    {stat.change}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <div className={`p-1 rounded ${
                    stat.trend === 'up' ? 'bg-emerald-100 text-emerald-600' :
                    stat.trend === 'down' ? 'bg-rose-100 text-rose-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Quick Services</h2>
              <p className="text-gray-600 mt-1">Access essential government services</p>
            </div>
            <Link 
              href="/citizen/services" 
              className="flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              View all services
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => window.location.href = action.href}
              >
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${action.gradient} shadow-md mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-sm text-gray-500 group-hover:text-blue-600">
                  <span>Access Service</span>
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Cases */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recent Cases</h2>
                  <p className="text-gray-600 text-sm mt-1">Track your filed complaints and requests</p>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    Filter
                  </button>
                  <Link 
                    href="/citizen/complaints" 
                    className="px-4 py-2 text-sm bg-gray-900 text-white rounded-lg hover:bg-black transition-colors"
                  >
                    New Complaint
                  </Link>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="group border border-gray-200 rounded-xl p-4 hover:border-blue-200 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            complaint.status === 'Resolved' ? 'bg-emerald-50 text-emerald-700' :
                            complaint.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {complaint.status}
                          </div>
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            complaint.priority === 'High' ? 'bg-rose-50 text-rose-700' :
                            complaint.priority === 'Medium' ? 'bg-amber-50 text-amber-700' :
                            'bg-gray-50 text-gray-700'
                          }`}>
                            {complaint.priority} Priority
                          </div>
                        </div>
                        
                        <h3 className="font-medium text-gray-900 mb-1">{complaint.title}</h3>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-3">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {complaint.date}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {complaint.location}
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            {complaint.officer}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4">
                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <Eye className="h-5 w-5 text-gray-400" />
                        </button>
                        <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                          Track Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link 
                  href="/citizen/complaints" 
                  className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
                >
                  View All Cases
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Scheme Recommendations */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Recommended Schemes</h2>
                  <p className="text-gray-600 text-sm mt-1">Based on your profile</p>
                </div>
                <Award className="h-6 w-6 text-amber-500" />
              </div>
              
              <div className="space-y-4">
                {schemeSuggestions.map((scheme, index) => (
                  <div key={index} className="group border border-gray-200 rounded-xl p-4 hover:border-emerald-200 hover:shadow-sm transition-all duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-1">{scheme.name}</h3>
                        <p className="text-sm text-gray-600">{scheme.description}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          <Target className="h-4 w-4 text-emerald-500 mr-1" />
                          <span className="text-sm font-semibold text-emerald-600">{scheme.match}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Deadline: {scheme.deadline}
                        </div>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full mt-2 ${
                          scheme.status.includes('Highly') ? 'bg-emerald-50 text-emerald-700' :
                          scheme.status.includes('Eligible') ? 'bg-blue-50 text-blue-700' :
                          'bg-amber-50 text-amber-700'
                        }`}>
                          {scheme.status}
                        </div>
                      </div>
                      <button className="px-4 py-2 text-sm bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Documents */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Documents</h2>
              <div className="space-y-3">
                <Link href="#" className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-50 rounded-lg mr-3">
                      <FileText className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Tax Certificate</p>
                      <p className="text-sm text-gray-500">Last updated: Jan 15</p>
                    </div>
                  </div>
                  <Download className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                </Link>
                
                <Link href="#" className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-emerald-50 rounded-lg mr-3">
                      <Shield className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Aadhaar e-KYC</p>
                      <p className="text-sm text-gray-500">Verified ✓</p>
                    </div>
                  </div>
                  <Eye className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
                </Link>
                
                <Link href="#" className="group flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                  <div className="flex items-center">
                    <div className="p-2 bg-purple-50 rounded-lg mr-3">
                      <CheckCircle className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Land Records</p>
                      <p className="text-sm text-gray-500">View & Download</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                </Link>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">System Status</h3>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2"></div>
                  <span className="text-sm text-emerald-300">All Systems Operational</span>
                </div>
              </div>
              <p className="text-sm text-gray-300">
                Services are running smoothly. Last updated 2 minutes ago.
              </p>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center text-sm">
                  <BarChart3 className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-gray-400">Response Time:</span>
                  <span className="ml-auto font-medium">124ms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
{/* 
         <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="bg-green-600 p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <Calendar className="h-6 w-6 text-white" />
        </button>

        {isChatOpen && (
          <div className="absolute bottom-16 right-0 w-96 bg-white rounded-lg shadow-xl">
            <iframe
              src="https://www.chatbase.co/chatbot-iframe/4kDzzgyUQbdvNCitA9Nz5"
              width="100%"
              style={{ height: '600px', border: 'none' }}
              frameBorder="0"
              title="Chatbot"
            ></iframe>
          </div>
        )}
      </div> */}

      </main>
    </div>
  );
}