// src/app/officer/citizens/page.tsx
'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  User, 
  Phone, 
  MapPin, 
  Mail, 
  CheckCircle, 
  XCircle,
  ChevronRight,
  Download,
  Users,
  TrendingUp,
  Clock,
  Award,
  BarChart3,
  MoreVertical,
  Eye,
  MessageSquare,
  FileText,
  Calendar,
  Home,
  Activity,
  ArrowUpRight,
  Shield,
  Star,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';

interface Citizen {
  id: string;
  name: string;
  phone: string;
  email: string;
  village: string;
  ward: string;
  complaints: number;
  resolved: number;
  pending: number;
  joined: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'new';
  satisfaction: number;
  documents: number;
  avatar?: string;
}

export default function CitizensPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedVillage, setSelectedVillage] = useState('all');

  const citizens: Citizen[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '+91 98765 43210',
      email: 'rajesh.kumar@example.com',
      village: 'Sunderpur',
      ward: 'Ward 5',
      complaints: 12,
      resolved: 10,
      pending: 2,
      joined: '2023-01-15',
      lastActive: '2024-01-20',
      status: 'active',
      satisfaction: 4.5,
      documents: 6,
    },
    {
      id: '2',
      name: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya.sharma@example.com',
      village: 'Ganga Nagar',
      ward: 'Ward 3',
      complaints: 8,
      resolved: 8,
      pending: 0,
      joined: '2023-03-22',
      lastActive: '2024-01-19',
      status: 'active',
      satisfaction: 5.0,
      documents: 4,
    },
    {
      id: '3',
      name: 'Amit Singh',
      phone: '+91 76543 21098',
      email: 'amit.singh@example.com',
      village: 'Rajpur',
      ward: 'Ward 2',
      complaints: 15,
      resolved: 12,
      pending: 3,
      joined: '2022-11-10',
      lastActive: '2024-01-18',
      status: 'active',
      satisfaction: 4.2,
      documents: 8,
    },
    {
      id: '4',
      name: 'Sunita Devi',
      phone: '+91 65432 10987',
      email: 'sunita.devi@example.com',
      village: 'Sunderpur',
      ward: 'Ward 5',
      complaints: 5,
      resolved: 3,
      pending: 2,
      joined: '2023-08-05',
      lastActive: '2024-01-15',
      status: 'active',
      satisfaction: 3.8,
      documents: 3,
    },
    {
      id: '5',
      name: 'Vikram Patel',
      phone: '+91 54321 09876',
      email: 'vikram.patel@example.com',
      village: 'Ganga Nagar',
      ward: 'Ward 3',
      complaints: 20,
      resolved: 18,
      pending: 2,
      joined: '2022-09-18',
      lastActive: '2024-01-20',
      status: 'active',
      satisfaction: 4.7,
      documents: 9,
    },
  ];

  const villages = ['All Villages', 'Sunderpur', 'Ganga Nagar', 'Rajpur'];
  const filters = ['All Citizens', 'Active Today', 'New This Week', 'High Priority'];

  const stats = [
    { 
      label: 'Total Citizens', 
      value: '2,847', 
      change: '+124 this month',
      icon: Users, 
      color: 'text-blue-600', 
      bgColor: 'bg-blue-50',
      trend: 'up'
    },
    { 
      label: 'Active Citizens', 
      value: '1,234', 
      change: '43% of total',
      icon: Activity, 
      color: 'text-emerald-600', 
      bgColor: 'bg-emerald-50',
      trend: 'neutral'
    },
    { 
      label: 'Avg. Resolution Time', 
      value: '2.4 days', 
      change: '-0.3 days',
      icon: Clock, 
      color: 'text-amber-600', 
      bgColor: 'bg-amber-50',
      trend: 'down'
    },
    { 
      label: 'Satisfaction Rate', 
      value: '4.2/5', 
      change: '+0.2 this month',
      icon: Star, 
      color: 'text-purple-600', 
      bgColor: 'bg-purple-50',
      trend: 'up'
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
            <Link href="/officer/dashboard" className="hover:text-gray-900 transition-colors">
              Dashboard
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 font-medium">Citizen Management</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Citizen Directory</h1>
          <p className="text-gray-600 mt-1">Manage and engage with registered citizens in your jurisdiction</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-5 py-2.5 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            <Download className="h-5 w-5 mr-2 text-gray-600" />
            <span className="text-sm font-medium">Export List</span>
          </button>
          <button className="flex items-center px-5 py-2.5 bg-gray-900 text-white rounded-xl hover:bg-black transition-all shadow-lg">
            <User className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium">Add Citizen</span>
          </button>
        </div>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor} shadow-sm`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                stat.trend === 'up' ? 'bg-emerald-50 text-emerald-700' :
                stat.trend === 'down' ? 'bg-rose-50 text-rose-700' :
                'bg-gray-50 text-gray-700'
              }`}>
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Village Distribution */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Village Distribution</h2>
            <p className="text-sm text-gray-600 mt-1">Citizen registration by village</p>
          </div>
          <Link 
            href="/officer/analytics" 
            className="flex items-center text-sm text-blue-600 hover:text-blue-800"
          >
            View Analytics
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Sunderpur</span>
              <span className="text-2xl font-bold text-blue-600">847</span>
            </div>
            <div className="w-full bg-blue-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '42%' }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">42% of total</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Ganga Nagar</span>
              <span className="text-2xl font-bold text-emerald-600">623</span>
            </div>
            <div className="w-full bg-emerald-200 rounded-full h-2">
              <div className="bg-emerald-600 h-2 rounded-full" style={{ width: '31%' }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">31% of total</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-900">Rajpur</span>
              <span className="text-2xl font-bold text-purple-600">537</span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div className="bg-purple-600 h-2 rounded-full" style={{ width: '27%' }}></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">27% of total</p>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search citizens by name, phone, email, or village..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50/50 transition-all"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <select
                value={selectedVillage}
                onChange={(e) => setSelectedVillage(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              >
                {villages.map((village) => (
                  <option key={village} value={village.toLowerCase()}>{village}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-3 top-1/2 transform -translate-y-1/2 rotate-90 h-5 w-5 text-gray-400" />
            </div>
            
            <button className="flex items-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-all">
              <Filter className="h-5 w-5 mr-2 text-gray-600" />
              <span className="text-sm font-medium">Filter</span>
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 mt-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter.toLowerCase())}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                selectedFilter === filter.toLowerCase()
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Citizens Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Citizen Details
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Contact Information
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Location
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Complaints
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="py-4 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {citizens.map((citizen) => (
                <tr 
                  key={citizen.id} 
                  className="group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-cyan-50/50 transition-all duration-300"
                >
                  <td className="py-5 px-6">
                    <div className="flex items-center">
                      <div className="relative">
                        <div className="h-12 w-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                          <User className="h-6 w-6 text-gray-600" />
                        </div>
                        {citizen.status === 'active' && (
                          <div className="absolute -top-1 -right-1 h-4 w-4 bg-emerald-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="flex items-center">
                          <p className="font-semibold text-gray-900">{citizen.name}</p>
                          {citizen.satisfaction >= 4.5 && (
                            <span className="ml-2 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs rounded-full">
                              ⭐ High Satisfaction
                            </span>
                          )}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-gray-500">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Joined {new Date(citizen.joined).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Active {new Date(citizen.lastActive).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div className="p-1 bg-blue-50 rounded-md mr-2">
                          <Phone className="h-3.5 w-3.5 text-blue-600" />
                        </div>
                        <span className="text-gray-700 font-medium">{citizen.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <div className="p-1 bg-purple-50 rounded-md mr-2">
                          <Mail className="h-3.5 w-3.5 text-purple-600" />
                        </div>
                        <span className="text-gray-600">{citizen.email}</span>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <div className="p-1 bg-emerald-50 rounded-md mr-2">
                          <Home className="h-3.5 w-3.5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{citizen.village}</p>
                          <p className="text-xs text-gray-500">{citizen.ward}</p>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-gray-900">{citizen.resolved} resolved</span>
                            <span className="text-xs text-gray-500">of {citizen.complaints}</span>
                          </div>
                          <div className="w-32 bg-gray-200 rounded-full h-1.5">
                            <div 
                              className="bg-emerald-600 h-1.5 rounded-full"
                              style={{ width: `${(citizen.resolved / citizen.complaints) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                      {citizen.pending > 0 && (
                        <p className="text-xs text-amber-600 flex items-center">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {citizen.pending} pending complaints
                        </p>
                      )}
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        citizen.status === 'active' 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}>
                        {citizen.status === 'active' ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <XCircle className="h-3 w-3 mr-1" />
                        )}
                        {citizen.status.charAt(0).toUpperCase() + citizen.status.slice(1)}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Award className="h-3 w-3 mr-1" />
                        Satisfaction: {citizen.satisfaction}/5
                      </div>
                    </div>
                  </td>
                  
                  <td className="py-5 px-6">
                    <div className="flex items-center space-x-3">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                        <Eye className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors group">
                        <MessageSquare className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
                      </button>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="h-5 w-5 text-gray-400" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing <span className="font-medium">1-5</span> of <span className="font-medium">2,847</span> citizens
            </p>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium hover:bg-gray-50 disabled:opacity-50">
                Previous
              </button>
              <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-black">
                1
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium hover:bg-gray-50">
                3
              </button>
              <span className="px-2 text-gray-500">...</span>
              <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium hover:bg-gray-50">
                142
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg bg-white text-sm font-medium hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">Citizen Engagement</h3>
              <p className="text-white/80 text-sm">Send broadcast messages, announcements, or updates to citizens</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-5 py-2.5 bg-white text-gray-900 rounded-xl font-medium hover:bg-gray-100 transition-colors shadow-lg">
              Create Broadcast
            </button>
            <button className="px-5 py-2.5 border border-white/30 text-white rounded-xl font-medium hover:bg-white/10 transition-colors">
              Schedule Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}