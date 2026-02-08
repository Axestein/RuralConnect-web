// src/app/officer/citizens/page.tsx
'use client';

import { useState } from 'react';
import { Search, Filter, User, Phone, MapPin, Mail, CheckCircle, XCircle } from 'lucide-react';

interface Citizen {
  id: string;
  name: string;
  phone: string;
  email: string;
  village: string;
  complaints: number;
  resolved: number;
  joined: string;
  status: 'active' | 'inactive';
}

export default function CitizensPage() {
  const [citizens] = useState<Citizen[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      phone: '9876543210',
      email: 'rajesh@example.com',
      village: 'Village A',
      complaints: 12,
      resolved: 10,
      joined: '2023-01-15',
      status: 'active'
    },
    // Add more citizens...
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Citizen Management</h1>
        <p className="text-gray-600">View and manage registered citizens</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Total Citizens</p>
          <p className="text-3xl font-bold mt-2">1,234</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Active Today</p>
          <p className="text-3xl font-bold mt-2">156</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Avg Complaints</p>
          <p className="text-3xl font-bold mt-2">3.2/citizen</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6">
          <p className="text-gray-500 text-sm">Satisfaction Rate</p>
          <p className="text-3xl font-bold mt-2">4.2/5</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search citizens by name, phone, or village..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Citizens Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left">Citizen</th>
                <th className="py-3 px-4 text-left">Contact</th>
                <th className="py-3 px-4 text-left">Village</th>
                <th className="py-3 px-4 text-left">Complaints</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {citizens.map((citizen) => (
                <tr key={citizen.id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{citizen.name}</p>
                        <p className="text-sm text-gray-500">Joined: {citizen.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-gray-400 mr-2" />
                        <span>{citizen.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-gray-400 mr-2" />
                        <span className="text-sm">{citizen.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{citizen.village}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div>
                      <p className="font-medium">{citizen.complaints} total</p>
                      <p className="text-sm text-green-600">{citizen.resolved} resolved</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`flex items-center ${
                      citizen.status === 'active' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {citizen.status === 'active' ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <XCircle className="h-4 w-4 mr-1" />
                      )}
                      {citizen.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}