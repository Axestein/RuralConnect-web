// src/app/officer/analytics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  MapPin,
  Filter,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  Target
} from 'lucide-react';

interface AnalyticsData {
  resolutionRate: number;
  avgResolutionTime: number;
  citizenSatisfaction: number;
  totalComplaints: number;
  complaintsByCategory: { category: string; count: number; color: string }[];
  complaintsByVillage: { village: string; complaints: number; resolved: number }[];
  monthlyTrend: { month: string; complaints: number; resolved: number }[];
  officerPerformance: { name: string; resolved: number; pending: number }[];
}

export default function OfficerAnalyticsPage() {
  const [data, setData] = useState<AnalyticsData>({
    resolutionRate: 78,
    avgResolutionTime: 2.3,
    citizenSatisfaction: 4.2,
    totalComplaints: 156,
    complaintsByCategory: [
      { category: 'Potholes', count: 56, color: '#ef4444' },
      { category: 'Water Supply', count: 34, color: '#3b82f6' },
      { category: 'Sanitation', count: 28, color: '#10b981' },
      { category: 'Electricity', count: 22, color: '#f59e0b' },
      { category: 'Street Lights', count: 16, color: '#8b5cf6' },
    ],
    complaintsByVillage: [
      { village: 'Village A', complaints: 45, resolved: 35 },
      { village: 'Village B', complaints: 38, resolved: 28 },
      { village: 'Village C', complaints: 33, resolved: 26 },
      { village: 'Village D', complaints: 25, resolved: 18 },
      { village: 'Village E', complaints: 15, resolved: 12 },
    ],
    monthlyTrend: [
      { month: 'Jan', complaints: 45, resolved: 35 },
      { month: 'Feb', complaints: 38, resolved: 28 },
      { month: 'Mar', complaints: 42, resolved: 33 },
      { month: 'Apr', complaints: 50, resolved: 39 },
      { month: 'May', complaints: 48, resolved: 38 },
      { month: 'Jun', complaints: 52, resolved: 41 },
    ],
    officerPerformance: [
      { name: 'Officer A', resolved: 45, pending: 5 },
      { name: 'Officer B', resolved: 38, pending: 8 },
      { name: 'Officer C', resolved: 32, pending: 12 },
      { name: 'Officer D', resolved: 28, pending: 7 },
    ]
  });

  const [timeRange, setTimeRange] = useState('month');
  const [view, setView] = useState('overview');

  // Calculate total resolved
  const totalResolved = data.complaintsByVillage.reduce((sum, v) => sum + v.resolved, 0);
  const pendingComplaints = data.totalComplaints - totalResolved;
  const resolutionPercentage = (totalResolved / data.totalComplaints) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Real-time insights and performance metrics</p>
        </div>
        <div className="flex space-x-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
            <option value="quarter">Last 90 days</option>
            <option value="year">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
            <Download className="h-5 w-5 mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex border-b">
        {['overview', 'village', 'officers', 'trends'].map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-6 py-3 font-medium capitalize ${
              view === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {view === 'overview' && (
        <>
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Resolution Rate</p>
                  <p className="text-3xl font-bold mt-2">{data.resolutionRate}%</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+2.5% from last month</span>
                  </div>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Avg. Resolution Time</p>
                  <p className="text-3xl font-bold mt-2">{data.avgResolutionTime} days</p>
                  <div className="flex items-center mt-2">
                    <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">-0.4 days improvement</span>
                  </div>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Citizen Satisfaction</p>
                  <p className="text-3xl font-bold mt-2">{data.citizenSatisfaction}/5</p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+0.3 points increase</span>
                  </div>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Total Complaints</p>
                  <p className="text-3xl font-bold mt-2">{data.totalComplaints}</p>
                  <div className="flex items-center mt-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mr-1" />
                    <span className="text-sm text-gray-600">{pendingComplaints} pending</span>
                  </div>
                </div>
                <Target className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Category Distribution */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Complaints by Category</h3>
                <Filter className="h-5 w-5 text-gray-500" />
              </div>
              <div className="space-y-4">
                {data.complaintsByCategory.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-gray-700">{item.category}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-4">{item.count}</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full"
                          style={{
                            width: `${(item.count / data.totalComplaints) * 100}%`,
                            backgroundColor: item.color
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Village Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Village Performance</h3>
                <MapPin className="h-5 w-5 text-gray-500" />
              </div>
              <div className="space-y-4">
                {data.complaintsByVillage.map((village) => {
                  const resolutionRate = (village.resolved / village.complaints) * 100;
                  return (
                    <div key={village.village} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{village.village}</span>
                        <span className="text-sm text-gray-600">
                          {village.resolved}/{village.complaints} resolved
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${resolutionRate}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>{village.complaints} total complaints</span>
                        <span>{resolutionRate.toFixed(1)}% resolution rate</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Trend</h3>
              <LineChart className="h-5 w-5 text-gray-500" />
            </div>
            <div className="h-64 flex items-end space-x-4">
              {data.monthlyTrend.map((month) => (
                <div key={month.month} className="flex-1 flex flex-col items-center">
                  <div className="w-full flex flex-col items-center space-y-2">
                    <div className="relative w-8">
                      <div
                        className="w-8 bg-blue-500 rounded-t"
                        style={{ height: `${(month.complaints / 60) * 100}px` }}
                      />
                      <div
                        className="w-8 bg-green-500 rounded-t absolute bottom-0"
                        style={{ height: `${(month.resolved / 60) * 100}px` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600">{month.month}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-6 mt-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 mr-2"></div>
                <span>Total Complaints</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 mr-2"></div>
                <span>Resolved</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Village Analytics Tab */}
      {view === 'village' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Village-wise Detailed Analysis</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Village</th>
                  <th className="text-left py-3 px-4">Total Complaints</th>
                  <th className="text-left py-3 px-4">Resolved</th>
                  <th className="text-left py-3 px-4">Pending</th>
                  <th className="text-left py-3 px-4">Resolution Rate</th>
                  <th className="text-left py-3 px-4">Avg. Time</th>
                  <th className="text-left py-3 px-4">Satisfaction</th>
                </tr>
              </thead>
              <tbody>
                {data.complaintsByVillage.map((village) => (
                  <tr key={village.village} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{village.village}</td>
                    <td className="py-3 px-4">{village.complaints}</td>
                    <td className="py-3 px-4 text-green-600">{village.resolved}</td>
                    <td className="py-3 px-4 text-red-600">
                      {village.complaints - village.resolved}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden mr-3">
                          <div
                            className="h-full bg-green-500"
                            style={{ width: `${(village.resolved / village.complaints) * 100}%` }}
                          />
                        </div>
                        <span>{((village.resolved / village.complaints) * 100).toFixed(1)}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">2.1 days</td>
                    <td className="py-3 px-4">4.3/5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Officer Performance Tab */}
      {view === 'officers' && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Officer Performance</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.officerPerformance.map((officer) => {
              const total = officer.resolved + officer.pending;
              const efficiency = (officer.resolved / total) * 100;
              return (
                <div key={officer.name} className="border rounded-lg p-4">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{officer.name}</p>
                      <p className="text-sm text-gray-600">Officer ID: OFF-{Math.floor(Math.random() * 1000)}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Efficiency</span>
                        <span>{efficiency.toFixed(1)}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${efficiency}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <div className="text-center">
                        <p className="font-medium text-green-600">{officer.resolved}</p>
                        <p className="text-gray-600">Resolved</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-yellow-600">{officer.pending}</p>
                        <p className="text-gray-600">Pending</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-blue-600">{total}</p>
                        <p className="text-gray-600">Total</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center mb-4">
          <BarChart3 className="h-6 w-6 text-blue-600 mr-3" />
          <h3 className="text-lg font-semibold text-gray-900">AI-Powered Insights</h3>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">📊 Top Recommendations</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                <span>Increase staff in Village A during monsoon season</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-green-500 rounded-full mt-2 mr-3"></div>
                <span>Pothole repairs should be prioritized in next quarter</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-purple-500 rounded-full mt-2 mr-3"></div>
                <span>Water supply complaints peak at 10 AM - schedule teams accordingly</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">🎯 Predictive Analysis</h4>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <div className="h-2 w-2 bg-orange-500 rounded-full mt-2 mr-3"></div>
                <span>Expected 15% increase in complaints next month</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 bg-red-500 rounded-full mt-2 mr-3"></div>
                <span>Village B may need additional sanitation resources</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}