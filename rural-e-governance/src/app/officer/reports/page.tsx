// src/app/officer/reports/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Download, 
  Filter, 
  Calendar, 
  FileText, 
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Printer,
  Eye,
  Share2
} from 'lucide-react';

interface ReportData {
  id: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'custom';
  generatedDate: string;
  period: string;
  size: string;
  downloadUrl: string;
}

export default function OfficerReportsPage() {
  const [reports, setReports] = useState<ReportData[]>([
    {
      id: '1',
      title: 'Daily Complaint Report',
      type: 'daily',
      generatedDate: '2024-01-15',
      period: 'Jan 15, 2024',
      size: '2.4 MB',
      downloadUrl: '#'
    },
    {
      id: '2',
      title: 'Weekly Resolution Report',
      type: 'weekly',
      generatedDate: '2024-01-14',
      period: 'Jan 8-14, 2024',
      size: '3.8 MB',
      downloadUrl: '#'
    },
    {
      id: '3',
      title: 'Monthly Performance Report',
      type: 'monthly',
      generatedDate: '2024-01-01',
      period: 'December 2023',
      size: '5.2 MB',
      downloadUrl: '#'
    },
    {
      id: '4',
      title: 'Village-wise Analysis',
      type: 'custom',
      generatedDate: '2024-01-10',
      period: 'Custom Range',
      size: '4.1 MB',
      downloadUrl: '#'
    },
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'month',
    village: 'all'
  });

  // Generate PDF Report function
  const generatePDFReport = (type: string) => {
    const reportData = {
      title: `${type} Report - Rural e-Governance`,
      date: new Date().toLocaleDateString(),
      officer: 'Vikram Singh (RDO-234)',
      summary: {
        totalComplaints: 156,
        resolved: 89,
        inProgress: 42,
        pending: 25,
        resolutionRate: '78%',
        avgResolutionTime: '2.3 days'
      },
      villageWiseData: [
        { village: 'Village A', complaints: 45, resolved: 35 },
        { village: 'Village B', complaints: 38, resolved: 28 },
        { village: 'Village C', complaints: 33, resolved: 26 },
      ],
      topIssues: [
        { category: 'Potholes', count: 56 },
        { category: 'Water Supply', count: 34 },
        { category: 'Sanitation', count: 28 },
      ]
    };

    // Create PDF content
    const pdfContent = `
      <html>
        <head>
          <title>${reportData.title}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; }
            h1 { color: #2563eb; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 20px; margin-bottom: 30px; }
            .section { margin-bottom: 25px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
            th { background-color: #f3f4f6; }
            .stats { display: flex; justify-content: space-between; margin-top: 20px; }
            .stat-box { flex: 1; text-align: center; padding: 15px; background: #f8fafc; margin: 0 10px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${reportData.title}</h1>
            <p><strong>Generated:</strong> ${reportData.date}</p>
            <p><strong>Officer:</strong> ${reportData.officer}</p>
          </div>
          
          <div class="section">
            <h2>Executive Summary</h2>
            <div class="stats">
              <div class="stat-box">
                <h3>${reportData.summary.totalComplaints}</h3>
                <p>Total Complaints</p>
              </div>
              <div class="stat-box">
                <h3>${reportData.summary.resolved}</h3>
                <p>Resolved</p>
              </div>
              <div class="stat-box">
                <h3>${reportData.summary.resolutionRate}</h3>
                <p>Resolution Rate</p>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2>Village-wise Performance</h2>
            <table>
              <tr>
                <th>Village</th>
                <th>Total Complaints</th>
                <th>Resolved</th>
                <th>Resolution Rate</th>
              </tr>
              ${reportData.villageWiseData.map(v => `
                <tr>
                  <td>${v.village}</td>
                  <td>${v.complaints}</td>
                  <td>${v.resolved}</td>
                  <td>${Math.round((v.resolved / v.complaints) * 100)}%</td>
                </tr>
              `).join('')}
            </table>
          </div>
          
          <div class="section">
            <h2>Top Issues</h2>
            <table>
              <tr>
                <th>Issue Category</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
              ${reportData.topIssues.map(issue => `
                <tr>
                  <td>${issue.category}</td>
                  <td>${issue.count}</td>
                  <td>${Math.round((issue.count / reportData.summary.totalComplaints) * 100)}%</td>
                </tr>
              `).join('')}
            </table>
          </div>
          
          <div class="section">
            <h2>Recommendations</h2>
            <ul>
              <li>Increase focus on pothole repairs in Village A</li>
              <li>Improve response time for water supply issues</li>
              <li>Conduct sanitation awareness programs</li>
              <li>Hire additional staff for high-complaint areas</li>
            </ul>
          </div>
          
          <div class="footer" style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>Generated by Rural e-Governance System</p>
            <p>Confidential - For Official Use Only</p>
          </div>
        </body>
      </html>
    `;

    // Create PDF using browser print
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(pdfContent);
      printWindow.document.close();
      printWindow.print();
    }

    // Add to reports list
    const newReport: ReportData = {
      id: Date.now().toString(),
      title: `${type} Report`,
      type: type as any,
      generatedDate: new Date().toISOString().split('T')[0],
      period: new Date().toLocaleDateString(),
      size: '~2.5 MB',
      downloadUrl: '#'
    };
    
    setReports(prev => [newReport, ...prev]);
    
    alert(`${type} report generated successfully!`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
          <p className="text-gray-600">Generate and download official reports</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => generatePDFReport('Daily')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FileText className="h-5 w-5 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Reports Generated</p>
              <p className="text-3xl font-bold mt-2">24</p>
            </div>
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">This Month</p>
              <p className="text-3xl font-bold mt-2">8</p>
            </div>
            <Calendar className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Size</p>
              <p className="text-3xl font-bold mt-2">48 MB</p>
            </div>
            <Download className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg. Generated</p>
              <p className="text-3xl font-bold mt-2">3/day</p>
            </div>
            <TrendingUp className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Report Types</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="custom">Custom</option>
            </select>
            
            <select
              value={filters.dateRange}
              onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="week">Last 7 days</option>
              <option value="month">Last 30 days</option>
              <option value="quarter">Last 90 days</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Export All
            </button>
            <button 
              onClick={() => generatePDFReport('Custom')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Custom Report
            </button>
          </div>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      report.type === 'daily' ? 'bg-blue-100 text-blue-800' :
                      report.type === 'weekly' ? 'bg-green-100 text-green-800' :
                      report.type === 'monthly' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {report.type.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">Period: {report.period}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <span>Generated: {report.generatedDate}</span>
                <span>{report.size}</span>
              </div>
              
              <div className="flex space-x-2 mt-6 pt-4 border-t">
                <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </button>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Printer className="h-4 w-4 mr-2" />
                  Print
                </button>
                <button className="flex-1 flex items-center justify-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Report Generation Options */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Generate New Report</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <button
            onClick={() => generatePDFReport('Daily')}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
          >
            <Calendar className="h-8 w-8 mx-auto text-blue-600 mb-2" />
            <p className="font-medium">Daily Report</p>
            <p className="text-sm text-gray-600">Today's complaints & status</p>
          </button>
          
          <button
            onClick={() => generatePDFReport('Weekly')}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
          >
            <TrendingUp className="h-8 w-8 mx-auto text-green-600 mb-2" />
            <p className="font-medium">Weekly Report</p>
            <p className="text-sm text-gray-600">Week performance analysis</p>
          </button>
          
          <button
            onClick={() => generatePDFReport('Monthly')}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
          >
            <BarChart3 className="h-8 w-8 mx-auto text-purple-600 mb-2" />
            <p className="font-medium">Monthly Report</p>
            <p className="text-sm text-gray-600">Detailed monthly analysis</p>
          </button>
          
          <button
            onClick={() => generatePDFReport('Village')}
            className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 text-center"
          >
            <MapPin className="h-8 w-8 mx-auto text-orange-600 mb-2" />
            <p className="font-medium">Village Report</p>
            <p className="text-sm text-gray-600">Village-wise performance</p>
          </button>
        </div>
      </div>
    </div>
  );
}