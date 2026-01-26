// src/app/officer/dashboard/page.tsx
'use client';

import { 
  ClipboardCheck, 
  Users, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  MapPin,
  MessageSquare,
  FileText,
  Bell,
  User
} from 'lucide-react';
import Link from 'next/link';

export default function OfficerDashboard() {
  const stats = [
    { label: 'Pending Complaints', value: '24', icon: Clock, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
    { label: 'In Progress', value: '12', icon: TrendingUp, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Resolved Today', value: '8', icon: CheckCircle, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'High Priority', value: '5', icon: AlertTriangle, color: 'text-red-600', bgColor: 'bg-red-100' },
  ];

  const pendingTasks = [
    { id: 'CMP123', title: 'Water Pipeline Leak', location: 'Main Street', priority: 'High', time: '2 hours ago' },
    { id: 'CMP124', title: 'Garbage Accumulation', location: 'Market Area', priority: 'Medium', time: '4 hours ago' },
    { id: 'CMP125', title: 'Street Light Repair', location: 'Park Road', priority: 'Low', time: '1 day ago' },
    { id: 'CMP126', title: 'Road Repair', location: 'Highway', priority: 'High', time: '6 hours ago' },
  ];

  const quickActions = [
    { title: 'Assign Tasks', icon: Users, href: '#' },
    { title: 'Generate Reports', icon: FileText, href: '#' },
    { title: 'View Analytics', icon: TrendingUp, href: '#' },
    { title: 'Citizen Queries', icon: MessageSquare, href: '#' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <ClipboardCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Officer Dashboard</h1>
                <p className="text-gray-600 text-sm">Rural Development Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative p-2">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg">
                <User className="h-5 w-5 inline mr-2" />
                Officer Profile
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pending Tasks */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Pending Tasks</h2>
                <Link href="#" className="text-blue-600 hover:text-blue-800">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className={`p-2 rounded ${
                        task.priority === 'High' ? 'bg-red-100 text-red-600' :
                        task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-blue-100 text-blue-600'
                      }`}>
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <div className="flex items-center space-x-4 mt-1 text-sm text-gray-600">
                          <span className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {task.location}
                          </span>
                          <span>{task.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                        Assign
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                        Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions & Performance */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-4">
                {quickActions.map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <action.icon className="h-8 w-8 text-blue-600 mb-2" />
                    <span className="text-sm text-gray-700 text-center">{action.title}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Performance</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Resolution Rate</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: '78%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Average Resolution Time</span>
                    <span className="font-medium">2.3 days</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: '65%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Citizen Satisfaction</span>
                    <span className="font-medium">4.2/5</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-500" style={{ width: '84%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}