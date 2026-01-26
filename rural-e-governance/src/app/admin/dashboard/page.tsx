// src/app/admin/dashboard/page.tsx
'use client';

import { 
  Settings, 
  Users, 
  BarChart3, 
  Shield,
  Activity,
  Server,
  AlertTriangle,
  CheckCircle,
  Download,
  Filter,
  Search,
  Bell,
  User
} from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Users', value: '1,234', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-100' },
    { label: 'Active Officers', value: '45', icon: Shield, color: 'text-green-600', bgColor: 'bg-green-100' },
    { label: 'System Health', value: '98%', icon: Server, color: 'text-purple-600', bgColor: 'bg-purple-100' },
    { label: 'Pending Actions', value: '12', icon: AlertTriangle, color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  ];

  const recentActivities = [
    { user: 'New Citizen Registration', action: 'Rajesh Kumar', time: '10 min ago', status: 'success' },
    { user: 'Officer Login', action: 'Vikram Singh', time: '25 min ago', status: 'info' },
    { user: 'Complaint Filed', action: 'CMP127 - Water Issue', time: '1 hour ago', status: 'success' },
    { user: 'System Update', action: 'Security Patch v2.1', time: '2 hours ago', status: 'warning' },
  ];

  const systemMetrics = [
    { label: 'CPU Usage', value: '42%', color: 'bg-blue-500' },
    { label: 'Memory', value: '68%', color: 'bg-green-500' },
    { label: 'Storage', value: '34%', color: 'bg-purple-500' },
    { label: 'Network', value: '24%', color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Settings className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600 text-sm">System Administration Panel</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <button className="relative p-2">
                <Bell className="h-6 w-6 text-gray-600" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg">
                <User className="h-5 w-5 inline mr-2" />
                Admin
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
          {/* System Metrics */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">System Metrics</h2>
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <select className="border border-gray-300 rounded-lg px-3 py-1">
                    <option>Last 24 hours</option>
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {systemMetrics.map((metric, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">{metric.label}</span>
                      <span className="font-medium">{metric.value}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${metric.color}`}
                        style={{ width: metric.value }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Activity Chart Placeholder */}
              <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-12 w-12 text-gray-400" />
                <span className="ml-3 text-gray-600">Activity Chart Visualization</span>
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="h-5 w-5" />
                </button>
              </div>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-100' :
                      activity.status === 'warning' ? 'bg-yellow-100' :
                      'bg-blue-100'
                    }`}>
                      {activity.status === 'success' ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : activity.status === 'warning' ? (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      ) : (
                        <Activity className="h-4 w-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-900">{activity.user}</span>
                        <span className="text-xs text-gray-500">{activity.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Settings */}
            <div className="mt-6 bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Settings</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Maintenance Mode</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Email Notifications</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Auto Backup</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}