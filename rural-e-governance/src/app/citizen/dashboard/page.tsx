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
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import DashboardCard from '@/components/common/DashboardCard';
import ComplaintCard from '@/components/citizen/ComplaintCard';

export default function CitizenDashboard() {
  const stats = [
    { label: 'Active Complaints', value: '3', icon: AlertCircle, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { label: 'Resolved Issues', value: '12', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'Scheme Applications', value: '4', icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Learning Progress', value: '75%', icon: TrendingUp, color: 'text-purple-600', bgColor: 'bg-purple-100' },
  ];

  const quickActions = [
    {
      title: 'File Complaint',
      description: 'Report potholes, water issues, etc.',
      icon: Camera,
      href: '/citizen/complaints/new',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Check Schemes',
      description: 'AI eligibility checker for government schemes',
      icon: MessageSquare,
      href: '/citizen/schemes',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Learning Portal',
      description: 'AI tutor & educational materials',
      icon: BookOpen,
      href: '/citizen/learning',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Job Portal',
      description: 'Find government and local jobs',
      icon: Briefcase,
      href: '/citizen/jobs',
      color: 'bg-orange-100 text-orange-600'
    },
  ];

  const recentComplaints = [
    { id: 'CMP001', title: 'Pothole on Main Road', status: 'In Progress', date: '2024-01-15', category: 'Road' },
    { id: 'CMP002', title: 'Water Supply Issue', status: 'Resolved', date: '2024-01-10', category: 'Water' },
    { id: 'CMP003', title: 'Street Light Not Working', status: 'Pending', date: '2024-01-18', category: 'Electricity' },
  ];

  const schemeSuggestions = [
    { name: 'PM-Kisan Samman Nidhi', match: '95%' },
    { name: 'Ayushman Bharat Yojana', match: '87%' },
    { name: 'Ujjwala Yojana', match: '76%' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Welcome, Rajesh Kumar</h1>
                <p className="text-gray-600 text-sm">Citizen Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <DashboardCard key={index} {...action} />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Complaints */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Complaints</h2>
                <Link href="/citizen/complaints" className="text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentComplaints.map((complaint) => (
                  <div key={complaint.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{complaint.title}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          complaint.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                          complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {complaint.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {complaint.date}
                        </span>
                        <span>Category: {complaint.category}</span>
                      </div>
                    </div>
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      Track
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scheme Suggestions */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Recommended Schemes</h2>
              <div className="space-y-4">
                {schemeSuggestions.map((scheme, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-900">{scheme.name}</h3>
                      <span className="text-sm font-medium text-green-600">{scheme.match} match</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      You are highly eligible for this scheme
                    </p>
                    <button className="w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 text-sm">
                      Check Eligibility
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Links</h2>
              <div className="space-y-3">
                <Link href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Download Tax Forms</span>
                  <FileText className="h-5 w-5 text-gray-400" />
                </Link>
                <Link href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Voter Registration</span>
                  <User className="h-5 w-5 text-gray-400" />
                </Link>
                <Link href="#" className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                  <span className="text-gray-700">Land Records</span>
                  <CheckCircle className="h-5 w-5 text-gray-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}